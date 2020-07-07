import React from "react"
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import "./LapanganFutsal.css"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";
import CardLapangan from "../../../Components/Card/CardLapangan/CardLapangan";

class LapanganFutsal extends React.Component {

    state = {
        lapanganFutsal: [],
    }

    getLapanganVoli = () => {
        Axios.get(`${API_URL}/lapangan/futsal`, {
            params : {
                category: "futsal"
            }
        })
            .then((res) => {
                this.setState({ lapanganFutsal: res.data })
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
        return this.state.lapanganFutsal.map((val) => {
            return (
                <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <CardLapangan key={`fields-cart-${val.id}`} className="m-2" data={val} />
                </Link>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > LAPANGAN FUTSAL </h5></BreadcrumbItem>
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

export default LapanganFutsal;