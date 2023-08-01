import React from "react";
import icon_item from "../../../image/bat-removebg-preview 2.png";
import "./item.scss";

function Item({ name, area, handleDetail, itemData }) {
  return (
    <div
      className="item-layout"
      onClick={() => {
        handleDetail(); // Gọi hàm handleDetail từ component cha khi click vào component con
      }}
    >
      <img src={icon_item} className="item-layout-icon" />

      <div className="item-layout-info">
        <div className="item-layout-name">{name}</div>
        <div className="item-layout-area">{area}</div>
      </div>
    </div>
  );
}

export default Item;
