import React from "react"
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Table, Alert, Button } from 'reactstrap'; 
import { Link, Redirect } from "react-router-dom";
import "./History.css"
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { priceFormatter } from "../../../Supports/formatter";

class History extends React.Component {

    state = {
        activePage: "belum",
        noPaymentList: [],
        pendingList: [],
        suksesList: [],
        gagalList: [],
        activeProducts: [],
        details: []
    }
    //=========================================================== Get Status ====================================================================================
    getNoPaymentStatus = () => {
        Axios.get(`${API_URL}/transaction/none`, {
            params: {
                status: "noPayment"
            }
        })
            .then((res) => {
                this.setState({ noPaymentList: res.data})
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getPendingStatus = () => {
        Axios.get(`${API_URL}/transaction/pending`, {
            params: {
                status: "pending"
            }
        })
            .then((res) => {
                this.setState({ pendingList: res.data })
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getSuksesStatus = () => {
        Axios.get(`${API_URL}/transaction/sukses`, {
            params: {
                status: "sukses"
            }
        })
            .then((res) => {
                this.setState({ suksesList: res.data})
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getGagalStatus = () => {
        Axios.get(`${API_URL}/transaction/gagal`, {
            params: {
                status: "gagal"
            }
        })
            .then((res) => {
                this.setState({ gagalList: res.data})
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }


    //========================================================================================================================================================

    // getDetails = () => {
    //     Axios.get(`${API_URL}/transaction/details/trans/`,{
    //         params: {
    //             field_transactions_id: this.state.pendingList.id
    //         }
    //     })
    //     .then((res) => {
    //         this.setState({ details: res.data })
    //         console.log(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    componentDidMount() {
        this.getPendingStatus()
        // this.getDetails()
        this.getNoPaymentStatus()
    }


    renderList = () => {
        const { activePage } = this.state;
        if (activePage === "belum") {
            // this.getNoPaymentStatus()
            return this.state.noPaymentList.map((val, idx) => {
                return (
                    <tr>    
                        <td>{idx + 1}</td>
                        <td>{val.checkoutDate}</td>
                        <td>Order #{val.noPesanan}</td>
                        <td>{priceFormatter(val.totalPrice)}</td>
                        <td>{val.status}</td>
                        <td><Link to={`/checkout/${val.id}`}><Button>Bayar</Button></Link></td>
                    </tr>
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
                    <tr>
                            <td className="" colSpan={8}>
                                <div className="d-flex flex-row justify-content-center">
                                    <table className="small justify-content-center">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Item Price</th>
                                                <th>Item Total</th>
                                                <th></th>

                                            </tr>
                                        </thead>
                                       

                                    </table>
                                </div>

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
                <div className="wrap">
                <div>
                    <Table borderless style={{ width: "40%"}}>
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
                </div>
            </div>
        )
    }
}


export default History;