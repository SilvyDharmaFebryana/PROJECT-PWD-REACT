import React from "react"
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Alert } from 'reactstrap'
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { connect } from 'react-redux'
import ButtonUI from "../../Components/Buttons/Buttons";


class BookingList extends React.Component {

    state = {
        bookingTransactions: {},
        bookingListData: [],
        
    }

    getBookingList = () => {
        Axios.get(`${API_URL}/bookingList`, {
            params: {
                userId: this.props.user.id,
                _expand: "field"
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

    renderBookingList = () => {
        return this.state.bookingListData.map((val, idx) => {
            let tanggal = val.date.get
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>Lapangan {val.field.category}</td>
                    <td>{val.field.price}</td>
                    <td>{val.date}</td>
                    <td>{val.jam}</td>
                    <td><ButtonUI type="textual" onClick={() => this.deleteDataHandler(val.id)}>Delete</ButtonUI> </td>
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
                <div className="table">
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

export default connect(mapStateToProps)(BookingList);