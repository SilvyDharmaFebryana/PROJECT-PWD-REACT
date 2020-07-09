import React from "react"
import Axios from "axios"
import { API_URL } from "../../../Constants/API"
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import "./UserProfile.css"
import { Table, Button } from 'reactstrap';
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import swal from "sweetalert";


class UserProfile extends React.Component {

    state = {
        user: {
            id: "",
            username: "",
            lastname: "",
            fullname: "",
            email: "",
            address: "",
            gender: "",
            phoneNumber: 0,
            verified: false
        },
        activeEdit: false,
        selectedFile: null,
        file: ""
    }

    inputHandler = (event, key) => {
        const { value } = event.target

        this.setState({
            user: {
                ...this.state.user,
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
                this.setState({ user: res.data })
                console.log(this.state.user);

            })
            .catch((err) => {
                console.log(err);

            })
    }


    componentDidMount() {
        this.getUser()
        console.log(this.state.user.id)
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

        formData.append("userEdit", JSON.stringify(this.state.user))

        Axios.post(`${API_URL}/users/edit/`, {
            params: {
                userId: this.state.user.id,  
            }
        }, formData)
            .then((res) => {
                console.log(res.data)
                swal(
                    "Sukses!",
                    "Berhasil Update Profile ",
                    "success"
                )
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


        // console.log(this.state.formField);
        // console.log(JSON.stringify(this.state.formField));
    };



    render() {
        return (
            <div>

                    <div className="">
                        <div className="">
                            {
                                this.state.activeEdit === true ? (
                                    <input type="file" onChange={this.fileChangeHandler}/>
                                ) : (
                                    <FontAwesomeIcon
                                        className="icon-profile"
                                        icon={faUserAlt}
                                        style={{ fontSize: 60 }}
                                    />
                                )
                            } 
                        </div>

                        <div className="d-flex edit-wrap">
                            <h6 onClick={() => this.setState({ activeEdit: true })}>{this.state.user.fullname}</h6>
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
                                                    value={this.state.user.firstname}
                                                    onChange={(e) => this.inputHandler(e, "firstname", "user")}
                                                />
                                                <input
                                                    className="input-edit"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.user.lastname}
                                                    onChange={(e) => this.inputHandler(e, "lastname", "user")}
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
                                                    style={{ width: "100%" }}
                                                    value={this.state.user.username}
                                                    onChange={(e) => this.inputHandler(e, "username", "user")}
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
                                                    value={"+" + this.state.user.phoneNumber}
                                                    onChange={(e) => this.inputHandler(e, "phoneNumber", "user")}
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Gender</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="input-edit"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.user.gender}
                                                    onChange={(e) => this.inputHandler(e, "gender", "user")}
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Email</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <input
                                                    className="input-edit"
                                                    type="text"
                                                    style={{ width: "100%" }}
                                                    value={this.state.user.email}
                                                    onChange={(e) => this.inputHandler(e, "email", "user")}
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
                                                    value={this.state.user.address}
                                                    onChange={(e) => this.inputHandler(e, "address", "user")}
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Password</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                <p className="ml-2" style={{ fontSize: "14px" }}>change password</p>
                                            </td>
                                        </tr>
                                        <tr style={{ color: "#2d5986" }}>
                                            <th>Verifikasi</th>
                                            <td>:</td>
                                            <td className="d-flex">
                                                {
                                                    this.state.user.verified === true ? (
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
                                                        value={this.state.user.firstname}
                                                        onChange={(e) => this.inputHandler(e, "firstname", "user")}
                                                        disabled
                                                    />
                                                    <input
                                                        className="input-text"
                                                        type="text"
                                                        style={{ width: "100%" }}
                                                        value={this.state.user.lastname}
                                                        onChange={(e) => this.inputHandler(e, "lastname", "user")}
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
                                                        value={this.state.user.username}
                                                        onChange={(e) => this.inputHandler(e, "username", "user")}
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
                                                        value={"+" + this.state.user.phoneNumber}
                                                        onChange={(e) => this.inputHandler(e, "phoneNumber", "user")}
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
                                                        value={this.state.user.gender}
                                                        onChange={(e) => this.inputHandler(e, "gender", "user")}
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
                                                        value={this.state.user.email}
                                                        onChange={(e) => this.inputHandler(e, "email", "user")}
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
                                                        value={this.state.user.address}
                                                        onChange={(e) => this.inputHandler(e, "address", "user")}
                                                        disabled
                                                    />
                                                </td>
                                            </tr>
                                            <tr style={{ color: "#2d5986" }}>
                                                <th>Password</th>
                                                <td>:</td>
                                                <td className="d-flex">
                                                    <p className="ml-2" style={{ fontSize: "14px" }}>change password</p>
                                                </td>
                                            </tr>
                                            <tr style={{ color: "#2d5986" }}>
                                                <th>Verifikasi</th>
                                                <td>:</td>
                                                <td className="d-flex">
                                                    {
                                                        this.state.user.verified === true ? (
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
                <Button className="submit-button" onClick={this.updateProfile}>Submit</Button>
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