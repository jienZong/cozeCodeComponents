import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Components from "./components/index";
const { CozeNodeSdk } = Components;
function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100%", width: "100%", background: "green" }}>
        {/* <CozeWebSdk
          propData={{
            config_botId: "7442276476630171688",
            ui_asstBtn_isNeed: "true",
            ui_chatBot_width: "80%",
          }}
          propState={{}}
          event={{
            onChatBotHide: () => {
              console.log(11);
            },
            onChatBotShow: () => {
              console.log(22);
            },
          }}
        /> */}
        <CozeNodeSdk
          propData={{
            config_botId: "7447056451342417983",
            // ui_asstBtn_isNeed: "true",
            ui_chatBot_width: "80%",
            auth_token: "pat_nbz9Ek4HFkXwp0ZgQCV8U38QEIZ3uqqKlQcA3RIX88rZBbTBY3LW1eq5poiPTZoz",
          }}
          propState={{}}
          event={{
            onChatBotHide: (e:any) => {
              console.log(e,"hide===");
            },
            onChatBotShow: (e:any) => {
              console.log(e,"show===");
            },
          }}
        />

        {/* <Coze
          event={{}}
          propData={{
            authorization:
              "Bearer pat_nbz9Ek4HFkXwp0ZgQCV8U38QEIZ3uqqKlQcA3RIX88rZBbTBY3LW1eq5poiPTZoz",
            bot_id: "7447056451342417983",
            user_avatar_url:
              "https://campus-weweknow-com.oss-cn-shanghai.aliyuncs.com/file/2024-10-11/mmexport1728575006561.jpg",
            user_id: "123456",
            user_nickname: "繁星",
            bot_avatar_url: "",
            bot_nickname: "loyal",
            conversation_id: "",
            conversation_content: "",
            limit: 10,
          }}
          propState={{}}
        /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
