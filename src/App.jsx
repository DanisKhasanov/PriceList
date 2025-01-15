import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/notFoundPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store/store";
import "@/App.css";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={5}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}
