import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector , useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import {useParams} from 'react-router-dom';
import { DatePicker, Checkbox, Divider, message, Carousel } from 'antd';
import Spinner from '../components/Spinner';
import arrow from '../assests/left-arrow.png';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';
import { bookCar } from '../redux/actions/bookingActions';
import gas from '../assests/gas-can.png';
import seat from '../assests/car-seat.png';
import elec from '../assests/car.png';
import emailjs from '@emailjs/browser';
import globalVar from '../globalVar';
import { stripeCheckout } from '../redux/actions/stripeActions';     
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';



const {RangePicker} = DatePicker

function Bookingcar({ match }) {
    const { carid } = useParams();
    const {cars} = useSelector(state=>state.carsReducer);
    const {loading} = useSelector(state=>state.alertsReducer);
    const today = new Date();
    const dispatch = useDispatch();
    const [car, setcar]= useState([]);
    const [from, setfrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, settotalHours] = useState(0);
    const [totalDays, settotalDays] = useState(0);
    const [delivery, setDelivery] = useState(false);
    const [subTotal, setsubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [mileage, setTotalMileage] = useState(0);
    const [address, setAddress] = useState("5000 North Mays Street, Round Rock, Texas, USA");
    const [preGas, setPregas] = useState(false);
    const [preElec, setPreElec] = useState(false);
    const [validDate, setvalidDate] = useState(false);
    const [toll, setToll] = useState(false);
    const [taxes, setTax] = useState(0);
    const [airport, setAirport] = useState(false);
    const [clean, setClean] = useState(false);
    const [value, setValue] = useState([new Date(), new Date()]);

    useEffect(() => {
        
        if(cars.length==0){
            dispatch(getAllCars());
        }
        else{
            setcar(cars.find(o=>o._id===carid))
        }
    }, [cars])

    useEffect(() => {
        setsubTotal((totalDays * car.rentPerDay) + car.deposit);
        if(delivery){
            setsubTotal(subTotal + 40);
        }
    }, [delivery, totalDays])

    useEffect(()=>{
        setTax(salesTaxRate * subTotal);
    }, [taxes, subTotal])
    
    useEffect(()=>{
        setTotalMileage(car.miles * totalDays);
    }, [mileage, totalDays])

    const handleSelect = async(value) =>{
        if(delivery){
            setAddress(value);
        }
    }

    useEffect(()=>{
        setTotal(subTotal + taxes);
    }, [total, taxes])

    function selectTimeSlots(values){
        setfrom(moment(values[0]).format("MM DD yyyy HH:mm"));
        setTo(moment(values[1]).format("MM DD yyyy HH:mm"));

        settotalHours(values[1].diff(values[0], 'hours'))
        
        if((values[1].diff(values[0], 'hours')) < 24 ){
            settotalDays('1');
        } 
        else{
            settotalDays(values[1].diff(values[0], 'days'))
        }

        setvalidDate(true);
    }

    function validDates(values){
        if(values == null){
            document.getElementsByClassName("btm1").style.visibility = "hidden";
            message.error(
                "Please enter valid dates."
            )
        }
    }
    //console.log(JSON.parse(localStorage.getItem('user')));

    const pay = () => {
        const loggedIN = JSON.parse(localStorage.getItem('user'));
        const reqobj = {
            user : JSON.parse(localStorage.getItem('user'))._id,
            user_name : JSON.parse(localStorage.getItem('user')).name,
            email : loggedIN.email,
            name: car.name,
            car : car._id,
            totalDays,
            subTotal,
            total: Math.ceil(total * 100) / 100,
            unit_amount: total,
            mileage,
            deliveryRequired : delivery,
            bookedTimeSlots : {
                from,
                to
            },
            location : address,
            extras :{
                fuel : preGas,
                charge : preElec,
                toll : toll,
                clean : clean
            },
            images: car.images[0].url,
            description: moment(from).format('dddd, MMM Do yyyy, h:mm a') + ' - ' + moment(to).format('dddd, MMM Do yyyy, h:mm a')
        }
        //console.log(reqobj)
        dispatch(stripeCheckout(reqobj));
      };

    const salesTaxRate = 8.25 / 100;

    return (
        <DefaultLayout>
            {loading === true && (<Spinner/>)}

            <div className='row m-1' >
                <div className='col-md-12 d-flex justify-content-start'>
                    <a href='/'><img src={arrow} width='15'/></a>
                </div>
            </div>

            <div className='container'>
            <div className='row'>
                <div className='bookImage col-md-6 p-2 block'>
                    <Carousel>
                        {car.images?.map((image) => {
                            return(
                                <div>
                            <img src={image.url} className="carimg2 d-block"/> 
                        </div>
                            )
                        })}
                    </Carousel>
                </div>
                <div className='col-md-6'>
                    <div>
                        <h4>{car.name}</h4>
                    </div>
                    <div>
                        <p>Features</p>
                        <div className='featBorder'>
                            <div className="d-inline-flex">
                            <div className='d-flex flex-column align-items-center pe-5'>
                                <img src={seat} width="30"/>
                                <p>{car.capacity}</p>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                {car.fuelType === 'Electric' ? <img src={elec} width="30"/> : <img src={gas} width="30"/>}
                                <p>{car.fuelType}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Trip Date</p>
                        <div className='featBorder p-3'>
                        <RangePicker popupStyle={{
                            width: "auto"
                        }} allowClear use12Hours showTime format="MM DD yyyy hh:mm" placement={'topLeft'} onChange={selectTimeSlots} onCalendarChange={validDates}>

                        </RangePicker>
                        </div>
                    </div>
                    <div>
                        <p>Pickup & Return</p>
                        <div className='featBorder'>
                        <Checkbox checked={delivery} onChange={(e)=>{
                            if(e.target.checked){
                                setDelivery(true);
                            }
                            else{
                                setDelivery(false);
                                setAddress("5000 North Mays Street, Round Rock, Texas, USA");
                            }
                        }}>Delivery</Checkbox>
                        {delivery ? <>
                        <Checkbox checked={airport} onChange={(e)=>{
                            if(e.target.checked){
                                setAirport(true);
                                setAddress("Austin-Bergstrom International Airport (AUS), Presidential Boulevard, Austin, TX, USA");
                            }
                            else{
                                setAirport(false);
                            }
                        }}>Austin Bergstrom Airport</Checkbox>
                        {!airport ? <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>{({ getInputProps, suggestions, getSuggestionItemProps, loading })=>(
                            <div>
                                <input className='LocateInput' {...getInputProps({placeholder: "Enter Address..."})} style={{width: "350px"}}/>
                                <div>
                                    {suggestions.map((suggestion)=>{
                                        const style = {
                                            backgroundColor: suggestion.active ? "#1e90ff" : "#ffffff"
                                        }
                                        return( <div {...getSuggestionItemProps(suggestion, {style})}>
                                            {suggestion.description}</div>);
                                    })}
                                </div>
                            </div>
                        )}</PlacesAutocomplete> : ""}</> : "" }
                        </div> 
                    </div>
                    <div>
                        <p>Extras</p>
                        <div className="featBorder d-flex flex-column align-items-center">
                            <div>
                        {car.fuelType !== 'Electric' ?
                        <Checkbox onChange={(e)=>{
                            setPreElec(false);
                            if(e.target.checked){
                                setPregas(true);
                                setsubTotal(subTotal + 40);
                            }
                            else{
                                setPregas(false);
                                setsubTotal(subTotal - 40);
                            }
                        }}>Prepaid Fuel</Checkbox> : <Checkbox onChange={(e)=>{
                            setPregas(false);
                            if(e.target.checked){
                                setPreElec(true);
                                setsubTotal(subTotal + 25);
                            }
                            else{
                                setPreElec(false);
                                setsubTotal(subTotal - 25);
                            }
                        }}>Prepaid Electric Charge</Checkbox>}
                        </div>
                        <div>
                        <Checkbox onChange={(e)=>{
                            if(e.target.checked){
                                setToll(true);
                                setsubTotal(subTotal + 20);
                            }
                            else{
                                setToll(false);
                                setsubTotal(subTotal - 20);
                            }
                        }}>Unlimited Toll Access</Checkbox>
                        </div>
                        <div>
                        <Checkbox onChange={(e)=>{
                            if(e.target.checked){
                                setClean(true);
                                setsubTotal(subTotal + 15);
                            }
                            else{
                                setClean(false);
                                setsubTotal(subTotal - 15);
                            }
                        }}>Prepaid Post-Trip Cleaning</Checkbox>
                        </div>
                    </div>
                    <hr/>
                    {from && to && (<div>
                        <p className='text-end'><b>Pick Up Address:</b> {address}</p>
                        <p className='text-end'><b>Trip Mileage:</b> {mileage}</p>
                        <p className='text-end'><b>Daily Rate</b> - $ {Math.ceil(car.rentPerDay * 100) / 100} x {totalDays} Days</p>
                        <p className='text-end'><b>Car Deposit</b> (Refunded After Trip - Subject to Incidental Charges) - $ {Math.ceil(car.deposit * 100) / 100}</p>
                        {delivery ? <p className='text-end'><b>Delivery</b> - $ {'40.00'}</p> : ""}
                        {preGas ? <p className='text-end'><b>Prepaid Fuel</b> - $ {'40.00'}</p> : ""}
                        {preElec ? <p className='text-end'><b>Prepaid Charging</b> - $ {'25.00'}</p> : ""}
                        {toll ? <p className='text-end'><b>Unlimited Toll Access</b> - $ {'15.00'}</p> : ""}
                        {clean ? <p className='text-end'><b>Post-Trip Cleaning</b> - $ {'20.00'}</p> : ""}
                        <p className='text-end'><b>Subtotal</b> - $ {subTotal.toFixed(2)}</p>
                        <p className='text-end'><b>Taxes</b> - $ {(Math.round(taxes * 100) / 100).toFixed(2)}</p>
                        <Divider/>
                        <p className='text-end'><b>Total</b> - $ {total.toFixed(2)}</p>
                        <div className='d-flex justify-content-end'>
                            <button className='btm1' onClick={pay}>Book Now</button>
                        </div> 
                    </div>)}
                    </div>
                </div>
            </div>
            </div>
        </DefaultLayout>
    )
}

export default Bookingcar