# 快速开始

```bash
# 安装依赖
npm i

# 运行调试
npm run dev

# 测试打包
npm run build

# 如果没安装functorz，安装并用CLI登录ZION
npm install -g functorz
npx functorz signin 你的邮箱账号 你的密码

# 初始化代码组件到ZION账号
npx functorz reinit

# 发布
npx functorz publish

```

# 组件配置文件说明

cozeWebSDK 文档地址:https://www.coze.cn/docs/developer_guides/install_web_sdk
配置参数定义完全参照 cozeWebSDK 文档
使用时将智能体发布为 chat-sdk，然后配置 config_botId 为智能体 ID

```ts
export interface CozeWebSdkPropData {
  // config，配置类的入参
  config_botId: string;

  // auth，鉴权部分的入参
  auth_type?: string;
  auth_token?: string;
  auth_refreshToken?: string;

  // userInfo，用户信息部分的入参
  userInfo_id?: string;
  userInfo_url?: string;
  userInfo_nickname?: string;

  // ui-base
  ui_base_icon?: string;
  ui_base_lang?: string;

  // ui-asstBtn
  ui_asstBtn_isNeed?: string;

  // ui-footer
  ui_footer_expressionText?: string;

  // ui-chatBot
  ui_chatBot_title?: string;
  ui_chatBot_width?: string;
}
```

cozeNodeSdk 文档地址:https://www.coze.cn/docs/developer_guides/install_node_sdk
使用时将智能体发布为 API，然后配置 config_botId 为智能体 ID

```ts
export interface CozeNodeSdkPropData {
  // Conversation
  conversation_id?: string; // 会话ID
  conversation_initContent?: string; // 会话初始内容

  // 对话禁用还是启用（默认启用，传入 disable 则禁用）
  conversation_mode?: string;

  // Config
  config_botId: string; // 智能体ID

  // Auth
  auth_token?: string; // 鉴权token

  // User Info
  userInfo_id?: string;
  userInfo_url?: string; // 用户头像
  userInfo_nickname?: string; // 用户昵称

  botInfo_url?: string; // 智能体的头像（消息列表的）
  botInfo_nickname?: string; // 智能体的昵称（消息列表的）

  // UI Base
  ui_base_icon?: string; // 智能体的LOGO（顶部的）
  ui_base_title?: string; // 智能体的名称（顶部的标题）

  ui_input_placeholder?: string; // 输入框的提示
  // Footer
  ui_footer_expressionText?: string; // 底部提示
}
```

# 更新日志

2024-12-18【v1.0.2】 新增 CozeNodeSdk 组件，CozeWebSdk 组件更新到 Coze 官方最新版本 1.1.0-beta.0
