import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Cookie from "universal-cookie";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import Home from './Views/Screens/Home/Home'
import Navbar from './Views/Components/Navbar/Navbar'
import AuthScreen from './Views/Screens/Auth/AuthScreen'
import { connect } from "react-redux";
import { userKeepLogin, cookieChecker } from "./Redux/Actions";
import ButtonUI from './Views/Components/Buttons/Buttons.tsx'
import Shoes from './Views/Screens/Products/shoes/shoes';
import Kolam from './Views/Screens/Lapangan/kolam/kolam';
import LoginScreen from './Views/Screens/Auth/Login/LoginScreen';
import RegisterScreen from './Views/Screens/Auth/Register/RegisterScreen';
import LapanganVoli from './Views/Screens/Lapangan/LapanganVoli/LapanganVoli';
import LapanganDetails from './Views/Screens/Details/LapanganDetails/LapanganDetails';
import LapanganBasket from './Views/Screens/Lapangan/LapanganBasket/LapanganBasket';
import BookingDetails from './Views/Screens/BookingDetails/BookingDetails';
import BookingList from './Views/Screens/BookingList/BookingList';

const cookieObj = new Cookie();

class App extends React.Component {

  componentDidMount() {
      let cookieResult = cookieObj.get("authData");
      if (cookieResult) {
        this.props.keepLogin(cookieResult);
      } else {
        this.props.cookieChecker();
      }
  }


  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route exact path="/login/" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/voli" component={LapanganVoli} />
            <Route exact path="/basket" component={LapanganBasket} />
            <Route exact path="/booking_details" component={BookingDetails} />
            <Route exact path="/booking_list" component={BookingList} />
            <Route exact path="/lapangan/:fieldId" component={LapanganDetails} />
            <Route exact path="/shoes" component={Shoes} />
            <Route exact path="/kolam" component={Kolam} />
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      )
    } else {
      return <div>Loading ...</div>
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

