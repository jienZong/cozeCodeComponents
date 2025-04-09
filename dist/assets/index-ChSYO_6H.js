import { importShared } from './__federation_fn_import-DlqBeFYU.js';
import Components, { j as jsxRuntimeExports } from './__federation_expose_Main-BSTv5NNK.js';
import { r as reactDomExports } from './index-BDy7Zqw8.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {BrowserRouter} = await importShared('react-router-dom');
const {
  // CozeNodeSdk,
  CozeWebSdk
} = Components;
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { border: "1px solid #fe0", boxSizing: "border-box", maxWidth: "800px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", margin: "0 auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CozeWebSdk,
    {
      propData: {
        config_botId: "7440005235935920164",
        auth_type: "token",
        auth_token: "czs_lsg2Ta6SpMOsZgie709dTHNirrp8ZSedrE27WVyM0NIXZXDDqZEE1PVnzKDldczEc",
        auth_refreshToken: "czs_lsg2Ta6SpMOsZgie709dTHNirrp8ZSedrE27WVyM0NIXZXDDqZEE1PVnzKDldczEc",
        // userInfo
        userInfo_id: "1000000000000466",
        userInfo_url: "",
        userInfo_nickname: "",
        // base
        ui_base_icon: "",
        ui_base_lang: "",
        // asstBtn
        ui_asstBtn_isNeed: "",
        // footer
        ui_footer_expressionText: "",
        // chatBot
        ui_chatBot_title: "",
        ui_chatBot_width: "",
        ui_header_isNeedClose: "true"
      },
      propState: {},
      event: {}
    }
  ) }) });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
