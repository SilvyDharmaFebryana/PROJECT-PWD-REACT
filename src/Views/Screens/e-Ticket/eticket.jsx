import React, {Component, PropTypes} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Axios from "axios";
import { API_URL } from '../../../Constants/API';
import "./eticket.css"
import { Table, Alert, Button } from 'reactstrap';
import logo from "../../../Assets/Images/Untitled.png"
import { priceFormatter } from '../../../Supports/formatter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";


class ETicket extends React.Component {

    state = {
        detailTicket : [],
        transId : [],
        paket: [],

    }

    getIdTrans = () => {
        let idTrans = this.props.match.params.idTrans;

        Axios.get(`${API_URL}/transaction/checkout/${idTrans}`)
        .then((res) => {
            console.log(res.data.paket);
            this.setState({ transId: res.data })
            this.setState({ paket: res.data.paket })
        })
        .catch((err) => {
            console.log(err);
        })
    }
 
    getDetailsTicket = () => {

        let idTrans = this.props.match.params.idTrans;

        Axios.get(`${API_URL}/transaction/details/trans/${idTrans}`)
        .then((res) => {
            this.setState({ detailTicket: res.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getDetailsTicket()
        this.getIdTrans()

    }


    renderList = () => {
        return this.state.detailTicket.map((val, idx) => {
            return (
                <tbody>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.kodeBooking}</td>
                        <td>{val.field.fieldName}</td>
                        <td>{val.bookingDate}</td>
                        <td>{val.time}</td>
                        <td>{priceFormatter(val.totalPrice)}</td>
                    </tr>
                </tbody>
            )
        })
    }


    // renderTambahPaket = () => {
    //     return this.state.transId.map((val, idx) => {
    //         return (
    //             <tbody>
    //                 <tr>
    //                     <td>{val.paket.namaPaket}</td>
    //                     <td>{val.totalPaket}</td>
    //                 </tr>
    //             </tbody>
    //         )
    //     })
    // }

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
        .then((canvas) => { 
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save(`e-ticket.pdf`);
        })
    }

    render() {


        return (
        <div>
                <Alert color="success" className="mt-4">
                   e-Ticket anda telah terbit !
                </Alert> 
                <div className="d-flex justify-content-end mr-4">
                    <Button color="success" onClick={this.printDocument}>
                        <FontAwesomeIcon
                            className="mt-1 mr-2"
                            icon={faDownload}
                            style={{ fontSize: 18 }}
                        /> Print e-Ticket
                    </Button>
                </div>
                <div id="divToPrint" className="mt-4" style={{
                    backgroundColor: 'white',
                    width: '210mm',
                    minHeight: '297mm',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: "solid 2px #2d5986"
                }}
                >
                    <div>
                    {/* {
                        this.state.detailTicket.map((val) => {
                            return ( */}
                                <div>
                                    <div class="d-flex justify-content-between">
                                        <img className="ml-2 mt-2" src={logo} style={{ width: "200px" }} />
                                        <h5 className="mr-3 mt-3" style={{ color: "#2d5986" }}>Order #{this.state.transId.noPesanan}</h5>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div> 
                                        <h5 className="ml-2">Dear, {this.props.user.username}</h5>
                                    </div>
                                    <div> 
                                        {/* <h6 className="ml-2" style={{ fontSize: "15px" }}>{this.state.transId.user.username}</h6> */}
                                        <h6 className="ml-2 mb-5" style={{ fontSize: "12px" }}>Date Issue : {this.state.transId.approveDate}</h6>
                                    </div>
                                </div>
                            {/* )
                        })
                    } */}

                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kode Booking</th>
                                        <th>Nama Lapangan</th>
                                        <th>Tanggal</th>
                                        <th>Jam</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                {
                                    this.renderList()
                                }
                            </Table>
                            <br/>
                            <br/>
                        </div>
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="text-center" >Nama Paket Tambahan</th>
                                        <th style={{ width: "13%" }}>Total Paket</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center" >{this.state.paket.namaPaket}</td>
                                        <td>{priceFormatter(this.state.transId.totalPaket)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <br/>
                        <div >
                            <Table bordered>
                                <tr style={{ border: "1px solid smokewhite", width: "100%" }}>
                                    <th>Total Harga Lapangan</th>
                                    <td className="td-custom">{priceFormatter(this.state.transId.totalPrice)}</td>
                                </tr>
                                <tr style={{ border: "1px solid smokewhite", width: "100%" }}>
                                    <th>Total Harga Paket</th>
                                    <td className="td-custom">{priceFormatter(this.state.transId.totalPaket)}</td>
                                </tr>
                                <tr style={{ border: "1px solid smokewhite", width: "100%" }}>
                                    <th>Total Harga </th>
                                    <td className="td-custom" style={{fontSize: "20px"} }>{priceFormatter(this.state.transId.grandTotal)}</td>
                                </tr>
                            </Table>
                          
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <Alert color="secondary" style={{ fontSize: "12px" }}>
                                <p className="ml-2 " style={{ color: "grey"}}>Terms & Condition</p>
                                <ul style={{ color: "grey"}}>
                                    <li>Bawa bukti ini untuk di tunjukkan ke admin saat ingin check-in</li>
                                    <li>Jangan sampai hilang</li>
                                    <li>Catat kode booking yang tertera</li>
                                </ul>
                            </Alert>
                            
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

export default connect(mapStateToProps)(ETicket);