import axios from "axios";
import { message } from "antd";
import moment from 'moment';

//let url = "http://localhost:4000";
let url = "https://api.rora-atx.com";
export const bookCar = (reqobj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  //console.log(reqobj);

  try {
    await axios.post(`${url}/api/bookings/bookcar`, reqobj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked Successfully");

    return true;
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went Wrong");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(`${url}/api/bookings/getallbookings`);
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
