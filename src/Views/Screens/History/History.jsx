import React from "react"
import { Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faExclamationCircle, faDownload, faFileDownload, faTicketAlt, faCamera } from "@fortawesome/free-solid-svg-icons";
import { Table, Alert, Button } from 'reactstrap'; 
import { Link, Redirect } from "react-router-dom";
import "./History.css"
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { priceFormatter } from "../../../Supports/formatter";
import swal from "sweetalert";
import { connect } from "react-redux";

class History extends React.Component {

    state = {
        activePage: "sudah",
        noPaymentList: [],
        noPaymentJlm : 0,
        pendingList: [],
        pendingJlm: 0,
        suksesList: [],
        suksesJlm: 0,
        declineList: [],
        declineJlm: 0,
        gagalList: [],
        activeProducts: [],
        editForm: {
            id: 0,
            totalPrice: "",
            totalDuration: "",
            status: "pending",
            paymentMethod: "",
            checkoutDate: "",
            approveDate: "",
            buktiTransfer: "",
            noPesanan: "",
            attempt: 2,
            notif: null,
            user_id: 0
        },
        selectedFile: null,
        modalEditOpen: false,
        taskList: [],
        currentPage : 0,
        listPerPage : 4,
        // targetPage: 0,
        totalPages: 0,
        totalElements: 0

    }
    //=========================================================== Get Status ====================================================================================
    getNoPaymentStatus = () => {
        Axios.get(`${API_URL}/transaction/none/`, {
            params: {
                status: "noPayment",
                user_id: this.props.user.id
            }
        })
            .then((res) => {
                this.setState({ 
                    noPaymentList: res.data,
                    noPaymentJlm: res.data.length
            })
                console.log(res.data);
                this.renderList()
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getPendingStatus = () => {
        Axios.get(`${API_URL}/transaction/pending/`, {
            params: {
                status: "pending",
                user_id: this.props.user.id
            }
        })
            .then((res) => {
                this.setState({ 
                    pendingList: res.data,
                    pendingJlm: res.data.length
                })
                console.log(res.data);
                this.getPendingStatus()
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getSuksesStatus = () => {
        Axios.get(`${API_URL}/transaction/sukses/`, {
            params: {
                status: "approve",
                user_id: this.props.user.id
            }
        })
            .then((res) => {
                this.setState({ 
                    suksesList: res.data,
                    suksesJlm: res.data.length
                })
                console.log(res.data);
                this.getSuksesStatus()
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getUploadUlang = () => {
        Axios.get(`${API_URL}/transaction/decline/`, {
            params: {
                status: "decline",
                user_id: this.props.user.id
            }
        })
            .then((res) => {
                this.setState({ 
                    declineList: res.data,
                    declineJlm: res.data.length
                })
                console.log(res.data);
                this.getUploadUlang()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getGagalStatus = () => {
        Axios.get(`${API_URL}/transaction/gagal/`, {
            params: {
                status: "failed",
                user_id: this.props.user.id
            }
        })
            .then((res) => {
                this.setState({ gagalList: res.data })
                console.log(res.data);
                this.getGagalStatus()
                
            })
            .catch((err) => {
                console.log(err);
            })
    }


    //========================================================================================================================================================

    // getDetailsPending = () => {
    //     Axios.get(`${API_URL}/transaction/details/trans/`,{
    //         params: {
    //             field_transactions_id: this.state.idPending
    //         }
    //     })
    //     .then((res) => {
    //         this.setState({ detailsPending: res.data })
    //         console.log(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }
    

    //========================================================= Upload Gambar Ulang ==========================================================================
    uploadUlangButtonHandler = (idx) => {
        this.setState({
            editForm: {
                ...this.state.declineList[idx],
            },
            modalEditOpen: true,
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

    toggleEdit = () => this.setState({ modalEditOpen: !this.state.modalEditOpen });

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };


    uploadUlangHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        formData.append("transData", JSON.stringify(this.state.editForm));
        Axios.put(
          `${API_URL}/transaction/${this.state.editForm.id}`,
          formData
        )
          .then((res) => {
            swal("Success!", "Berhasil Kirim Ulang Bukti Transaksi", "success");
            this.getGagalStatus()
            this.setState({ modalEditOpen: false})
          })
          .catch((err) => {
            swal("Error!", "Gagal Mengirim Ulang", "error");
            console.log(err);
          });
    };

    //=========================================================================================================================================================

    componentDidMount() {
        this.getPendingStatus()
        // this.getDetailsPending()
        this.getNoPaymentStatus()
        this.getSuksesStatus()
        this.getUploadUlang()
        console.log(this.props.user.id)
    }

    renderList = () => {
        const { activePage } = this.state;
        if (activePage === "belum") {
            // this.getNoPaymentStatus()
            return this.state.noPaymentList.map((val, idx) => {
                return (
                    <>
                    <tr>    
                        <td>{idx + 1}</td>
                        <td>{val.checkoutDate}</td>
                        <td>Order #{val.noPesanan}</td>
                        <td>{priceFormatter(val.totalPrice)}</td>
                        <td>{val.status}</td>
                        <td><Link to={`/checkout/${val.id}`}><Button>Bayar</Button></Link></td>
                    </tr>
                    </>
                )
            })
        } else if (activePage === "sudah") {
            // this.getPendingStatus()
            return this.state.pendingList.map((val, idx) => {
                return (
                   <>
                    <tr>    
                        <td>{idx + 1}</td>
                        <td>{val.checkoutDate}</td>
                        <td>Order #{val.noPesanan}</td>
                        <td>{priceFormatter(val.totalPrice)}</td>
                        <td>{val.status}</td>
                        <td style={{ width: "25%" }}>
                            <Alert color="warning">
                                <p style={{ fontSize: "10px" }}> 
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faExclamationCircle}
                                    style={{ fontSize: 15 }}
                                />  
                                Sedang dilakukan pengecekan oleh admin, Mohon menunggu</p>
                            </Alert>
                        </td>
                    </tr>
                    </>
                )
            })
        } else if (activePage === "sukses") {
            // this.getSuksesStatus()
            return this.state.suksesList.map((val, idx) => {
                return (
                   <>
                    <tr>    
                        <td>{idx + 1}</td>
                        <td>{val.checkoutDate}</td>
                        <td>Order #{val.noPesanan}</td>
                        <td>{priceFormatter(val.totalPrice)}</td>
                        {/* <td>{val.status}</td> */}
                        <td style={{ width: "15%" }}>
                            <Alert color="success">
                                <p style={{ fontSize: "12px" }}>Transaksi sukses</p>
                            </Alert>
                        </td>
                        <td className="text-center"> 
                            <Link to={`/e-ticket/${val.id}`} className="d-flex ngelink">
                                <FontAwesomeIcon
                                    className="mr-2 mt-1 ml-5"
                                    icon={faTicketAlt}
                                    style={{ fontSize: 25 }}
                                /> <p className="mt-1">e-Ticket</p>
                            </Link>
                        </td>
                    </tr>
                    </>
                )
            })
        } else if (activePage === "ditolak") {
            // this.getSuksesStatus()
            return this.state.declineList.map((val, idx) => {
                return (
                   <>
                    <tr>    
                        <td>{idx + 1}</td>
                        <td>{val.checkoutDate}</td>
                        <td>Order #{val.noPesanan}</td>
                        <td>{priceFormatter(val.totalPrice)}</td>
                        <td style={{ width: "15%" }}>
                            <Alert color="danger">
                                <p style={{ fontSize: "12px" }}>Transaksi anda di tolak, karena gambar atau bukti transfer rusak / nominal tidak sesuai </p>
                            </Alert>
                        </td>
                        <td>
                            <FontAwesomeIcon
                                    className="mr-2 mt-3 ml-1"
                                    icon={faCamera}
                                    style={{ fontSize: 15 }}
                                    onClick={(_) => this.uploadUlangButtonHandler(idx)}
                            /> Re-Upload
                        </td>
                    </tr>
                    </>
                )
            })
        }
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
                                    icon={faHistory}
                                    style={{ fontSize: 18 }}
                                />  History 
                            </h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="wrap-history">
                <div>
                    <Table borderless style={{ width: "40%"}}>
                            <thead>
                                <tr>
                                    <th 
                                        className={`filter ${this.state.activePage == "belum" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "belum" })}
                                    > 
                                        <p>{this.state.noPaymentJlm}</p>
                                        Belum Bayar
                                        
                                    </th>
                                    <th 
                                        className={`filter ${this.state.activePage == "sudah" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "sudah" })}
                                    > 
                                        <p>{this.state.pendingJlm}</p>
                                        Sudah Bayar
                                    </th>
                                    <th 
                                        className={`filter ${this.state.activePage == "sukses" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "sukses" })}
                                    > 
                                        <p>{this.state.suksesJlm}</p>
                                        Sukses
                                    </th>
                                    <th 
                                        className={`filter ${this.state.activePage == "ditolak" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "ditolak" })}
                                    >   
                                        <p style={{ color: "red", fontWeight: "bold" }}>{this.state.declineJlm}</p>
                                        Ditolak
                                    </th>
                                </tr>
                            </thead>
                    </Table>
                    </div>
                    <div className="text-center">
                    <Table> 
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date Issue</th>
                                <th>No Pesanan</th>
                                <th>Total Bayar</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.renderList()
                            }
                        </tbody>
                    </Table>
                    </div>
                    <div>
                    <Modal
                    toggle={this.toggleEdit}
                    isOpen={this.state.modalEditOpen}
                    className="edit-modal"
                >
                    <ModalHeader toggle={this.toggleEdit}>                    
                            <h3>Upload Ulang Gambar</h3>

                    </ModalHeader>
                    <ModalBody>
                                <div className="row">
                                    <div className="col-6">
                                        No Pesanan
                                        <input
                                            className="text-input-toggle"
                                            type="text"
                                            value={this.state.editForm.noPesanan}
                                            placeholder="noPesanan"
                                            onChange={(e) =>
                                                this.inputHandler(e, "noPesanan", "editForm")
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="col-6">
                                        Checkout Date
                                        <input
                                            className="text-input-toggle"
                                            type="text"
                                            value={this.state.editForm.checkoutDate}
                                            placeholder="checkoutDate"
                                            onChange={(e) =>
                                                this.inputHandler(e, "checkoutDate", "editForm")
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="col-6">
                                        Total Harga
                                        <input
                                            className="text-input-toggle"
                                            type="text"
                                            value={this.state.editForm.totalPrice}
                                            placeholder="totalPrice"
                                            onChange={(e) =>
                                                this.inputHandler(e, "totalPrice", "editForm")
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="col-6">
                                        Total Durasi
                                        <input
                                            className="text-input-toggle"
                                            type="text"
                                            value={this.state.editForm.totalDuration}
                                            placeholder="totalDuration"
                                            onChange={(e) =>
                                                this.inputHandler(e, "totalDuration", "editForm")
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="col-4">
                                        Payment Method
                                        <input
                                            className="text-input-toggle"
                                            type="text"
                                            value={this.state.editForm.paymentMethod}
                                            placeholder="paymentMethod"
                                            onChange={(e) =>
                                                this.inputHandler(e, "paymentMethod", "editForm")
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="col-4">
                                        Status
                                        <input
                                            className="text-input-toggle"
                                            type="text"
                                            value={this.state.editForm.status}
                                            placeholder="status"
                                            onChange={(e) =>
                                                this.inputHandler(e, "status", "editForm")
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="col-4">
                                        Attempt
                                        <input
                                            className="text-input-toggle"
                                            type="text"
                                            value={this.state.editForm.attempt}
                                            placeholder="attempt"
                                            onChange={(e) =>
                                                this.inputHandler(e, "attempt", "editForm")
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="col-12 mt-2 text-center">
                                        <div className="upload-ulang">
                                        <FontAwesomeIcon
                                                className="mr-2 mt-3 ml-1"
                                                icon={faCamera}
                                                style={{ fontSize: 50 }}
                                             
                                        />
                                            <input
                                                className="ml-5 mt-2"
                                                type="file"
                                                placeholder="gambar"
                                                onChange={this.fileChangeHandler}
                                            />
                                        </div>
                                        
                                    </div>

                                </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex mr-2">
                            <Button className="button-edit mr-1" onClick={this.uploadUlangHandler}>Upload</Button>
                            <Button color="secondary" style={{ borderRadius: "2px", height: "40px" }} onClick={this.toggleEdit}>Close</Button>
                        </div>
                  </ModalFooter>
                </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };



  export default connect(mapStateToProps)(History);