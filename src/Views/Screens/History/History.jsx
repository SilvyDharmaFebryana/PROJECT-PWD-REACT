import React from "react"
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { Table, Alert } from 'reactstrap'; 
import "./History.css"
import Axios from "axios";
import { API_URL } from "../../../Constants/API";

class History extends React.Component {

    state = {
        activePage: "",
        pendingList: []
    }

    getPendingStatus = () => {
        Axios.get(`${API_URL}/transaction/pending`, {
            params: {
                status: "pending"
            }
        })
            .then((res) => {
                this.setState({ pendingList: res.data})
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getPendingStatus()
    }


    renderList = () => {
        const { activePage } = this.state;
        if (activePage === "belum") {
            return this.state.pendingList.map((val, idx) => {
                return (
                    <tr>    
                        <td>{idx + 1}</td>
                        <td>{val.kodeBooking}</td>
                        <td>{}</td>
                        <td>{val.totalPrice}</td>
                        <td>{val.status}</td>
                        <td>Lihat Detail</td>
                    </tr>
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
                <div>
                    <Table borderless>
                            <thead>
                                <tr>
                                    <th 
                                        className={`filter ${this.state.activePage == "belum" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "belum" })}
                                    > 
                                        Belum Bayar
                                    </th>
                                    <th 
                                        className={`filter ${this.state.activePage == "sudah" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "sudah" })}
                                    > 
                                        Sudah Bayar
                                    </th>
                                    <th 
                                        className={`filter ${this.state.activePage == "sukses" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "sukses" })}
                                    > 
                                        Sukses
                                    </th>
                                    <th 
                                        className={`filter ${this.state.activePage == "gagal" ? "active" : null}`}
                                        style={{ width: "25%" }}
                                        onClick={() => this.setState({ activePage: "gagal" })}
                                    > 
                                        Gagal
                                    </th>
                                </tr>
                            </thead>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode Booking</th>
                                <th>Lapangan</th>
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
            </div>
        )
    }
}


export default History;