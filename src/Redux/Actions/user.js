import Axios from "axios";
import { API_URL } from "../../Constants/API";
import Cookie from "universal-cookie";
import userTypes from "../types/user"
import swal from 'sweetalert'

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const cookieObj = new Cookie();

export const loginHandler = (userData) => {
    return (dispatch) => {
        const { username, password } = userData;

        Axios.get(`${API_URL}/users`, {
            params: {
                username,
                password,
            },
        })
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data[0],
                    });
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "Username atau password salah",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                id: userData.id,
            },
        })
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data[0],
                    });
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "Username atau password salah",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const logoutHandler = () => {
    cookieObj.remove("authData");
    return {
        type: ON_LOGOUT_SUCCESS,
    };
};

export const registerHandler = (userData) => {
    return (dispatch) => {
        const { repPassword, password, username, firstName, lastName, role, address, gender, phone, email, } = userData

        Axios.get(`${API_URL}/users`, {
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
                            firstName: firstName,
                            lastName: lastName,
                            fullName: firstName + ' ' + lastName,
                            address: address,
                            gender: gender,
                            phone: phone,
                        }
                        )
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