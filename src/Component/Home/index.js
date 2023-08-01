import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar/sidebar";
import image_fpt from "../../image/image 23.png";
import icon_bar from "../../image/menu.png";
import logo from "../../image/image 22.png";
import icon_search from "../../image/search.png";
import Item from "./Item";
import "./home.scss";
// import data from "../../db.json";
import Header from "../Header";

export default function Home({ active, toggleSidebar }) {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [filter, setFilter] = useState([]);
  const [listDataFilter, setListDataFilter] = useState([]);
  const [apiData, setApiData] = useState([]);

  const handleDetail = (itemId) => {
    navigate(`/chitiet/${itemId}`); // Sử dụng navigate để chuyển hướng đến layout mới
  };

  const handleChange = (e) => {
    console.log(searchItem);
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4001/Generator", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, 10000);
        setApiData(res.data);
      });
  }, []);
  useEffect(() => {
    if (searchItem.length > 0) {
      const listDataNew = apiData.filter((itemData) => {
        return (
          (itemData.SKU &&
            itemData.SKU.toLowerCase().includes(searchItem.toLowerCase())) ||
          (itemData.Area &&
            itemData.Area.toLowerCase().includes(searchItem.toLowerCase()))
        );
      });
      setListDataFilter(listDataNew);
    } else {
      setListDataFilter(apiData);
    }
  }, [searchItem, apiData]);

  // useEffect(() => {
  //   if (searchItem.length > 0) {
  //     const listDataNew = apiData.filter((itemData) => {
  //       return (
  //         itemData.SKU.toLowerCase().includes(searchItem.toLowerCase()) ||
  //         itemData.Area.toLowerCase().includes(searchItem.toLowerCase())
  //       );
  //     });
  //     setListDataFilter(listDataNew);
  //   } else {
  //     setListDataFilter(apiData);
  //   }
  // }, [searchItem, apiData]);

  return (
    <div className="home-layout">
      <Header
        toggleSidebar={toggleSidebar}
        handleChange={handleChange}
        searchItem={searchItem}
      />

      <div className="home-layout-list-item">
        {listDataFilter.map((dataItem, index) => (
          <Item
            name={dataItem.SKU}
            area={dataItem.Area}
            itemData={dataItem}
            handleDetail={() => handleDetail(dataItem.id)} // Truyền hàm handleDetail xuống component con Item
          />
        ))}
      </div>

      <SideBar active={active} toggleSidebar={toggleSidebar} />
    </div>
  );
}
