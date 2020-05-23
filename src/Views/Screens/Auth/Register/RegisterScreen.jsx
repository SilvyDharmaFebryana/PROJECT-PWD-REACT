import React from "react";
import TextField from "../../../Components/TextField/TextField";
import "./RegisterScreen.css";
import { FormGroup, Input } from "reactstrap";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { registerHandler, loginHandler } from "../../../../Redux/Actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class RegisterScreen extends React.Component {
  state = {
    registerForm: {
      username: "",
      fullName: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "female",
      phone: "",
      password: "",
      repPassword: "",
      address: "",
      role: "user",
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

  registerBtnHandler = () => {
    const {
      username,
      fullName,
      password,
      email,
      lastName,
      firstName,
      phone,
      gender,
      repPassword,
      address,
    } = this.state.registerForm;


    let userData = {
      username,
      fullname: firstName + " " + lastName,
      password,
      email,
      lastName,
      firstName,
      phone: 62 + phone,
      gender,
      repPassword,
      address,
    };

    this.props.onRegister(userData);
  };

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row mt-1">
          <div className="col-1"></div>
          <div className="col-10 container-register">
            <div
              className="mt-3"
              style={{ height: "50px", borderRadius: "8px" }}
            >
              <h4 className="text-center" style={{ color: "#336699" }}>
                REGISTER
              </h4>
            </div>
            <div
              className="bg-grey"
              style={{ height: "300px", borderTop: "2px solid #336699" }}
            >
              <div className="row mt-2">
                <div className="col-2">
                  <p className="mt-3 ml-2">First Name</p>
                  <p className="mt-4 ml-2">Last Name</p>
                  <p className="mt-4 ml-2">Username</p>
                  <p className="mt-5 ml-2">Gender</p>
                  <p className="mt-4 ml-2">Email</p>
                </div>
                <div className="col-4">
                  <TextField
                    placeholder="First Name"
                    className="mt-2"
                    value={this.state.registerForm.firstName}
                    onChange={(e) =>
                      this.inputHandler(e, "firstName", "registerForm")
                    }
                  />
                  <TextField
                    placeholder="Last Name"
                    className="mt-2"
                    value={this.state.registerForm.lastName}
                    onChange={(e) =>
                      this.inputHandler(e, "lastName", "registerForm")
                    }
                  />
                  <TextField
                    placeholder="Username"
                    className="mt-2"
                    value={this.state.registerForm.username}
                    onChange={(e) =>
                      this.inputHandler(e, "username", "registerForm")
                    }
                  />
                  <p className="small">
                    {this.props.user.errMsg ? (
                      <p className="small" style={{ color: "red" }}>
                        {this.props.user.errMsg}
                      </p>
                    ) : (
                      <p className="small">** must be unique</p>
                    )}
                  </p>
                  <div className="d-flex mt-3">
                    <select
                      value={this.state.registerForm.gender}
                      className="custom-text-input h-100 pl-3"
                      onChange={(e) =>
                        this.inputHandler(e, "deliveryCourier", "transaction")
                      }
                    >
                      <option
                        onClick={() =>
                          this.setState({
                            registerForm: {
                              ...this.state.registerForm,
                              gender: "female",
                            },
                          })
                        }
                        value="female"
                      >
                        Female
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            registerForm: {
                              ...this.state.registerForm,
                              gender: "male",
                            },
                          })
                        }
                        value="male"
                      >
                       Male
                      </option>
                    </select>
                  </div>
                  <TextField
                    placeholder="Email"
                    className="mt-2"
                    value={this.state.registerForm.email}
                    onChange={(e) =>
                      this.inputHandler(e, "email", "registerForm")
                    }
                  />
                </div>
                <div className="col-2">
                  <p className="mt-3">Phone Number</p>
                  <p className="mt-4">Password</p>
                  <p className="mt-5">Repeat Password</p>
                  <p className="mt-5">Address</p>
                </div>
                <div className="col-4">
                  <div className="d-flex">
                    <input
                      type="text"
                      className="input mt-2"
                      placeholder="+62"
                      value="+ 62"
                      disabled
                    />
                    <TextField
                      placeholder="Phone"
                      className="mt-2"
                      value={this.state.registerForm.phone}
                      onChange={(e) =>
                        this.inputHandler(e, "phone", "registerForm")
                      }
                    />
                  </div>
                  <TextField
                    placeholder="Password"
                    className="mt-2"
                    type={
                      this.state.registerForm.showPassword ? "text" : "password"
                    }
                    value={this.state.registerForm.password}
                    onChange={(e) =>
                      this.inputHandler(e, "password", "registerForm")
                    }
                  />
                  <p className="small">
                    {this.props.user.errMsg ? (
                      <p className="small" style={{ color: "red" }}>
                        ** password not match
                      </p>
                    ) : (
                      <p className="small">** remember your password</p>
                    )}
                  </p>
                  <TextField
                    placeholder="Repeat Password"
                    className="mt-2"
                    type={
                      this.state.registerForm.showPassword ? "text" : "password"
                    }
                    value={this.state.registerForm.repPassword}
                    onChange={(e) =>
                      this.inputHandler(e, "repPassword", "registerForm")
                    }
                  />
                  <p className="small mb-2">** repeat your password</p>
                  <textarea
                    classNam="mt-2"
                    name=""
                    id=""
                    cols="37.5"
                    rows="3"
                    style={{ border: "1px solid #336699" }}
                    value={this.state.registerForm.address}
                    onChange={(e) =>
                      this.inputHandler(e, "address", "registerForm")
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-grey" style={{ height: "100px" }}>
              <div className="mt-3 mr-1 d-flex flex-row-reverse">
                <input
                  onClick={this.registerBtnHandler}
                  className="button-register mt-4"
                  type="button"
                  value="Register"
                />
              </div>
            </div>
          </div>
          <div className="col-1"></div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
