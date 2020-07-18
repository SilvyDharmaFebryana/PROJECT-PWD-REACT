import React from "react"
import Axios from "axios"
import { API_URL } from "../../../Constants/API"
import { connect } from "react-redux";
import "./notif.css"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { notifData } from "../../../Redux/Actions";


class Notif extends React.Component{
    state = {
        notif: [],
        modalOpen: false,
        star: "",
        jumlahRating: 0,
        editRating: {
            id: 0,
            notif: "",
            field: {
                id: 0,
                rating: 0,
                category: "",
                type: "",
                price: "",
                description: "",
                image: "",
                fieldName: ""
            }
        },
        fieldData: [],
        banyakData: 0
        // jumlahSblm : 0
        // fieldId: 0
    }

    getNotif = () => {

        Axios.get(`${API_URL}/notif/`, {
            params: {
                userId : this.props.user.id
            }
        })
        .then((res) => {
            this.setState({ notif: res.data })
            this.setState({ fieldData: res.data.field })
            // console.log(res.data.field);
        })
        .catch((err) => {
            console.log(err);    
        })
    }

    deleteDataHandler = (id) => {
        Axios.delete(`${API_URL}/notif/${id}`)
            .then((res) => {
                this.getNotif()   
                this.props.onNotifData(this.props.user.id);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    newRatingByUser = () => {

        Axios.get(`${API_URL}/lapangan/rating`, {
            params: {
                id: this.state.editRating.field.id
            }
        })
        .then((res)=> {
            let ratingCalculate = (this.state.editRating.field.rating + this.state.jumlahRating) / res.data.length

            Axios.put(`${API_URL}/lapangan/rating/edit/${this.state.editRating.field.id}`, this.state.editRating.field, {
                params: {
                    newRating: ratingCalculate
                }
            })
            .then((res)=> {
                this.deleteDataHandler(this.state.editRating.id)
                swal(
                    "Terimakasih !",
                    "Terimakasih atas feedback yang anda berikan"
                )
                this.setState({ modalOpen: false })
                
            })
            .catch((err)=> {
                console.log(err);
            })
        })
        .catch((err)=> {
            console.log(err);
            
        })
 
    }

    setDataCheckin = (idx) => {
        this.setState({
            editRating: {
                ...this.state.notif[idx],
            },
            modalOpen: true,
        });
        console.log(this.state.editRating)
    }

    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

    componentDidMount() {
        this.getNotif()
    }


    renderNotif = () => {
        return this.state.notif.map((val, idx) => {
            if (val.notif === "done" )
            return (
                <div className="row notif-wrap">
                    <div className="col-4">
                        <FontAwesomeIcon className="mt-2 mr-3" style={{ fontSize: "18px", color: "#ff9900" }} icon={faCheckCircle} /> {val.fTransactionDetails.kodeBooking}
                        <Table className="mt-2" style={{ fontSize: "11px" }}>
                            <tr>
                                <td>Book</td>
                                <td> {val.fTransactionDetails.field.fieldName}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td> {val.fTransactionDetails.bookingDate}</td>
                            </tr>
                            <tr>
                                <td>Time</td>
                                <td>{val.fTransactionDetails.time}</td>
                            </tr>
                        </Table>
                          
                    </div>
                    <div className="col-8">
                    <Alert className="text-center" color="warning" className="mt-3" style={{ fontSize: "11px" }}>
                        Terimakasih untuk mempercayakan kami untuk terlibat dengan kegiatan berolahraga anda.
                        <br/>
                        Bagaimana pengalamanmu berolahraga di KICOFF Sport Center ? Beri kami Feedback
                 
                    </Alert>
                    <center>
                        <Button 
                            className="text-center" 
                            style={{ backgroundColor: "#ff9900", border: "none", fontSize: "12px" }}
                            onClick={(_) => this.setDataCheckin(idx)}
                        >
                            Rate
                        </Button>
                    </center>
                    </div>
                </div>
            )
        })
    }


    render() {
        return (
            <>
            
            <div>
                {
                    this.state.notif.length === 0 ? (
                        <p className="mt-5 notif-kosong">Belum ada feedback untuk di berikan</p>
                    ) : this.renderNotif()
                }
            </div>
            <div>
              <Modal
                  toggle={this.toggleModal}
                  isOpen={this.state.modalOpen}
                  className="edit-modal"
              >
                  <ModalHeader toggle={this.toggleEdit}>
                      <div>
                          <h3>Rate for us !</h3>
                      </div>
                  </ModalHeader>
                  <ModalBody>
                      <>
                      <div className="row">
                          <div className="col-6">
                               <img className="ml-4" src={this.state.editRating.field.image} style={{ width: "170px" , height: "170px" }} alt=""/>
                               <p className="ml-3 mt-2">{this.state.editRating.field.fieldName}</p>
                          </div>
                          <div className="col-6">
                            <div 
                                className={`pick ${this.state.star === "1" ? "active" : null }`}
                                onClick={() => this.setState({ star: "1", jumlahRating: 1 })}
                            >
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                <FontAwesomeIcon className="mr-4" style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                Buruk
                            </div>
                            <div 
                                className={`pick ${this.state.star === "2" ? "active" : null } mt-3`}
                                onClick={() => this.setState({ star: "2",  jumlahRating: 2 })}
                            >
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                <FontAwesomeIcon className="mr-4" style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                Kurang
                            </div>
                            <div 
                                className={`pick ${this.state.star === "3" ? "active" : null } mt-3`}
                                onClick={() => this.setState({ star: "3",  jumlahRating: 3 })}
                            >
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                <FontAwesomeIcon className="mr-4" style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                Cukup
                            </div>
                            <div 
                                className={`pick ${this.state.star === "4" ? "active" : null } mt-3`}
                                onClick={() => this.setState({ star: "4",  jumlahRating: 4 })}
                            >
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon className="mr-4" style={{ fontSize: "15px", color: "lightgray" }} icon={faStar} />
                                Baik
                            </div>
                            <div 
                                className={`pick ${this.state.star === "5" ? "active" : null } mt-3`}
                                onClick={() => this.setState({ star: "5",  jumlahRating: 5 })}
                            >
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                <FontAwesomeIcon className="mr-4" style={{ fontSize: "15px", color: "#ff9900" }} icon={faStar} />
                                Sangat Baik
                            </div>
                          </div>
                      </div>
                       
                      </>
                       {console.log(this.state.jumlahRating)}
                  </ModalBody>
                  <ModalFooter>
                      <div className="d-flex mr-2">
                            <Button 
                                className="button-edit mr-1" 
                                onClick={this.newRatingByUser}
                                style={{ backgroundColor: "#ff9900", border: "none" }}
                            >
                                Send Rate</Button>
                      </div>
                  </ModalFooter>
              </Modal>
          </div>
          </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    onNotifData: notifData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notif);