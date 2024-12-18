import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Components from "./components/index";
const { CozeNodeSdk } = Components;
function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100%", width: "100%", backgroundColor: "#f5f8fa" }}>
        <CozeNodeSdk
          propData={{
            conversation_id: "",
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
            conversation_initContent: "👋 你好！我是一个智能助手，可以帮你解答问题、完成任务。让我们开始对话吧！",
          }}
          propState={{}}
          event={{
            conversations_create: (e: any) => {
              console.log(e, "show===");
            },
            onChatCreated: (e: any) => {
              console.log(e, "onChatCreated===");
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
