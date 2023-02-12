import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, DatePicker } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import useCollapse from 'react-collapsed';
import moment from "moment";
import isBetween from "moment";

const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, settotalCars] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    settotalCars(cars);
  }, [cars]);

  const handleClick = () =>{
    setOpen(!open)
  }

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MM DD yyyy HH:mm");
    var temp = [];
    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
        console.log(temp);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
            console.log("here");
          } else {
            temp.push(car);
            console.log("here2" + " " + temp);
          }
        }
      }
    }
    console.log(temp);
    settotalCars(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            allowClear
            onChange={setFilter}
            showTime={{ format: "HH:mm" }}
            format="MM DD yyyy HH:mm"
          />
        </Col>
      </Row>

      {loading === true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bxs">
                <img className="carimg" src={car.image} />
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div>
                    <div>
                      <p>{car.name}</p>
                    </div>
                    <div>
                      <p>${car.rentPerDay} / Day</p>
                    </div>
                  </div>
                  <div>
                    <button className="btm1 mr-2">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
              
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
