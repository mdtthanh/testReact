import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Authen from "./Component/Authen/authen";
import Home from "./Component/Home";
import Info from "./Component/Infor";
import DetailItem from "./Component/DetailItem";
import Update from "./Component/Update";
import data from "./db.json";

function App() {
  const [active, setActive] = useState(false);

  const toggleSidebar = () => {
    setActive(!active);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authen />} />
          <Route
            path="/home"
            element={<Home active={active} toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/thongtin"
            element={<Info active={active} toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/chitiet/:itemId"
            element={
              <DetailItem active={active} toggleSidebar={toggleSidebar} />
            }
          />

          <Route path="/capnhat/:itemId" element={<Update />} />
        </Routes>
      </BrowserRouter>

      {/* <Test/> */}
    </div>
  );
}

export default App;
