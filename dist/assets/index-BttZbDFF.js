import { importShared } from './__federation_fn_import-lyDSGtOx.js';
import Components, { j as jsxRuntimeExports } from './__federation_expose_Main-CUDPwJUL.js';
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", width: "100%", background: "green" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CozeNodeSdk,
    {
      propData: {
        config_botId: "7442276476630171688",
        ui_asstBtn_isNeed: "true",
        ui_chatBot_width: "80%",
        auth_token: "pat_nbz9Ek4HFkXwp0ZgQCV8U38QEIZ3uqqKlQcA3RIX88rZBbTBY3LW1eq5poiPTZoz"
      },
      propState: {},
      event: {
        onChatBotHide: (e) => {
          console.log(e, "hide===");
        },
        onChatBotShow: (e) => {
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
