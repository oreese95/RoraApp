import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import "antd/dist/antd.css";
import AddCar from "./pages/AddCar";
import Admin from "./pages/Admin";
import EditCar from "./pages/EditCar";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import SuccessBooking from "./pages/Success";
import {
  ProtectedAuthRoute,
  ProtectedRoute,
} from "./routes/protectedAuthRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              //<ProtectedRoute>
                <Home />
             //</ProtectedRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <ProtectedAuthRoute>
                <Login />
              </ProtectedAuthRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <ProtectedAuthRoute>
                <Register />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="/booking/:carid"
            element={
              <ProtectedRoute>
                <BookingCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mystuff"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcar"
            element={
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route
            path="/editcar/:carid"
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify/:userid"
            element={
              // <ProtectedRoute>
              <Verify />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/success/:sessionid"
            element={
              // <ProtectedRoute>
              <SuccessBooking />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/reset/:userid"
            element={
              // <ProtectedRoute>
                <PasswordReset />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// export function ProtectedRoute(props) {
//   if (localStorage.getItem("user")) {
//     return <Route {...props} />;
//   } else {
//     return <redirect to="/login" />;
//   }
// }
