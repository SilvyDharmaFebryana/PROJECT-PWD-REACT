import React from "react"
import { Breadcrumb, BreadcrumbItem, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from "axios";
import { API_URL } from "../../../../../Constants/API";
import "./ListField.css"
import { priceFormatter } from "../../../../../Supports/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faTransgender } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";


class ListField extends React.Component {

    state = {
        semuaLapangan: [],
        selectedFile: null,
        editLapangan: {
            fieldName: "",
            type: "",
            category: "",
            price: "",
            description: ""
        },
        file: "",
        fileNames: "",
        modalEditOpen: false,
    }

    inputHandler = (event, key) => {
        const { value } = event.target

        this.setState({
            editLapangan: {
                ...this.state.editLapangan,
                [key]: value 
            },
        })
    }

    getAllLapangan = () => {
        Axios.get(`${API_URL}/lapangan`)
        .then((res) => {
            this.setState({ semuaLapangan: res.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getAllLapangan()
    }

    editAllLapangan = (idx) => {
        this.setState({
            editLapangan: {
                ...this.state.semuaLapangan[idx],
            },
            modalEditOpen: true,
        });
    };

    toggleEdit = () => this.setState({ modalEditOpen: !this.state.modalEditOpen });


    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    updateLapangan = () => {
        let formData = new FormData();

        if (this.state.selectedFile) {
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
        }

        formData.append("lapanganEdit", JSON.stringify(this.state.editLapangan))

        Axios.put(`${API_URL}/lapangan/edit/${this.state.editLapangan.id}`, formData)
            .then((res) => {
                console.log(res.data)
                swal(
                    "Sukses!",
                    "Berhasil Update Lapangan ",
                    "success"
                )
                
                this.setState({ modalEditOpen: false })
                this.getAllLapangan()
            })
            .catch((err) => {
                console.log("ERROR");
                console.log(err);
                swal(
                    "Error!",
                    "Belum berhasil Update Lapangan ",
                    "error"
                )
            });

    };

    deleteFieldHandler = (id) => {
        Axios.delete(`${API_URL}/lapangan/${id}`)
            .then((res) => {
                swal(
                    "Sucess!",
                    "Sukses menghapus lapangan",
                    "success"
                )
                this.getAllLapangan() 

                // this.props.onFillCart(this.props.user.id);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    renderLapangan = () => {
        return this.state.semuaLapangan.map((val, idx) => {
            return (
                <tbody>
                    <tr>
                        <td>{idx +1}</td>
                        <td>
                            <img className="gambar" src={val.image} alt=""/>
                        </td>
                        <td>{val.fieldName}</td>
                        <td>{priceFormatter(val.price)}</td>
                        <td>{val.type}</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon-edit-lap"
                                icon={faEdit}
                                // style={{ fontSize: 20 }}
                                onClick={(_) => this.editAllLapangan(idx)}
                            />
                        </td>
                        <td>|</td>
                        <td>
                            <FontAwesomeIcon
                                className="icon-hapus-lap"
                                icon={faTrashAlt}
                                onClick={() => this.deleteFieldHandler(val.id)}
                            />
                        </td>
                    </tr>
                </tbody>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active><h5 className="font-weight-bolder m-1"> FIELD LIST </h5></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="wrap-table">
                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Image</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th>Type</th>
                                <th colSpan={3} style={{ width: "5%" }}></th>
                            </tr>
                        </thead>
                            {
                                this.renderLapangan()
                            }
                    </Table>
                </div>
                <div>
                <Modal
                    toggle={this.toggleEdit}
                    isOpen={this.state.modalEditOpen}
                    className="edit-modal"
                >
                    <ModalHeader toggle={this.toggleEdit}>
                            <h3>EDIT FIELD</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                        <div className="col-12 mt-2">
                                Nama Field
                                <input
                                    className="text-input-toggle"
                                    type="text"
                                    value={this.state.editLapangan.fieldName}
                                    placeholder="Field Name"
                                    onChange={(e) =>
                                        this.inputHandler(e, "fieldName", "editLapangan")
                                    }
                                />
                            </div>
                            <div className="col-6 mt-2">
                                Category
                                <input
                                    className="text-input-toggle"   
                                    type="text"
                                    value={this.state.editLapangan.category}
                                    placeholder="Full Name"
                                    onChange={(e) =>
                                        this.inputHandler(e, "category", "editLapangan")
                                    }
                                />
                            </div>
                            <div className="col-6 mt-2">
                                Type
                                <select
                                    value={this.state.editLapangan.type}
                                    className="text-input-toggle h-60"
                                    onChange={(e) => this.inputHandler(e, "type", "editLapangan")}
                                >
                                     <option 
                                            value="indoor"
                                            onClick={() => this.setState({ editLapangan: {
                                                                                ...this.state.editLapangan,
                                                                                type: "indoor"
                                                                            }})} >Indoor</option>
                                        <option 
                                            value="outdoor"
                                            onClick={() => this.setState({ editLapangan: {
                                                                                ...this.state.editLapangan,
                                                                                type: "outdoor"
                                                                            }})} >Outdoor</option>
                                </select>
                            </div>
                            <div className="col-12 mt-2">
                                Price
                                <input
                                    className="text-input-toggle"
                                    type="text"
                                    value={this.state.editLapangan.price}
                                    placeholder="Email"
                                    onChange={(e) => this.inputHandler(e, "price", "editLapangan")}
                                />
                            </div>
                            <div className="col-12 mt-2">
                                Description
                                <textarea
                                    value={this.state.editLapangan.description}
                                    onChange={(e) => this.inputHandler(e, "description", "editLapangan")}
                                    style={{ resize: "none" }}
                                    placeholder="Address"
                                    className="text-input-toggle"
                                ></textarea>
                            </div>
                            <div>
                                <img className="img-edit" src={this.state.editLapangan.image}  />
                                <input className="ml-3 mt-2" type="file" onChange={this.fileChangeHandler}/>
                            </div>
                            
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex mr-2">
                            <Button className="button-edit mr-1" onClick={this.updateLapangan}>Update</Button>{' '}
                            <Button color="secondary" style={{ borderRadius: "2px", height: "40px" }} onClick={this.toggleEdit}>Close</Button>
                        </div>
                  </ModalFooter>
                </Modal>
                </div>


            </div>
        )
    }
}

export default ListField