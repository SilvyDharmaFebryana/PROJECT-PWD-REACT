import React from "react";
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./LapanganDetails.css";
// import DatePicker from "react-date-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { connect } from "react-redux";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { faRestroom, faToilet, faChargingStation, faTrashAlt, faMosque, faClock, faVolleyballBall, faBasketballBall, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ButtonUI from "../../../Components/Buttons/Buttons";

// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

class LapanganDetails extends React.Component {
  state = {
    lapanganDetails: {
      id: 0,
      type: "",
      price: "",
      category: "",
      image: "",
      duration: 0,
      desc:"",
      jam: "",
      date: new Date(),
    },
    modalOpen: false,
  };

  onChangeDate = (date) =>
    this.setState({
      lapanganDetails: {
        ...this.state.lapanganDetails,
        date: date,
      },
    });

  toggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  toogleClose = () => this.setState({ modalOpen: this.state.modalOpen });

  getLapanganDetails = () => {
    let fieldId = this.props.match.params.fieldId;

    Axios.get(`${API_URL}/fields/${fieldId}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          lapanganDetails: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getLapanganDetails();
  }

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  bookingBtnHandler = () => {
    // let bookingNumber = Math.floor(Math.random() * 1000000000000000);
    // bookingNumber.toFixed(16)

    Axios.get(`${API_URL}/bookingList`, {
      params: {
        date: this.state.lapanganDetails.date,
        jam: this.state.lapanganDetails.jam
      },
    })
    
      .then((res) => {
        if (res.data.length > 0) {
          swal(
            "Jadwal tidak tersedia",
            "",
            "error"
          );
        } else {
            Axios.post(`${API_URL}/bookingList`, {
                userId: this.props.user.id,
                fieldId: this.state.lapanganDetails.id,
                duration: 1,
                date: this.state.lapanganDetails.date,
                jam: this.state.lapanganDetails.jam,
                    // kodeBooking: bookingNumber,
            })
            .then((res) => {
                console.log(res.data);
                swal("", "Your item has been add to your cart", "success");
                this.setState({ modalOpen: false });
                        // this.props.onFillCart(this.props.user.id);
            })
            .catch((err) => {
                console.log(err);
            });   
        }
      })

      .catch((err) => {
        console.log(err);
        
      })
    
  };

  render() {
    const { image, price, type, category, desc } = this.state.lapanganDetails;

    return (
      <div className="color-text">
        <div className="mt-1">
          <Breadcrumb>
            <BreadcrumbItem active>
              {" "}
              <h5 className="font-weight-bolder m-1"> DETAIL LAPANGAN </h5>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="container">
          <div className="row mt-4">
            <div className="col-7">
              <div className="text-center">
                <img className="image-detail" src={image} alt="" />
              </div>
            </div>
            <div className="col-5">
              <div>
                <div className="d-flex">
                  <h2 style={{ color: "grey" }}>Lapangan {category}</h2>
                  <p
                    className="font-weight-bolder ml-2"
                    style={{ color: "grey" }}
                  >
                    {type}
                  </p>
                </div>
                <span>
                  <h4 className="mt-3 d-flex">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(price)}{" "}
                    / <p className="small">{"   "}jam</p>
                  </h4>
                </span>
                <div className="mt-4">
                  <p className="font-weight-bolder" style={{ color: "grey" }}>
                    Deskripsi
                  </p>
                  <p className="mt-2 align-jus">{desc}</p>
                </div>
                <div className="mt-4">
                  <p className="font-weight-bolder" style={{ color: "grey" }}>
                    Fasilitas
                  </p>
                  <div className="d-flex">
                    <FontAwesomeIcon
                      className="mt-2"
                      icon={faRestroom}
                      style={{ fontSize: 30, color: "#003cb3" }}
                    />
                    <FontAwesomeIcon
                      className="mt-2 ml-4"
                      icon={faToilet}
                      style={{ fontSize: 30, color: "#003cb3" }}
                    />
                    <FontAwesomeIcon
                      className="mt-2 ml-4"
                      icon={faChargingStation}
                      style={{ fontSize: 30, color: "#003cb3" }}
                    />
                    <FontAwesomeIcon
                      className="mt-2 ml-4"
                      icon={faTrashAlt}
                      style={{ fontSize: 30, color: "#003cb3" }}
                    />
                    <FontAwesomeIcon
                      className="mt-2 ml-4"
                      icon={faMosque}
                      style={{ fontSize: 30, color: "#003cb3" }}
                    />
                    <FontAwesomeIcon
                      className="mt-2 ml-4"
                      icon={faClock}
                      style={{ fontSize: 30, color: "#003cb3" }}
                    />
                    {this.state.lapanganDetails.category === "voli" ? (
                      <FontAwesomeIcon
                        className="mt-2 ml-4"
                        icon={faVolleyballBall}
                        style={{ fontSize: 30, color: "#003cb3" }}
                      />
                    ) : this.state.lapanganDetails.category === "basket" ? (
                      <FontAwesomeIcon
                        className="mt-2 ml-4"
                        icon={faBasketballBall}
                        style={{ fontSize: 30, color: "#003cb3" }}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <center>
                  <input className="button-book mt-4" type="button" value="Booking" onClick={this.toggle}/>
                  </center>
                  <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>
                    <FontAwesomeIcon
                        className="mt-2 mr-2"
                        icon={faCalendarAlt}
                        style={{ fontSize: 20, color: "inherit" }}
                      />
                    Pilih Jadwal 
                    
                  </ModalHeader>
                  <ModalBody>
                    <div>
                <div className="jadwal-box">
                <div className="row ml-1">
                  <div className="col-3 mt-3">
                    <p className="mr-1 ml-1 font-weight-bolder">Tanggal</p>
                    <p className="mr-1 ml-1 mt-3 font-weight-bolder">Jam</p>
                  </div>
                  <div className="col-1 mt-3">
                    <p className="">:</p>
                    <p className="mt-3">:</p>
                  </div>
                  <div className="col-6 mt-3">
                    <DatePicker
                      classNam="ml-5"
                      selected={this.state.lapanganDetails.date}
                      onChange={this.onChangeDate}
                      value={this.state.lapanganDetails.date}
                      style={{ color: "#003cb3" }}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      // isClearable={true}
                    />
                    <select
                      value={this.state.lapanganDetails.jam}
                      className="custom-text-input mt-1"
                      onChange={(e) =>
                        this.inputHandler(e, "jam", "lapanganDetails")
                      }
                    >
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "09.00",
                            },
                          })
                        }
                        value="09.00"
                      >
                        09.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "10.00",
                            },
                          })
                        }
                        value="10.00"
                      >
                        10.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "11.00",
                            },
                          })
                        }
                        value="11.00"
                      >
                        11.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "13.00",
                            },
                          })
                        }
                        value="13.00"
                      >
                        13.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "14.00",
                            },
                          })
                        }
                        value="14.00"
                      >
                        14.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "15.00",
                            },
                          })
                        }
                        value="15.00"
                      >
                        15.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "16.00",
                            },
                          })
                        }
                        value="16.00"
                      >
                        16.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "17.00",
                            },
                          })
                        }
                        value="17.00"
                      >
                        17.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "19.00",
                            },
                          })
                        }
                        value="19.00"
                      >
                        19.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "20.00",
                            },
                          })
                        }
                        value="20.00"
                      >
                        20.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "21.00",
                            },
                          })
                        }
                        value="21.00"
                      >
                        21.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "22.00",
                            },
                          })
                        }
                        value="22.00"
                      >
                        22.00
                      </option>
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              jam: "23.00",
                            },
                          })
                        }
                        value="23.00"
                      >
                        23.00
                      </option>
                    </select>
                  </div>
                </div>
                </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.bookingBtnHandler}>Booking</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(LapanganDetails);
