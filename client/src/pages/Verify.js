import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ML from '../assests/rora mini.png';
import { getAllUsers, verifyUser } from '../redux/actions/userActions';

function Verify() {
  const { userid } = useParams();
  const { users } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch()
  //const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  users.map((user) => {
    if (user.code === userid) {
      user.verified = true
      dispatch(verifyUser(user))
      console.log(user)
    }
  })
  return (
    <div className="bxs p-3 m-5">
      <img id="logimg" src={ML} width="250" />
      <h2>Verified</h2>
      <a href="/login"><button className='logbutton'>Login</button></a>
    </div>


  )
}

export default Verify