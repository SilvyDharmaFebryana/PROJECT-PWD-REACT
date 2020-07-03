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
                      <DropdownItem>Profile</DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/history"
                        >
                          History
                        </Link>
                      </DropdownItem>
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
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={this.onLogout}
                  >
                    <FontAwesomeIcon
                      className="mt-2 mr-2"
                      icon={faSignOutAlt}
                      style={{ fontSize: 18 }}
                    />
                    Logout
                  </Link>
                </DropdownItem>
              </DropdownMenu>
              <DropdownToggle tag="nav" className="d-flex">
                <FontAwesomeIcon
                  className="m-2"
                  icon={faUserAlt}
                  style={{ fontSize: 17, color: "#003cb3" }}
                />
                <h6 className="mt-1 ml-2 text-navbar">
                  {this.props.user.username}
                </h6>
              </DropdownToggle>
            </Dropdown>
          </div>
          <div className="d-flex mt-2 ml-4">
            <DropdownToggle tag="nav" className="d-flex">
              <FontAwesomeIcon
                className="mt-2"
                icon={faListAlt}
                style={{ fontSize: 18, color: "#003cb3" }}
              />
              <h6 className="mt-1 ml-2 text-navbar">0</h6>
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
            this.props.user.role === "admin" ? (
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
                    <DropdownItem>Lapangan Tennis</DropdownItem>
                    <DropdownItem>Lapangan Badminton</DropdownItem>
                    <DropdownItem>Tennis Meja</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link
                        to="/kolam"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Beli tiket Kolam Renang{" "}
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
                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
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
