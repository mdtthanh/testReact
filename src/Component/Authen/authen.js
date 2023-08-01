import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import icon_logo from "../../image/logo-fpt.jpg";
import "./authen.scss";
import axios from "axios";

function Authen() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [account, setAccount] = React.useState({
    username: "",
    password: "",
  });

  const handleTranfer = () => {
    navigate("/home");
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:4001/login", {
        username: account.username,
        password: account.password,
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        handleTranfer();
      })
      .catch((error) => {
        console.log(error?.response?.data.message);
        setMessage(error?.response?.data.message);
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="login-form-layout">
        {message ? message : null}
        <div className="login-form-heading">
          <img src={icon_logo} className="icon-logo" />
          <div className="heading-authen-title"> Login | IDC-VH</div>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: false }}
        >
          <div className="login-form-lable">
            UserName <span style={{ color: "red" }}>*</span>
          </div>

          <Form.Item
            name="username"
            // label="UserName "
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) =>
                setAccount({
                  ...account,
                  username: e.target.value,
                })
              }
              className="login-form-input"
            />
          </Form.Item>
          <div className="login-form-lable">
            Password <span style={{ color: "red" }}>*</span>
          </div>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setAccount({
                  ...account,
                  password: e.target.value,
                })
              }
              className="login-form-input"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="login-form-remember">Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleLogin}
            >
              Login
            </Button>
            Or{" "}
            <a href="" className="login-form-register">
              register now!
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Authen;
