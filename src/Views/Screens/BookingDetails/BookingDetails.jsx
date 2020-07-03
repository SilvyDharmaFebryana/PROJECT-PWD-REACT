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
import { Link, Redirect } from "react-router-dom";
import { WaveTopBottomLoading  } from 'react-loadingg';


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
            noPesanan: 0,
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
        idTrans: 0,
        willRedirect: false,
        totalPaket: 0,
        jenisPaket: 0,

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
                listBookingItem: res.data
            })
            // console.log(this.state.totalBayar);
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
       
        let userId =  this.props.user.id

        Axios.post(`${API_URL}/transaction/${userId}`, {
            noPesanan: new Date().getTime(),
            checkoutDate: new Date().toLocaleString(),
            paymentMethod: this.state.bookingTransaction.paymentMethod,
            status: "noPayment",
            totalDuration: this.state.bookingTransaction.totalDuration,
            totalPrice: this.state.bookingTransaction.totalPrice
        })
        .then((res) => {
            this.setState({ idTrans: res.data.id})
            console.log(res.data.id);
            
            this.state.listBookingItem.forEach((val) => {
                let fieldId = val.field.id
                let fieldTransactionId = res.data.id
                let bookingNumber = Math.floor(Math.random() * 1000000000000000);
                bookingNumber.toFixed(16)        

                Axios.post(`${API_URL}/transaction/details/${fieldId}/${fieldTransactionId}`, {
                    kodeBooking: bookingNumber,
                    bookingDate: val.date,
                    duration: val.duration,
                    time: val.time,
                    totalPrice: val.field.price
                })
                .then((res) => {
                    console.log(res.data.totalPrice)
                    this.setState({ totalBayar: res.data.totalPrice})
                })
                .catch((err) => {
                    console.log(err);
                })
            })

            this.setState({ willRedirect: true })
        })
        .then((res) => {     
            this.state.listBookingItem.forEach((val) => {
                this.deleteDataHandler(val.id)
                this.renderDetails()
            })
            swal (
                "Transaksi Sukses",
                "Transaksi anda sukses di proses",
                "success",
            )
        })
        .catch((err) => {
            console.log(err);
        });
    }


    componentDidMount() {
        this.getBookingListHandler()
   
    }


    renderDetails = () => {
        return this.state.listBookingItem.map((val) => {
            return (
                <tr style={{ height: "150px", fontSize: "13px", border: "solid 2px lightgray" }}>
                    <th className="th-tbl" style={{ width:"30%" }}>
                        <img className="mt-1" style={{ width: "100%" }} src={val.field.image} alt="" srcset=""/>
                        <h6 className="text-center mt-3" style={{ fontSize: "14px" }}>{val.field.fieldName}</h6>
                    </th>
                    
                    <td>
                        <tr style={{ height: "5px" }}>
                            <td>Tanggal Booking</td>
                            <td>:</td>
                            <td>{val.date}</td>
                        </tr>
                        <tr style={{ height: "5px" }}>
                            <td>Jam Booking</td>
                            <td>:</td>
                            <td>{val.time}</td>
                        </tr>
                        <tr style={{ height: "5px" }}>
                            <td>Durasi</td>
                            <td>:</td>
                            <td>{val.duration} jam</td>
                        </tr>
                        <tr style={{ height: "5px" }}>
                            <td>Total</td>
                            <td>:</td>
                            <td>{val.field.price}</td>
                        </tr>
                    </td>
                </tr>
         
            )
        })
    }


    render() {
        if (this.state.willRedirect) {
            return <Redirect to={`/checkout/${this.state.idTrans}`} />
        }
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
                <div className="row">
                        <div className="col-7">
                            <div className="ml-3 mt-2">
                                <Table bordered>
                                        {
                                            this.renderDetails()
                                        }
                                </Table>
                            </div>
                        
                        </div>
                        <div className="col-5">
                            <div className="header-detail">
                                <h5>Order Detail</h5>
                            </div>
                            <div className="table-user">
                                <div className="table-wrap">
                                    <Table borderless small>
                                        <tr>
                                            <th>Nama Pemesan</th>
                                            <td>:</td>
                                            <td>{this.state.bookingTransaction.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>:</td>
                                            <td>{this.state.bookingTransaction.email}</td>
                                        </tr>
                                        <tr>
                                            <th>No Tlp</th>
                                            <td>:</td>
                                            <td>+{this.state.bookingTransaction.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Metode Pembayaran</th>
                                            <td>:</td>
                                            <td>
                                                <select 
                                                    style={{ border: "none", width: "90%"}}   
                                                    onChange={(e) => this.inputHandler(e, "paymentMethod", "bookingTransaction")}
                                                >
                                                    <option value="transfer">Transfer Bank</option>
                                                    <option value="e-wallet">e-Wallet</option>
                                                    <option value="merchant">Merchant</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Total Bayar</th>
                                            <td>:</td>
                                            <td>{this.state.bookingTransaction.totalPrice}</td>
                                        </tr>
                                    </Table>
                                    <Button style={{width: "100%"}} onClick={this.checkoutBookingButtonHandler}>checkout</Button>
                                </div>
                               
                                    <div>
                                        
                                    </div>
                            </div>
                        </div>
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


