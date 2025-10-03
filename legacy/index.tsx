import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserDataProvider } from "../vendor/yari/client/src/user-context";
import { UIProvider } from "../vendor/yari/client/src/ui-context";
import { Plus } from "../vendor/yari/client/src/plus";
import { GleanProvider } from "../vendor/yari/client/src/telemetry/glean-context";

import "../vendor/yari/client/src/app.scss";
import "../vendor/yari/client/src/document/index.scss";

import "./legacy.css";
import "../hooks/legacy-theme-controller.js";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <GleanProvider>
    <UserDataProvider>
      <UIProvider>
        <Router>
          <Routes>
            <Route path="/:locale/plus/*" element={<Plus />} />
          </Routes>
        </Router>
      </UIProvider>
    </UserDataProvider>
  </GleanProvider>,
);
