import React from "react"
import swal from "sweetalert";
import { logoutHandler } from "../../../../Redux/Actions";
import { connect } from "react-redux";
import Cookie from "universal-cookie";
import { Link } from "react-router-dom";

const cookieObj = new Cookie();

class AdminDashboard extends React.Component {

    onLogoutAdmin = () => {
        cookieObj.remove("authData", { path: "/login/admin"});
        this.props.onLogout();
        swal("Anda keluar");

      };


    render() {
        return (
            <div>
                <h1>ADMIN DASHBOARD</h1>
                <Link 
                    to="/login/admin">
                <input type="button" value="logout" onClick={this.onLogoutAdmin}/>
                </Link>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

const mapDispatcToProps = {
    onLogout: logoutHandler,
  };
  
export default connect(mapStateToProps, mapDispatcToProps)(AdminDashboard);

// export default AdminDashboard;