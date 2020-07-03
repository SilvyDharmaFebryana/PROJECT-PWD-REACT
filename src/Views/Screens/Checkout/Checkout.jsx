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

class Checkout extends React.Component {

    state = {
        transId: [],
        noRek: 0,
        bank: "bni",

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



    render() {
        return (
            <div>
                <Alert color="success" className="mt-4">
                        1 Step lagi untuk menyelesaikan pesanan Anda, mohon ikuti langkah-langkah di bawah ini untuk melakukan proses payment !
                </Alert> 
                <div className="wrap" style={{ border: "solid 3px lightGray" }}>
                    {/* <div style={{ border: "solid 1px black" }}> */}
                            <div className="p-3" style={{ border: "solid 1px #e6e6e6", width: "100%", backgroundColor: "#e6e6e6", color: "#4d4d4d"}}>
                                <h4>Order #{this.state.transId.noPesanan}</h4>
                                <p className="small">Issue Date : {this.state.transId.checkoutDate}</p>
                            </div>
                        
                            <div className="d-flex">
                                <div className="col-6 mt-5">
                                    <h6 style={{ color: "#4d4d4d"}}>Total yang harus di bayar :</h6>
                                    <h2 style={{ color: "#336699"}}>{ priceFormatter(this.state.transId.totalPrice) }</h2>
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
                                                <td><input type="file" name="" id=""/></td>
                                        </tr>
                                    </Table>
                                    <Button style={{ width: "100%", backgroundColor: "#336699" }}>
                                            <FontAwesomeIcon
                                                className="mt-2 mr-2"
                                                icon={faCamera}
                                                style={{ fontSize: 18 }}
                                            />
                                        Upload
                                    </Button>
                                </div>
                            </div>
                    </div>
                </div>
            // </div>
        )
    }
}


export default Checkout



{/* <div>
<Table bordered>
    <tr>
        <th className="py-5" style={{ height: "10px", width: "30%" }}>Total Bayar</th>
        <td className="py-5" style={{ fontSize: "20px", fontWeight: "bold" }}>{this.state.transId.totalPrice}</td>
    </tr>
    <tr>
        <th className="py-4">Pilih Bank</th>
        <td className="d-flex justify-content-start" style={{ border: "none" }}>
            <FormGroup check>
                <Label check>
                    <Input
                        className="mt-3 mr-2"
                        type="radio"
                        name="bank"
                        value="bni"
                        onChange={() => this.setState({
                            transId: {
                                ...this.state.transId,
                                noRek: "0397616123",
                                bank: "bni"
                            }
                        })}
                    />
                    <img className="mt-2" src={bni} alt="" style={{ width: "50%" }} />
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                        className="mt-3 mr-2 ml-1"
                        type="radio"
                        name="bank"
                        value="bca"
                        onChange={() => this.setState({
                            transId: {
                                ...this.state.transId,
                                noRek: "935123243",
                                bank: "bca"
                            }
                        })}
                    />
                    <img className="mt-2 ml-4" src={bca} alt="" style={{ width: "35%" }} />
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                        className="mt-3 mr-2"
                        type="radio"
                        name="bank"
                        value="cimb"
                        onChange={() => this.setState({
                            transId: {
                                ...this.state.transId,
                                noRek: "7060453453300",
                                bank: "cimb"
                            }
                        })}
                    />
                    <img src={cimb} alt="" style={{ width: "30%" }} />
                </Label>
            </FormGroup>
        </td>
    </tr>
    <tr color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
        <th>No Rekening</th>
        <td className="d-flex" style={{ border: "none", borderTop: "solid 1px lightgrey", borderBottom: "solid 1px lightgrey" }}><p className="mr-2" style={{ textDecoration: "underline", color: "blue" }}>{this.state.transId.noRek}</p> (A/n Kickoff Sport Center)</td>
    </tr>
    <tr colSpan={2}>
        <UncontrolledCollapse toggler="#toggler">
            <Card>
                <CardBody>

                </CardBody>
            </Card>
        </UncontrolledCollapse>
    </tr>
    <tr>
        <th>Upload Bukti Transfer</th>
        <td>
            <input type="file" />
        </td>
    </tr>
</Table>
</div> */}