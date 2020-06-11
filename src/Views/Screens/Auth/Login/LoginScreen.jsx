import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./LoginScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faKey } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { Link } from "react-router-dom";


// actions
import { registerHandler, loginHandler } from "../../../../Redux/Actions";

class LoginScreen extends React.Component {
  state = {
    loginFocused: false,
    passwordFocused: false,
    loginForm: {
      username: "",
      password: "",
      showPassword: false,
    },
  };

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
    const { username, password } = this.state.loginForm;
    let newUser = {
      username,
      password,
    };

    this.props.onLogin(newUser);
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

  onFocusUsername = () => {
    this.setState({ loginFocused: true });
  };

  onBlurUsername = () => {
    this.setState({ loginFocused: false });
  };

  onFocusPassword = () => {
    this.setState({ passwordFocused: true });
  };

  onBlurPassword = () => {
    this.setState({ passwordFocused: false });
  };

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row mt-1">
          <div className="col-md-4"></div>
          <div className="col-md-4 container-login">
            <div
              className="mt-3"
              style={{ height: "70px", borderRadius: "8px" }}
            >
              <h4 className="p-2 text-center" style={{ color: "#336699" }}>
                LOGIN
              </h4>
            </div>
            <div
              className="bg-grey"
              style={{ height: "300px", borderTop: "2px solid #336699" }}
            >
              <div
                className="bg-grey"
                style={{ height: "20px", borderTop: "2px solid #336699" }}
              >
                {this.props.user.errMsg ? (
                  <div className="alert alert-danger">
                    {this.props.user.errMsg}
                  </div>
                ) : null}
              </div>
              <div>
                <FontAwesomeIcon
                  className="mt-5 ml-3"
                  icon={faUserAlt}
                  style={{ fontSize: 25, color: "#336699" }}
                />
                <input
                  value={this.state.loginForm.username}
                  onChange={(e) =>
                    this.inputHandler(e, "username", "loginForm")
                  }
                  onFocus={this.onFocusUsername}
                  onBlur={this.onBlurUsername}
                  className={`text-input ${
                    this.state.loginFocused ? "active" : null
                  } mt-4 ml-3`}
                  type="text"
                  placeholder="username"
                />
              </div>
              <div>
                <FontAwesomeIcon
                  className="mt-3 ml-3"
                  icon={faKey}
                  style={{ fontSize: 25, color: "#336699" }}
                />
                <input
                  value={this.state.loginForm.password}
                  onChange={(e) =>
                    this.inputHandler(e, "password", "loginForm")
                  }
                  onFocus={this.onFocusPassword}
                  onBlur={this.onBlurPassword}
                  className={`text-input ${
                    this.state.passwordFocused ? "active" : null
                  } mt-3 ml-3`}
                  type={this.state.loginForm.showPassword ? "text" : "password"}
                  placeholder="password"
                />
              </div>
              <div className="d-flex justify-content-end">
                <input
                  type="checkbox"
                  className="mt-2"
                  name="showPasswordLogin"
                  onChange={(e) => this.checkboxHandler(e, "loginForm")}
                />
                <p className="small mt-2 mr-4 ml-1">show password</p>
              </div>
              <div className="text-center">
                <input
                  onClick={this.loginBtnHandler}
                  className="button-login mt-4"
                  type="button"
                  value="Login"
                />
              </div>
            </div>
            <div className="bg-grey text-center">
              <div className="mt-1">Don’t have an account?</div>
              <div className="mt-2 font-weight-bolder sign-up">
                  <Link to="/register" style={{ textDecoration: "none", color:"inherit" }}>
                  SIGN UP NOW 
                  </Link>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-4" style={{border: "1px solid black"}}></div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onRegister: registerHandler,
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
