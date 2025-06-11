import React from "./yari/node_modules/react";
import ReactDOM from "./yari/node_modules/react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "./yari/node_modules/react-router-dom";
import { UserDataProvider } from "./yari/client/src/user-context";
import { UIProvider } from "./yari/client/src/ui-context";
import { Plus } from "./yari/client/src/plus";

import "./yari/client/src/app.scss";
import "./yari/client/src/document/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <UserDataProvider>
    <UIProvider>
      <Router>
        <Routes>
          <Route path="/:locale/plus/*" element={<Plus />} />
        </Routes>
      </Router>
    </UIProvider>
  </UserDataProvider>,
);
