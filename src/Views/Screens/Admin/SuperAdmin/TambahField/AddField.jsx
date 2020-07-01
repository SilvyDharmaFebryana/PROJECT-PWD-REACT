import React from "react"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import "./AddField.css"
import { Table } from 'reactstrap';
import Axios from "axios"
import { API_URL } from "../../../../../Constants/API";


class AddField extends React.Component {

    state = {
        selectedFile: null,
        formField: {
            fieldName: "",
            type: "",
            category: "",
            price: "",
            description: ""
        },
        file: "",
        fileNames: "",
    }

    
    inputHandler = (event, key) => {
        const { value } = event.target

        this.setState({
            formField: {
                ...this.state.formField,
                [key]: value 
            },
        })
    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    fieldUploadDataHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        formData.append("fieldData", JSON.stringify(this.state.formField))

        Axios.post(`${API_URL}/lapangan`, formData)
            .then((res) => {
                console.log(res.data)
                this.setState({ file: res.data })
                alert("tersimpan")
                // let fileName = this.state.file.split("/")[5]
                // this.setState({ fileNames: fileName })
            })
            .catch((err) => {
                console.log("ERROR");
                console.log(err);
            });

            
        console.log(this.state.formField);
        console.log(JSON.stringify(this.state.formField));
  
    };


    render() {
        return (
            <div>
            <div className="mt-1">
                <Breadcrumb>
                    <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > ADD FIELD </h5></BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div>
                <Table borderless className="table-add">
                        <thead style={{ color: "#2d5986"}}>
                            <tr>
                                <th>Field Name</th>
                                <td>:</td>
                                <td>
                                    <input 
                                        className="input-text"  
                                        // value={this.state.formField.username}
                                        placeholder="field Name"
                                        onChange={(e) => this.inputHandler(e, "fieldName", "formField")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Field Category</th>
                                <td>:</td>
                                <td>
                                    <select 
                                        className="input-text" 
                                        name="category" 
                                        id=""
                                        // value={this.state.formField.gender}
                                        onChange={(e) => this.inputHandler(e, "category", "formField")}
                                        placeholder="Field Type"
                                    >
                                        <option value="type" disabled> Field Type </option>
                                        <option 
                                            value="voli"   
                                            onClick={() => this.setState({ formField: {
                                                                                ...this.state.formField,
                                                                                category: "voli"
                                                                            }})} >Voli</option>
                                        <option 
                                            value="basket"
                                            onClick={() => this.setState({ formField: {
                                                                                ...this.state.formField,
                                                                                category: "basket"
                                                                            }})} >Basket</option> 
                                        <option 
                                            value="futsal"  
                                            onClick={() => this.setState({ formField: {
                                                                                ...this.state.formField,
                                                                                category: "futsal"
                                                                            }})} >Futsal</option>
                                        <option 
                                            value="tennis"
                                            onClick={() => this.setState({ formField: {
                                                                                ...this.state.formField,
                                                                                category: "tennis"
                                                                            }})} >Tennis</option>
                                        <option 
                                            value="badminton"
                                            onClick={() => this.setState({ formField: {
                                                                                ...this.state.formField,
                                                                                category: "badminton"
                                                                            }})} >Badminton</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Type</th>
                                <td>:</td>
                                <td>
                                    <select 
                                        className="input-text" 
                                        name="type" 
                                        id=""
                                        // value={this.state.formField.gender}
                                        onChange={(e) => this.inputHandler(e, "type", "formField")}
                                        placeholder="Field Category"
                                    >
                                        <option value="category" disabled> Field Type </option>
                                        <option 
                                            value="indoor"
                                            onClick={() => this.setState({ formField: {
                                                                                ...this.state.formField,
                                                                                type: "indoor"
                                                                            }})} >Indoor</option>
                                        <option 
                                            value="outdoor"
                                            onClick={() => this.setState({ formField: {
                                                                                ...this.state.formField,
                                                                                type: "outdoor"
                                                                            }})} >Outdoor</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>:</td>
                                <td>
                                    <input 
                                        className="input-text" 
                                        // value={this.state.formField.email}
                                        placeholder="price"
                                        onChange={(e) => this.inputHandler(e, "price", "formField")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Image</th>
                                <td>:</td>
                                <td>
                                   <input type="file" name="Field Image" onChange={this.fileChangeHandler}/>
                                </td>
                            </tr>
                            <tr>
                                <th> Field Description</th>
                                <td>:</td>
                                <td>
                                    <textarea 
                                        className="input-text" 
                                        name="" 
                                        id="" 
                                        cols="30" 
                                        rows="2"
                                        // value={this.state.formField.address}
                                        placeholder="description"
                                        onChange={(e) => this.inputHandler(e, "description", "formField")}
                                    >
                                    </textarea>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><button onClick={this.fieldUploadDataHandler}>Create Field</button></td>
                            </tr>
                        </tbody>
                </Table>
            </div>
        </div>
        )
    }
}

export default AddField;