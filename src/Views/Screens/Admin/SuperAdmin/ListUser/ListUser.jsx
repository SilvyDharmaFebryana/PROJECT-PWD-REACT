import React from "react"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Axios from "axios";
import { API_URL } from "../../../../../Constants/API";
import { Table } from 'reactstrap';
import "./ListUser.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserEdit, faEyeDropper, faUserAlt, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from "sweetalert";


class ListUser extends React.Component {

    state = {
        modalSeeOpen: false,
        modalEditOpen: false,
        userList: [],
        allUserList: [],
        adminList: [],
        activePage: "all",
        editUserForm: {
            id: 0,
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            fullName: "",
            password: "",
            role: "admin",
            gender: "",
            phone: "",
            showPassword: false,
        
        },
        activeUser: [],
        activeAdmin: [],
        activeAllUser: [],
    }


    deleteDataHandler = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                
                Axios.delete(`${API_URL}/users/${id}`)
                .then((res) => {
                    this.getUserList()
                    this.getAllUserList()
                    this.getAdminList()
    
                })
                
                .catch((err) => {
                    console.log(err);
                });

              swal("user has been deleted", {
                icon: "success",
              });
            } else {
              swal("user saved");
            }
          });
    };

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };

    toggleSee = () => this.setState({ modalSeeOpen: !this.state.modalSeeOpen });

    toggleEdit = () => this.setState({ modalEditOpen: !this.state.modalEditOpen });

    getAllUserList = () => {
        Axios.get(`${API_URL}/users`)
        .then((res) => {
            this.setState({ allUserList: res.data })
            console.log(res.data)   
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getUserList()
        this.getAllUserList()
        this.getAdminList()
    }

    getUserList = () => {
        Axios.get(`${API_URL}/users`, {
            params: {
                role: "user"
            }
        })
        .then((res) => {
            this.setState({ userList: res.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getAdminList = () => {
        Axios.get(`${API_URL}/users`, {
            params: {
                role: "admin",
            }
        })
        .then((res) => {
            this.setState({ adminList: res.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    editUserBtnHandler = (idx) => {
        this.setState({
            editUserForm: {
                ...this.state.allUserList[idx],
            },
            modalEditOpen: true,
        });
    };

    editAdminBtnHandler = (idx) => {
        this.setState({
            editUserForm: {
                ...this.state.adminList[idx],
            },
            modalEditOpen: true,
        });
    };

    editAllUserBtnHandler = (idx) => {
        this.setState({
            editUserForm: {
                ...this.state.allUserList[idx],
            },
            modalEditOpen: true,
        });
    };

    seeUserBtnHandler = (idx) => {
        this.setState({
            editUserForm: {
                ...this.state.allUserList[idx],
            },
            modalSeeOpen: true,
        });
    };

    seeAdminBtnHandler = (idx) => {
        this.setState({
            editUserForm: {
                ...this.state.adminList[idx],
            },
            modalSeeOpen: true,
        });
    };

    seeAllUserBtnHandler = (idx) => {
        this.setState({
            editUserForm: {
                ...this.state.allUserList[idx],
            },
            modalSeeOpen: true,
        });
    };


    editUserHandler = () => {
        Axios.put(
            `${API_URL}/users/${this.state.editUserForm.id}`,
            this.state.editUserForm
        )
            .then((res) => {
                swal("Success!", "User has been edited", "success");
                this.setState({ modalEditOpen: false });
                this.getUserList()
                this.getAllUserList()
                this.getAdminList()
            })
            .catch((err) => {
                swal("Error!", "User could not be edited", "error");
                console.log(err);
            });
    };

    renderUserList = () => {
        const { activePage } = this.state;
        if (activePage === "user") {
            return this.state.userList.map((val, idx) => {
                return (
                    <tr
                        onClick={() => {
                            if (this.state.activeUser.includes(idx)) {
                                this.setState({
                                    activeUser: [
                                        ...this.state.activeUser.filter((item) => item !== idx),
                                    ],
                                });
                            } else {
                                this.setState({
                                    activeUser: [...this.state.activeUser, idx],
                                });
                            }
                        }}
                    >
                        <td>{val.id}</td>
                        <td>{val.username}</td>
                        <td>{val.fullName}</td>
                        <td>{val.role}</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faUserEdit}
                                style={{ fontSize: 18}}
                                onClick={(_) => this.editUserBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faEye}
                                style={{ fontSize: 18}}
                                onClick={(_) => this.seeUserBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faMinusCircle}
                                style={{ fontSize: 18}}
                                onClick={() => this.deleteDataHandler(val.id)}
                            />
                        </td>
                    </tr>
                )  
            })
        } else if ( activePage === "admin") {
            return this.state.adminList.map((val, idx) => {
                return (
                    <tr
                        onClick={() => {
                            if (this.state.activeAdmin.includes(idx)) {
                                this.setState({
                                    activeAdmin: [
                                        ...this.state.activeAdmin.filter((item) => item !== idx),
                                    ],
                                });
                            } else {
                                this.setState({
                                    activeAdmin: [...this.state.activeAdmin, idx],
                                });
                            }
                        }}
                    >
                        <td>{val.id}</td>
                        <td>{val.username}</td>
                        <td>{val.fullName}</td>
                        <td>{val.role}</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faUserEdit}
                                style={{ fontSize: 18}}
                                onClick={(_) => this.editAdminBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faEye}
                                style={{ fontSize: 18}}
                                onClick={this.toggleSee}
                                onClick={(_) => this.seeAdminBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faMinusCircle}
                                style={{ fontSize: 18}}
                                onClick={() => this.deleteDataHandler(val.id)}
                            />
                        </td>
                    </tr>
                )  
            })
        } else if (activePage === "all") {
            return this.state.allUserList.map((val, idx) => {
                return (
                    <tr
                        onClick={() => {
                            if (this.state.activeAllUser.includes(idx)) {
                                this.setState({
                                    activeAllUser: [
                                        ...this.state.activeAllUser.filter((item) => item !== idx),
                                    ],
                                });
                            } else {
                                this.setState({
                                    activeAllUser: [...this.state.activeAllUser, idx],
                                });
                            }
                        }}
                    >
                        <td>{val.id}</td>
                        <td>{val.username}</td>
                        <td>{val.fullName}</td>
                        <td>{val.role}</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faUserEdit}
                                style={{ fontSize: 18}}
                                onClick={(_) => this.editAllUserBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faEye}
                                style={{ fontSize: 18}}
                                onClick={this.toggleSee}
                                onClick={(_) => this.seeAllUserBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faMinusCircle}
                                style={{ fontSize: 18}}
                                onClick={() => this.deleteDataHandler(val.id)}
                            />
                        </td>
                    </tr>
                )  
            })
        } else {
            return this.state.allUserList.map((val, idx) => {
                return (
                    <tr
                        onClick={() => {
                            if (this.state.activeAllUser.includes(idx)) {
                                this.setState({
                                    activeAllUser: [
                                        ...this.state.activeAllUser.filter((item) => item !== idx),
                                    ],
                                });
                            } else {
                                this.setState({
                                    activeAllUser: [...this.state.activeAllUser, idx],
                                });
                            }
                        }}
                    >
                        <td>{val.id}</td>
                        <td>{val.username}</td>
                        <td>{val.fullName}</td>
                        <td>{val.role}</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faUserEdit}
                                style={{ fontSize: 18}}
                                onClick={(_) => this.editAllUserBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faEye}
                                style={{ fontSize: 18}}
                                onClick={this.toggleSee}
                                onClick={(_) => this.seeAllUserBtnHandler(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faMinusCircle}
                                style={{ fontSize: 18}}
                                onClick={() => this.deleteDataHandler(val.id)}
                            />
                        </td>
                    </tr>
                )  
            })
        }
        
    }

    render() {
        return (
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > USER LIST </h5></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="ml-4 mr-4">
                    <center>
                            <div className="row mt-5">
                                <div className="col-9">
                                    <div className="d-flex">
                                        <input 
                                            type="button" 
                                            value="All User"
                                            className={`button-filter ${
                                                this.state.activePage == "all" ? "active" : null
                                                }`}
                                            onClick={() => this.setState({ activePage: "all" })}
                                        />
                                        <input 
                                            type="button" 
                                            value="Admin"
                                            className={`ml-3 button-filter ${
                                                this.state.activePage == "admin" ? "active" : null
                                                }`}
                                            onClick={() => this.setState({ activePage: "admin" })}
                                        />
                                        <input 
                                            type="button" 
                                            value="User"
                                            className={`ml-3 button-filter ${
                                                this.state.activePage == "user" ? "active" : null
                                                }`}
                                            onClick={() => this.setState({ activePage: "user" })}
                                        />
                                        
                                    </div>
                                </div>
                                <div className="col-3">
                                    <Link to="/admin/add_user" style={{ textDecoration: "none", color: "inherit"}}>
                                        <button className="add-user">
                                            <FontAwesomeIcon
                                                className="mr-2"
                                                icon={faPlus}
                                                style={{ fontSize: 15}}
                                            /> Add User
                                        </button>
                                    </Link>       
                                </div>
                            </div>
                    <Table className="text-center">
                        <thead style={{ backgroundColor: "#2d5986", color:"white"}}>
                            <tr>
                                <th style={{ width: "10%" }}>ID</th>
                                <th style={{ width: "20%" }}>Username</th>
                                <th style={{ width: "20%" }}>FullName</th>
                                <th style={{ width: "20%" }}>Role</th>
                                <th colSpan={5} style={{ width: "25%" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "#336699"}}>
                            {
                                this.renderUserList()
                            }
                        </tbody>
                    </Table>
                    </center>
                </div>
                <div>
                <Modal
                    toggle={this.toggleEdit}
                    isOpen={this.state.modalEditOpen}
                    className="edit-modal"
                >
                    <ModalHeader toggle={this.toggleEdit}>
                        <caption>
                            <h3>Edit User</h3>
                        </caption>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    className="text-input-toggle"   
                                    type="text"
                                    value={this.state.editUserForm.firstName}
                                    placeholder="Full Name"
                                    onChange={(e) =>
                                        this.inputHandler(e, "firstName", "editUserForm")
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    className="text-input-toggle"   
                                    type="text"
                                    value={this.state.editUserForm.lastName}
                                    placeholder="Full Name"
                                    onChange={(e) =>
                                        this.inputHandler(e, "lastName", "editUserForm")
                                    }
                                />
                            </div>
                            <div className="col-12 mt-2">
                                <input
                                    className="text-input-toggle"
                                    type="text"
                                    value={this.state.editUserForm.username}
                                    placeholder="Username"
                                    onChange={(e) => this.inputHandler(e, "username", "editUserForm")}
                                />
                            </div>
                            <div className="col-12 mt-2">
                                <textarea
                                    value={this.state.editUserForm.address}
                                    onChange={(e) => this.inputHandler(e, "address", "editUserForm")}
                                    style={{ resize: "none" }}
                                    placeholder="Address"
                                    className="text-input-toggle"
                                ></textarea>
                            </div>
                            <div className="col-6 mt-2">
                                <input
                                    className="text-input-toggle"
                                    type="text"
                                    value={this.state.editUserForm.email}
                                    placeholder="Email"
                                    onChange={(e) => this.inputHandler(e, "email", "editUserForm")}
                                />
                            </div>
                            <div className="col-6 mt-2">
                                <select
                                    value={this.state.editUserForm.role}
                                    className="text-input-toggle h-100 pl-3"
                                    onChange={(e) => this.inputHandler(e, "role", "editUserForm")}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex mr-2">
                            <Button className="button-edit mr-1" onClick={this.editUserHandler}>Edit</Button>{' '}
                            <Button color="secondary" style={{ borderRadius: "2px", height: "40px" }} onClick={this.toggleEdit}>Close</Button>
                        </div>
                  </ModalFooter>
                </Modal>
                </div>
                <div>
                    <Modal isOpen={this.state.modalSeeOpen} toggle={this.toggleSee}>
                    <ModalHeader toggle={this.toggleSee}>
                        <center>
                            <div>
                                <FontAwesomeIcon
                                    className="text-center"
                                    icon={faUserAlt}
                                    style={{ fontSize: 50}}
                                /> 
                            </div>
                        </center>
                    </ModalHeader>
                    <ModalBody>
                        <Table borderless>
                            <thead>
                                <tr>
                                    <th style={{ width: "40%" }}>Username</th>
                                    <td style={{ width: "5%" }}>:</td>
                                    <td>{this.state.editUserForm.username}</td>
                                </tr>
                                <tr>
                                    <th style={{ width: "40%" }}>Full Name</th>
                                    <td style={{ width: "5%" }}>:</td>
                                    <td>{this.state.editUserForm.fullName}</td>
                                </tr>
                                <tr>
                                    <th style={{ width: "40%" }}>Gender</th>
                                    <td style={{ width: "5%" }}>:</td>
                                    <td>{this.state.editUserForm.gender}</td>
                                </tr>
                                <tr>
                                    <th style={{ width: "40%" }}>Role</th>
                                    <td style={{ width: "5%" }}>:</td>
                                    <td>{this.state.editUserForm.role}</td>
                                </tr>
                                <tr>
                                    <th style={{ width: "40%" }}>Email</th>
                                    <td style={{ width: "5%" }}>:</td>
                                    <td>{this.state.editUserForm.email}</td>
                                </tr>
                                <tr>
                                    <th style={{ width: "40%" }}>Phone Number</th>
                                    <td style={{ width: "5%" }}>:</td>
                                    <td>+{" "}{this.state.editUserForm.phone}</td>
                                </tr>
                                <tr>
                                    <th style={{ width: "40%" }}>Address</th>
                                    <td style={{ width: "5%" }}>:</td>
                                    <td>{this.state.editUserForm.address}
                                    </td>
                                </tr>
                            </thead>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleSee}>
                        Close
                    </Button>
                    </ModalFooter>
                    </Modal>
                </div>
            </div>

            

        )
    }
}

export default ListUser;