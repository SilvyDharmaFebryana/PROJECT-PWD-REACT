import React from "react"
import Axios from "axios"
import { API_URL } from "../../../../../../Constants/API"


class PaketReport extends React.Component {

    state = {
        paket: [],
        jumlah: []
    }

    getPaket = () => {
        Axios.get(`${API_URL}/paket`)
        .then((res) => {
            this.setState({ paket: res.data })
            console.log(res.data);

            return res.data.map((val) => {
                return (
                    // this.getJumlah(val)

                    Axios.get(`${API_URL}/paket/report/`, {
                        params: {
                            id : val.id,
                            status : "approve"
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                        // this.setState({ paket: res.data })
                        this.setState({ jumlah : res.data })
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        
                    })
                )
                
            })    
           
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    componentDidMount() {
        this.getPaket()
        // this.getJumlah()
    }


    getJumlah = (val) => {
        // return this.state.paket.map((val) => {
        //     return (
                Axios.get(`${API_URL}/paket/report/`, {
                    params: {
                        id: this.state.paket.id,
                        status: "approve"
                    }
                })
                    .then((res) => {
                        console.log(res.data);
    
                    })
                    .catch((err) => {
                        console.log(err);
    
                    })
    
        //     )
        // })
    }


    renderPaket = () => {
        return this.state.paket.map((val) => {
            return(
                <tbody>
                    <tr>
                        <td>{val.id}</td>
                        <td>{val.namaPaket}</td>
                        <td>{val.jenisPaket}</td>
                        <td>{this.state.total}</td>
                        {/* <td>{this.getJumlah()}</td> */}
                    </tr>
                </tbody>
            )
        })
    }


    render() {
        return (
            <div>
                <h1>REPORT PAKET </h1>
                {
                    this.renderPaket()
                }
            </div>
        )
    }
}

export default PaketReport;