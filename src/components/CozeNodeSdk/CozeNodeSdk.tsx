import { EventHandler, State } from "zvm-code-context";
import { useMemo } from "react";
import { CozeClient } from "./cozeApi";
import type { CozeConfig } from "./cozeApi";

export interface CozeNodeSdkPropData {
  // Conversation
  conversation_id?: string;
  conversation_initContent?: string;

  // Config
  config_botId: string;

  // Auth
  auth_token?: string;

  // User Info
  userInfo_id?: string;
  userInfo_url?: string;
  userInfo_nickname?: string;

  // UI Base
  ui_base_icon?: string;
  ui_base_lang?: 'en' | 'zh' | string;

  // Assistant Button
  ui_asstBtn_isNeed?: "true" | "false";

  // Footer
  ui_footer_expressionText?: string;

  // Chat Bot
  ui_chatBot_title?: string;
  ui_chatBot_width?: string;
}

export interface CozeNodeSdkStateData {
  config_botId?: State<string>;
  conversation_id?: State<string>;
  latest_chat_id?: State<string>;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface CozeNodeSdkEvent {
  onChatBotHide?: EventHandler;
  onChatBotShow?: EventHandler;
  onConversationCreate?: (conversationId: string) => void;
  onChatMessageSend?: (message: Message) => void;
  onChatMessageReceive?: (message: Message) => void;
}

export interface CozeNodeSdkProps {
  propData: CozeNodeSdkPropData;
  propState: CozeNodeSdkStateData;
  event?: CozeNodeSdkEvent;
}

export function CozeNodeSdk({ propData, propState, event }: CozeNodeSdkProps) {


  // Initialize CozeClient with memoized config
  const cozeClient = useMemo(() => {
    const cozeConfig: CozeConfig = {
      bot_id: propData.config_botId,
      conversation_id: propData.conversation_id || "",
      user_id: propData.userInfo_id || "",
      token: propData.auth_token || "",
    };
    return new CozeClient(cozeConfig);
  }, [propData.config_botId, propData.conversation_id, propData.userInfo_id, propData.auth_token]);

  console.log(cozeClient);

  // 消息列表在 cozeClient.message_info.messages 中
  // 消息发送事件在 cozeClient.sendMessage() 中
  // 消息加载在 cozeClient.getMessages() 中




  return (
    <div

    >

    </div>
  );
}
