import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Cookie from "universal-cookie";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { WaveTopBottomLoading  } from 'react-loadingg';
import Home from './Views/Screens/Home/Home'
import Navbar from './Views/Components/Navbar/Navbar'
import AuthScreen from './Views/Screens/Auth/AuthScreen'
import { connect } from "react-redux";
import { userKeepLogin, cookieChecker } from "./Redux/Actions";
import Shoes from './Views/Screens/Products/shoes/shoes';
import Kolam from './Views/Screens/Lapangan/kolam/kolam';
import LoginScreen from './Views/Screens/Auth/Login/LoginScreen';
import RegisterScreen from './Views/Screens/Auth/Register/RegisterScreen';
import LapanganVoli from './Views/Screens/Lapangan/LapanganVoli/LapanganVoli';
import LapanganDetails from './Views/Screens/Details/LapanganDetails/LapanganDetails';
import LapanganBasket from './Views/Screens/Lapangan/LapanganBasket/LapanganBasket';
import BookingDetails from './Views/Screens/BookingDetails/BookingDetails';
import BookingList from './Views/Screens/BookingList/BookingList';
import Export from './test';
import AdminLogin from './Views/Screens/Auth/AdminLogin/AdminLogin';
import AdminDashboard from './Views/Screens/Admin/AdminDashboard/AdminDashboard';
import ListUser from './Views/Screens/Admin/SuperAdmin/ListUser/ListUser';
import AddUser from './Views/Screens/Admin/SuperAdmin/TambahUser/AddUser';
import AddField from './Views/Screens/Admin/SuperAdmin/TambahField/AddField';
import LapanganFutsal from './Views/Screens/Lapangan/LapanganFutsal/LapanganFutsal';
import Checkout from './Views/Screens/Checkout/Checkout';
import History from './Views/Screens/History/History';
import AdminTask from './Views/Screens/Admin/AdminTask/AdminTask';
import ETicket from './Views/Screens/e-Ticket/eticket';
import UserProfile from './Views/Screens/User/UserProfile';




const cookieObj = new Cookie();

class App extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      let cookieResult = cookieObj.get("authData");
      if (cookieResult) {
        this.props.keepLogin(cookieResult);
      } else {
        this.props.cookieChecker();
      }
    }, 1000);
  }

 

  render() {
    if (this.props.user.cookieChecked) {
        if (this.props.user.role === "super_admin") {
          return (
            <>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login/" component={LoginScreen} />
                <Route exact path="/login/admin" component={AdminLogin} />
                <Route exact path="/admin/dashboard" component={AdminDashboard} />
                <Route exact path="/admin/list_user" component={ListUser} />
                <Route exact path="/admin/add_user" component={AddUser} />
                <Route exact path="/admin/add_field" component={AddField} />  
              </Switch>
              <div style={{ height: "120px" }} />
            </>
          )
        } else if (this.props.user.role === "admin") {
          return (
            <>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin/task" component={AdminTask} />
              <Route exact path="/login/admin" component={AdminLogin} />
              

            </Switch>
            <div style={{ height: "120px" }} />
          </>
          )
        } else if (this.props.user.role === "user") {
          return (
            <>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login/" component={LoginScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route exact path="/voli" component={LapanganVoli} />
              <Route exact path="/basket" component={LapanganBasket} />
              <Route exact path="/futsal" component={LapanganFutsal} />
              <Route exact path="/booking_details" component={BookingDetails} />
              <Route exact path="/booking_list" component={BookingList} />
              <Route exact path="/lapangan/:fieldId" component={LapanganDetails} />
              <Route exact path="/shoes" component={Shoes} />
              <Route exact path="/kolam" component={Kolam} />
              <Route exact path="/test" component={Export} />
              <Route exact path="/checkout/:idTrans" component={Checkout} />
              <Route exact path="/history" component={History} />
              <Route exact path="/e-ticket/:idTrans" component={ETicket} />
              <Route exact path="/profile/:userId" component={UserProfile} />
            </Switch>
            <div style={{ height: "120px" }} />
          </>
          )
        } else {
          return (
            <>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login/" component={LoginScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route exact path="/login/admin" component={AdminLogin} />
              <Route exact path="/test" component={Export} />
              <Route exact path="/lapangan/:fieldId" component={LapanganDetails} />
              <Route exact path="/voli" component={LapanganVoli} />
              <Route exact path="/basket" component={LapanganBasket} />
              <Route exact path="/futsal" component={LapanganFutsal} />
            </Switch>
            <div style={{ height: "120px" }} />
            </>
          )
        }
   } else {
      return (
          <div>
            <WaveTopBottomLoading />
            {/* loadingg..... */}
          </div>
      ) 
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

