import { importShared } from './__federation_fn_import-lyDSGtOx.js';
import Components, { j as jsxRuntimeExports } from './__federation_expose_Main-BgEGt7EN.js';
import { r as reactDomExports } from './__federation_shared_react-dom-ChyTJqHm.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {BrowserRouter} = await importShared('react-router-dom');
const {
  //  CozeNodeSdk,
  CozeWebSdk
} = Components;
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", width: "100%", backgroundColor: "#f5f8fa" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CozeWebSdk,
    {
      propData: {
        config_botId: "7440005235935920164",
        auth_token: "pat_oue31YyvzrfVM55P1Jd2dK3IKDSuEat4zWvvzuAV9VBK8W147x9zD54qIXxHCrC5"
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
