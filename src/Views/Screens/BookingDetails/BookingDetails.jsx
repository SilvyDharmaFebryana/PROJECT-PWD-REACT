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
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { Table } from 'reactstrap';

class BookingDetails extends React.Component {

    state = {
        bookingTransaction: {
            userId: 0,
            fullName: "",
            gender: "",
            phoneNumber: 0,
            email: "",
            dateOfCheckout: "",
            dateOfCheckoutSuccess: "",
            status: "pending",
            totalDuration: 0,
            totalPayment: 0,
            bookingDate: 0,
            kodeBooking: 0,
        },
        transactionId: "",
        kodeBooking: "",
        fieldId: 0,
        fieldCategory: "",
        fieldPrice: "",
        fieldImage: "",
        jam: "",
        listBookingItem: []
    }


    getBookingListHandler = () => {
        let allTotalJam = 0
        let subTotal = 0

        Axios.get(`${API_URL}/bookingList`, {
            params: {
                userId: this.props.user.id,
                _expand: "field"
            }
        })
        .then((res) => {
            res.data.map((val) => {
                const { duration, field } = val
                const { price } = field
                allTotalJam += duration
                subTotal = allTotalJam * price
            })
            this.setState({
                bookingTransaction: {
                    ...this.state.bookingTransaction,
                    userId: this.props.user.id,
                    fullName: this.props.user.firstName + " " + this.props.user.lastName,
                    gender: this.props.user.gender,
                    phoneNumber: this.props.user.phone,
                    email: this.props.user.email,
                    dateOfCheckout: new Date().toLocaleString(),
                    totalDuration: allTotalJam,
                    totalPayment: subTotal,
                    bookingDate: res.data.date,
                },
                listBookingItem: res.data
            })
            console.log(this.state.bookingTransaction.fullName);
        })

        .catch((err) => {
            console.log(err);
            
        })
    }


    checkoutBookingButtonHandler = () => {

        let bookingNumber = Math.floor(Math.random() * 1000000000000000);
        bookingNumber.toFixed(16)

        Axios.get(`${API_URL}/bookingList`, {
            params: {
                userId: this.props.user.id,
                _expand: "field"
            }
        })
        .then((res) => {
            Axios.post(`${API_URL}/bookingTransactions`, {
                ...this.state.bookingTransaction,
                kodeBooking: bookingNumber
            })
            .then((res) => {
                this.state.listBookingItem.map((val) => {
                    this.deleteDataHandler(val.id)
                    Axios.post(`${API_URL}/bookingDetailsTransactions`, {
                        transactionId: res.data.id,
                        fieldId: val.field.id,
                        fieldCategory: val.field.category,
                        fieldPrice: val.field.price,
                        jam: val.jam,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);                      
                    })
                })
                swal("Transaction Success!", "Your transaction has been processed", "success")
            })
            .catch((err) => {
                console.log(err); 
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }


    componentDidMount() {
        this.getBookingListHandler()
    }


    deleteDataHandler = (id) => {
        Axios.delete(`${API_URL}/bookingList/${id}`)
            .then((res) => {
                this.getBookingList()
                // this.props.onFillCart(this.props.user.id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                                <th>Total Payment</th>
                                <td>{this.state.bookingTransaction.totalPayment}</td>
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
                                                <th>Jam</th>
                                                <th>Biaya / jam</th>

                                            </tr>
                                        </thead>
                                        {
                                            this.state.listBookingItem.map((val) => {
                                                return (
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img src={val.field.image} style={{ width: "100px" }} />
                                                        </td>
                                                        <td>{val.field.category}</td>
                                                        <td>{val.field.type}</td>
                                                        <td>{val.date}</td>
                                                        <td>{val.jam}</td>
                                                        <td>{val.field.price}</td>
                                                        <td>x</td>
                                                        <td>{val.duration} /jam</td>
                                                        <td>{val.duration * val.field.price}</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                                )
                                            })
                                        }
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                        </UncontrolledCollapse>       
                        </div>
                    </div>
                    </center>
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

