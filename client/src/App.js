import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import 'antd/dist/antd.css';
import AddCar from './pages/AddCar';
import Admin from './pages/Admin';
import EditCar from './pages/EditCar';
import Profile from './pages/Profile';
import About from './pages/About';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <div className="App">

      

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/booking/:carid' element={<BookingCar />} />
          <Route path='/mystuff' element={<Profile/>} />
          <Route path='/addcar' element={<AddCar/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/forgot' element={<ForgotPassword/>} />
          <Route path='/editcar/:carid' element={<EditCar/>} />
          <Route path='/verify/:userid' element={<Verify/>} />
          <Route path='/reset/:userid' element={<PasswordReset/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* export function ProtectedRoute(props){
  if(localStorage.getItem('user')){
    return <Route {...props}/>
  }
  else{
    return <redirect to='/login' />
  }
} */