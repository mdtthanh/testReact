import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnType } from "antd/es/table";
import Header from "../Header";
import SideBar from "../Home/SideBar/sidebar";
import data from "../../../src/db.json";
import "./info.scss";
interface DataType {
  key: React.Key;
  code: string;
  name: string;
  area: string;
  time: string;
  longevity: string;
}

function Info({ active, toggleSidebar }) {
  const [searchItem, setSearchItem] = useState("");
  const [listDataFilter, setListDataFilter] = useState([]);
  const handleChange = (e) => {
    console.log(searchItem);
    setSearchItem(e.target.value);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã bình",
      width: 100,
      dataIndex: "code",
      fixed: "left",
      align: "center",
    },
    {
      title: "Tên bình",
      width: 300,
      dataIndex: "name",
      align: "left",
      align: "center",
    },
    {
      title: "Khu vực",
      dataIndex: "area",
      // width: 30,
      align: "center",
    },
    {
      title: "Năm sử dụng",
      dataIndex: "time",
      // width: 30,
      align: "center",
    },
    {
      title: "Tuổi thọ",
      dataIndex: "longevity",
      // width: 20,
      align: "center",
    },
  ];

  const transformedData = listDataFilter.map((dataItem) => {
    return {
      key: dataItem.id,
      code: dataItem.SKU,
      name: dataItem.ModelName,
      area: dataItem.Area,
      time: dataItem.Time,
      longevity: dataItem.ParameterAccu.map((accu) => accu.Time),
    };
  });
  useEffect(() => {
    if (searchItem.length > 0) {
      const listDataNew = data.filter((itemData) => {
        return (
          itemData.SKU.toLowerCase().includes(searchItem.toLowerCase()) ||
          itemData.Area.toLowerCase().includes(searchItem.toLowerCase())
        );
      });
      setListDataFilter(listDataNew);
    } else {
      setListDataFilter(data);
    }
  }, [searchItem, data]);
  return (
    <div className="info-layout">
      <Header
        toggleSidebar={toggleSidebar}
        handleChange={handleChange}
        searchItem={searchItem}
      />
      <div className="info-layout-content">
        <Table
          columns={columns}
          dataSource={transformedData}
          scroll={{ x: 1000, y: "100vh" }}
        />
      </div>
      <SideBar active={active} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Info;
