import { importShared } from './__federation_fn_import-lyDSGtOx.js';
import Components, { j as jsxRuntimeExports } from './__federation_expose_Main-DJgHtC_N.js';
import { r as reactDomExports } from './__federation_shared_react-dom-ChyTJqHm.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {BrowserRouter} = await importShared('react-router-dom');
const {
  CozeNodeSdk
  //  CozeWebSdk
} = Components;
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#f5f8fa" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    flex: 5,
    overflow: "hidden"
    // position: 'relative'
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CozeNodeSdk,
    {
      propData: {
        conversation_id: "7449991673377128475",
        ui_base_icon: "",
        userInfo_nickname: "",
        userInfo_url: "",
        config_botId: "7440005235935920164",
        auth_token: "pat_oue31YyvzrfVM55P1Jd2dK3IKDSuEat4zWvvzuAV9VBK8W147x9zD54qIXxHCrC5",
        ui_footer_expressionText: "",
        ui_input_placeholder: "请输入您的问题~",
        ui_base_title: "",
        botInfo_nickname: "",
        botInfo_url: "",
        conversation_initContent: "👋 你好！我是一个智能助手，可以帮你解答问题、完成任务。让我们开始对话吧！"
      },
      propState: {},
      event: {
        conversations_create: (e) => {
          console.log(e, "show===");
        },
        onChatCreated: (e) => {
          console.log(e, "onChatCreated===");
        }
      }
    }
  ) }) }) });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
