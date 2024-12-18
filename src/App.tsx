import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Components from "./components/index";
const { CozeNodeSdk } = Components;
function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100%", width: "100%", backgroundColor: "yellow" }}>
        <CozeNodeSdk
          propData={{
            conversation_id: "7449651408540057609",
            ui_base_icon: "https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/FileBizType.BIZ_BOT_ICON/587591491004252_1732261275727297071.jpeg~tplv-a9rns2rl98-image-qvalue.jpeg?rk3s=bbd3e7ed&x-expires=1736762298&x-signature=0sl%2Fqu6kvjdhWO7aA9DTIC4ZCp8%3D",
            userInfo_nickname: "zachhahaha",
            userInfo_url: "https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/FileBizType.BIZ_BOT_ICON/587591491004252_1732261275727297071.jpeg~tplv-a9rns2rl98-image-qvalue.jpeg?rk3s=bbd3e7ed&x-expires=1736762298&x-signature=0sl%2Fqu6kvjdhWO7aA9DTIC4ZCp8%3D",
            config_botId: "7440005235935920164",
            auth_token: "pat_oue31YyvzrfVM55P1Jd2dK3IKDSuEat4zWvvzuAV9VBK8W147x9zD54qIXxHCrC5",
            ui_footer_expressionText: "AI生成 仅供参考",
            ui_input_placeholder: "请输入您的问题~",
            ui_base_title: "545",
            botInfo_nickname: "Coze智能体454",
            botInfo_url: "https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/FileBizType.BIZ_BOT_ICON/587591491004252_1732261275727297071.jpeg~tplv-a9rns2rl98-image-qvalue.jpeg?rk3s=bbd3e7ed&x-expires=1736762298&x-signature=0sl%2Fqu6kvjdhWO7aA9DTIC4ZCp8%3D",
          }}
          propState={{}}
          event={{
            conversations_create: (e: any) => {
              console.log(e, "show===");
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
