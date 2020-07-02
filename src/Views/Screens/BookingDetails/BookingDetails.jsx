import React from "react"
import "./BookingDetails.css"
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { connect } from 'react-redux'
import ButtonUI from "../../Components/Buttons/Buttons";
import swal from 'sweetalert'
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faListOl, faListUl } from "@fortawesome/free-solid-svg-icons";
import { UncontrolledCollapse, Button, CardBody, Card, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import cimb from "../../../Assets/Images/BankLogo/cimb.png"
import bni from "../../../Assets/Images/BankLogo/bni.png"
import bca from "../../../Assets/Images/BankLogo/bca.png"

class BookingDetails extends React.Component {

    state = {
        bookingTransaction: {
            userId: 0,
            fullName: "",
            gender: "",
            phoneNumber: 0,
            email: "",
            checkoutDate: "",
            approveDate: "",
            status: "pending",
            totalDuration: 0,
            totalPrice: 0,
            bookingDate: 0,
            kodeBooking: 0,
            paymentMethod: "transfer",
            bank: "",
            noRek: null
        },
        transactionId: "",
        kodeBooking: "",
        fieldId: 0,
        fieldCategory: "",
        fieldPrice: "",
        fieldImage: "",
        jam: "",
        listBookingItem: [],
        listTrans: [],
        totalBayar: 0,
        
    }


    getBookingListHandler = () => {
        let allTotalJam = 0
        let subTotal = 0

        Axios.get(`${API_URL}/bField/user/`, {
            params: {
                user_id: this.props.user.id,
            }
        })
        .then((res) => {
            console.log(res.data);
            res.data.map((val) => {
                const { duration, field } = val
                const { price } = field
                allTotalJam += duration
                subTotal += duration * price
            })
            this.setState({
                bookingTransaction: {
                    ...this.state.bookingTransaction,
                    userId: this.props.user.id,
                    fullName: this.props.user.firstname + " " + this.props.user.lastname,
                    gender: this.props.user.gender,
                    phoneNumber: this.props.user.phoneNumber,
                    email: this.props.user.email,
                    totalDuration: allTotalJam,
                    totalPrice: subTotal,
                    bookingDate: res.data.date,
                },
                listBookingItem: res.data,
                totalBayar: subTotal
            })
            console.log(this.state.totalBayar);
        })

        .catch((err) => {
            console.log(err);
            
        })
    }

    deleteDataHandler = (id) => {
        Axios.delete(`${API_URL}/bField/${id}`)
            .then((res) => {
                this.getBookingListHandler()   
                // this.props.onFillCart(this.props.user.id);
            })
            .catch((err) => {
                console.log(err);
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



    checkoutBookingButtonHandler = () => {
        
        let bookingNumber = Math.floor(Math.random() * 1000000000000000);
        bookingNumber.toFixed(16)

        let userId =  this.props.user.id

        Axios.post(`${API_URL}/transaction/${userId}`, {
            kodeBooking: bookingNumber,
            checkoutDate: new Date().toLocaleString(),
            paymentMethod: this.state.bookingTransaction.paymentMethod,
            status: "pending",
            totalDuration: this.state.bookingTransaction.totalDuration,
            totalPrice: this.state.bookingTransaction.totalPrice
        })
        .then((res) => {
            this.state.listBookingItem.forEach((val) => {

                let fieldId = val.field.id
                let fieldTransactionId = res.data.id

                Axios.post(`${API_URL}/transaction/details/${fieldId}/${fieldTransactionId}`, {
                    bookingDate: val.date,
                    duration: val.duration,
                    time: val.time,
                    totalPrice: val.field.price
                })
                .then((res) => {
                    console.log(res.data);

                    Axios.get(`${API_URL}/transaction/${fieldTransactionId}`)
                        .then((res) => {
                            this.setState({ totalBayar: res.data.totalPrice })
                            console.log(this.state.totalBayar);  
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                })
                .catch((err) => {
                    console.log(err);
                })
            
            })
        })
        .then((res) => {     
            this.state.listBookingItem.forEach((val) => {
                this.deleteDataHandler(val.id)
                this.renderDetails()
            })
            swal("succes")
        })
        .catch((err) => {
            console.log(err);
        });
    }


    componentDidMount() {
        this.getBookingListHandler()
        console.log(this.state.totalBayar);
        
    }


    renderDetails = () => {
        return this.state.listBookingItem.map((val) => {
            return (
            <tbody>
                <tr>
                    <td>
                        <img src={val.field.image} style={{ width: "100px" }} />
                    </td>
                    <td>{val.field.category}</td>
                    <td>{val.field.type}</td>
                    <td>{val.date}</td>
                    <td>{val.time}</td>
                    <td>{val.field.price}</td>
                    <td>x</td>
                    <td>{val.duration} /jam</td>
                    <td>{val.duration * val.field.price}</td>
                </tr>
            </tbody>
            )
        })
    }


    render() {
        return (
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>
                            <h5 className="font-weight-bolder m-1">
                                <FontAwesomeIcon
                                    className="mt-2 mr-2"
                                    icon={faListUl}
                                    style={{ fontSize: 18 }}
                                />  Your Booking Details
                            </h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    
                        {
                            this.state.listBookingItem.length == 0 ? (
                                <>
                                    <Alert color="success" className="mt-4">
                                        Pesanan anda sedang di proses, mohon ikuti langkah-langkah di bawah ini untuk melakukan proses payment !
                                    </Alert>
                                    <div>
                                        <Table bordered>
                                            <tr>
                                                <th className="py-5" style={{ height: "10px", width: "30%" }}>Total Bayar</th>
                                                <td className="py-5" style={{ fontSize: "20px", fontWeight: "bold"}}>{this.state.totalBayar}</td>
                                            </tr> 
                                            <tr>
                                                <th className="py-4">Pilih Bank</th>
                                                <td className="d-flex justify-content-start" style={{ border: "none"}}>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input 
                                                                className="mt-3 mr-2" 
                                                                type="radio" 
                                                                name="bank" 
                                                                value="bni"
                                                                onChange={() => this.setState({ bookingTransaction: {
                                                                                                ...this.state.bookingTransaction,
                                                                                                noRek: "0397616123",
                                                                                                bank: "bni"
                                                                                            }})}
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
                                                                onChange={() => this.setState({ bookingTransaction: {
                                                                                                ...this.state.bookingTransaction,
                                                                                                noRek: "935123243",
                                                                                                bank: "bca"
                                                                                            }})}
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
                                                                onChange={() => this.setState({ bookingTransaction: {
                                                                                                ...this.state.bookingTransaction,
                                                                                                noRek: "7060453453300",
                                                                                                bank: "cimb"
                                                                                            }})}
                                                            />
                                                            <img src={cimb} alt="" style={{ width: "30%"}} />
                                                        </Label>
                                                    </FormGroup>
                                                </td>
                                            </tr>  
                                            <tr color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                                                <th>No Rekening</th>
                                                <td className="d-flex" style={{ border: "none", borderTop: "solid 1px lightgrey", borderBottom: "solid 1px lightgrey"}}><p className="mr-2" style={{ textDecoration: "underline", color: "blue" }}>{this.state.bookingTransaction.noRek}</p> (A/n Kickoff Sport Center)</td>
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
                                                    <input type="file"/>
                                                </td>
                                            </tr>                                
                                        </Table>
                                    </div>
                                   
                                </>
                            ) :
                        <center>
                            <div>
                                <Table bordered>
                                    <tr>
                                        <th>Nama Pemesan</th>
                                        <td>{this.state.bookingTransaction.fullName}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{this.state.bookingTransaction.email}</td>
                                    </tr>
                                    <tr>
                                        <th>No Tlp</th>
                                        <td>+{this.state.bookingTransaction.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Bayar</th>
                                        <td>{this.state.bookingTransaction.totalPrice}</td>
                                    </tr>
                                    <tr>
                                        <th>Metode Pembayaran</th>
                                        <td>
                                            <select 
                                                style={{ border: "none", width: "50%"}}   
                                                onChange={(e) => this.inputHandler(e, "paymentMethod", "bookingTransaction")}
                                            >
                                                <option value="transfer">Transfer Bank</option>
                                                <option value="onthespot">On the Spot</option>
                                            </select>
                                        </td>
                                    </tr>
                                    
                                </Table>
                                <div>
                                <h6 className="detail" color="primary" id="toggler" style={{ marginBottom: '1rem' }}>Lihat Detail</h6>
                                <UncontrolledCollapse toggler="#toggler">
                                <Card>
                                    <CardBody>
                                        <div className="d-flex justify-content-center">
                                            <Table className="justify-content-center">
                                                <thead>
                                                    <tr>
                                                        <th sty>Image</th>
                                                        <th>Lapangan</th>
                                                        <th>Tipe</th>
                                                        <th>Tanggal</th>
                                                        <th>Jam</th>
                                                        <th>Biaya / jam</th>
                                                        <th>{"  "}</th>
                                                        <th>Durasi</th>
                                                        <th>Total Biaya</th>

                                                    </tr>
                                                </thead>
                                                {
                                                    this.renderDetails()
                                                }
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                                <ButtonUI className="mt-2" onClick={this.checkoutBookingButtonHandler}>Checkout</ButtonUI>
                                </UncontrolledCollapse>       
                                </div>
                            </div>
                        </center>
                        }
                   
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(BookingDetails) ;

