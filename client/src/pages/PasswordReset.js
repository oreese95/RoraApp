import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, getAllUsers } from "../redux/actions/userActions";
import { useParams } from "react-router-dom";
import { Form, Input, Divider } from "antd";
import ML from "../assests/rora mini.png";
import PasswordChecklist from "react-password-checklist";
import emailjs from "@emailjs/browser";
import globalVar from "../globalVar";

function PasswordReset() {
  const { userid } = useParams();
  const { users } = useSelector((state) => state.usersReducer);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [valid, setValid] = useState(false);
  var resetUser = {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  function onFinish(values) {
    users.map((user) => {
      if (user._id == userid) {
        console.log(user);
        resetUser = Object.assign(user);
        resetUser.password = values.password;
        dispatch(editUser(resetUser));
        console.log(resetUser);
        const username = resetUser?.name?.split(" ");
        emailjs
          .send(
            globalVar.Gmail_SRV,
            globalVar.PW_Reset_Confirm,
            {
              to_name:
                username[0].charAt(0).toUpperCase() + username[0].slice(1),
              email: resetUser.email,
            },
            globalVar.GMail_Key
          )
          .then(function (res) {
            console.log("Email Sent " + res.status);
          });
      }
      window.location.href = "/login";
    });
  }
  return (
    <div className="container-sm bxs p-3 mt-5">
      <img id="logimg" src={ML} width="200" />

      <Divider />
      <div>
        <h3>Reset Password</h3>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <div className="fpEmail">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="password"
              label="New Password"
              rules={[{ required: true }]}
            >
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password2"
              label="Confirm New Password"
              rules={[{ required: true }]}
            >
              <Input
                type="password"
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </Form.Item>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={passwordAgain}
              onChange={(e) => setValid(e)}
            />
            {valid ? (
              <button className="logbutton mt-2 mb-3">Submit</button>
            ) : (
              ""
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
