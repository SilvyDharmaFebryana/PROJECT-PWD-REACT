import React from "react";
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./LapanganDetails.css";
// import DatePicker from "react-date-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "react-calendar/dist/Calendar.css";
import { connect } from "react-redux";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { faRestroom, faToilet, faChargingStation, faTrashAlt, faMosque, faClock, faVolleyballBall, faBasketballBall, faCalendarAlt, faStar } from "@fortawesome/free-solid-svg-icons";
// import ButtonUI from "../../../Components/Buttons/Buttons";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { faStar as star } from "@fortawesome/free-regular-svg-icons";



class LapanganDetails extends React.Component {
  state = {
    lapanganDetails: {
      id: 0,
      type: "",
      price: "",
      category: "",
      image: "",
      duration: 0,
      description:"",
      time: "",
      date: new Date().toLocaleString(),
    },
    modalOpen: false,
  };

  mustToLogin = () => {
    swal({
      title: "Harus Login",
      text: "Anda harus login untuk meneruskan penyewaan, Login?",
      icon: "warning",
    })
  }

  onChangeDate = (date) => {
    this.setState({
      lapanganDetails: {
        ...this.state.lapanganDetails,
        date: date,
      },
    })
    console.log(date.getTime())
    console.log(new Date())
  }

  toggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  toogleClose = () => this.setState({ modalOpen: this.state.modalOpen });

  getLapanganDetails = () => {
    let fieldId = this.props.match.params.fieldId;

    Axios.get(`${API_URL}/lapangan/${fieldId}`)
        .then((res) => {
            // console.log(res.data);
            this.setState({ lapanganDetails: res.data });
            console.log(this.state.lapanganDetails.rating);
            
        })
        .catch((err) => {
            console.log(err);
        });
  };

  componentDidMount() {
    this.getLapanganDetails();  
    // console.log(this.props.user.id);
      
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

    Axios.get(`${API_URL}/bField/user/`, {
      params: {
        user_id: this.props.user.id,
      }
    })
      .then((res) => {
        if (res.data.length === 0) {
          Axios.get(`${API_URL}/bField/check/`, {
            params: {
              date: this.state.lapanganDetails.date,
              time: this.state.lapanganDetails.time,
              field_id: this.state.lapanganDetails.id
            },
          })
            .then((res) => {
              console.log(res.data);

              if (res.data.length !== 0) {
                swal(
                  "Tidak tersedia!",
                  "Jadwal yang anda pilih tidak tersedia",
                  "error"
                );
              } else {
                //cek lagi di transaksi
                Axios.get(`${API_URL}/transaction/details/check/`, {
                  params: {
                    booking_date: this.state.lapanganDetails.date,
                    time: this.state.lapanganDetails.time,
                    field_id: this.state.lapanganDetails.id
                  },
                })
                  .then((res) => {

                    if (res.data.length > 0) {
                      swal(
                        "Tidak tersedia!",
                        "Jadwal yang anda pilih tidak tersedia",
                        "error"
                      );

                    } else {
                      let fieldId = this.state.lapanganDetails.id
                      let userId = this.props.user.id

                      Axios.post(`${API_URL}/bField/${fieldId}/${userId}`, {
                        duration: 1,
                        date: this.state.lapanganDetails.date,
                        time: this.state.lapanganDetails.time,
                      })
                        .then((res) => {
                          console.log(res.data);
                          swal("Berhasil !", "Disimpan di booking list", "success");
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
              }
            })
            .catch((err) => {
              console.log(err);

            })

        } else {
          //ini kalo cart udh ada isi
            Axios.get(`${API_URL}/bField/check/onthisdate/`, {
              params: {
                date: this.state.lapanganDetails.date,
                // time: this.state.lapanganDetails.time,
                field_id: this.state.lapanganDetails.id
              },
            })
              .then((res) => {
                if (res.data.length == 0) {
                  swal(
                    "Tidak bisa pesan!",
                    "Harus dengan lapangan yang sama atau tanggal yang sama ",
                    "error"
                  );
                } else {
                  Axios.get(`${API_URL}/bField/check/onthistime/`, {
                    params: {
                      // date: this.state.lapanganDetails.date,
                      time: this.state.lapanganDetails.time,
                      // field_id: this.state.lapanganDetails.id
                    },
                  })
                  .then((res) => {
                    if (res.data.length > 0) {
                      swal(
                        "Tidak tersedia!",
                        "Jam yang anda pilih telah terbooking",
                        "error"
                      )
                    } else {
                      //cek lagi dari transaksi, udh ada yang pesan atau belum 
                      Axios.get(`${API_URL}/transaction/details/check/`, {
                        params: {
                          booking_date: this.state.lapanganDetails.date,
                          time: this.state.lapanganDetails.time,
                          field_id: this.state.lapanganDetails.id
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
                            let fieldId = this.state.lapanganDetails.id
                            let userId = this.props.user.id
      
                            Axios.post(`${API_URL}/bField/${fieldId}/${userId}`, {
                              duration: 1,
                              date: this.state.lapanganDetails.date,
                              time: this.state.lapanganDetails.time,
                            })
                              .then((res) => {
                                console.log(res.data);
                                swal("", "Save on your Booking List", "success");
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
                    }
                  })
                }
              })
              .catch((err) => {
                console.log(err);
                
              })
        }

      })
      .catch((err) => {
        console.log(err);

      })

    
    
  };

  render() {
    const { image, price, type, category, description } = this.state.lapanganDetails;

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
                  <h2 style={{ color: "#737373" }}>Lapangan {category}</h2>
                  <p
                    className="font-weight-bolder ml-2"
                    style={{ color: "#737373" }}
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
                    / <p className="small">{"   "}Jam</p>
                  </h4>
                </span>
                <div className="mt-4 d-flex">
                  {
                    this.state.lapanganDetails.rating == 1 ? (
                      <>
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                      </>
                    ) : this.state.lapanganDetails.rating == 2 ? (
                      <>
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                      </>
                    ) : this.state.lapanganDetails.rating == 3 ? (
                      <>
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                      </>
                    ) : this.state.lapanganDetails.rating == 4 ? (
                      <>
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={star} />
                      </>
                    ) : this.state.lapanganDetails.rating == 5 ? (
                      <>
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                        <FontAwesomeIcon style={{ fontSize: "18px", color: "#ff9900" }} icon={faStar} />
                      </>
                    ) : <p>Belum ada rating</p>
                  }
                  <p className="ml-2" style={{ fontSize: "14px", color: "#ff9900", fontWeight:"bold" }}>{this.state.lapanganDetails.rating} / 5</p>
                </div>
                
                <div className="mt-4">
                  <p className="font-weight-bolder" style={{ color: "#737373" }}>
                    Deskripsi
                  </p>
                  <p className="mt-2 align-jus">{description}</p>
                </div>
                <div className="mt-4">
                  <p className="font-weight-bolder" style={{ color: "#737373" }}>
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
                    ) : this.state.lapanganDetails.category === "futsal" ? (
                      <FontAwesomeIcon
                        className="mt-2 ml-4"
                        icon={faFutbol}
                        style={{ fontSize: 30, color: "#003cb3" }}
                      />
                    ) : null}
                  </div>
                </div>
                

                <div>
                 
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
                      value={(this.state.lapanganDetails.date)}
                      style={{ color: "#003cb3" }}
                      dateFormat="MM/dd/yyyy"
                      minDate={new Date()}
                      utcOffset="UTC(+0700)"

                      // isClearable={true}
                    />
                    <select
                      value={this.state.lapanganDetails.time}
                      className="custom-text-input mt-1"
                      onChange={(e) =>
                        this.inputHandler(e, "time", "lapanganDetails")
                      }
                    >
                      <option
                        onClick={() =>
                          this.setState({
                            lapanganDetails: {
                              ...this.state.lapanganDetails,
                              time: "09.00",
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
                              time: "10.00",
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
                              time: "11.00",
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
                              time: "13.00",
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
                              time: "14.00",
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
                              time: "15.00",
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
                              time: "16.00",
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
                              time: "17.00",
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
                              time: "19.00",
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
                              time: "20.00",
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
                              time: "21.00",
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
                              time: "22.00",
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
                              time: "23.00",
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
        <div>
          <center>
            {
              this.props.user.id > 0 ? (
                <input className="button-book mt-4" type="button" value="Booking now !" onClick={this.toggle} />
              ) : (
                  <input className="button-book mt-4" type="button" value="Booking now !" onClick={this.mustToLogin} />
                )
            }
          </center>
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
