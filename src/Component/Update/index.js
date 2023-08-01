import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./update.scss";
function Update({}) {
  const navigate = useNavigate();

  const location = useLocation();
  const itemDetail = location.state.itemDetail;
  console.log(itemDetail);
  const voltage =
    itemDetail && itemDetail.ParameterAccu
      ? itemDetail.ParameterAccu.map((accu) => accu.Voltage)
      : null;
  const resistor =
    itemDetail && itemDetail.ParameterAccu?.map((accu) => accu.Resistor);
  const time = itemDetail && itemDetail.ParameterAccu?.map((accu) => accu.Time);

  // const handleSave = () => {
  //   // find item by id
  //   const itemIndex = data.findIndex((item) => item.id === itemDetail.id);
  //   // update an item in array
  //   let cloneData = [...data];
  //   cloneData[itemIndex] = detail;
  //   // set new data to list
  //   setData(cloneData);
  //   navigate(`/chitiet/${itemDetail.id}`);
  // handleSave();
  // const token = localStorage.getItem("token");
  //   // const itemId = itemDetail.id; // Đặt itemId dựa vào ID của item bạn muốn cập nhật
  //   // axios
  //   //   .put(`http://localhost:3000/Generator/${itemId}`, inputForm, {
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`, // Thêm thông tin xác thực vào headers
  //   //     },
  //   //   })
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //     navigate(`/chitiet/${itemDetail.id}`, {
  //   //       state: {
  //   //         ...itemDetail,
  //   //         ParameterAccu: [
  //   //           {
  //   //             Voltage: inputForm.voltage,
  //   //             Resistor: inputForm.resistor,
  //   //             Time: inputForm.time,
  //   //           },
  //   //         ],
  //   //         Note: inputForm.note,
  //   //       },
  //   //     });
  //   //   });
  // };

  const handleSave = () => {
    console.log(inputForm);
    //todo: set inputForm to itemDetail
    itemDetail.ParameterAccu = [
      {
        Voltage: inputForm.voltage,
        Resistor: inputForm.resistor,
        Time: inputForm.time,
      },
    ];
    itemDetail.Note = inputForm.note;
    navigate(`/chitiet/${inputForm.id}`, {
      state: { updateItemDetail: itemDetail },
    });
  };

  const handleBack = () => {
    navigate(`/chitiet/${inputForm.id}`);
  };

  const [inputForm, setInputForm] = useState({
    id: itemDetail && itemDetail.id ? itemDetail.id : "6",
    voltage: voltage,
    resistor: resistor,
    time: time,
    note: itemDetail && itemDetail.Note ? itemDetail.Note : "",
  });
  const handleChange = (e) => {
    const name = e.target.name;

    setInputForm({
      ...inputForm,
      [name]: e.target.value,
    });
  };
  return (
    <div className="update-layout">
      <div className="update-layout-heading">Cập nhật thông tin</div>
      <div className="update-layout-form">
        <div className="update-item-parameter">
          <div className="update-item-parameter-title">Điện áp</div>
          <input
            name="voltage"
            className="update-item-parameter-input"
            value={inputForm.voltage}
            onChange={handleChange}
          />
        </div>
        <div className="update-item-parameter">
          <div className="update-item-parameter-title">Nội trở</div>
          <input
            className="update-item-parameter-input"
            name="resistor"
            value={inputForm.resistor}
            onChange={handleChange}
          />
        </div>
        <div className="update-item-parameter">
          <div className="update-item-parameter-title">Thời gian sử dụng</div>
          <input
            className="update-item-parameter-input"
            name="time"
            value={inputForm.time}
            onChange={handleChange}
          />
        </div>
        <div className="update-item-text-note">
          <div className="update-item-parameter-title">Ghi chú bảo trì</div>
          <input
            className="update-item-parameter-input-note"
            name="note"
            value={inputForm.note}
            onChange={handleChange}
          />
        </div>
        <div className="update-btn">
          <button className="btn-back" onClick={handleBack}>
            Back
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Update;
