import React from "react"
import { Table, Alert } from 'reactstrap';
import cimb from "../../../Assets/Images/BankLogo/cimb.png"
import bni from "../../../Assets/Images/BankLogo/bni.png"
import bca from "../../../Assets/Images/BankLogo/bca.png"
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { UncontrolledCollapse, Button, CardBody, Card, FormGroup, Label, Input, FormText } from 'reactstrap';

class Checkout extends React.Component {

    state = {
        transId: []

    } 
    componentDidMount() {
        this.getIdTrans()
    }

    getIdTrans = () => {
        let idTrans = this.props.match.params.idTrans;

        Axios.get(`${API_URL}/transaction/checkout/${idTrans}`)
        .then((res) => {
            console.log(res.data);
            this.setState({ transId: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }



    render() {
        return (
            <div>
                <Alert color="success" className="mt-4">
                        Pesanan anda sedang di proses, mohon ikuti langkah-langkah di bawah ini untuk melakukan proses payment !
                </Alert>

                    <div>
                        <Table bordered>
                            <tr>
                                <th className="py-5" style={{ height: "10px", width: "30%" }}>Total Bayar</th>
                                <td className="py-5" style={{ fontSize: "20px", fontWeight: "bold" }}>{this.state.transId.totalPrice}</td>
                            </tr>
                            <tr>
                                <th className="py-4">Pilih Bank</th>
                                <td className="d-flex justify-content-start" style={{ border: "none" }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="mt-3 mr-2"
                                                type="radio"
                                                name="bank"
                                                value="bni"
                                                onChange={() => this.setState({
                                                    transId: {
                                                        ...this.state.transId,
                                                        noRek: "0397616123",
                                                        bank: "bni"
                                                    }
                                                })}
                                            />
                                            <img className="mt-2" src={bni} alt="" style={{ width: "50%" }} />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="mt-3 mr-2 ml-1"
                                                type="radio"
                                                name="bank"
                                                value="bca"
                                                onChange={() => this.setState({
                                                    transId: {
                                                        ...this.state.transId,
                                                        noRek: "935123243",
                                                        bank: "bca"
                                                    }
                                                })}
                                            />
                                            <img className="mt-2 ml-4" src={bca} alt="" style={{ width: "35%" }} />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                className="mt-3 mr-2"
                                                type="radio"
                                                name="bank"
                                                value="cimb"
                                                onChange={() => this.setState({
                                                    transId: {
                                                        ...this.state.transId,
                                                        noRek: "7060453453300",
                                                        bank: "cimb"
                                                    }
                                                })}
                                            />
                                            <img src={cimb} alt="" style={{ width: "30%" }} />
                                        </Label>
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                                <th>No Rekening</th>
                                <td className="d-flex" style={{ border: "none", borderTop: "solid 1px lightgrey", borderBottom: "solid 1px lightgrey" }}><p className="mr-2" style={{ textDecoration: "underline", color: "blue" }}>{this.state.transId.noRek}</p> (A/n Kickoff Sport Center)</td>
                            </tr>
                            <tr colSpan={2}>
                                <UncontrolledCollapse toggler="#toggler">
                                    <Card>
                                        <CardBody>

                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </tr>
                            <tr>
                                <th>Upload Bukti Transfer</th>
                                <td>
                                    <input type="file" />
                                </td>
                            </tr>
                        </Table>
                    </div>
            </div>
        )
    }
}


export default Checkout