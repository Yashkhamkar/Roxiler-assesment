import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Transaction from "./transaction table/Transaction";
import Barchart from "./Barchart/Barchart";
import Stats from "./Stats/Stats";
import Piechart from "./Piechart/Piechart";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Transaction />} />
          <Route path="/barchart" element={<Barchart />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/piechart" element={<Piechart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
