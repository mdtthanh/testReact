import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Header";
import SideBar from "../Home/SideBar/sidebar";
import { Table } from "antd";
import "./detail.scss";

function DetailItem({ active, toggleSidebar }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { itemId } = useParams();
  const location = useLocation();
  // const updateItemDetail = location.state.updateItemDetail;
  const updateItemDetail = location.state && location.state.updateItemDetail;

  const itemDetail = updateItemDetail
    ? updateItemDetail
    : data.find((item) => item.id === parseInt(itemId));
  const handleUpdate = () => {
    navigate(`/capnhat/${itemId}`, { state: { itemDetail: itemDetail } });
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
        setData(res.data);
      });
  }, []);
  return (
    <div className="detail-layout">
      <Header toggleSidebar={toggleSidebar} />
      {itemDetail && (
        <div className="detail-layout-item">
          <div className="detail-layout-item-infor">
            <div className="detail-layout-item-infor-heading">
              {" "}
              Thông tin bình ACCU
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title">Mã bình </div>
              <div className="infor-main-value">{itemDetail.SKU} </div>
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title">Tên bình </div>
              <div className="infor-main-value">{itemDetail.ModelName} </div>
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title">Nhà sản xuất </div>
              <div className="infor-main-value">{itemDetail.Producer} </div>
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title">Xuất xứ </div>
              <div className="infor-main-value">{itemDetail.Origin} </div>
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title"> Chủng loại </div>
              <div className="infor-main-value">Ắc quy nước</div>
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title">Năm sử dụng </div>
              <div className="infor-main-value">{itemDetail.Time} </div>
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title"> Tuổi thọ</div>
              <div className="infor-main-value">
                {itemDetail.ParameterAccu.map((accu) => (
                  <div key={accu.Time}>{accu.Time}</div>
                ))}
              </div>
            </div>
            <div className="detail-layout-item-infor-main">
              <div className="infor-main-title">Kích thước </div>
              <div className="infor-main-value">{itemDetail.Size} </div>
            </div>
          </div>

          <div className="detail-layout-item-parameter">
            <div className="detail-layout-item-parameter-heading">
              {" "}
              Thông số và ngưỡng an toàn
            </div>
            <div className="detail-layout-item-parameter-list-item">
              <div className="detail-parameter-item">
                <div className="detail-parameter-item-heading">Điện áp </div>
                <div className="detail-parameter-item-vaule-parameter-accu">
                  {itemDetail.ParameterAccu.map((accu) => (
                    <div>{accu.Voltage} </div>
                  ))}{" "}
                </div>
                <div className="detail-parameter-item-vaule-safeThreshold-accu">
                  {itemDetail.SafeThreshold.map((accu) => (
                    <div>{accu.Voltage} </div>
                  ))}{" "}
                </div>
              </div>
              <div className="detail-parameter-item">
                <div className="detail-parameter-item-heading">Nội trở</div>
                <div className="detail-parameter-item-vaule-parameter-accu">
                  {itemDetail.ParameterAccu.map((accu) => (
                    <div>{accu.Resistor} </div>
                  ))}{" "}
                </div>
                <div className="detail-parameter-item-vaule-safeThreshold-accu">
                  {itemDetail.SafeThreshold.map((accu) => (
                    <div>{accu.Resistor} </div>
                  ))}{" "}
                </div>
              </div>
              <div className="detail-parameter-item">
                <div className="detail-parameter-item-heading">
                  Thời gian sử dụng
                </div>
                <div className="detail-parameter-item-vaule-parameter-accu">
                  {itemDetail.ParameterAccu.map((accu) => (
                    <div>{accu.Time} </div>
                  ))}{" "}
                </div>
                <div className="detail-parameter-item-vaule-safeThreshold-accu">
                  {itemDetail.SafeThreshold.map((accu) => (
                    <div>{accu.Time} </div>
                  ))}{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-layout-item-note">
            <div className="detail-layout-item-note-heading">
              Ghi chú bảo trì{" "}
            </div>
            <div className="detail-layout-item-note-value">
              {itemDetail.Note}
            </div>
            <div className="detail-item-note-update">
              <div
                className="detail-item-note-infor-update "
                onClick={() => handleUpdate(itemDetail)}
              >
                Cập nhật thông tin
              </div>
            </div>
          </div>
        </div>
      )}
      <SideBar active={active} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default DetailItem;
