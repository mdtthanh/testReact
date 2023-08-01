import React from "react";
import icon_bar from "../../image/menu.png";
import logo from "../../image/image 22.png";
import icon_search from "../../image/search.png";
import "./header.scss";

function Header({ toggleSidebar, handleChange, searchItem }) {
  return (
    <div className="home-layout-header">
      <div className="home-layout-logo">
        <img src={icon_bar} className="icon-bar" onClick={toggleSidebar} />
        <img src={logo} className="logo" />
      </div>
      <div className="home-layout-heading">
        Hệ thống thông tin ACCU | IDC-VH
      </div>
      <div className="home-layout-search">
        <div className="home-layout-search-prefix">
          <img src={icon_search} />
          <input
            className="home-layout-search-input"
            onChange={handleChange}
            value={searchItem}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
