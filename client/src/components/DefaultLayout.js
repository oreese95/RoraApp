import React from "react";
import ML from "../assests/roraMain.png";
import admin from "../assests/admin.png";
import profile from "../assests/user.png";
import home from "../assests/home.png";
import sw from "../assests/roraSW.png";
import MSG from "../assests/message.png";
import O from "../assests/O-Logo.png";
import G from "../assests/google.png";
import { Divider } from "antd";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  // const username = user?.name?.split(" ");
  const username = "Noor ul Hassan";
  return (
    <div>
      <div className="myNAV p-3 mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/">
            <img src={ML} width="250" className="navIMG" />
          </a>
          <div className="dropdown text-end">
            <a
              className="d-flex link-dark text-decoration-none dropdown-toggle show align-items-center"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <p>
                Let's Ride,{" "}
                {username[0]?.charAt(0)?.toUpperCase() + username[0]?.slice(1)}
              </p>
            </a>
            <ul
              className="dropdown-menu text-small"
              data-popper-placement="bottom-end"
            >
              <li className="d-inline-flex align-items-center">
                <img src={home} className="ps-2 menuIMG" />
                <a className="dropdown-item" href="/">
                  Home
                </a>
              </li>
              {user?.role === "system_admin" ? (
                <li className="d-inline-flex align-items-center">
                  <img src={admin} className="ps-2 menuIMG" />
                  <a className="dropdown-item" href="/admin">
                    Admin
                  </a>
                </li>
              ) : (
                ""
              )}
              {user ? (
                <li className="d-inline-flex align-items-center">
                  <img src={profile} className="ps-2 menuIMG" />
                  <a className="dropdown-item" href="/mystuff">
                    My Stuff
                  </a>
                </li>
              ) : (
                ""
              )}
              <li className="d-inline-flex align-items-center">
                <img src={sw} className="ps-2 menuIMG" />
                <a className="dropdown-item" href="/about">
                  About Us
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {user ? (
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="content">{props.children}</div>
      <div className="msg">
        <a href="sms:7373145981">
          <img src={MSG} className="" width="25" />
        </a>
      </div>
      <div className="footer">
        <Divider />
        <div className="d-flex justify-content-center">
          <p>
            &copy; 2023 Rora. Created by{" "}
            <a href="http://www.odisreese.com" target="_blank">
              <img src={O} width="30" />
            </a>
          </p>
        </div>
        <div className="pb-2">
          <a href="https://g.page/r/Ce_1qQZIHjdXEAI/review" target="_blank">
            <img src={G} width="35" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;

{
  /* <div>
        <div className='header bxs'>
            <div className='d-flex justify-content-between'>
                <img className="img-fluid" src={ML} width="300"/>
                <button>user</button>
            </div>
        </div>
        <div className='content'>
            {props.children}
        </div>
    </div> */
}
