import { EventHandler, State } from "zvm-code-context";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { CozeApiClient, MessageObject, ChatEventType, RoleType } from "./cozeApi";

import './CozeNodeSdk.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

type ExtendedCozeApiClient = CozeApiClient & {
  uploadingFileType?: 'image' | 'file';
};

export interface CozeNodeSdkPropData {
  // Conversation
  conversation_id?: string;
  conversation_initContent?: string;
  // 对话禁用还是启用（默认启用，传入 disable 则禁用）
  conversation_mode?: string;

  // Config
  config_botId: string;

  // Auth
  auth_token: string;

  // User Info
  userInfo_id?: string;
  userInfo_url?: string;// 用户头像
  userInfo_nickname?: string;// 用户昵称

  botInfo_url?: string;// 智能体的头像
  botInfo_nickname?: string;// 智能体的昵称



  // UI Base
  ui_base_icon?: string;// 智能体的LOGO
  ui_base_title?: string; // 智能体的名称

  ui_input_placeholder?: string;// 输入框的提示
  // Footer
  ui_footer_expressionText?: string;// 底部提示
}

export interface CozeNodeSdkStateData {
  conversation_id?: State<string>;
  chat_id?: State<string>;
}

export interface CozeNodeSdkEvent {
  conversations_create?: EventHandler;
  onChatCreated?: EventHandler;
}

export interface CozeNodeSdkProps {
  propData: CozeNodeSdkPropData;
  propState: CozeNodeSdkStateData;
  event?: CozeNodeSdkEvent;
}

// 添加默认值常量
const DEFAULT_USER_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234e5969' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
const DEFAULT_BOT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234c6fff' d='M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 12.5v2.5h-2V12H7v-2h2V8.5h2V11h2v2h-2v1.5zM18 9h-4v6h4V9z'/%3E%3C/svg%3E";
const DEFAULT_USER_NICKNAME = "我";
const DEFAULT_BOT_NICKNAME = "AI助手";

export function CozeNodeSdk({ propData, propState, event }: CozeNodeSdkProps) {
  const [forceUpdate, setForceUpdate] = useState(0);
  if (forceUpdate < 0) {
    console.log("forceUpdate", forceUpdate);
  }

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const cozeApiClient = useMemo(() => {
    return new CozeApiClient({
      bot_id: propData.config_botId,
      conversation_id: propData.conversation_id || "",
      user_id: propData.userInfo_id || "",
      token: propData.auth_token || "",
    })
  }, [
    propData.config_botId,
    propData.conversation_id,
    propData.userInfo_id,
    propData.auth_token
  ]);

  const cozeApiClientRef = useRef<ExtendedCozeApiClient>(cozeApiClient);
  // 当cozeApiClient变化时，更新cozeApiClientRef并获取初始消息列表
  useEffect(() => {
    console.log("cozeApiClientRef.current", cozeApiClientRef.current);

    cozeApiClientRef.current = cozeApiClient;
    if (cozeApiClientRef.current.conversation_id && !cozeApiClientRef.current.messages_is_loading) {
      cozeApiClientRef.current.conversations_messages_list()
    }
  }, [cozeApiClient]);

  // 监听conversation_mode
  useEffect(() => {
    const client = cozeApiClientRef.current;
    client.conversation_mode = propData.conversation_mode == "disable" ? "disable" : "enable";
  }, [propData.conversation_mode]);


  // Move this before the useEffect hooks
  const scrollToBottom = useCallback((auto = false) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: auto ? "auto" : "smooth"
      });
    }
  }, []);


  const messageListRef = useRef<HTMLDivElement>(null);
  // 添加一个初始化完成的标记
  const [isInitialized, setIsInitialized] = useState(false);
  //初始化时列表滚动到底部
  useEffect(() => {
    const client = cozeApiClientRef.current;
    const handleInitialMessages = (data: any) => {
      if (!isInitialized) {
        console.log("conversations_messages_list:init", data);
        setIsInitialized(true);
        // 第一次获取消息列表后,滚动到底部
        requestAnimationFrame(() => {
          scrollToBottom(true);
        });
      }
    };
    client.on("conversations_messages_list", handleInitialMessages);
    return () => {
      client.off("conversations_messages_list", handleInitialMessages);
    };
  }, [scrollToBottom, isInitialized]);


  // 滚动事件监听，顶部加载更多
  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;
    const handleScroll = async () => {
      const { scrollTop } = messageList;
      const isAtTop = scrollTop < 200;
      // 滚动到顶部时加载更多消息
      if (isAtTop && !cozeApiClientRef.current.messages_is_loading && cozeApiClientRef.current.messages_has_more) {
        const oldHeight = messageList.scrollHeight;
        cozeApiClientRef.current.conversations_messages_list().then((data) => {
          console.log("conversations_messages_list:loadMore", data);

          // 保持滚动位置
          requestAnimationFrame(() => {
            const newHeight = messageList.scrollHeight;
            const newScrollTop = newHeight - oldHeight;
            messageList.scrollTop = newScrollTop;
          });
        })
      }
    };

    messageList.addEventListener('scroll', handleScroll);
    return () => messageList.removeEventListener('scroll', handleScroll);
  }, []);


  // Move this before the useEffect hooks
  const conversations_create = useCallback((conversation: any) => {
    propState?.conversation_id?.set(conversation?.id);
    event?.conversations_create?.call(null);
  }, [propState?.conversation_id, event?.conversations_create]);

  const onChatCreated = useCallback((chat?: any) => {
    propState?.chat_id?.set(chat?.id);
    event?.onChatCreated?.call(null);
  }, [propState?.chat_id, event?.onChatCreated]);

  // 监听消息流事件
  useEffect(() => {

    const handleChatStream = (event: string, data: any) => {
      console.log("chat_stream", event, data);
      setForceUpdate(prev => prev + 1);

      if (event === ChatEventType.CONVERSATION_CHAT_CREATED) {
        setTimeout(() => {
          onChatCreated(data);
        }, 0);
      }

      if (event === ChatEventType.DONE) {
        // 第一次获取消息列表后,滚动到底部
        requestAnimationFrame(() => {
          scrollToBottom(true);
        });

      } else {
        // 判断滚动条是否在底部
        const messageList = messageListRef.current;
        if (messageList) {
          const { scrollTop, scrollHeight, clientHeight } = messageList;
          const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 200;
          if (isAtBottom) {
            requestAnimationFrame(() => {
              scrollToBottom(false); // 消息流过程中平滑的滚动
            });
          }
        }
      }
    }

    const handleConversationCreate = (conversation: any) => {
      console.log("conversations_create", conversation);
      setForceUpdate(prev => prev + 1);
      conversations_create(conversation);
    }

    const handUpdate = () => {
      setForceUpdate(prev => prev + 1);
    }

    const client = cozeApiClientRef.current;
    client.on("chat_stream", handleChatStream);
    client.on("conversations_messages_list", handUpdate);
    client.on("files_upload", handUpdate);
    client.on("files_remove", handUpdate);
    client.on("conversations_create", handleConversationCreate);

    return () => {
      client.off("chat_stream", handleChatStream);
      client.off("conversations_messages_list", handUpdate);
      client.off("files_upload", handUpdate);
      client.off("files_remove", handUpdate);
      client.off("conversations_create", handleConversationCreate);
    };
  }, [isInitialized, scrollToBottom, conversations_create]);

  const handleSendMessage = async () => {
    const client = cozeApiClientRef.current;
    // 是否存在内容
    const hasContent = client.input_text_message || client.input_file_messages.length > 0 || client.input_image_messages.length > 0;
    if (!client || !hasContent || client.isStreaming) return;

    try {
      requestAnimationFrame(() => {
        scrollToBottom(false);
      });
      await client.chat_stream();
    } catch (error: any) {
      console.error('发送消息失败:', error);
      showToast(error.message || '发送失败');
    }
  };

  // 格式化文件大小
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  useEffect(() => {
    return () => {
      // 组件卸载时清理所有临时 URL
      cozeApiClientRef.current.input_image_messages.forEach(image => {
        if (image.filePath) {
          URL.revokeObjectURL(image.filePath);
        }
      });
    };
  }, []);

  // 添加态控制图片预览
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 添加一个解析消息内容的函数
  const parseMessageContent = (message: MessageObject) => {
    // 处理复合消息类型
    if (message.content_type === 'object_string' && message.content_data) {
      // 分类处理不同类型的内容
      const textContents = message.content_data.filter((item: any) => item.type === 'text');
      const imageContents = message.content_data.filter((item: any) => item.type === 'image');
      const fileContents = message.content_data.filter((item: any) => item.type === 'file');

      return (
        <div className="message-content-wrapper">
          {/* 先渲染文本内容 */}
          {textContents.map((item: any, index: number) => (
            <ReactMarkdown
              key={`text-${index}`}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="code-block-wrapper">
                      <div className="code-block-header">
                        <span className="code-language">{match[1]}</span>
                        <button
                          className="code-copy-btn"
                          onClick={() => copyCode(String(children).replace(/\n$/, ''))}
                          title="复制代码"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14">
                            <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                          </svg>
                          <span>复制</span>
                        </button>
                      </div>
                      <SyntaxHighlighter
                        style={oneLight as any}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                img({ src, alt, ...props }: any) {
                  return (
                    <img
                      src={src}
                      alt={alt}
                      className="clickable-image"
                      onClick={() => setPreviewImage(src)}
                      {...props}
                    />
                  );
                }
              }}
            >
              {item.content || ''}
            </ReactMarkdown>
          ))}

          {/* 然后渲染图片内容 */}
          {imageContents.length > 0 && (
            <div className="message-images">
              {imageContents.map((item: any, index: number) => (
                <div key={`image-${index}`} className="message-image">
                  <img
                    src={item.file_url}
                    alt={item.name || 'image'}
                    className="message-image-content clickable-image"
                    onClick={() => setPreviewImage(item.file_url)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* 最后渲染文件内容 */}
          {fileContents.length > 0 && (
            <div className="message-files">
              {fileContents.map((item: any, index: number) => (
                <div key={`file-${item.file_id || index}`}>
                  {renderFile({
                    name: item.name,
                    url: item.file_url,
                    size: item.size
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 处理普通文本消息
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="code-block-wrapper">
                <div className="code-block-header">
                  <span className="code-language">{match[1]}</span>
                  <button
                    className="code-copy-btn"
                    onClick={() => copyCode(String(children).replace(/\n$/, ''))}
                    title="复制代码"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                    <span>复制</span>
                  </button>
                </div>
                <SyntaxHighlighter
                  style={oneLight as any}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ src, alt, ...props }: any) {
            return (
              <img
                src={src}
                alt={alt}
                className="clickable-image"
                onClick={() => setPreviewImage(src)}
                {...props}
              />
            );
          }
        }}
      >
        {message.content || ''}
      </ReactMarkdown>
    );
  };

  // 添加 toast 状态
  const [toasts, setToasts] = useState<string[]>([]);

  // 添加显示 toast 的函数
  const showToast = (message: string) => {
    setToasts(prev => [...prev, message]);
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 2000);
  };

  // 改复制息的函数
  const copyMessage = (message: MessageObject) => {
    let textToCopy = '';

    if (message.content_type === 'object_string' && message.content_data) {
      const textContents = message.content_data
        .filter((item: any) => item.type === 'text')
        .map((item: any) => item.content)
        .join('\n');
      textToCopy = textContents;
    } else {
      textToCopy = message.content || '';
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('复制成功');
    }).catch(err => {
      console.error('复制失败:', err);
      showToast('复制失败');
    });
  };

  // 修改复制代码的函数
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      showToast('代码已复制');
    }).catch(err => {
      console.error('复制失败:', err);
      showToast('复制失败');
    });
  };

  // 在 parseMessageContent 函数中���改文件渲染部分
  const renderFile = (file: any) => {
    return (
      <div className="message-file">
        <div className="file-info">
          <svg className="file-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
          </svg>
          <div className="file-details">
            <span className="file-name">{file.name}</span>
            <span className="file-size">{formatFileSize(file.size)}</span>
          </div>
        </div>
        <button
          className="download-file-btn"
          onClick={() => window.open(file.url, '_blank')}
          title="下载文件"
        >
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
          </svg>
        </button>
      </div>
    );
  };

  // 添加状态控制按钮显示
  const [showScrollButton, setShowScrollButton] = useState(false);

  // 添加滚动监听
  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messageList;
      // 当距离底部超过 200px 时显示按钮
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
    };

    messageList.addEventListener('scroll', handleScroll);
    return () => messageList.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="coze-container">
      {/* 头部 */}
      <div className="chat-header">
        <div className="header-left">
          <img
            src={propData.ui_base_icon || DEFAULT_BOT_AVATAR}
            alt="bot-icon"
            className="header-icon"
          />
          <span className="header-title">
            {propData.ui_base_title || DEFAULT_BOT_NICKNAME}
          </span>
        </div>
      </div>

      {/* 消息列表区域 */}
      <div className="message-list" ref={messageListRef}>
        {/* 当消息为空且没有更多消息时显示初始内容 */}
        {cozeApiClientRef.current.messages.length === 0 && !cozeApiClientRef.current.messages_has_more && (
          <div className="message-item">
            <div className="message-avatar">
              <img
                src={propData.botInfo_url || propData.ui_base_icon || DEFAULT_BOT_AVATAR}
                alt="AI助手"
              />
              <span className="message-nickname">
                {propData.botInfo_nickname || DEFAULT_BOT_NICKNAME}
              </span>
            </div>
            <div className="message-content">
              <div className="message-bubble">
                {propData.conversation_initContent || (
                  <>
                    👋 你好！我是 {propData.botInfo_nickname || propData.ui_base_title || DEFAULT_BOT_NICKNAME}，
                    很高兴见到你！你可以问我任何问题。
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {cozeApiClientRef.current.messages_has_more && (
          <div className="message-item">
            <div className="message-content loading">
              <div className="message-bubble loading">
                <svg className="loading-icon" viewBox="0 0 24 24">
                  <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        {cozeApiClientRef.current.messages.map((message, index) => {
          // 使用消息 ID、类型、角色和索引的组合来生成唯一的 key
          const messageKey = `${message.id}-${message.type}-${message.role}-${index}`;
          const isLastAIMessage = index === cozeApiClientRef.current.messages.length - 1 && message.role !== RoleType.User;

          return (
            <div
              key={messageKey}
              className={`message-item ${message.role === RoleType.User ? 'user' : ''}`}
            >
              <div className="message-avatar">
                {message.role === RoleType.User ? (
                  <>
                    <img
                      src={propData.userInfo_url || DEFAULT_USER_AVATAR}
                      alt="用户"
                    />
                    <span className="message-nickname">
                      {propData.userInfo_nickname || DEFAULT_USER_NICKNAME}
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      src={propData.botInfo_url || propData.ui_base_icon || DEFAULT_BOT_AVATAR}
                      alt="AI助手"
                    />
                    <span className="message-nickname">
                      {propData.botInfo_nickname || propData.ui_base_title || DEFAULT_BOT_NICKNAME}
                    </span>
                  </>
                )}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  {parseMessageContent(message)}
                  {/* 只在非用户消息中显示复制按钮 */}
                  {message.role !== RoleType.User && (
                    <div className="message-actions">
                      <button
                        className="copy-message-btn"
                        onClick={() => copyMessage(message)}
                        title="复制消息"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                        <span>复制</span>
                      </button>
                    </div>
                  )}
                </div>
                {/* 只在最后一条 AI 消息后显示推荐问题 */}
                {isLastAIMessage && cozeApiClientRef.current.suggestions?.length > 0 && (
                  <div className="recommend-questions">
                    {cozeApiClientRef.current.suggestions?.map((question, index) => (
                      <button
                        key={index}
                        className="recommend-question-btn"
                        onClick={async () => {
                          const client = cozeApiClientRef.current;
                          if (!client) return;

                          client.input_text_message = question.content || '';
                          try {
                            await client.chat_stream();
                          } catch (error: any) {
                            console.error('发送推荐问题失败:', error);
                            showToast(error.message || '发送失败');
                          }
                        }}
                      >
                        {question.content}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* 在消息列表的最后添加加载动画和骨架屏 */}
        {cozeApiClientRef.current.isStreaming && (
          <div className="message-item">
            {/* 只在显示加载动时显示头像和昵称 */}
            <div className="message-avatar">
              {!cozeApiClientRef.current.isAnswerStreaming && !cozeApiClientRef.current.isFollowUpStreaming && (
                <>
                  <img
                    src={propData.botInfo_url || propData.ui_base_icon || DEFAULT_BOT_AVATAR}
                    alt="AI助手"
                  />
                  <span className="message-nickname">
                    {propData.botInfo_nickname || DEFAULT_BOT_NICKNAME}
                  </span>
                </>
              )}
            </div>

            <div className="message-content">
              {!cozeApiClientRef.current.isAnswerStreaming && (
                <div className="message-bubble loading">
                  <svg className="loading-icon" viewBox="0 0 24 24">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                  </svg>
                </div>
              )}
              {/* 推荐问题的骨架屏 */}
              {cozeApiClientRef.current.isFollowUpStreaming && (
                <div className="recommend-questions">
                  {[1, 2, 3].map((key) => (
                    <div key={key} className="recommend-question-skeleton">
                      <div className="skeleton-content" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入区域 */}
      <div className="bottom-area">
        <div className="input-container">
          {/* 上传预览区域 */}
          <>
            {/* 图片预览区域 */}
            {(cozeApiClientRef.current.input_image_messages.length > 0 ||
              (cozeApiClientRef.current.isUploading && cozeApiClientRef.current.uploadingFileType === 'image')) && (
                <div className="uploaded-images">
                  {cozeApiClientRef.current.input_image_messages.map((image) => (
                    <div key={image.file_id} className="uploaded-image-item">
                      <div className="image-wrapper">
                        <img
                          src={image.filePath || image.file_url}
                          alt={image.file?.name || 'uploaded image'}
                          className="uploaded-image-preview clickable-image"
                          onClick={() => setPreviewImage(image.filePath || image.file_url)}
                        />
                      </div>
                      <div className="image-info">
                        <span className="file-name" title={image.file?.name}>{image.file?.name}</span>
                        <span className="file-size">{formatFileSize(image.file?.size)}</span>
                      </div>
                      <button
                        className="remove-file-btn"
                        onClick={() => {
                          if (image.filePath) {
                            URL.revokeObjectURL(image.filePath);
                          }
                          cozeApiClientRef.current?.files_remove(image.file_id!);
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* 图片上传中的占位 */}
                  {cozeApiClientRef.current.isUploading &&
                    cozeApiClientRef.current.uploadingFileType === 'image' && (
                      <div className="uploaded-image-item uploading">
                        <div className="uploading-overlay">
                          <div className="uploading-spinner" />
                        </div>
                      </div>
                    )}
                </div>
              )}

            {/* 文件预览区域 */}
            {(cozeApiClientRef.current.input_file_messages.length > 0 ||
              (cozeApiClientRef.current.isUploading && cozeApiClientRef.current.uploadingFileType === 'file')) && (
                <div className="uploaded-files">
                  {cozeApiClientRef.current.input_file_messages.map((file) => (
                    <div key={file.file_id} className="uploaded-file-item">
                      <div className="file-info">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                        </svg>
                        <div className="file-details">
                          <span className="file-name">{file.file?.name}</span>
                          <span className="file-size">{formatFileSize(file.file?.size)}</span>
                        </div>
                      </div>
                      <button
                        className="remove-file-btn"
                        onClick={() => cozeApiClientRef.current?.files_remove(file.file_id!)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* 文件上传中的占位 */}
                  {cozeApiClientRef.current.isUploading &&
                    cozeApiClientRef.current.uploadingFileType === 'file' && (
                      <div className="uploaded-file-item uploading">
                        <div className="uploading-overlay">
                          <div className="uploading-spinner" />
                        </div>
                      </div>
                    )}
                </div>
              )}
          </>

          <div className="input-area">
            <textarea
              value={cozeApiClientRef.current.input_text_message}
              onChange={(e) => {
                setForceUpdate(prev => prev + 1);
                if (cozeApiClientRef.current) {
                  cozeApiClientRef.current.input_text_message = e.target.value;
                }
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={propData.ui_input_placeholder || "请输入内容..."}
              className="chat-input"
              rows={1}
            />

            {/* 右侧按钮组 */}
            <div className="input-actions">
              {/* 新建会话按钮 */}
              <button
                className={`new-chat-btn ${cozeApiClientRef.current.isStreaming ? 'disabled' : ''}`}
                onClick={async () => {
                  try {
                    await cozeApiClientRef.current?.chat_stream(undefined, true);
                  } catch (error: any) {
                    console.error('创建新会话失败:', error);
                    showToast(error.message || '创建失败');
                  }
                }}
                disabled={cozeApiClientRef.current.isStreaming}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
              </button>

              {/* 上传文件按钮 */}
              <label className={`upload-btn ${cozeApiClientRef.current.isUploading ? 'disabled' : ''}`}>
                <input
                  type="file"
                  hidden
                  disabled={cozeApiClientRef.current.isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        // 检查文件类型和数量制
                        if (file.type.startsWith('image/')) {
                          if (cozeApiClientRef.current.input_image_messages.length >= 4) {
                            alert('最多只能上传4张图');
                            return;
                          }
                          // 设置正在上传的是图片
                          cozeApiClientRef.current.uploadingFileType = 'image';

                          // 检查是否已经存在相同的文件
                          const isDuplicate = cozeApiClientRef.current.input_image_messages.some(
                            img => img.file?.name === file.name && img.file?.size === file.size
                          );
                          if (isDuplicate) {
                            showToast('该图片已经上传过了');
                            return;
                          }
                        } else {
                          if (cozeApiClientRef.current.input_file_messages.length >= 4) {
                            alert('最多只能上传4个文件');
                            return;
                          }
                          // 设置正在上传的是文件
                          cozeApiClientRef.current.uploadingFileType = 'file';

                          // 检查是否已经存在相同的文件
                          const isDuplicate = cozeApiClientRef.current.input_file_messages.some(
                            f => f.file?.name === file.name && f.file?.size === file.size
                          );
                          if (isDuplicate) {
                            showToast('该文件已经上传过了');
                            return;
                          }
                        }

                        // 开始上传前触发更新
                        setForceUpdate(prev => prev + 1);
                        await cozeApiClientRef.current?.files_upload(file);
                        // 上传完成后再次触发更新
                        setForceUpdate(prev => prev + 1);
                        // 清除上传文件类型
                        cozeApiClientRef.current.uploadingFileType = undefined;
                      } catch (error: any) {
                        console.error('文件上传失败:', error);
                        showToast(error?.message || '文件上传失败');
                        // 上传失败也触发更新
                        setForceUpdate(prev => prev + 1);
                        // 清除上传文件类型
                        cozeApiClientRef.current.uploadingFileType = undefined;
                      }
                    }
                    // 清空 input 的值，确保相同文件可以重复选择
                    e.target.value = '';
                  }}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </label>

              {/* 发送按钮 */}
              <button
                className={
                  `send-btn ${(cozeApiClientRef.current.input_text_message || cozeApiClientRef.current.input_file_messages.length > 0 || cozeApiClientRef.current.input_image_messages.length > 0) && !cozeApiClientRef.current.isStreaming ? 'active' : ''}`
                }
                onClick={handleSendMessage}
                disabled={(!cozeApiClientRef.current.input_text_message && cozeApiClientRef.current.input_file_messages.length == 0 && cozeApiClientRef.current.input_image_messages.length == 0) || cozeApiClientRef.current.isStreaming}
              >
                <svg viewBox="0 0 24 24" className="send-icon">
                  {cozeApiClientRef.current.isStreaming ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部提示文字 - 确保在bottom-area之后 */}
      {propData.ui_footer_expressionText && (
        <div className="footer-tip">
          {propData.ui_footer_expressionText}
        </div>
      )}

      {/* 图片预览遮罩 */}
      {previewImage && (
        <div
          className="image-preview-overlay"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="preview"
            className="preview-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Toast 容器 */}
      <div className="toast-container">
        {toasts.map((message, index) => (
          <div key={index} className="toast-message">
            {message}
          </div>
        ))}
      </div>

      {/* 滚动到底部按钮 */}
      <div
        className={`scroll-to-bottom ${showScrollButton ? 'visible' : ''}`}
        onClick={() => scrollToBottom(false)}
      >
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      </div>
    </div>
  );
}
