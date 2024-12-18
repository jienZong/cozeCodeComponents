import { importShared } from './__federation_fn_import-lyDSGtOx.js';
import Components, { j as jsxRuntimeExports } from './__federation_expose_Main-s23QJPQq.js';
import { r as reactDomExports } from './__federation_shared_react-dom-ChyTJqHm.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {BrowserRouter} = await importShared('react-router-dom');
const { CozeNodeSdk } = Components;
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CozeNodeSdk,
    {
      propData: {
        conversation_id: "7448269120065486885",
        ui_base_icon: "https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/FileBizType.BIZ_BOT_ICON/587591491004252_1732261275727297071.jpeg~tplv-a9rns2rl98-image-qvalue.jpeg?rk3s=bbd3e7ed&x-expires=1736762298&x-signature=0sl%2Fqu6kvjdhWO7aA9DTIC4ZCp8%3D",
        userInfo_nickname: "zachhahaha",
        userInfo_url: "https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/FileBizType.BIZ_BOT_ICON/587591491004252_1732261275727297071.jpeg~tplv-a9rns2rl98-image-qvalue.jpeg?rk3s=bbd3e7ed&x-expires=1736762298&x-signature=0sl%2Fqu6kvjdhWO7aA9DTIC4ZCp8%3D",
        config_botId: "7449277142052913191",
        auth_token: "pat_nbz9Ek4HFkXwp0ZgQCV8U38QEIZ3uqqKlQcA3RIX88rZBbTBY3LW1eq5poiPTZoz",
        ui_footer_expressionText: "",
        ui_input_placeholder: "请输入您的问题",
        ui_base_title: "545",
        botInfo_nickname: "Coze智能体454",
        botInfo_url: "https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/FileBizType.BIZ_BOT_ICON/587591491004252_1732261275727297071.jpeg~tplv-a9rns2rl98-image-qvalue.jpeg?rk3s=bbd3e7ed&x-expires=1736762298&x-signature=0sl%2Fqu6kvjdhWO7aA9DTIC4ZCp8%3D"
      },
      propState: {},
      event: {
        conversations_create: (e) => {
          console.log(e, "show===");
        }
      }
    }
  ) }) });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
