import React from "react"
import "./ForgotPassword.css"
import Axios from "axios"
import { API_URL } from "../../../../Constants/API"
import swal from "sweetalert"

class ForgotPassword extends React.Component {


    state = {
        sendEmail : {
            email: "",
        }
        
    }

    sendEmailHandler = () => {
        Axios.put(`${API_URL}/users/forgot/password`, this.state.sendEmail)
        .then((res) => {
            console.log(res.data)
            swal(
                "Sukses", 
                "Cek Email Anda Untuk Memulihkan Akun Anda", 
                "success"
            )
            this.setState({
                sendEmail: {
                    ...this.state.sendEmail,
                    email: ""
                }
            })
        })
        .catch((err) => {
            console.log(err)
            swal(
                "Gagal", 
                "Email Tidak Ditemukan atau Tidak Terdaftar", 
                "error"
            )
        })
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



    render() {
        return (
            <div>
                <div className="margin-forgot">
                    <div className="header-forgot">
                        <h4>Reset Password Saya</h4>
                    </div>
                    <div className="margin-text" style={{ width: "90%" }}>
                        <p style={{ fontSize: "13px" }}>Masukkan alamat email anda dan kami akan mengirimkan email berisi kofirmasi untuk reset password anda </p>
                        <input 
                            className="input-forgot mt-4"
                            value={this.state.sendEmail.email}
                            type="text" placeholder="email"
                            onChange={(e) => this.inputHandler(e, "email", "sendEmail")}
                        />
                        <input 
                            className="button-forgot mt-2" 
                            type="button" 
                            value="Reset Password"
                            onClick={this.sendEmailHandler}
                           
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;