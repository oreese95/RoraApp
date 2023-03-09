import axios from "axios";

// let url = "https://api.rora-atx.com";
let url = "http://localhost:4000";

export const stripeCheckout = (reqobj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  axios
    .post(`${url}/stripe-checkout`, {
      name: reqobj.name,
      images: reqobj.images,
      description: reqobj.description,
      unit_amount: reqobj.total,
      car_id: reqobj.car,
      customer_email: reqobj.email,
      obj: reqobj,
    })
    .then((res) => {
      console.log("done");
      window.location.href = res.data.url;
    })
    .catch((err) => console.log(err));
};
