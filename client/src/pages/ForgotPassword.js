import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions/userActions";
import { Form, Input, Divider } from "antd";
import ML from "../assests/rora mini.png";
import emailjs from "@emailjs/browser";
import globalVar from "../globalVar";
import { message } from "antd";

function ForgotPassword() {
  const { users } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  function onFinish(values) {
    console.log(values);
    users.map((user) => {
      if ((new RegExp(values.email, "i")).test(user.email)) {
        console.log(user);
        const username = user?.name?.split(" ");
        emailjs
          .send(
            globalVar.Gmail_SRV,
            globalVar.PW_Reset,
            {
              to_name:
                username[0]?.charAt(0)?.toUpperCase() + username[0]?.slice(1),
              email: user.email,
              message: user._id,
            },
            globalVar.GMail_Key
          )
          .then(function (res) {
            console.log("Email Sent " + res.status);
          });
        //window.location.href = "/login";
        message.success(
          "Password Reset Email Sent"
        );
      }
    });
  }

  return (
    <div className="container bxs p-3 mt-5">
      <img id="logimg" src={ML} width="200" />

      <Divider />
      <div>
        <h3>Forgot Password</h3>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <div className="fpEmail">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Registered Email"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="logbutton mt-2 mb-3">Submit</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
