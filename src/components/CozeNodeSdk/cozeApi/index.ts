import {
  CozeAPI,
  ChatEventType,
  ChatStatus,
  COZE_CN_BASE_URL,
  RoleType,
} from "@coze/api";

console.log(ChatEventType, ChatStatus, RoleType);

export type CozeConfig = {
  token: string;
  bot_id: string;
  conversation_id?: string;
  user_id?: string;
};

type MessageObject = {
  id: string;
  role: "user" | "assistant";
  conversation_id: string;
  bot_id: string;
  chat_id: string;
  content_type: "text" | "object_string" | "card";
  created_at?: number;
  updated_at?: number;

  type:
    | "question"
    | "answer"
    | "function_call"
    | "tool_output"
    | "tool_response"
    | "follow_up"
    | "verbose";
  content?: string;
  status?:
    | "created"
    | "in_progress"
    | "completed"
    | "failed"
    | "requires_action"
    | "canceled";
} & {
  [key: string]: any;
};

type InputMessage = {
  text_message?: string;
  image_messages?: {
    type: "image";
    file_id?: string;
    file_url?: string;
  }[];
  file_messages?: {
    type: "file";
    file_id?: string;
    file_url?: string;
  }[];
};

export class CozeClient {
  _client: CozeAPI;
  public message_info: {
    messages: MessageObject[];
    before_id: string;
    limit?: number;
    has_more: boolean;
  } = {
    messages: [],
    before_id: "0",
    limit: 20,
    has_more: true,
  };
  public input_message: InputMessage = {};

  public bot_id: string = "";
  public conversation_id: string = "";
  public user_id: string = "123";
  constructor(cozeConfig: CozeConfig) {
    if (!cozeConfig.token) {
      throw new Error("token is required");
    }
    if (!cozeConfig.bot_id) {
      throw new Error("bot_id is required");
    }
    this.bot_id = cozeConfig.bot_id;
    this.conversation_id = cozeConfig.conversation_id || "";
    this.user_id = cozeConfig.user_id || "";
    this._client = new CozeAPI({
      baseURL: COZE_CN_BASE_URL,
      token: cozeConfig.token,
      allowPersonalAccessTokenInBrowser: true, // Allow the browers to use PAT
    });
  }

  // 获取消息列表
  public async getMessages() {
    if (!this.conversation_id) {
      throw new Error("conversation_id is required");
    }
    // 如果没有更多消息了，则无须获取
    if (!this.message_info.has_more) {
      return;
    }
    const messages = await this._client.conversations.messages.list(
      this.conversation_id,
      {
        order: "desc",
        before_id: this.message_info.before_id,
        limit: this.message_info.limit,
      }
    );
    // 倒序排序，所以last_id是最早发的,将最早的消息id设置为before_id,方便下次获取更多消息
    this.message_info.before_id = messages.last_id;
    this.message_info.has_more = messages.has_more;
    // 拿到消息后，需要将消息列表反向后，再unshift添加到messages中
    this.message_info.messages.unshift(
      ...{
        ...messages.data.reverse(),
        status: "completed",
      }
    );
  }

  // 创建会话
  public async createConversation(conversation_initContent: string) {
    let content_type = "object_string";
    try {
      const content_data = JSON.parse(conversation_initContent);
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

    const conversation = await this._client.conversations.create({
      bot_id: this.bot_id,
      messages: [
        {
          role: RoleType.User,
          type: "question",
          content: conversation_initContent,
          content_type:
            content_type == "object_string" ? "object_string" : "text",
        },
      ],
    });
    this.conversation_id = conversation.id;
  }

  // 流式响应发送消息
  public async sendMessage() {
    if (!this.conversation_id) {
      throw new Error("conversation_id is required");
    }
    const {
      text_message,
      image_messages = [],
      file_messages = [],
    } = this.input_message;
    const messages: any[] = [
      {
        type: "text",
        content: text_message,
      },
      ...image_messages,
      ...file_messages,
    ];
    const stream = await this._client.chat.stream({
      bot_id: this.bot_id,
      conversation_id: this.conversation_id,
      user_id: this.user_id,
      additional_messages: [
        {
          role: RoleType.User,
          content: JSON.stringify(messages),
          content_type: "object_string",
        },
      ],
    });
    for await (const part of stream) {
      console.log(part);
    }
  }
}
