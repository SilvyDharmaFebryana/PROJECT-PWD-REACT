import React from "react"
import { Breadcrumb, BreadcrumbItem, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./AdminTask.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTasks, faCheck } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import ButtonUI from "../../../Components/Buttons/Buttons";
import { priceFormatter } from "../../../../Supports/formatter";
import swal from "sweetalert";
import { faStar } from "@fortawesome/free-regular-svg-icons";

class AdminTask extends React.Component{

    state = {
        pendingListAdmin: [],
        approveForm: {
            status: "",
            approveDate: "",
        },
        modalOpen: false,
    }

    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

    getAdminPendingList = () => {
        Axios.get(`${API_URL}/transaction/pending`, {
            params: {
                status: "pending"
            }
        })
            .then((res) => {
                this.setState({ pendingListAdmin: res.data })
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    seeImage = (idx) => {
        this.setState({
            approveForm: {
                ...this.state.pendingListAdmin[idx],
            },
            modalOpen: true,
        });
    };

    approveHandler = () => {
        Axios.put(`${API_URL}/transaction/admin/approve/${this.state.approveForm.id}`, {
            status: this.state.approveForm.status,
            approveDate: new Date().toLocaleString()
        })
        .then((res) => {
            swal("Approved!", "Transaksi Sukses", "success");
            this.setState({ modalOpen: false });
            this.getAdminPendingList()
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    componentDidMount() {
        this.getAdminPendingList()
    }

    renderPendingListAdmin = () => {      
        return this.state.pendingListAdmin.map((val, idx) => {
            return (
                <tbody>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.checkoutDate}</td>
                        <td>{val.noPesanan}</td>
                        <td>{val.user.username}</td>
                        <td>{val.paymentMethod}</td>
                        <td>{priceFormatter(val.totalPrice)}</td>
                        <td><Button style={{ height: "30px", fontSize: "12px"}} onClick={(_) => this.seeImage(idx)}>Bukti</Button></td>
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
                                    icon={faTasks}
                                    style={{ fontSize: 18 }}
                                /> Admin Task
                            </h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row rules ml-3">
                    <div className="col-3">                      
                        <div className="text-center rules-header">
                            <h5>Admin Rules</h5>
                        </div>
                        <div className="rules-in">                          
                            <Table>
                                <tr>
                                    <td style={{ width: "10%" }}>1.</td>
                                    <td style={{fontSize: "12px"}}>Periksa Bukti Transfer yang tertera</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "10%" }}>2.</td>
                                    <td style={{fontSize: "12px"}}>Pastikan bahwa kriteria dibawah ini sudah memenuhi :
                                        <ul>
                                            <li>Nomor Transaksi terlihat jelas</li>
                                            <li>Fisik Jelas / Tidak Buram / Tidak Kusut</li>
                                            <li>Nama dan No Rekening sesuai</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "10%" }}>3.</td>
                                    <td style={{fontSize: "12px"}} >Periksa Nominal yang di Transfer dengan yang yang di tagihkan</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "10%" }}>4.</td>
                                    <td style={{fontSize: "12px"}}>Jika semua sudah sesuai makan click button "Approve"</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "10%" }}>5.</td>
                                    <td style={{fontSize: "12px"}}>Jika Bukti Transfer tidak memenuhi kriteria maka click button "Decline"</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "10%" }}>6.</td>
                                    <td style={{fontSize: "12px"}}>Happy Working !!</td>
                                </tr>
                            </Table>
                        </div>
                    </div>
                    <div className="col-8 ml-5">
                       <Table>
                           <thead>
                               <tr>
                                   <th>No</th>                                            
                                   <th>Date Issue</th>
                                   <th>Oder Number</th>
                                   <th>Username</th>
                                   <th>Payment Method</th>
                                   <th>Nominal</th>
                                   <th>Action</th>
                               </tr>
                           </thead>
                           {   
                                this.state.pendingListAdmin.length === 0 ? (
                                    
                                    <div className="p-5">
                                    <FontAwesomeIcon
                                        className="mt-2 mr-2"
                                        icon={faCheck}
                                        style={{ fontSize: 50, color:"green" }}
                                    /> ALL TASK DONE
                                    </div>
                                    
                                ) : this.renderPendingListAdmin()
                           }
                       </Table>
                    </div>
                        {/* {
                            this.state.pendingListAdmin.map((val, idx) => {
                                return ( */}
                                    <Modal
                                        toggle={this.toggleModal}
                                        isOpen={this.state.modalOpen}
                                        className="edit-modal"
                                    >
                                        <ModalHeader toggle={this.toggleEdit}>
                                            <div>   
                                                <h3>Order #{this.state.approveForm.noPesanan}</h3>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody>
                                            <div>
                                                <img src={this.state.approveForm.buktiTransfer} style={{ height: "350px", width: "100%" }}/>
                                                <h6 className="mt-3">
                                                    Total di tagihkan : {priceFormatter(this.state.approveForm.totalPrice)}
                                                </h6>
                                                <h6>
                                                    Payment Method : {this.state.approveForm.paymentMethod}
                                                </h6>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="d-flex mr-2">
                                                <Button color="success" className="button-edit mr-1" onClick={this.approveHandler}>Approve</Button>{' '}
                                                <Button color="secondary" style={{ borderRadius: "2px", height: "40px" }} onClick={this.toggleModal}>Close</Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>

                                {/* )
                            })
                        } */}
                   
                </div>
            </div>
        )
    }
}

export default AdminTask;