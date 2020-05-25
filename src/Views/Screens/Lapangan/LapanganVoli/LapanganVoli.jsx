import React from "react"
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import "./LapanganVoli.css"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";

class LapanganVoli extends React.Component {

    state = {
        lapanganVoli: [],
    }

    getLapanganVoli = () => {
        Axios.get(`${API_URL}/lapangan`, {
            params : {
                category: "voli"
            }
        })
            .then((res) => {
                this.setState({ lapanganVoli: res.data })
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getLapanganVoli()
    }

    renderLapangan = () => {
        return this.state.lapanganVoli.map((val) => {
            return (
                <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`kolam-card d-inline-block ml-4 mt-4`}>
                    <img
                        src={val.image}
                        style={{ width: "430px", height: "300px", objectFit: "contain" }}
                    />
                    <div>
                        <p className="mt-3">{val.type}</p>
                        <div className="d-flex">
                            <span>
                                <h5 style={{ fontWeight: "bolder" }}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(val.price)}
                                    {'      '} / hour
                                </h5>
                            </span>
                        </div>

                    </div>
                </div>
                </Link>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > LAPANGAN VOLI </h5></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container" >

                    <div className="row d-flex flex-wrap justify-content-center ">
                        {
                            this.renderLapangan()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default LapanganVoli;