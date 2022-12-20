import axios from "axios";
import { message } from 'antd';


export const userLogin = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/users/login', reqObj)
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch({ type: 'LOADING', payload: false })
        if (response.data.verified === true) {
            message.success('Login Successful')
            setTimeout(() => {
                window.location.href = '/'
            }, 500);
        }
        else{
            message.error('User not Verified'+ ' - ' +'Please check your email for verification link.')
        }
    } catch (error) {
        console.log(error)
        message.error('Something Went Wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const userRegister = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const response = await axios.post("/api/users/login2", reqObj)
        message.success('Registration Successful' + ' - ' + 'Verification Email Sent')
        /*         setTimeout(()=>{
                    window.location.href='/login'
                }, 500); */
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        message.error('Something Went Wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const getAllUsers = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get("/api/users/getallusers")
        dispatch({ type: 'GET_ALL_USERS', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const editUser = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post("/api/users/edituser", reqobj)
        dispatch({ type: 'LOADING', payload: false })
        message.success('User updated successfully')
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}
export const verifyUser = (reqobj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post("/api/users/edituser", reqobj)
        dispatch({ type: 'LOADING', payload: false })
        message.success('Verified successfully')
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const addUser = (reqobj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post("/api/users/adduser", reqobj)
        dispatch({ type: 'LOADING', payload: false })
        message.success('New user added successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const deleteUser = (reqobj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post("/api/users/deleteuser", reqobj)
        dispatch({ type: 'LOADING', payload: false })
        message.success('User deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}