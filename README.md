# 快速开始

```bash
# 安装依赖
npm i

# 运行调试
npm run dev

# 测试打包
npm run build

# 如果没安装functorz，安装并登录CLI
npm install -g functorz
npx functorz signin 你的邮箱账号 你的密码

# 发布
npx functorz publish

```

# 组件配置文件说明

cozeWebSDK 文档地址:https://www.coze.cn/docs/developer_guides/install_web_sdk
配置参数定义完全参照 cozeWebSDK 文档

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
