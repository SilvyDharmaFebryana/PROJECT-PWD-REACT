import React from "react"
import { Table, Alert } from 'reactstrap';
import cimb from "../../../Assets/Images/BankLogo/cimb.png"
import bni from "../../../Assets/Images/BankLogo/bni.png"
import bca from "../../../Assets/Images/BankLogo/bca.png"
import ovo from "../../../Assets/Images/BankLogo/ovo.png"
import dana from "../../../Assets/Images/BankLogo/dana.png"
import gopay from "../../../Assets/Images/BankLogo/gopay.png"
import alfa from "../../../Assets/Images/BankLogo/alfa.png"
import indomaret from "../../../Assets/Images/BankLogo/indomaret.png"
import alfamidi from "../../../Assets/Images/BankLogo/alfamidi.png"
import Axios from "axios";
import "./Checkout.css"
import { API_URL } from "../../../Constants/API";
import { UncontrolledCollapse, Button, CardBody, Card, FormGroup, Label, Input, FormText } from 'reactstrap';
import { priceFormatter } from "../../../Supports/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { Link, Redirect } from "react-router-dom";

class Checkout extends React.Component {

    state = {
        transId: {
            id: 0,
            totalPrice: 0,
            grandTotal: 0,
            totalDuration: 0,
            status: "pending",
            paymentMethod: "",
            checkoutDate: "",
            approveDate: null,
            buktiTransfer: null,
            noPesanan: 0,
            attempt: 1,
            user: 0
        },
        noRek: 0,
        bank: "bni",
        selectedFile: null,

    } 
    componentDidMount() {
        this.getIdTrans()
    }

    getIdTrans = () => {
        let idTrans = this.props.match.params.idTrans;

        Axios.get(`${API_URL}/transaction/checkout/${idTrans}`)
        .then((res) => {
            console.log(res.data);
            this.setState({ transId: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    imageChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    uploadBuktiHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        formData.append("fieldData", JSON.stringify(this.state.transId))

        Axios.put(`${API_URL}/transaction/checkout/upload_file/${this.state.transId.id}`, formData)
            .then((res) => {
                console.log(res.data)
                // this.setState({ file: res.data })
                swal("berhasil upload gambar")
                // return <Redirect to="/history" />
            })
            .catch((err) => {
                console.log(err);
            });

            
        // console.log(this.state.formUser);
        // console.log(JSON.stringify(this.state.formUser));
    }



    render() {
        return (
            <div>
                <Alert color="success" className="mt-4">
                        1 Step lagi untuk menyelesaikan pesanan Anda, mohon ikuti langkah-langkah di bawah ini untuk melakukan proses payment !
                </Alert> 
                <div className="wrap-checkout" style={{ border: "solid 3px lightGray" }}>
                    {/* <div style={{ border: "solid 1px black" }}> */}
                            <div className="p-3" style={{ border: "solid 1px #e6e6e6", backgroundColor: "#e6e6e6", color: "#4d4d4d"}}>
                                <h4>Order #{this.state.transId.noPesanan}</h4>
                                <p className="small">Issue Date : {this.state.transId.checkoutDate}</p>
                            </div>
                        
                            <div className="d-flex">
                                <div className="col-6 mt-5">
                                    <h6 style={{ color: "#4d4d4d"}}>Total yang harus di bayar :</h6>
                                    <h2 style={{ color: "#336699"}}>{ priceFormatter(this.state.transId.grandTotal) }</h2>
                                    <Alert color="warning">
                                        <p style={{ fontSize: "12px"}}>Bayar Pesanan sesuai dengan jumlah di atas</p>
                                    </Alert> 
                                    <p style={{ color: "#4d4d4d" , fontSize: "14px", textAlign: "justify"}}>
                                        Dicek  dalam 24 jam setelah bukti transfer di upload, diwajibkan untuk membayar sesuai total pembayaran 
                                        termasuk biaya tambahan yang mungkin ditagihkan kepada anda. Mohon membayar sebelum batas waktu berakhir
                                    </p>
                                    <h6 className="mt-3" style={{ color: "#4d4d4d" , fontSize: "16px"}}>
                                        Pilih Bank :
                                    </h6>
                                    <div>
                                        {
                                            this.state.transId.paymentMethod == "transfer" ? (
                                            <>
                                            <FormGroup check className="mt-2">
                                                <Label check>
                                                    <Input
                                                        className="mt-3 mr-2"
                                                        type="radio"
                                                        name="bank"
                                                        value="bni"
                                                        onChange={() => this.setState({
                                                            noRek: "0397616123",
                                                            bank: "bni"
                                                        })}
                                                    />
                                                    <img className="mt-2" src={bni} alt="" style={{ width: "20%" }} />
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="mt-2">
                                                <Label check>
                                                    <Input
                                                        className="mt-3 mr-2"
                                                        type="radio"
                                                        name="bank"
                                                        value="bca"
                                                        onChange={() => this.setState({
                                                            noRek: "935-123-243",
                                                            bank: "bca"
                                                        })}
                                                    />
                                                    <img className="mt-2" src={bca} alt="" style={{ width: "20%" }} />
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="mt-2">
                                                <Label check>
                                                    <Input
                                                        className="mt-3 mr-2"
                                                        type="radio"
                                                        name="bank"
                                                        value="cimb"
                                                        onChange={() => this.setState({
                                                            noRek: "706-0453-453-300",
                                                            bank: "cimb"
                                                        })}
                                                    />
                                                    <img src={cimb} alt="" style={{ width: "30%" }} />
                                                </Label>
                                            </FormGroup>
                                            </>
                                            ) : this.state.transId.paymentMethod == "e-wallet" ? (
                                                <>
                                                <FormGroup check className="mt-2">
                                                    <Label check>
                                                        <Input
                                                            className="mt-3 mr-2"
                                                            type="radio"
                                                            name="bank"
                                                            value="ovo"
                                                            onChange={() => this.setState({
                                                                noRek: "081322192207",
                                                                bank: "Kickoff Sport Center"
                                                            })}
                                                        />
                                                        <img className="mt-2" src={ovo} alt="" style={{ width: "15%" }} />
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check className="mt-2">
                                                    <Label check>
                                                        <Input
                                                            className="mt-3 mr-2"
                                                            type="radio"
                                                            name="bank"
                                                            value="dana"
                                                            onChange={() => this.setState({
                                                                noRek: "081233399900",
                                                                bank: "Kickoff Sport Center"
                                                            })}
                                                        />
                                                        <img className="mt-2" src={dana} alt="" style={{ width: "25%" }} />
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check className="mt-2">
                                                    <Label check>
                                                        <Input
                                                            className="mt-4"
                                                            type="radio"
                                                            name="bank"
                                                            value="gopay"
                                                            onChange={() => this.setState({
                                                                noRek: "0812299900099",
                                                                bank: "gopay"
                                                            })}
                                                        />
                                                        <img className="mt-2" src={gopay} alt="" style={{ width: "20%" }} />
                                                    </Label>
                                                </FormGroup>
                                                </>
                                            ) :  this.state.transId.paymentMethod == "merchant" ? (
                                                <>
                                                <FormGroup check className="mt-2">
                                                    <Label check>
                                                        <Input
                                                            className="mt-3 mr-2"
                                                            type="radio"
                                                            name="bank"
                                                            value="alfa"
                                                            onChange={() => this.setState({
                                                                noRek: this.state.transId.noPesanan,
                                                                bank: this.state.transId.fullname
                                                            })}
                                                        />
                                                        <img className="mt-2" src={alfa} alt="" style={{ width: "20%" }} />
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check className="mt-2">
                                                    <Label check>
                                                        <Input
                                                            className="mt-3 mr-2"
                                                            type="radio"
                                                            name="bank"
                                                            value="indomaret"
                                                            onChange={() => this.setState({
                                                                noRek: this.state.transId.noPesanan,
                                                                bank: this.state.transId.user.fullname
                                                            })}
                                                        />
                                                        <img className="mt-2" src={indomaret} alt="" style={{ width: "20%" }} />
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check className="mt-2">
                                                    <Label check>
                                                        <Input
                                                            className="mt-3 mr-2"
                                                            type="radio"
                                                            name="bank"
                                                            value="alfamidi"
                                                            onChange={() => this.setState({
                                                                noRek: this.state.transId.noPesanan,
                                                                bank: this.state.transId.user.fullname
                                                            })}
                                                        />
                                                        <img src={alfamidi} alt="" style={{ width: "30%" }} />
                                                    </Label>
                                                </FormGroup>
                                                </>
                                            ) : null
                                        }
                                        
                                    </div>
                                </div> 
                                <div className="col-6 mt-5">
                                    <Table borderless>
                                        <tr style={{  color: "#4d4d4d" }}>
                                            <th style={{ width:"30%", backgroundColor: "white", color: "#4d4d4d" }}>No Rekening</th>
                                            <td>:</td>
                                            <td>{this.state.noRek}</td>
                                        </tr>
                                        <tr style={{  color: "#4d4d4d"}}>
                                            <th style={{ width:"30%", backgroundColor: "white", color: "#4d4d4d" }}>Nama Rekening</th>
                                            <td>:</td>
                                            <td>Kickoff Sport</td>
                                        </tr>
                                    </Table>
                                    <h6 className="mt-3 ml-3" style={{ color: "#4d4d4d" , fontSize: "16px"}}>
                                        Langkah - langkah :
                                    </h6>
                                    <ol style={{  textAlign: "justify" , fontSize: "14px" }}>
                                        <li className="mt-3 mr-3">Gunakan ATM / iBanking / mBanking / setor Tunai untuk transfer ke rekening KickOff Sport Center</li> 
                                        <li className="mt-3">Silahkan Upload bukti transfer dengan "klik" tombol "Saya Sudah Bayar" dibawah ini</li>
                                        <li className="mt-3">Demi keamanan transaksi, mohon untuk tidak membagikan bukti atau konfirmasi pemabayaran kepada siapapun, 
                                                                selain menggunggahnya via platform KickOff Sport Center
                                        </li>
                                    </ol>
                                    <Table bordered>
                                        <tr style={{  color: "#4d4d4d"}}>
                                                <th style={{ width:"40%", backgroundColor: "white", color: "#4d4d4d" }}>Upload Bukti Transfer</th>
                                                <td><input type="file" onChange={this.imageChangeHandler}/></td>
                                        </tr>
                                    </Table>
                                    <Link to="/history">
                                        <Button style={{ width: "100%", backgroundColor: "#336699" }}  onClick={this.uploadBuktiHandler}>
                                                <FontAwesomeIcon
                                                    className="mt-2 mr-2"
                                                    icon={faCamera}
                                                    style={{ fontSize: 18 }}
                                                />
                                            Upload
                                        </Button>
                                    </Link>
                                   
                                </div>
                            </div>
                    </div>
                </div>
            // </div>
        )
    }
}


export default Checkout;