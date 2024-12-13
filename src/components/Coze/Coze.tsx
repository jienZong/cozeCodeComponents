import { useEffect, useRef, useState } from "react";
import even from "./even";
import { useStore } from "./store";
import { Content } from "./Content";
import { Button, Image, message, Spin, Tooltip, Input } from "antd";
import {
  StopOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { EventHandler, State } from "zvm-code-context";

import obj from "./data";
import "./style.css";

import axios from "axios";

const { TextArea } = Input;
const ComIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4749857_1fmwedysplz.js",
});

export interface CozePropData {
  authorization: string;
  bot_id: string;
  user_id?: string;
  user_nickname?: string;
  conversation_id?: string;
  user_avatar_url?: string;
  bot_nickname?: string;
  bot_avatar_url?: string;
  bottom_text?: string;
  conversation_content?: string;
  limit?: number;
}

export interface CozeStateData {
  conversation_id?: State<string>;
  chat_id?: State<string>;
  receive_chat_id?: State<string>;
}

export interface CozeEvent {
  onCreateConversation?: EventHandler;
  onChat?: EventHandler;
  onReceiveChat?: EventHandler;
}

export interface CozeProps {
  propData: CozePropData;
  propState: CozeStateData;
  event: CozeEvent;
}

export function Coze({ propData, propState, event }: CozeProps) {
  const abortControllerRef = useRef<AbortController | null>(null);

  //------------全局 store 变量----------------------------
  const content = useStore((state) => state.content);
  const history = useStore((state) => state.history);
  const renderFlag = useStore((state) => state.renderFlag);
  const requestFlag = useStore((state) => state.requestFlag);
  const options = useStore((state) => state.options);
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  //本地文件列表
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  //input文本监听值
  const [textarea, setTextarea] = useState("");
  //选项的加载控制
  const [option_loading, set_option_loading] = useState(false);
  //翻页的loading控制
  const [has_more_spin, setHas_more_spin] = useState<boolean>(false);
  //文本域监听值
  const textareaRef = useRef(null);
  //页面滚动条值 非windows
  const containerRef = useRef<HTMLDivElement | null>(null);
  //通过icon触发文件上传
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  //监听input 文件 上传事件
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) even.upload(files);
  };

  //监听input 回车
  const enterChange = (e: any) => {
    if (e.keyCode === 13)
      if (!e.shiftKey) {
        e.preventDefault();
        obj.stop = false;
        check(textarea);
      }
  };

  //请求之前的检查 清除文本 dom不会立即执行 需要setTimeout && push 用户气泡
  const check = (value: string) => {
    setTextarea("");
    req(value);
    event.onChat?.call(null);
    setTimeout(() => {
      if (textarea.length && !renderFlag)
        if (containerRef.current)
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, 200);
  };

  //----------------
  //监听并更新input文本域高
  useEffect(() => {
    if (textareaRef.current) {
      //textareaRef.current.style.height = "auto";
      //textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textarea]);

  //监听流式文本框 => 滚动条置底
  // useEffect(() => {
  //   if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;

  // }, [content]);

  //监听所有的props并赋值
  useEffect(() => {
    if (propData.authorization.length > 10 && propData.bot_id) {
      cancel_request();
      //@ts-ignore
      Object.keys(propData).forEach((key) => (obj[key] = propData[key]));
      obj.headers["Authorization"] = propData.authorization;
      //设置组件state
      if (obj.conversation_id)
        propState.conversation_id?.set(String(obj.conversation_id));
      !obj.conversation_id
        ? axios
            .post(
              "https://api.coze.cn/v1/conversation/create",
              {},
              {
                headers: obj.headers,
              }
            )
            .then((res) => {
              useStore.getState().clearHistory();
              obj.conversation_id = res.data.data.id;
              propState?.conversation_id?.set(String(obj.conversation_id));
              event.onCreateConversation?.call(null);
              useStore.getState().pushHistory({
                type: "answer",
                text: obj.conversation_content,
                file: [],
                image: [],
              });
            })
        : load(true);
    }
  }, [
    propData.authorization,
    propData.bot_avatar_url,
    propData.bot_id,
    propData.bot_nickname,
    propData.bottom_text,
    propData.conversation_id,
    propData.conversation_content,
  ]);

  useEffect(() => {
    obj.has_more
      ? containerRef.current?.addEventListener("scroll", () => handleScroll())
      : containerRef.current?.removeEventListener("scroll", () => {});
  }, [obj.has_more]);

  const handleScroll = async () => {
    const container = containerRef.current;
    if (container)
      if (!container.scrollTop && obj.has_more) {
        let last = container.scrollHeight;
        load(false);
        setTimeout(() => {
          if (containerRef.current)
            containerRef.current.scrollTop =
              containerRef.current?.scrollHeight - last;
        }, 500);
      }
  };

  const load = async (is_first: boolean) => {
    obj.has_more = false;
    const data = {};
    //@ts-ignore
    if (history.length && !is_first) {
      message.info(`obj.after_id:${obj.after_id}`);
      //@ts-ignore
      obj.after_id ? (data["after_id"] = obj.after_id) : null;
    }

    axios
      .post(
        `https://api.coze.cn/v1/conversation/message/list?conversation_id=${obj.conversation_id}`,
        data,
        {
          headers: obj.headers,
          //@ts-ignore
        }
      )
      .then((res) => {
        obj.after_id = res.data.last_id;
        setHas_more_spin(res.data.has_more);
        if (!res.data.data.length) {
          return load(is_first);
        }
        obj.has_more = res.data.has_more;
        //@ts-ignore
        res.data.data
          .slice()
          .forEach((data) =>
            useStore.getState().unshiftHistory(even.range_message(data))
          );
        if (is_first)
          setTimeout(() => {
            if (containerRef.current)
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight;
          }, 100);
        const result = res.data.data;
        const item = result[0];
        if (is_first && item.type === "question" && item.role === "user")
          req(null);
      });
  };

  const req = (value: string | null) => {
    // 创建一个新的 AbortController 实例
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const additional_messages = [
      {
        role: "user",
        content_type: obj.content_param.length ? "object_string" : "text",
        content: even.start_request(typeof value === "string" ? value : ""),
      },
    ];

    useStore.getState().setRequestFlag(true);
    obj.stop = false;
    fetch(
      `https://api.coze.cn/v3/chat?conversation_id=${obj.conversation_id}`,
      {
        method: "POST",
        headers: obj.headers,
        body: JSON.stringify({
          bot_id: obj.bot_id,
          user_id: obj.user_id,
          stream: true,
          auto_save_history: true,
          ...(value ? { additional_messages } : {}),
        }),
        signal: controller.signal,
      }
    ).then((res) => {
      if (!res.body) {
        message.error("请求失败，请重新发送");
        useStore.getState().setRequestFlag(false);
        throw new Error("ReadableStream not yet supported in this browser.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      obj.content_param = [];
      even.start_render();
      useStore.getState().setRenderFlag(true);
      // @ts-ignore
      reader.read().then(function processText({ done, value }) {
        if (done) return;
        const origin = decoder.decode(value, { stream: true });
        const result = even.parseData(origin);
        result.forEach((item) => handler(item));
        return reader.read().then(processText);
      });
    });
  };

  const handler = (item: any) => {
    // console.log(item)
    const chat_id = item.data?.id;
    console.log(obj.stop);
    if (!obj.stop) {
      if (chat_id) {
        propState.chat_id?.set(chat_id);
        obj.chat_id = chat_id;
      }
      switch (item.event) {
        case "conversation.chat.created":
          event.onReceiveChat?.call(null);
          break;
        case "conversation.message.delta":
          const str = item.data.content;
          if (str) {
            useStore.getState().setLoading(false);
            set_option_loading(false);
            obj.content += str;
            useStore.getState().setContent(obj.content);
          }
          break;
        case "conversation.message.completed":
          set_option_loading(true);
          // console.log('completed')
          switch (item.data.type) {
            case "answer":
              obj.content = "";
              useStore.getState().setContent("");
              useStore.getState().pushHistory({
                text: item.data.content,
                image: [],
                file: [],
                type: "answer",
              });
              break;
            case "follow_up":
              useStore.getState().pushOptions([item.data.content]);
              break;
            default:
              break;
          }
          break;
        case "done":
          obj.is_done = true;
          set_option_loading(false);
          useStore.getState().setRequestFlag(false);
          useStore.getState().setRenderFlag(false);
          // console.log('done');

          setTimeout(() => {
            if (containerRef.current)
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight;
          }, 100);
          break;
        case "conversation.chat.failed":
          message.error({
            duration: 15,
            content: item.data.last_error.msg,
          });
          // setError(item.data.last_error.msg)
          break;
        default:
          break;
      }
    }
  };

  const cancel_request = () => {
    obj.stop = true;
    useStore.getState().clearHistory();
    useStore.getState().clearOptions();
    useStore.getState().setRenderFlag(false);
    useStore.getState().setRequestFlag(false);
    useStore.getState().setContent("");
    useStore.getState().setLoading(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // 取消请求
      abortControllerRef.current = null; // 清空引用
    }
  };

  return (
    <div className="main" ref={containerRef}>
      {has_more_spin ? (
        <div className="loading_more">
          <Spin />
        </div>
      ) : null}

      <div className="box-content">
        {history.map((item, index) => (
          <Content
            type={item.type}
            text={item.text}
            file={item.file as any}
            image={item.image}
            key={index}
          />
        ))}

        {content && !loading ? (
          <Content
            key={"content"}
            type="answer"
            text={content}
            file={null}
            image={null}
          />
        ) : null}
        {loading ? (
          <Content type="answer" text={<Spin />} file={null} image={null} />
        ) : null}

        {option_loading ? <Spin /> : null}

        {options.length && !renderFlag
          ? options.map((item, index) => (
              <div className="box-options">
                <Button
                  size="small"
                  key={index}
                  onClick={() => {
                    check(item);
                  }}
                >
                  {item}
                </Button>
              </div>
            ))
          : null}
      </div>
      <div className="bottom">
        {renderFlag || requestFlag ? (
          <div
            className="stop"
            onClick={() => {
              cancel_request();
              set_option_loading(false);
              even.cancel();
            }}
          >
            <Button icon={<StopOutlined />}>停止响应</Button>
          </div>
        ) : null}
        {files.length ? (
          <div className="file-box">
            {files.length
              ? files.map((item, index) =>
                  item.is_img ? (
                    <div key={index} className="box-upload-image">
                      <Image
                        height="60"
                        width="60"
                        className="box-upload-image-img"
                        src={item.path}
                        preview={{ mask: <EyeOutlined /> }}
                      />
                      <CloseCircleOutlined
                        className="icon-close-file"
                        onClick={() => even.del_file(index)}
                        style={{ color: "red" }}
                      />
                    </div>
                  ) : (
                    <div key={index} className="box-upload-file">
                      <ComIcon
                        className="box-upload-image-img"
                        type={item.icon as any}
                        style={{ fontSize: 50 }}
                      />
                      <div className="box-upload-file-item">
                        <small>
                          {" "}
                          {(item as any).name.length > 15
                            ? (item as any).name.slice(0, 10) + "..."
                            : (item as any).name}{" "}
                        </small>
                        <small>{even.compute_size(item.size)}</small>
                      </div>
                      <CloseCircleOutlined
                        className="icon-close-file"
                        onClick={() => even.del_file(index)}
                        style={{ color: "red" }}
                      />
                    </div>
                  )
                )
              : null}
          </div>
        ) : null}
        <div className="textarea-container">
          <TextArea
            className="custom-textarea"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            placeholder="发送消息..."
            autoSize={{ minRows: 2, maxRows: 5 }}
            size="large"
            onKeyDown={enterChange}
          />
          <div className="icon-container">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
            <Tooltip
              title={obj.upload_hover_title}
              color="white"
              overlayInnerStyle={{ color: "black" }}
            >
              <ComIcon type="icon-plus" onClick={handleIconClick} />
            </Tooltip>
            {/*<span className="dividing">|</span>*/}
            <Button
              type="text"
              disabled={even.change_send_state(!!textarea.length, renderFlag)}
              onClick={() => check(textarea)}
            >
              <Tooltip
                title="发送"
                color="white"
                overlayInnerStyle={{ color: "black" }}
              >
                <ComIcon type="icon-send" />
              </Tooltip>
            </Button>
          </div>
        </div>

        <div className="tips">
          <small>
            {propData.bottom_text || "内容由AI生成,无法确保真实准确,仅供参考"}
          </small>
        </div>
      </div>
    </div>
  );
}
