import Axios from "axios";
import { API_URL } from "../../Constants/API";
import Cookie from "universal-cookie";
import userTypes from "../types/user"
import swal from 'sweetalert'

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const cookieObj = new Cookie();

export const loginHandler = (userData) => {
    return (dispatch) => {
        // const { username, password } = userData;

        Axios.get(`${API_URL}/users/login`, {
            params: {
                username: userData.username,
                password: userData.password
            }  
        })
            .then((res) => {
                console.log(res.data);       
                // if (res.data) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data,
                    });
                // } else {
                //     dispatch({
                //         type: ON_LOGIN_FAIL,
                //         payload: "Username atau password salah",
                //     });
                // }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: ON_LOGIN_FAIL,
                    payload: "Username atau password salah",
                    })
            })
        }
};

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users/login/byId`, {
            params: {
                id: userData.id,
            },
        })
            .then((res) => {
                // if (res.data.length > 0) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data,
                    });
                // } else {
                    // dispatch({
                    //     type: ON_LOGIN_FAIL,
                    //     payload: "Username atau password salah",
                    // });
                // }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: ON_LOGIN_FAIL,
                    payload: "Username atau password salah",
                });
            });
    };
};

export const logoutHandler = () => {
    cookieObj.remove("authData");
    return {
        type: ON_LOGOUT_SUCCESS,
    };
};

export const logoutAdminHandler = () => {
    cookieObj.remove("authData", { path: "/login/admin"});
    return {
        type: ON_LOGOUT_SUCCESS,
    };
};

export const registerHandler = (userData) => {
    return (dispatch) => {
        const { repPassword, password, username, firstname, lastname, role, address, gender, phoneNumber, email, } = userData

        Axios.get(`${API_URL}/users/username`, {
            params: {
                username: userData.username,
            },
        })
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: "ON_REGISTER_FAIL",
                        payload: "Username sudah digunakan",
                    });
                } else {
                    if (password == repPassword) {
                        Axios.post(`${API_URL}/users`, {
                            username: username,
                            password: password,
                            role: role,
                            firstname: firstname,
                            lastname: lastname,
                            fullname: firstname + ' ' + lastname,
                            address: address,
                            gender: gender,
                            phoneNumber: phoneNumber,
                            email: email,
                            role: role,
                        })
                            .then((res) => {
                                    console.log(res.data);
                                dispatch({
                                    type: ON_LOGIN_SUCCESS,
                                    payload: res.data,
                                });
                                swal("berhasil menambahkan akun", "", "success")
                                
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        dispatch({
                            type: "ON_PASSWORD_FAIL",
                            payload: "password not match",
                        });
                    }
                   
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const cookieChecker = () => {
    return {
        type: "COOKIE_CHECK",
    };
};