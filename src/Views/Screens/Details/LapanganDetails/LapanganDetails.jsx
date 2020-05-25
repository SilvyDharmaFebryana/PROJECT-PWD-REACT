import React from "react";
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./LapanganDetails.css";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";

class LapanganDetails extends React.Component {
  state = {
    lapanganDetails: {
      id: 0,
      type: "",
      price: "",
      category: "",
      image: "",
      quantity: 0,
      jam: "",
      date: new Date(),
    },
  };

  onChange = (date) =>
    this.setState({
      lapanganDetails: {
        ...this.state.lapanganDetails,
        date: date,
      },
    });

  getLapanganDetails = () => {
    let lapanganId = this.props.match.params.lapanganId;

    Axios.get(`${API_URL}/lapangan/${lapanganId}`)
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

  render() {
    const { image, price, type, category } = this.state.lapanganDetails;

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
                <img className="image-lap" src={image} alt="" />
              </div>
            </div>
            <div className="col-5">
              <div>
                <h2 style={{ color: "grey" }}>Lapangan {category}</h2>
                <p
                  className="font-weight-bolder mt-4"
                >
                  {type}
                </p>
                <span>
                  <h5 className="mt-3 d-flex">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(price)}{" "}
                    / <p>{"   "}jam</p>
                  </h5>
                </span>
                <div className="mt-4 mb-1 font-weight-bolder">Pilih Jadwal</div>
                <div className="jadwal-box">
                  <div className="row ml-1">
                    <div className="col-3 mt-3">
                      <p className="mr-1 ml-1">Tanggal</p>
                      <p className="mr-1 ml-1 mt-3">Jam</p>
                    </div>
                    <div className="col-1 mt-3">
                      <p className="">:</p>
                      <p className="mt-3">:</p>
                    </div>
                    <div className="col-4 mt-3">
                      <DatePicker
                        onChange={this.onChange}
                        value={this.state.date}
                        style={{ color: "#003cb3" }}
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
              <div className="mt-3">
                <input type="button" value="Booking" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LapanganDetails;
