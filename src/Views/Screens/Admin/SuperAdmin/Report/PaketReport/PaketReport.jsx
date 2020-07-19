import React from "react"
import Axios from "axios"
import { API_URL } from "../../../../../../Constants/API"
import { Breadcrumb, BreadcrumbItem, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PaketReport.css"

class PaketReport extends React.Component {

    state = {
        paket: [],
        jumlah: []
    }

    getPaket = () => {
        Axios.get(`${API_URL}/paket/report/`, {
            params: {
                status: "approve"
            }
        })
        .then((res) => {
            console.log(res.data);
            this.setState({ paket: res.data })
            
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    componentDidMount() {
        this.getPaket()
        // this.getJumlah()
    }


    renderPaket = () => {
        return this.state.paket.map((val, idx) => {
            return(
                <tbody>
                    <tr>
                        <td>
                            {
                                val.jenisPaket === "none" ? (
                                   <p>Tanpa Paket</p>
                                ) : val.jenisPaket
                            }
                        </td>
                        <td>
                            {
                                val.namaPaket === "none" ? (
                                   <p>Tanpa Paket</p>
                                ) : val.namaPaket
                            }
                        </td>
                        <td className="text-center">{val.jumlah}</td>
                    </tr>
                </tbody>
            )
        })
    }

    

    render() {
        let palingLaku = Math.max.apply(null, this.state.jumlah)

        return (
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>
                            <h5 className="font-weight-bolder m-1"> REPORT PAKET</h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                {/* <div>
                    <h6>Total paket yang terbanyak terjual adalah : {palingLaku} </h6>
                </div> */}
                <div>
                    <Table className="tabel-paket" style={{ width: "80%"}}>
                        <thead>
                            <tr>
                                <th>Jenis Paket</th>
                                <th>Nama Paket</th>
                                <th className="text-center">Terjual / paket </th>
                            </tr>
                        </thead>
                        {
                            this.renderPaket()
                        }
                    </Table>
                </div>
            </div>
        )
    }
}

export default PaketReport;