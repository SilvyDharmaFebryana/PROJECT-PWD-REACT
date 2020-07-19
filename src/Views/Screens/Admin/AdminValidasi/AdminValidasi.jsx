import React from "react"
import Axios from "axios"
import { API_URL } from "../../../../Constants/API"
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl, Breadcrumb, BreadcrumbItem, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchInputHandler } from "../../../../Redux/Actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "react-datepicker";

class Validasi extends React.Component{

    state= {
        bookingList: [],
        userId: 0,
        checkinData: {
            checkin: true,
            todayDate: new Date().toLocaleDateString()
        },
        modalOpen: false,
    }

    getAllBookingList = () => {
        Axios.get(`${API_URL}/transaction/details/validasi/`,  {
            params: {
                booking_date: this.state.checkinData.todayDate,
                status: "approve"
            }
        })
        .then((res) => {
            this.setState({ bookingList: res.data })
            console.log(this.state.bookingList)
        })
        .then((err) => {
            console.log(err);
            
        })
    }

    componentDidMount() {
        this.getAllBookingList()
        // console.log(this.bookingList.id)
    }

    setDataCheckin = (idx) => {
        this.setState({
            checkinData: {
                ...this.state.bookingList[idx],
            },
            modalOpen: true,
        });
    }

    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

    isCheckin = () => {
        Axios.put(`${API_URL}/transaction/details/validasi/checkin/${this.state.checkinData.id}`,{
            isCheckin : true
        })
        .then((res) => {
            Axios.post(`${API_URL}/notif/${this.state.checkinData.user.id}/${this.state.checkinData.id}/${this.state.checkinData.field.id}`, {
                notif: "done"
            })
            .then((res) => {
                swal(
                    "Checkin !",
                    "",
                    "success"
                )
               
            })
            .catch((err) => {
                console.log(err);
                
            })
            this.setState({ modalOpen: false})
            this.getAllBookingList()
        
        })
        .catch((err) => {
            swal(
                "Gagal Checkin !",
                "",
                "error"
            )
        })
        
    }

    renderValidasi = () => {
        return this.state.bookingList.map((val, idx) => {
            if (val.kodeBooking.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                return (
                    <tbody>
                        <tr>
                            {/* <td>{val.id}</td> */}
                            <td>{val.kodeBooking}</td>
                            {/* <td>{val.bookingDate}</td> */}
                            <td>{val.time}</td>
                            <td>{val.field.fieldName}</td>
                            <td>{val.user.username}</td>
                            <td style={{ width: "10%"}}>
                                <Button onClick={(_) => this.setDataCheckin(idx)}>Check-In</Button>
                            </td>
                        </tr>
                    </tbody>
                )
            }
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
                                    icon={faCheckCircle}
                                    style={{ fontSize: 18 }}
                                /> All Transactions List 
                            </h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="d-flex">
                        <FontAwesomeIcon
                            className="mt-1 mr-3 mb-3 ml-5"
                            icon={faSearch}
                            style={{ fontSize: 23, color: "#003cb3" }}
                        />
                        <input
                            className="mr-5 mb-3 input-search"
                            type="text"
                            placeholder="Kode Booking"
                            onChange={(e) => this.props.onSearch(e.target.value)}
                        />

                </div>

                <div className="table-list-margin">
                <Table style={{ width: "97%" }}>
                    <thead>
                        <tr>
                            <th>Kode Booking</th>
                            <th>Tanggal Booking</th>
                            <th>Jam</th>
                            <th>Lapangan</th>
                            <th>Username</th>
                            <th></th>
                        </tr>
                    </thead>
                        {
                            this.renderValidasi()
                        }
                </Table>
                </div>
                <div>
                    <Modal
                        toggle={this.toggleModal}
                        isOpen={this.state.modalOpen}
                        className="edit-modal"
                    >
                        <ModalHeader toggle={this.toggleEdit}>
                            <div>
                                <h3>{this.state.checkinData.kodeBooking}</h3>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <h6>Booking Date: {this.state.checkinData.bookingDate}</h6>
                                <h6>Jam: {this.state.checkinData.time}</h6>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex mr-2">
                                <Button color="success" className="button-edit mr-1" onClick={this.isCheckin}>Approve</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        search: state.search
    };
};

const mapDispatchToProps = {
    onSearch: searchInputHandler,

  };

export default connect(mapStateToProps, mapDispatchToProps)(Validasi)