import HomePage from "./components/homePage/HomePage";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import "./App.css";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
