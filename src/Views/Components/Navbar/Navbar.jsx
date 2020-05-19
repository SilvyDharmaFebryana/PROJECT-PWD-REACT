import React from 'react'
import "./Navbar.css"
import ButtonUI from '../Buttons/Buttons'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { logoutHandler } from '../../../Redux/Actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import { faHome } from "@fortawesome/free-solid-svg-icons/";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons/";
import { faInfo } from "@fortawesome/free-solid-svg-icons/";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faSignOut } from "@fortawesome/free-regular-svg-icons"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import logo from "../../../Assets/Images/Untitled.png"

class Navbar extends React.Component {

    state = {
        modalOpen: false,
        dropdownOpen: false
    }

    toggle = () => this.setState({ modalOpen: !this.state.modalOpen });

    toggleDropdown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    onLogout = () => {
        this.props.logoutHandler()
        swal('Anda keluar')
    }


    sigInLogIn = () => {
        if (this.props.user.id) {
            return (
                <div className="d-flex flex-row justify-content-start">
                    <div className="d-flex mt-2 mr-2">
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: 20 }} />
                        <h6 className="ml-3 mr-4">{this.props.user.username}</h6>
                    </div>
                    <div className="d-flex mt-2 mr-2">
                        <FontAwesomeIcon icon={faListAlt} style={{ fontSize: 20 }} />
                        <h6 className="ml-3 mr-4">0</h6>
                    </div>
                    {/* <div className="mb-1 mr-2">
                        <ButtonUI type="contained" className="button-link" onClick={this.onLogout}>Logout</ButtonUI>
                    </div> */}
                </div>
            )
        } else {
            return (
                <h6>
                    <Link to="/auth" style={{ textDecoration: 'none' }}><ButtonUI type="contained" className="button-link">Sign In</ButtonUI> </Link>
                </h6>
            )
        }
    }


    render() {
        return (
            <div className="d-flex justify-content-center py-3 navbar-container" >
                <div className="col-2 ">
                    <h6>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <img style={{ width: "120%" }} src={logo} alt="" />
                        </Link>
                    </h6>
                </div>
                <div className="col-8 d-flex d-flex justify-content-center align-items-center">
                    <h6>
                        <UncontrolledDropdown>
                            <DropdownToggle nav>
                                {/* <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faShoppingCart}
                                    style={{ fontSize: 20 }}
                                /> Belanja */}
                                Belanja
                        </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    T-shirt
                            </DropdownItem>
                                <DropdownItem>
                                    <Link to="/shoes" style={{ textDecoration: 'none', color: "inherit" }}>Shoes</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    Shorts
                            </DropdownItem>
                                <DropdownItem>
                                    Sweatpants
                            </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    All
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </h6>
                    <h6>|</h6>
                    <h6>
                        <UncontrolledDropdown>
                            <DropdownToggle nav>
                                {/* <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faGripLines}
                                    style={{ fontSize: 20 }}
                                /> Sewa */}
                                Sewa
                        </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Lapangan Voli
                            </DropdownItem>
                                <DropdownItem>
                                    Lapangan Futsal
                            </DropdownItem>
                                <DropdownItem>
                                    Lapangan Basket
                            </DropdownItem>
                                <DropdownItem>
                                    Lapangan Tennis
                            </DropdownItem>
                                <DropdownItem>
                                    Lapangan Badminton
                            </DropdownItem>
                                <DropdownItem>
                                    Tennis Meja
                            </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to="/kolam" style={{ textDecoration: 'none', color: "inherit" }}>Beli tiket Kolam Renang </Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </h6>
                    <h6>|</h6>
                    <h6>
                        <Link className="ml-3" color="danger" onClick={this.toggle} style={{ textDecoration: 'none' }}>
                            {/* <FontAwesomeIcon
                                className="mr-2"
                                icon={faInfo}
                                style={{ fontSize: 20 }}
                            /> Tentang */}
                            Tentang Kami
                        </Link>
                        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>
                                Tentang Kami
                        </ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                         </ModalBody>
                            <ModalFooter>
                                {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                                <Button color="secondary" onClick={this.toggle}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </h6>
                </div>
                <div className="col-2">
                    <div className="d-flex flex-row-reverse">
                        {
                            this.sigInLogIn()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatcToProps = {
    logoutHandler
}

export default connect(mapStateToProps, mapDispatcToProps)(Navbar)