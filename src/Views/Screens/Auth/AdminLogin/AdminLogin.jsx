import React from "react"
import "./AdminLogin.css"
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { connect } from "react-redux";
import { loginHandler } from "../../../../Redux/Actions";

class AdminLogin extends React.Component {

    state = {
        loginAdmin: {
            username: "",
            password: "",
            showPassword: false,
          },

    }

    componentDidUpdate() {
        if (this.props.user.id) {
          swal(
            "Success!",
            `Berhasil masuk sebagai ${this.props.user.username}`,
            "success"
          );
          const cookie = new Cookies();
          cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
        }
      }
    
      inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
          [form]: {
            ...this.state[form],
            [field]: value,
          },
        });
      };
    
      loginBtnHandler = () => {
        const { username, password } = this.state.loginAdmin;
        let newUser = {
          username,
          password,
        };
    
        this.props.onAdminLogin(newUser);
      };
    
      checkboxHandler = (e, form) => {
        const { checked } = e.target;
    
        this.setState({
          [form]: {
            ...this.state[form],
            showPassword: checked,
          },
        });
      };


    render() {
        if (this.props.user.id > 0) {
            return <Redirect to="/" />;
          }
        return (
            // <div style={{ width:"100%", backgroundColor: "#b3cce6"}}>
                <div className="big-container">
                <div className="row">
                    <div className="col-md-4">col.1</div>
                    <div className="col-md-4" >
                        <div className="admin-login text-center">
                            <h5 className="p-3 text-center" style={{ backgroundColor: "#c4d8ed", borderRadius: "10px 10px 0 0 ", color: "#2a5889"}}>Admin Login</h5>   
                            <div>
                                <input 
                                    className="text-input mt-4" 
                                    type="text" 
                                    placeholder="username"
                                    value={this.state.loginAdmin.username}
                                    onChange={(e) =>this.inputHandler(e, "username", "loginAdmin")}
                                />
                                <input 
                                    className="text-input mt-2" 
                                    type="password" 
                                    placeholder="password"
                                    value={this.state.loginAdmin.password}
                                    onChange={(e) =>this.inputHandler(e, "password", "loginAdmin")}
                                />
                            </div>
                            <div>
                            <input className="button-login mt-4" type="button" value="login" onClick={this.loginBtnHandler}/>
                            </div>
                            
                        </div>

                    </div>
                    <div className="col-md-4">col.3</div>
                </div>
            </div>
            // </div>
            
        )
    }
}


const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  
const mapDispatchToProps = {
    onAdminLogin: loginHandler,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
