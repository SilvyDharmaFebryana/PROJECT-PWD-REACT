import React from "react"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import "./AddUser.css"
import { Table } from 'reactstrap';
import Axios from "axios";
import { API_URL } from "../../../../../Constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class AddUser extends React.Component {

    state = {
        createUserForm: {
            id: 0,
            username: "",
            email: "",
            address: "",
            lastName: "",
            firstName: "",
            fullName: "",
            password: "",
            repPassword: "",
            gender: "gender",
            phone: "",
            role: "role",
            showPassword: false,
        },
    }

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };

    createUserHandler = () => {
        const { username } = this.state.createUserForm
        Axios.get(`${API_URL}/users`, {
            params: {
                username
            }
        })
        .then((res) => {
            if (res.data.length > 0) {
                swal("username has used")
            } else {
                if ( this.state.createUserForm.password === this.state.createUserForm.repPassword) {
                    Axios.post(`${API_URL}/users`, {
                        
                            username : this.state.createUserForm.username,
                            email: this.state.createUserForm.email,
                            address: this.state.createUserForm.address,
                            firstName: this.state.createUserForm.firstName,
                            lastName: this.state.createUserForm.lastName,
                            fullName: this.state.createUserForm.firstName + " " + this.state.createUserForm.lastName,
                            // gender: this,
                            // phone,
                            password: this.state.createUserForm.password,
                            role: this.state.createUserForm.role,
                        
                    })
                        .then((res) => {
                            swal("Success!", "User has been added to the list", "success");
                            this.setState({
                                createUserForm: {
                                    username: "",
                                    email: "",
                                    address: "",
                                    firstName: "",
                                    lastName: "",
                                    gender: "",
                                    phone: "",
                                    password: "",
                                    role: "user",
                                },
                            });
                            // this.getUserList();
                        })
                        .catch((err) => {
                            swal("Error!", "User could not be added to the list", "error");
                        });
                } else {
                    swal("Error!", "password didnt match", "error")
                }
            }
        })
        .catch((err) => {
            console.log(err);
            
        })
       
    };



    render() {
        return (
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > ADD USER </h5></BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div>
                    <Table borderless className="table-add">
                            <thead style={{ color: "#2d5986"}}>
                                <tr>
                                    <th>Username</th>
                                    <td>:</td>
                                    <td>
                                        <input 
                                            className="input-text"  
                                            value={this.state.createUserForm.username}
                                            placeholder="username"
                                            onChange={(e) => this.inputHandler(e, "username", "createUserForm")}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Full Name</th>
                                    <td>:</td>
                                    <td className="d-flex">
                                        <input 
                                            className="mr-2 input-text" 
                                            style={{ width: "50%"}} 
                                            value={this.state.createUserForm.firstName}
                                            placeholder="firstname"
                                            onChange={(e) => this.inputHandler(e, "firstName", "createUserForm")}
                                        />
                                        <input 
                                            className="input-text" 
                                            style={{ width: "50%"}} 
                                            value={this.state.createUserForm.lastName}
                                            placeholder="lastname"
                                            onChange={(e) => this.inputHandler(e, "lastName", "createUserForm")}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>:</td>
                                    <td>
                                        <select 
                                            className="input-text" 
                                            name="gender" 
                                            id=""
                                            value={this.state.createUserForm.gender}
                                            onChange={(e) => this.inputHandler(e, "gender", "createUserForm")}
                                            placeholder="Gender"
                                        >
                                            <option value="gender" disabled> Gender </option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>:</td>
                                    <td>
                                        <input 
                                            className="input-text" 
                                            value={this.state.createUserForm.email}
                                            placeholder="email"
                                            onChange={(e) => this.inputHandler(e, "email", "createUserForm")}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>:</td>
                                    <td>
                                        <textarea 
                                            className="input-text" 
                                            name="" 
                                            id="" 
                                            cols="30" 
                                            rows="2"
                                            value={this.state.createUserForm.address}
                                            placeholder="address"
                                            onChange={(e) => this.inputHandler(e, "address", "createUserForm")}
                                        >
                                        </textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>:</td>
                                    <td>
                                        <select 
                                            className="input-text" 
                                            name="role" 
                                            id=""
                                            value={this.state.createUserForm.role}
                                            onChange={(e) => this.inputHandler(e, "role", "createUserForm")}
                                        >
                                            <option value="role" disabled> Role </option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <td>:</td>
                                    <td>
                                        <input 
                                            className="input-text" 
                                            type="password" 
                                            value={this.state.createUserForm.password}
                                            placeholder="password"
                                            onChange={(e) => this.inputHandler(e, "password", "createUserForm")}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Repeat Password</th>
                                    <td>:</td>
                                    <td>  
                                        <input 
                                            className="input-text" 
                                            type="password" 
                                            value={this.state.createUserForm.repPassword}
                                            placeholder="repeat password"
                                            onChange={(e) => this.inputHandler(e, "repPassword", "createUserForm")}
                                        />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><button onClick={this.createUserHandler}>Create User</button></td>
                                </tr>
                            </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default AddUser;