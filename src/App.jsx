import HomePage from "./components/homePage/HomePage";
import { Provider } from "react-redux";
import store from "./store/store";

import "./App.css";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
}
