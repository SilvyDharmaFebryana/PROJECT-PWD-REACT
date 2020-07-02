import React from "react"
import "./BookingList.css"
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faStop, faCross, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Alert } from 'reactstrap'
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { connect } from 'react-redux'
import ButtonUI from "../../Components/Buttons/Buttons";
import { Link } from "react-router-dom";


class BookingList extends React.Component {

    state = {
        bookingTransactions: {},
        bookingListData: [],
        
    }

    getBookingList = () => {
        Axios.get(`${API_URL}/bField/user/`, {
            params: {
                user_id: this.props.user.id,
            }
        })
        .then((res) => {
            this.setState({ bookingListData: res.data})
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    componentDidMount() {
        this.getBookingList()
        console.log(this.props.user.id);
        
    }

    deleteDataHandler = (id) => {
        Axios.delete(`${API_URL}/bField/${id}`)
            .then((res) => {
                this.getBookingList()   
                // this.props.onFillCart(this.props.user.id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    renderBookingList = () => {
        return this.state.bookingListData.map((val, idx) => {
            let tanggal = val.date.split("T")[0]

            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>Lapangan {val.field.category}</td>
                    <td>{val.field.price}</td>
                    <td>{tanggal}</td>
                    <td>{val.time}</td>
                    <td> 
                        <FontAwesomeIcon
                            className="mt-1 mr-4 ml-3 fontawesome-icon"
                            icon={faTrashAlt}
                            style={{ fontSize: 18 }}
                            onClick={() => this.deleteDataHandler(val.id)}
                        /> 
                    </td>
                </tr>
            )
        })
    }


    render() {
        return(
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>
                            <h5 className="font-weight-bolder m-1">
                                <FontAwesomeIcon
                                    className="mt-2 mr-2"
                                    icon={faListAlt}
                                    style={{ fontSize: 18 }}
                                />  Your Booking List
                            </h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    {
                        this.state.bookingListData.length == 0 ? (
                            <Alert color="primary" className="mt-4">Your cart is empty! <Link to="/">Go Shopping</Link></Alert>
                        ) : 
                        <>
                        <div className="">
                                <center>
                                    <Table className="table-striped" style={{ width: "80%" }} >
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Item</th>
                                                <th>Harga</th>
                                                <th>Tanggal</th>
                                                <th>Jam</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.renderBookingList()
                                            }
                                        </tbody>
                                    </Table>
                                    <div className="mt-4">
                                        <Link to="/booking_details" style={{ color: "inherit", textDecoration: "none"}}><ButtonUI type="contained">Checkout</ButtonUI></Link>  
                                    </div>
                                </center>
                        </div>
                        
                        </>
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

export default connect(mapStateToProps)(BookingList);