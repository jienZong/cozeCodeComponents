import {
  CozeAPI,
  ChatEventType,
  //ChatStatus,
  COZE_CN_BASE_URL,
  RoleType,
} from "@coze/api";

export { CozeAPI, ChatEventType, RoleType };

export type CozeConfig = {
  token: string;
  bot_id: string;
  conversation_id?: string;
  user_id?: string;
  conversation_mode?: "enable" | "disable";
};

type ImageMessageInput_obj = {
  type: "image";
  file_id?: string;
  file_url?: string;
} & {
  [key: string]: any;
};

type FileMessageInput_obj = {
  type: "file";
  file_id?: string;
  file_url?: string;
} & {
  [key: string]: any;
};

type MessageContent = {
  type: "text" | "image" | "file";
  content?: string;
  file_id?: string;
  file_url?: string;
};

type MessageStatus =
  | "created"
  | "in_progress"
  | "completed"
  | "failed"
  | "requires_action"
  | "canceled";

type MessageContentType = "text" | "object_string" | "card";

type MessageType =
  | "question"
  | "answer"
  | "function_call"
  | "tool_output"
  | "tool_response"
  | "follow_up"
  | "verbose";

export type MessageObject = {
  id: string;
  role: RoleType;
  conversation_id: string;
  bot_id: string;
  content_type: MessageContentType;
  content_data?: any;
  chat_id?: string;
  type?: MessageType;
  content?: string;
  status?: MessageStatus;
} & {
  [key: string]: any;
};

type CozeApiClientEvent = {
  chat_stream: ((event: ChatEventType, data: any) => void)[];
  conversations_create: ((conversation: any) => void)[];
  files_upload: ((fileInfo: any) => void)[];
  files_remove: ((fileInfo: any) => void)[];
  conversations_messages_list: ((messages_info: any) => void)[];
};

export class CozeApiClient {
  private readonly cozeApiInstance: CozeAPI;
  private readonly _event_listeners: CozeApiClientEvent = {
    chat_stream: [],
    conversations_create: [],
    files_upload: [],
    files_remove: [],
    conversations_messages_list: [],
  };
  // 是否正在流式响应
  public isStreaming: boolean = false;
  // 当前的聊天事件
  public isAnswerStreaming: boolean = false;
  public isFollowUpStreaming: boolean = false;
  public isDone: boolean = true;

  // 是否正在上传文件
  public isUploading: boolean = false;

  // 创建消息对象

  private readonly createNewMessage = (
    input_message?: Partial<MessageObject>
  ): MessageObject => ({
    id: input_message?.id || Date.now().toString(),
    type: input_message?.type || "question",
    role: input_message?.role || RoleType.User,
    conversation_id: this.conversation_id,
    bot_id: this.bot_id,
    content_type: input_message?.content_type || "text",
    content: input_message?.content || "",
    content_data: input_message?.content_data || null,
  });

  // 消息列表中最早的消息id
  messages_before_id: string = "0";
  // 消息列表中每页的消息数量
  messages_limit: number = 20;
  // 消息列表中是否有更多消息
  messages_has_more: boolean = true;
  // 是否正在加载更多消息
  messages_is_loading: boolean = false;

  // 聊天消息列表
  public messages: MessageObject[] = [];

  // 推荐问答消息列表
  public suggestions: MessageObject[] = [];

  // 输入的文本消息
  public input_text_message: string = "";

  // 输入的图片消息
  public input_image_messages: ImageMessageInput_obj[] = [];

  // 输入的文件消息
  public input_file_messages: FileMessageInput_obj[] = [];

  // 机器人id
  public bot_id: string = "";
  // 鉴权token
  public token: string = "";
  // 会话id
  public conversation_id: string = "";
  // 会话模式
  public conversation_mode: "enable" | "disable" = "enable";
  // 用户id
  public user_id: string = "123";
  constructor(cozeConfig: CozeConfig) {
    if (!cozeConfig.token) {
      console.error("token is required");
      //throw new Error("token is required");
    }
    if (!cozeConfig.bot_id) {
      console.error("bot_id is required");
    }
    if (cozeConfig?.conversation_mode) {
      this.conversation_mode = cozeConfig?.conversation_mode || "enable";
    }
    this.bot_id = cozeConfig.bot_id;
    this.token = cozeConfig.token;

    this.user_id = cozeConfig.user_id || "";
    this.cozeApiInstance = new CozeAPI({
      baseURL: COZE_CN_BASE_URL,
      token: this.token,
      allowPersonalAccessTokenInBrowser: true, // Allow the browers to use PAT
    });

    if (cozeConfig.conversation_id) {
      this.conversation_id = cozeConfig.conversation_id || "";
    } else {
      this.messages_has_more = false;
    }

    console.log("CozeApiClient", this);
  }

  // 添加事件监听
  public on<T extends keyof CozeApiClientEvent>(
    event: T,
    callback: CozeApiClientEvent[T][number]
  ) {
    if (!this._event_listeners[event]) {
      this._event_listeners[event] = [];
    }
    (this._event_listeners[event] as Array<CozeApiClientEvent[T][number]>).push(
      callback
    );
  }

  // 移除事件监听
  public off<T extends keyof CozeApiClientEvent>(
    event: T,
    callback?: CozeApiClientEvent[T][number]
  ) {
    if (!this._event_listeners[event]) {
      return;
    }

    if (callback) {
      const index = (
        this._event_listeners[event] as Array<CozeApiClientEvent[T][number]>
      ).indexOf(callback);
      if (index > -1) {
        (
          this._event_listeners[event] as Array<CozeApiClientEvent[T][number]>
        ).splice(index, 1);
      }
    } else {
      this._event_listeners[event] = [];
    }
  }

  // 获取消息列表
  public async conversations_messages_list() {
    if (!this.conversation_id) {
      throw new Error("conversation_id is required");
    }
    // 如果没有更多消息了，则无须获取
    if (!this.messages_has_more) {
      throw new Error("No more messages");
    }
    // 如果正在加载更多消息，则无须获取
    if (this.messages_is_loading) {
      throw new Error("messages_is_loading");
    }
    this.messages_is_loading = true;

    let messages_info = null;

    try {
      messages_info = await this.cozeApiInstance.conversations.messages.list(
        this.conversation_id,
        {
          order: "desc",
          before_id: this.messages_before_id,
          limit: this.messages_limit,
        }
      );
    } catch (error) {
      throw error;
    } finally {
      this.messages_is_loading = false;
    }

    // 倒序序，所以last_id是最早发的,将最早的消息id设置为before_id,方便下次获取更多消息
    this.messages_before_id = messages_info.last_id;
    this.messages_has_more = messages_info.has_more;
    // 拿到消息后，需要将消息列表反向后，再unshift添加到messages中
    this.messages.unshift(
      ...messages_info.data.reverse().map((item) => {
        let contentData = null;
        if (item.content_type === "object_string") {
          contentData = JSON.parse(item.content);
        }
        return {
          ...item,
          content_data:
            contentData?.map((item: any) => ({
              ...item,
              filePath: item?.file_url,
            })) || null,
        };
      })
    );
    this._event_listeners?.conversations_messages_list?.forEach((listener) =>
      // 这里需要避免阻塞主线程
      setTimeout(() => {
        (listener as any)(messages_info);
      }, 0)
    );
    return messages_info;
  }

  // 创建会话
  public async conversations_create(
    conversation_initContent: string = "",
    role: RoleType = RoleType.Assistant
  ) {
    this._checkConfig();
    let content_type = "object_string";
    try {
      const content_data = JSON.parse(conversation_initContent || "");
      if (!Array.isArray(content_data) || content_data.length == 0) {
        throw new Error("content_data is not an array");
      }
      content_data.forEach((item: any) => {
        if (
          item.type !== "image" &&
          item.type !== "file" &&
          item.type !== "text"
        ) {
          throw new Error(`invalid content_data: ${item.type}`);
        }
      });
      content_type = "object_string";
    } catch (error) {
      content_type = "text";
    }

    const conversation = await this.cozeApiInstance.conversations.create({
      bot_id: this.bot_id,
      ...(conversation_initContent
        ? {
            messages: [
              {
                role,
                type: role == RoleType.User ? "question" : "answer",
                content: conversation_initContent,
                content_type:
                  content_type == "object_string" ? "object_string" : "text",
              },
            ],
          }
        : {}),
    });

    this._clearInputState();
    this.messages = [];
    this.isStreaming = false;
    this.isAnswerStreaming = false;
    this.isFollowUpStreaming = false;
    this.isDone = true;
    this.messages_before_id = "0";
    this.messages_has_more = true;

    this.conversation_id = conversation.id;
    this._event_listeners?.conversations_create?.forEach((listener) =>
      // 这里需要避免阻塞主线程
      setTimeout(() => {
        (listener as any)(conversation);
      })
    );
    // 获会话消息列表

    // 延时等待messages_is_loading为false
    while (this.messages_is_loading) {
      let seconds = 0;
      await new Promise((resolve) => setTimeout(resolve, 50));
      seconds += 0.05;
      if (seconds > 10) {
        throw new Error("messages_is_loading timeout");
      }
    }
    await this.conversations_messages_list();
  }

  // 流式响应发消息
  public async chat_stream(
    conversation_content?: string,
    isCreateConversation: boolean = false
  ) {
    this._checkConfig();
    if (this.isStreaming) {
      throw new Error("Already streaming a response");
    }

    if (conversation_content) {
      this.input_text_message = conversation_content;
    }

    if (!this.input_text_message) {
      //throw new Error("Text message is required");
    }

    if (!this.conversation_id || isCreateConversation) {
      const { content } = this._buildMessageContent();
      await this.conversations_create(content, RoleType.User);
    }
    await this._processChatStream();
  }

  // 实例配置校验
  private _checkConfig() {
    if (!this.bot_id) {
      throw new Error("bot_id is required");
    }
    if (!this.token) {
      throw new Error("token is required");
    }
    if (this.conversation_mode === "disable") {
      throw new Error("conversation_mode is disable");
    }
  }

  // 清空输入状态
  private _clearInputState() {
    this.suggestions = [];
    this.input_file_messages = [];
    this.input_image_messages = [];
    this.input_text_message = "";
  }

  // 备份输入状态
  private _backupInputState() {
    return {
      suggestions: [...this.suggestions],
      input_file_messages: [...this.input_file_messages],
      input_image_messages: [...this.input_image_messages],
      input_text_message: this.input_text_message,
    };
  }

  // 恢复输入状态
  private _restoreInputState(
    backup: ReturnType<typeof this._backupInputState>
  ) {
    this.suggestions = backup.suggestions;
    this.input_file_messages = backup.input_file_messages;
    this.input_image_messages = backup.input_image_messages;
    this.input_text_message = backup.input_text_message;
  }

  // 处理流式响应
  private async _processChatStream() {
    const { content, content_type, content_data } = this._buildMessageContent();
    // 如果消息列表为空，并且用户也没有输入，则不发送消息
    if (!this.messages.length && !content) {
      return;
    }

    const stream = await this.cozeApiInstance.chat.stream({
      bot_id: this.bot_id,
      conversation_id: this.conversation_id,
      user_id: this.user_id,
      ...(content
        ? {
            additional_messages: [
              {
                role: RoleType.User,
                type: "question",
                content,
                content_type,
              },
            ],
          }
        : {}),
    });

    const inputState = this._backupInputState();
    // 清空当前状态
    this._clearInputState();

    let message: MessageObject | null = null;
    if (content) {
      message = this.createNewMessage({
        id: Date.now().toString(),
        role: RoleType.User,
        content_type: content_type,
        content: content,
        status: "completed",
        type: "question",
        content_data: content_data,
      });
      this.messages.push(message);
    }

    try {
      this.isStreaming = true;
      this.isDone = false;
      await this._handleChatStream(stream);
    } catch (error) {
      this._restoreInputState(inputState);
      // 消息从列表取出
      if (message) {
        this.messages = this.messages.filter((item) => item.id !== message.id);
      }
      throw error;
    } finally {
      this.isStreaming = false;
      this.isDone = true;
      this.isAnswerStreaming = false;
      this.isFollowUpStreaming = false;
    }
  }

  // 上传文件
  public async files_upload(file: File) {
    this._checkConfig();
    if (this.isUploading) {
      throw new Error("Already uploading a file");
    }
    // 1.判断是图片文件,最多支持4张图片
    if (file.type.startsWith("image/")) {
      if (this.input_image_messages.length >= 4) {
        throw new Error("最多支持4张图片");
      }
    } else {
      // 2.判断是其他文件,最多支持4个文件
      if (this.input_file_messages.length >= 4) {
        throw new Error("最多支持4个文件");
      }
    }
    this.isUploading = true;
    const fileInfo = await this.cozeApiInstance.files
      .upload({
        file,
      })
      .finally(() => {
        this.isUploading = false;
      });
    this._event_listeners?.files_upload?.forEach((listener) =>
      // 这里需要避免阻塞主线程
      setTimeout(() => {
        (listener as any)(fileInfo);
      }, 0)
    );
    const filePath = URL.createObjectURL(file);
    // 1.判断是图片文件
    if (file.type.startsWith("image/")) {
      this.input_image_messages.push({
        ...fileInfo,
        type: "image",
        file_id: fileInfo.id,
        file,
        filePath,
        file_url: filePath,
        name: file.name,
        size: file.size,
      });
    } else {
      // 2.判断是其他文件
      this.input_file_messages.push({
        ...fileInfo,
        type: "file",
        file_id: fileInfo.id,
        file,
        filePath,
        file_url: filePath,
        name: file.name,
        size: file.size,
      });
    }
    return fileInfo;
  }

  // 移除文件
  public async files_remove(file_id: string) {
    // 从input_file_messages或input_image_messages中移除文件
    // 找到file_id对应的文件，并从input_file_messages或input_image_messages中移除
    const fileInfo =
      this.input_file_messages.find((item) => item.file_id === file_id) ||
      this.input_image_messages.find((item) => item.file_id === file_id);
    if (!fileInfo) {
      throw new Error(`找不到文件`);
    }
    // 移除文件
    if (fileInfo.type === "file") {
      this.input_file_messages = this.input_file_messages.filter(
        (item) => item.file_id !== file_id
      );
    } else {
      this.input_image_messages = this.input_image_messages.filter(
        (item) => item.file_id !== file_id
      );
      // 移除图片的临时预览链接
      if (fileInfo.filePath) {
        URL.revokeObjectURL(fileInfo.filePath);
        fileInfo.filePath = "";
      }
    }
    this._event_listeners?.files_remove?.forEach((listener) =>
      // 这里需要避免阻塞主线程
      setTimeout(() => {
        (listener as any)(fileInfo);
      }, 0)
    );
  }

  // 构建消息内容
  private _buildMessageContent(): {
    content: string;
    content_type: MessageContentType;
    content_data?: any;
  } {
    const content_data: MessageContent[] = [
      {
        type: "text",
        content: this.input_text_message,
      },
      ...this.input_file_messages.map((item) => ({
        file_id: item.file_id,
        type: "file" as const,
        file_url: item.file_url,
      })),
      ...this.input_image_messages.map((item) => ({
        file_id: item.file_id,
        type: "image" as const,
        file_url: item.file_url,
      })),
    ];

    const hasAttachments =
      this.input_image_messages.length || this.input_file_messages.length;

    return {
      content: hasAttachments
        ? JSON.stringify(content_data)
        : this.input_text_message,
      content_type: hasAttachments ? "object_string" : "text",
      content_data: hasAttachments
        ? [
            {
              type: "text",
              content: this.input_text_message,
            },
            ...this.input_file_messages,
            ...this.input_image_messages,
          ]
        : null,
    };
  }

  // 处理流式响应
  private async _handleChatStream(stream: any) {
    let currentMessage = null;
    const processedMessageIds = new Set<string>();
    for await (const part of stream) {
      if (this.isDone) {
        return;
      }
      this._event_listeners?.chat_stream?.forEach((listener) =>
        // 这里需要避免阻塞主线程
        setTimeout(() => {
          (listener as any)(part.event, part.data);
        }, 0)
      );
      switch (part.event) {
        case ChatEventType.CONVERSATION_CHAT_FAILED: {
          break;
        }
        case ChatEventType.CONVERSATION_CHAT_REQUIRES_ACTION: {
          break;
        }
        case ChatEventType.CONVERSATION_CHAT_CREATED: {
          break;
        }
        case ChatEventType.CONVERSATION_CHAT_IN_PROGRESS: {
          break;
        }
        case ChatEventType.CONVERSATION_CHAT_COMPLETED: {
          break;
        }

        case ChatEventType.CONVERSATION_MESSAGE_DELTA: {
          // 如果消息类型是answer，则处理
          if (part.data.type === "answer") {
            // 如果消息id是一条新消息，则创建新消息
            if (!processedMessageIds.has(part.data.id)) {
              currentMessage = this.createNewMessage({
                type: "answer",
                role: RoleType.Assistant,
                id: part.data.id,
                ...part.data,
              });
              this.isAnswerStreaming = true;
              this.isFollowUpStreaming = false;
              this.messages.push(currentMessage);
              processedMessageIds.add(part.data.id);
            }
            // 如果消息id是当前消息，则更新当前消息
            else if (currentMessage && currentMessage.id === part.data.id) {
              currentMessage.content += part.data.content;
            }
          }
          break;
        }
        case ChatEventType.CONVERSATION_MESSAGE_COMPLETED: {
          // 如果消息类型是answer，则处理
          if (part.data.type === "answer") {
            // 如果消息id是一条新消息，则将消息改为completed
            if (currentMessage && !processedMessageIds.has(part.data.id)) {
              this.isAnswerStreaming = false;

              currentMessage.status = "completed";
            }
          }

          if (part.data.type === "verbose") {
            // 如果消息类型是verbose
            const content_data = JSON.parse(part.data.content);
            if (content_data.msg_type === "generate_answer_finish") {
              // 答案生成完成，一般开始生成追问
              this.isFollowUpStreaming = true;
            }
          }
          // 如果消息类型是follow_up，则增加建议
          if (part.data.type === "follow_up") {
            this.suggestions.push(part.data);
          }
          break;
        }
        case ChatEventType.CONVERSATION_AUDIO_DELTA: {
          break;
        }
        case ChatEventType.DONE: {
          break;
        }
        case ChatEventType.ERROR: {
          throw new Error(part.data.msg);
          break;
        }
      }
    }
  }
}
