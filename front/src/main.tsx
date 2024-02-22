import { App as AntApp, ConfigProvider, ThemeConfig, theme } from "antd";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
const { defaultAlgorithm } = theme;

const config: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    colorPrimary: "#1677ff",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ConfigProvider theme={config}>
    <AntApp>
      <App />
    </AntApp>
  </ConfigProvider>
  // </React.StrictMode>
);
