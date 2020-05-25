import React from "react"
import Axios from 'axios'
import { API_URL } from "../../../../Constants/API";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import "./LapanganDetails.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class LapanganDetails extends React.Component {

    state = {
        lapanganDetails : {
            id: 0,
            type: "",
            price: "",
            category: "",
            image: "",
            quantity: 0,
        }
    }

    getLapanganDetails = () => {
        let lapanganId = this.props.match.params.lapanganId;

        Axios.get(`${API_URL}/lapangan/${lapanganId}`)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    lapanganDetails: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getLapanganDetails()
    }


    render() {
        const {
            image,
            price,
            type,
            category
        } = this.state.lapanganDetails

        return (
            <div className="color-text">
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > DETAIL LAPANGAN </h5></BreadcrumbItem>
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
                                <p className="font-weight-bolder mt-4" style={{ color: "darkGrey" }}>{type}</p>
                                <span>
                                    <h5 className="mt-2">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(price)} / jam
                                </h5>
                                </span>
                                <div className="mt-4">
                                    Pilih Jadwal
                            </div>
                                <div className="jadwal-box">
                                    <div>
                                        <Calendar
                                        onChange={this.onChange}
                                        value={this.state.date}
                                        />
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LapanganDetails;