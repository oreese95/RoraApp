import { message } from 'antd';
import axios from 'axios';

export const getAllCars=()=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

    try{
        const response = await axios.get("/api/cars/getallcars")
        dispatch({type: 'GET_ALL_CARS', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    } catch (error){
        console.log(error.response.data)
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const addCar = (reqobj) => async dispatch =>{

    dispatch({type: 'LOADING' , payload:true})

    try{
        await axios.post("/api/cars/addcar" , reqobj)
        dispatch({type: 'LOADING' , payload:false})
        message.success('New car added successfully')
        setTimeout(()=>{
            window.location.href='/admin'
        }, 500);
    } catch (error){
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }   
}

export const editCar = (reqobj) => async dispatch =>{

    dispatch({type: 'LOADING' , payload:true})

    try{
        await axios.post("/api/cars/editcar" , reqobj)
        dispatch({type: 'LOADING' , payload:false})
        message.success('Car details updated successfully')
        setTimeout(()=>{
            window.location.href='/admin'
        }, 500);
    } catch (error){
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }   
}

export const deleteCar = (reqobj) => async dispatch =>{

    dispatch({type: 'LOADING' , payload:true})

    try{
        await axios.post("/api/cars/deletecar" , reqobj)
        dispatch({type: 'LOADING' , payload:false})
        message.success('Car deleted successfully')
        setTimeout(()=>{
            window.location.reload()
        }, 500);
    } catch (error){
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }   
}