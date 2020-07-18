import React from "react"
import Axios from "axios"
import { API_URL } from "../../../../Constants/API"
import { connect } from "react-redux";
import swal from "sweetalert";


class ResetPassword extends React.Component {

    state = {
        resetPassword : {
            newResetPassword : "",
            confirmNewResetPasswd : "",
        },
        userDataReset : [],
        jumlahResData : 0
    }

    getUserDataToReset = () => {

        let username= this.props.match.params.username

        Axios.get(`${API_URL}/users/forgot/password/${username}`)
        .then((res) => {
            this.setState({ userDataReset: res.data })
            console.log(res.data);
            
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    componentDidMount() {
        this.getUserDataToReset()
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value
            }
        })
    }

    resetPasswordBtnHandler = () => {

        let username = this.props.match.params.username
        const { newResetPassword, confirmNewResetPasswd } = this.state.resetPassword
        const userData = { 
            ...this.state.userDataReset
        }

        if (newResetPassword === confirmNewResetPasswd) {
            Axios.put(`${API_URL}/users/reset/password/${username}`, userData, {
                params: {
                    newPassword : newResetPassword
                }
            })
            .then((res) => {
                swal(
                    "Success!",
                    "Berhasil memulihkan akun anda",        
                    "success"
                )
                this.setState({
                    resetPassword: {
                        ...this.state.resetPassword,
                        newResetPassword: "",
                        confirmNewResetPasswd: ""
                    },
                    jumlahResData: res.data.length
                })
                console.log(res.data);
                
            })
            .catch((err) => {
                swal(
                    "Gagal!",
                    "Gagal ganti password",
                    "error"
                )
                console.log(err);
                
            })
        } else {
            swal(
                "Gagal!",
                "Password tidak sama",
                "error"
            )
        }
    }


    render() {
        return(

            <div>
                <div className="margin-forgot">
                    <div className="header-forgot">
                        <h4>Reset Password Saya</h4>
                    </div>
                    <div className="margin-text" style={{ width: "90%" }}>
                        <input 
                            className="input-forgot "
                            value={this.state.resetPassword.newResetPassword}
                            type="password" 
                            placeholder="New Password"
                            onChange={(e) => this.inputHandler(e, "newResetPassword", "resetPassword")}
                        />
                        <input 
                            className="input-forgot mt-3"
                            value={this.state.resetPassword.confirmNewResetPasswd}
                            type="password" 
                            placeholder="Confirm Password"
                            onChange={(e) => this.inputHandler(e, "confirmNewResetPasswd", "resetPassword")}
                        />
                        <input 
                            className="button-forgot mt-4" 
                            type="button" 
                            value="Reset Password"
                            onClick={this.resetPasswordBtnHandler}
                           
                        />
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

export default connect(mapStateToProps)(ResetPassword) 