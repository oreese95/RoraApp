import React, { useState } from "react";
import { message, Form, Input, Popover } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { userRegister } from "../redux/actions/userActions";
import ML from "../assests/rora mini.png";
import PasswordChecklist from "react-password-checklist";
import emailjs from "@emailjs/browser";
import "../login.css";
import globalVar from "../globalVar";

function Login() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const content = (
    <PasswordChecklist
      rules={["minLength", "specialChar", "number", "capital"]}
      minLength={8}
      value={password}
      onChange={(e) => setValid(e)}
    />
  );

  function onFinish(values) {
    console.log(values);
    dispatch(userLogin(values));
  }

  function onFinish2(values) {
    debugger;
    values.role = "user";
    values.verified = false;
    values.code = makeid(5);
    const username = values.name.split(" ");
    dispatch(userRegister(values));
    console.log(values);
    emailjs
      .send(
        globalVar.Gmail_SRV,
        globalVar.Registration,
        {
          to_name: username[0].charAt(0).toUpperCase() + username[0].slice(1),
          email: values.email,
          message: values.code,
        },
        globalVar.GMail_Key
      )
      .then(function (res) {
        console.log("Email Sent " + res.status);
      });
    window.location.href = `/verify/${values.code}`;
  }

  return (
    <div className="container">
      <br />
      <div className="row flex justify-content-center">
        <div className="col-md-12">
          <img id="logimg" src={ML} width="275" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 text-center align-self-center py-4">
          <h6 className="mb-0 pb-2">
            <span>Log In </span>
            <span>Register</span>
          </h6>
          <input
            className="checkbox"
            type="checkbox"
            id="reg-log"
            name="reg-log"
          />
          <label htmlFor="reg-log"></label>
          <div className="card-3d-wrap mx-auto">
            <div className="card-3d-wrapper">
              <div className="card-front">
                <div className="center-wrap">
                  <div className="section text-center">
                    <Form layout="vertical" onFinish={onFinish}>
                      <Form.Item
                        className="logTextColor"
                        style={{ color: "whitesmoke" }}
                        name="email"
                        label="Email"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="logTextColor"
                        name="password"
                        label="Password"
                        rules={[{ required: true }]}
                      >
                        <Input type="password" />
                      </Form.Item>
                      <Link to="/forgot" className="fpw">
                        Forgot Password?
                      </Link>
                      <br />
                      <button className="logbutton mt-3">Login</button>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <div className="center-wrap">
                  <div className="section text-center">
                    <Form layout="vertical" onFinish={onFinish2}>
                      <Form.Item
                        className="logTextColor"
                        name="name"
                        label="First &amp; Last Name"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="logTextColor"
                        name="email"
                        label="Email Address"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Popover
                        content={content}
                        trigger="click"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{zIndex: "1"}}
                      >
                        <Form.Item
                          className="logTextColor"
                          name="password"
                          label="Password"
                          rules={[{ required: true }]}
                        >
                          <Input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Item>
                      </Popover>
                      {valid ? (
                        <button className="logbutton">Register</button>
                      ) : (
                        ""
                      )}
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
