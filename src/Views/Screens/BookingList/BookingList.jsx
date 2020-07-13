import React from "react"
import "./BookingList.css"
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faStop, faCross, faTrashAlt, faProcedures, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Table } from 'reactstrap'
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { connect } from 'react-redux'
import ButtonUI from "../../Components/Buttons/Buttons";
import { Link } from "react-router-dom";
import { priceFormatter } from "../../../Supports/formatter";
import kosong from "../../../Assets/Images/icon-empty.png"


class BookingList extends React.Component {

    state = {
        bookingTransactions: {},
        bookingListData: [],
        checkoutItems: [],
        fieldImages: ""
        
    }

    checkboxHandler = (e, idx) => {
        const { checked } = e.target;
    
        if (checked) {
          this.setState({ checkoutItems: [...this.state.checkoutItems, idx] });
        } else {
          this.setState({
            checkoutItems: [
              ...this.state.checkoutItems.filter((val) => val !== idx),
            ],
          });
        }
    };

    getBookingList = () => {
        Axios.get(`${API_URL}/bField/user/`, {
            params: {
                user_id: this.props.user.id,
            }
        })
        .then((res) => {
            this.setState({ bookingListData: res.data})
            console.log(this.state.bookingListData.fieldId)
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    componentDidMount() {
        this.getBookingList()    
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
                <tr style={{ height: "100px", fontSize: "13px", border: "solid 2px lightgray" }}>
                    <th className="th-tbl" style={{ width:"50%" }}>
                        <img className="tengah-gambar" style={{ width: "50%" }} src={val.field.image} alt="" srcset=""/>
                        <h6 className="text-center mt-3" style={{ fontSize: "14px" }}>{val.field.fieldName}</h6>
                    </th>
                    
                    <td>
                        <tr>
                            <td>Tanggal Booking</td>
                            <td>:</td>
                            <td>{val.date}</td>
                        </tr>
                        <tr>
                            <td>Jam Booking</td>
                            <td>:</td>
                            <td>{val.time}</td>
                        </tr>
                        <tr>
                            <td>Durasi</td>
                            <td>:</td>
                            <td>{val.duration} jam</td>
                        </tr>
                        <tr style={{ fontWeight: "bold" }}>
                            <td>Total</td>
                            <td>:</td>
                            <td >{priceFormatter(val.field.price)}</td>
                         
                        </tr>
                        
                    </td>
                    <td>
                        <tr>
                            <td colSpan={8} className="d-flex">
                                <FontAwesomeIcon
                                    className="fontawesome-icon mr-2"
                                    icon={faTrashAlt}
                                    style={{ fontSize: 16 }}
                                    onClick={() => this.deleteDataHandler(val.id)}
                                /> <p  className="fontawesome-icon" style={{ fontSize: "13px" }}  onClick={() => this.deleteDataHandler(val.id)}>Remove from List</p>
                            </td>

                        </tr>
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
                                    className="mt-1 mr-2"
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
                            <div  className="icon-kosong text-center">
                                <div>
                                    <img style={{ width: "4%", height: "50px" }} src={kosong} alt="" srcset=""/>
                                </div>
                             
                               <Link className="link-home" to="/">Yuk cari Lapangan </Link>
                            </div>
                        ) :
                            <>
                            <div className="">
                                <Link to="/booking_details">
                                    <Button className="button-checkout">Checkout</Button>
                                </Link>
                                
                            </div>
                            <div className="wrap-tabel ml-4" >
                                <Table bordered>
                                    {
                                        this.renderBookingList()
                                    }
                                </Table>
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