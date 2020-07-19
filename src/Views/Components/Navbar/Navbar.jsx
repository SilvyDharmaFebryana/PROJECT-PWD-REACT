import React from "react";
import "./Navbar.css";
import ButtonUI from "../Buttons/Buttons";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import { logoutHandler } from "../../../Redux/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMapMarker,
  faSignOutAlt,
  faUserAlt,
  faListAlt,
  faSignInAlt,
  faSign,
  faBell,
} from "@fortawesome/free-solid-svg-icons/";
import { } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import logo from "../../../Assets/Images/Untitled.png";
import noImage from "../../../Assets/Images/user/user.png"

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    modalOpen: false,
    dropdownOpen: false,
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  };

  toggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen });

  onLogout = () => {
    this.props.logoutHandler();
    swal("Anda keluar");
  };

  sigInLogIn = () => {
    if (this.props.user.id) {
      return (
        <div className="d-flex flex-row justify-content-end mt-2">
          <div className="d-flex mt-2">
            <Dropdown
              toggle={this.toggleDropdown}
              isOpen={this.state.dropdownOpen}
            >
              <DropdownMenu className="mt-2">
                {
                  this.props.user.role === "user" ? (
                    <>
                      <DropdownItem> 
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to={`/profile/${this.props.user.id}`}
                        >
                          Profile
                        </Link></DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/booking_list"
                        >
                          Booking List
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/history"
                        >
                          History
                        </Link>
                      </DropdownItem>
                    </>
                  ) : null
                }

                <DropdownItem divider />
                <DropdownItem>
                </DropdownItem>
              </DropdownMenu>
              <DropdownToggle tag="nav" className="d-flex">
                <CircleBg>
                  <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                    {
                      this.props.user.profileImage == null ? (
                        <img
                          className="circle-bg"
                          src={noImage}
                          />
                      ) : (
                          <img
                            className="circle-bg"
                            src={this.props.user.profileImage}
                          />
                        )
                    }
                  </small>
                </CircleBg>
                
                <h6 className="mt-1 ml-2 text-navbar">
                  {this.props.user.username}
                </h6>
              </DropdownToggle>
            </Dropdown>
          </div> 
          {
            this.props.user.role === "user" ? (
              <div className="d-flex mt-2 ml-4">
                <DropdownToggle tag="nav" className="d-flex">
                  <Link
                    className="d-flex"
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/notif"
                  >
                  <FontAwesomeIcon
                    className="mt-2"
                    icon={faBell}
                    style={{ fontSize: 18, color: "#003cb3" }}
                  />  <p style={{ fontSize: "13px", fontWeight: "bold" }}>{this.props.user.jumlahNotif}</p>
                  </Link>
                </DropdownToggle>
              </div>
            ) : null
          }
          <div className="d-flex mt-2 ml-4">
            <DropdownToggle tag="nav" className="d-flex">
              <h6 className="mt-1">|</h6>
            </DropdownToggle>
          </div>
          <div className="d-flex mt-2 ml-4">
            <DropdownToggle tag="nav" className="d-flex">
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={this.onLogout}
              >
                <FontAwesomeIcon
                  className="mt-2"
                  icon={faSignOutAlt}
                  style={{ fontSize: 20 , color: "#003cb3" }}
                />
              </Link>
            </DropdownToggle>
          </div>
        </div>
      );
    } else {
      return (
        <div className="d-flex flex-row justify-content-start mt-2">
          <div className="d-flex mt-2">
            <h6 className="mt-1 mr-2 text-navbar">Welcome!</h6>
          </div>
          <div className="d-flex mt-2">
            <h6 className="mt-1 ml-2 mr-2">|</h6>
          </div>
          <div className="d-flex mt-2 ml-2">
            <Link
              className="d-flex"
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <p className="font-weight-bolder medium mt-1 ml-2 mr-2 text-navbar">

              </p>
              <FontAwesomeIcon
                className="mt-1"
                icon={faSignInAlt}
                style={{ fontSize: 25, color: "#003cb3" }}
              />

            </Link>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="d-flex flex-row justify-content-around navbar-container ">
        <div className="col-md-2">
          <h6>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                className="mt-2"
                style={{ width: "120%" }}
                src={logo}
                alt=""
              />
            </Link>
          </h6>
        </div>
        <div className="col-sm-7 d-flex d-flex justify-content-center align-items-center">
          {
            this.props.user.role === "admin" || this.props.user.role == "super_admin" ? (
              null
            ) : (
              <>
              <h6>
                <Link
                  className="mr-3 text-navbar"
                  color="danger"
                  // onClick={this.toggle}
                  style={{ textDecoration: "none" }}
                >
                  Find Us
                </Link>
              </h6>
              <h6>|</h6>
              <h6>
                <UncontrolledDropdown>
                  <DropdownToggle nav className="text-navbar">
                    Rent
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link
                        to="/voli"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Lapangan Voli
                  </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        to="/basket"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Lapangan Basket
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                    <Link
                        to="/futsal"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Lapangan Futsal
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        to="/tennis"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Lapangan Tennis
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        to="/badminton"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Lapangan Badminton
                      </Link>
                      </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </h6>
              <h6>|</h6>
              <h6>
                <Link
                  className="ml-3 text-navbar"
                  color="danger"
                  onClick={this.toggle}
                  style={{ textDecoration: "none" }}
                >
                  About Us
                </Link>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Tentang Kami</ModalHeader>
                  <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>
                      Close
                </Button>
                  </ModalFooter>
                </Modal>
              </h6>
              </>
            )
          }
        </div>
        <div className="col-sm-2">
          <div className="d-flex justify-content-around align-items-center">
            {this.sigInLogIn()}
          </div>
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

const mapDispatcToProps = {
  logoutHandler,
};

export default connect(mapStateToProps, mapDispatcToProps)(Navbar);
