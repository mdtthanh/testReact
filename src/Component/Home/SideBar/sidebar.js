import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../image/logo-fpt-tel.png";
import icon_home from "../../../image/home.png";
import icon_info from "../../../image/icon-info.png";
import icon_report from "../../../image/file-text.png";
import icon_bar from "../../../image/menu (2).png";

import logo_fpt from "../../../image/image 22.png";
import "./sidebar.scss";

function SideBar({ active, toggleSidebar }) {
  return (
    <div className={`sidebar ${active ? "active" : " "}`}>
      <div className="sidebar-heading">
        <img src={icon_bar} className="icon-bar" onClick={toggleSidebar} />
        <img src={logo_fpt} className="logo-fpt" />
      </div>
      <div className="sidebar-title">Công ty cổ phần viễn thông FPT</div>
      <ul className="sidebar-list-item">
        <li style={{ marginLeft: 8 }}>
          <Link to="/home"  className="sidebar-item">
            <img src={icon_home} className="icon-item" />
            <div className="sidebar-item-heading"> Trang chủ</div>
          </Link>
        </li>
        <li style={{ marginLeft: 8 }}>
          <Link to="/thongtin" className="sidebar-item">
            <img src={icon_info} className="icon-item" />
            <div className="sidebar-item-heading"> Thông tin</div>
          </Link>
        </li>
        <li style={{ marginLeft: 8 }}>
          <Link to="/report" className="sidebar-item">
            <img src={icon_report} className="icon-item" />
            <div className="sidebar-item-heading"> Báo Cáo</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
