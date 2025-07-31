import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserDataProvider } from "@mdn/yari/client/src/user-context";
import { UIProvider } from "@mdn/yari/client/src/ui-context";
import { Plus } from "@mdn/yari/client/src/plus";
import { GleanProvider } from "@mdn/yari/client/src/telemetry/glean-context";

import "@mdn/yari/client/src/app.scss";
import "@mdn/yari/client/src/document/index.scss";

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
