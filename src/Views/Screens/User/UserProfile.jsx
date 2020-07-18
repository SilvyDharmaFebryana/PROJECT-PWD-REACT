import React from "react"
import Axios from "axios"
import { API_URL } from "../../../Constants/API"
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import "./UserProfile.css"
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import swal from "sweetalert";
import noImage from "../../../Assets/Images/user/user.png"
import { Link } from "react-router-dom";


class UserProfile extends React.Component {

    state = {
        editUserData: {
            id: 0,
            username: "",
            lastname: "",
            fullname: "",
            fullname: "",
            password: "",
            email: "",
            address: "",
            profileImage: "",
            gender: "",
            phoneNumber: 0,
            verified: false
        },
        editPasswordUser: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        userData: [],
        activeEdit: false,
        selectedFile: null,
        file: "",
        modalEditOpen: false,
    }

    inputHandler = (event, key) => {
        const { value } = event.target

        this.setState({
            editUserData: {
                ...this.state.editUserData,
                [key]: value
            },
        })
    }

    toggleEdit = () => this.setState({ modalEditOpen: !this.state.modalEditOpen });

    editInputHandler  = (event, key) => {
        const { value } = event.target

        this.setState({
            editPasswordUser: {
                ...this.state.editPasswordUser,
                [key]: value
            },
        })
    }

    getUser = () => {
        Axios.get(`${API_URL}/users/login/byId/`, {
            params: {
                id: this.props.user.id
            }
        })
            .then((res) => {
                this.setState({ editUserData: res.data })
                // this.setState({ userData: res.data })
                console.log(this.state.userData);

            })
            .catch((err) => {
                console.log(err);

            })
    }


    componentDidMount() {
        this.getUser()
        console.log(this.props.user.id)
    }


    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    updateProfile = () => {
        let formData = new FormData();

        if (this.state.selectedFile) {
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
        }

        formData.append("userEdit", JSON.stringify(this.state.editUserData))

        if (this.state.editUserData.verified === true ) {
            Axios.put(`${API_URL}/users/edit/${this.props.user.id}`, formData)
            .then((res) => {
                console.log(res.data)
                swal(
                    "Sukses!",
                    "Berhasil Update Profile ",
                    "success"
                )
                this.setState({ activeEdit: false })
                this.getUser()
            })
            .catch((err) => {
                console.log("ERROR");
                console.log(err);
                swal(
                    "Error!",
                    "Belum berhasil Update Profile ",
                    "error"
                )
            });

        } else {
            swal(
                "Tidak di izinkan!",
                "Tidak di izinkan untuk update profile, karena email anda belum terverifikasi, cek email anda untuk verifikasi akun",
                "error"
            )
        }

        
    };

    toggleEdit = () => this.setState({ modalEditOpen: !this.state.modalEditOpen });


    profilePicture = () => {
        if (this.state.editUserData.profileImage === null) {
            return (
                <img className="circle" src={noImage} alt="" />
            )
        } else {
            return (
                <img className="circle" src={this.state.editUserData.profileImage} alt="" />
            )
        }
    }

    changePassword = () => {
        
        let userData = { 
            ...this.state.editUserData 
        }

        if (this.state.editPasswordUser.newPassword === this.state.editPasswordUser.confirmPassword) {
            Axios.put(`${API_URL}/users/edit/password/${this.props.user.id}`, userData, {
                params: {
                    oldPassword: this.state.editPasswordUser.oldPassword,
                    newPassword: this.state.editPasswordUser.newPassword
                }
            })
                .then(res => {
                    console.log(res.data)
                    swal(
                        "Sukses!",
                        "Behasil ubah password",
                        "success"
                    )
                    this.setState({ modalEditOpen: false })
                    this.setState({
                        editPasswordUser: {
                            ...this.state.editPasswordUser,
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                        }
                    })
                })
                .catch(err => {
                    swal(
                        "Gagal!",
                        "Password lama tidak sesuai",
                        "error"
                    )
                })
        } else {
            swal(
                "Gagal!",
                "Password tidak sesuai",
                "error"
            )
        }


    }

    changesBtnHandler = () => {
        this.setState({
            editPassword: {
                ...this.state.user,
            },
            modalEditOpen: true,
        });
    };



    render() {
        return (
            <div>
                <div className="">
                    <div className="">
                        {
                            this.state.activeEdit === true ? (
                                <>
                                    <div>
                                        {
                                            this.profilePicture()
                                        }
                                    </div>
                                    <input className="browse" type="file" onChange={this.fileChangeHandler} />
                                </>
                            ) : (
                                    this.profilePicture()
                                )
                        }
                    </div>

                    <div className="d-flex edit-wrap">
                        <h6 onClick={() => this.setState({ activeEdit: true })}>{this.state.editUserData.firstname + " " + this.state.editUserData.lastname}</h6>
                        <FontAwesomeIcon
                            className="ml-2 icon-edit"
                            icon={faEdit}
                            style={{ fontSize: 20 }}
                            onClick={() => this.setState({ activeEdit: true })}
                        />
                        {console.log(this.state.activeEdit)}
                    </div>
                </div>
                {
                    this.state.activeEdit === true ? (
                        <div>
                            <Table borderless className="table-add">
                                <thead>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>Fullname</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            <input
                                                className="mr-2 input-edit"
                                                type="text"
                                                style={{ width: "100%" }}
                                                value={this.state.editUserData.firstname}
                                                onChange={(e) => this.inputHandler(e, "firstname", "editUserData")}
                                            />
                                            <input
                                                className="input-edit"
                                                type="text"
                                                style={{ width: "100%" }}
                                                value={this.state.userData.lastname}
                                                onChange={(e) => this.inputHandler(e, "lastname", "editUserData")}
                                            />

                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th></th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            <input
                                                className="input-edit"
                                                type="text"
                                                style={{ width: "100%" }}
                                                value={this.state.editUserData.firstname + this.state.editUserData.lastname}
                                                onChange={(e) => this.inputHandler(e, "fullname", "editUserData")}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>Username</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            <input
                                                className="input-edit"
                                                type="text"
                                                style={{ width: "100%", backgroundColor: "whitesmoke" }}
                                                value={this.state.editUserData.username}
                                                onChange={(e) => this.inputHandler(e, "username", "editUserData")}
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>No Tlp</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            <input
                                                className="input-edit"
                                                type="text"
                                                style={{ width: "100%" }}
                                                value={this.state.editUserData.phoneNumber}
                                                onChange={(e) => this.inputHandler(e, "phoneNumber", "editUserData")}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>Gender</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                        <select
                                            value={this.state.editUserData.gender}
                                            className="input-edit h-100 pl-3"
                                            onChange={(e) =>
                                                this.inputHandler(e, "gender", "editUserData")
                                            }
                                            >
                                            <option
                                                onClick={() =>
                                                this.setState({
                                                    registerForm: {
                                                    ...this.state.editUserData,
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
                                                    ...this.state.editUserData,
                                                    gender: "male",
                                                    },
                                                })
                                                }
                                                value="male"
                                            >
                                                Male
                                            </option>
                                        </select>
                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>Email</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            <input
                                                className="input-edit"
                                                type="text"
                                                style={{ width: "100%", backgroundColor: "whitesmoke" }}
                                                value={this.state.editUserData.email}
                                                onChange={(e) => this.inputHandler(e, "email", "editUserData")}
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>Address</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            <input
                                                className="input-edit"
                                                type="text"
                                                style={{ width: "100%" }}
                                                value={this.state.editUserData.address}
                                                onChange={(e) => this.inputHandler(e, "address", "editUserData")}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>Password</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            <Link onClick={(_) => this.changesBtnHandler()}>
                                                <p className="ml-2" style={{ fontSize: "14px" }}>change password</p>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr style={{ color: "#2d5986" }}>
                                        <th>Verifikasi</th>
                                        <td>:</td>
                                        <td className="d-flex">
                                            {
                                                this.state.userData.verified === true ? (
                                                    <p className="ml-2" style={{ fontSize: "14px" }}>Akun anda telah terverifikasi</p>
                                                ) : (
                                                        <p className="ml-2" style={{ fontSize: "14px" }}>Akun anda belum terverifikasi</p>
                                                    )
                                            }
                                        </td>
                                    </tr>

                                </thead>
                            </Table>
                        </div>

                    ) : (
                    
                            <div>
                                <Table borderless className="table-add">
                                    <thead>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Fullname</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="mr-2 input-text"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.editUserData.firstname}
                                                    // onChange={(e) => this.inputHandler(e, "firstname", "user")}
                                                    disabled
                                                />
                                                <input
                                                    className="input-text"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.editUserData.lastname}
                                                    // onChange={(e) => this.inputHandler(e, "lastname", "user")}
                                                    disabled
                                                />

                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Username</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="input-text"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.editUserData.username}
                                                    // onChange={(e) => this.inputHandler(e, "username", "user")}
                                                    disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>No Tlp</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="input-text"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={"+" + this.state.editUserData.phoneNumber}
                                                    // onChange={(e) => this.inputHandler(e, "phoneNumber", "user")}
                                                    disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Gender</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="input-text"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.editUserData.gender}
                                                    // onChange={(e) => this.inputHandler(e, "gender", "user")}
                                                    disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Email</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="input-text"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.editUserData.email}
                                                    // onChange={(e) => this.inputHandler(e, "email", "user")}
                                                    disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Address</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="input-text"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.editUserData  .address}
                                                    // onChange={(e) => this.inputHandler(e, "address", "user")}
                                                    disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Password</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <Link onClick={(_) => this.changesBtnHandler()}>   
                                                    <p className="ml-2" style={{ fontSize: "14px" }}>change password</p>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Verifikasi</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                {
                                                    this.state.editUserData.verified === true ? (
                                                        <p className="ml-2" style={{ fontSize: "14px" }}>Akun anda telah terverifikasi</p>
                                                    ) : (
                                                            <p className="ml-2" style={{ fontSize: "14px" }}>Akun anda belum terverifikasi</p>
                                                        )
                                                }
                                            </td>
                                        </tr>

                                    </thead>
                                </Table>
                            </div>
                        )
                }
                {
                    this.state.activeEdit == true ? (
                        <Button className="submit-button" onClick={this.updateProfile}>Submit</Button>
                    ) : null
                }

                    <div>
                        <Modal
                            toggle={this.toggleEdit}
                            isOpen={this.state.modalEditOpen}
                            className="edit-modal"
                        >
                            <ModalHeader toggle={this.toggleEdit}>
                                <h6>Changes Password</h6>

                            </ModalHeader>
                            <ModalBody>
                                <div className="">
                                    <p style={{ fontSize: "12px" }}> Password Lama :</p>
                                    <input
                                        className="input-text mt-2 mb-2"
                                        type="password"
                                        // style={{ width: "90%" }}
                                        value={this.state.editPasswordUser.oldPassword}
                                        onChange={(e) => this.editInputHandler(e, "oldPassword", "editPasswordUser")}

                                    />
                                </div>
                                <div className="">
                                    <p style={{ fontSize: "12px" }}>Password Baru :</p>
                                    <input
                                        className="input-text mt-2 mb-2"
                                        type="password"
                                        // style={{ width: "100%" }}
                                        value={this.state.editPasswordUser.newPassword}
                                        onChange={(e) => this.editInputHandler(e, "newPassword", "editPasswordUser")}

                                    />
                                </div>
                                <div className="">
                                    <p style={{ fontSize: "12px" }}>Konfirmasi Password :</p>    
                                    <input
                                        className="input-text mt-2"
                                        type="password"
                                        // style={{ width: "100%" }}
                                        value={this.state.editPasswordUser.confirmPassword}
                                        onChange={(e) => this.editInputHandler(e, "confirmPassword", "editPasswordUser")}

                                    />
                                </div>
                                <div>
                                    <Link to="/forgot/password" style={{ textDecoration: "none", color: "inherit"}}>
                                        <p className="mt-3" style={{ fontSize: "14px" }}>Lupa Password ?</p>
                                    </Link>
                                </div>
                                
                            </ModalBody>
                            <ModalFooter>
                                <div className="d-flex mr-2">
                                    <Button className="button-edit mr-1" onClick={this.changePassword}>Change</Button>
                                    <Button color="secondary" style={{ borderRadius: "2px", height: "40px" }} onClick={this.toggleEdit}>Close</Button>
                                </div>
                            </ModalFooter>
                        </Modal>
                    </div>
            </div>
            
    
        )

    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UserProfile);