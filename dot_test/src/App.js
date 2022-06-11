// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./login.css";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RequireAuth from "./components/RequireAuth";
import OutletPage from "./views/OutletPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <OutletPage />
            </RequireAuth>
          }
        >
          <Route>
            <Route index path="" element={<HomePage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
