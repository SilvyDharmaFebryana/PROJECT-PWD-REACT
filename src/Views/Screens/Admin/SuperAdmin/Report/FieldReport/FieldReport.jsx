import React from "react"
import Axios from "axios"
import { API_URL } from "../../../../../../Constants/API"
import { Breadcrumb, BreadcrumbItem, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Bar} from 'react-chartjs-2';

class FieldReport extends React.Component {

    state = {
        lapangan: [],
        jumlah: [],
        data: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        }
    }

    getLapangan = () => {
        Axios.get(`${API_URL}/lapangan/report/jumlah/pesan/`)
        .then((res) => {
            console.log(res.data)
            this.setState({ lapangan: res.data })

            this.state.lapangan.map((val) => {
                let total = Math.floor(val.jumlah)
                return this.setState({
                    data: {
                        labels: [ ...this.state.data.labels, val.fieldName],
                        datasets: [
                            {
                                label: 'Lapangan',
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: [ ...this.state.data.datasets[0].data, total]
                            }
                        ]
                    }
                })
            })
           
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getLapangan()
    }


    renderLapangan = () => {
        return this.state.lapangan.map((val, idx) => {
            return(
                <tbody>
                    <tr>
                       <td>{val.fieldName}</td>
                        <td>{val.category}</td>
                        <td className="text-center" style={{ fontWeight: "bold"}}>{val.jumlah}</td>
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
                            <h5 className="font-weight-bolder m-1"> REPORT LAPANGAN</h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="d-flex mt-5">
                    <div>
                        <Table className="tabel-paket" style={{ width: "80%", fontSize: "13px" }}>
                            <thead>
                                <tr>
                                    <th>Nama Lapangan</th>
                                    <th>Category</th>
                                    <th className="text-center">Terjual / x booking</th>
                                </tr>
                            </thead>
                            {
                                this.renderLapangan()
                            }
                        </Table>
                    </div>
                    <div 
                        style={{ 
                            width: "50%",
                            height: "100px"
                        }}
                    >
                    <Bar
                        data={this.state.data}
                        options= {{
                            title: {
                                display: true,
                                text:'REPORT LAPANGAN',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position:'right'
                            }
                        }}
                    />
                    </div>
                </div>
               
            </div>
        )
    }
}

export default FieldReport;