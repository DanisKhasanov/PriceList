import  RcMenu  from "./components/menu/RcMenu";
import DataTable from "./components/table/Table";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="layout">
        <div className="sidebar">
          <RcMenu />
        </div>
        <div className="content">
          <DataTable />
        </div>
      </div>
    </div>
  );
}