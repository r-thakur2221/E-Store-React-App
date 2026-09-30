import React from "react";
import { ProductForm } from "./productform/ProductForm";
import {HttpClient} from "../../ultility/HttpClient";
import { notify } from "../../ultility/notify";

export class AddProduct extends React.Component{
    constructor() {
        super();
        this.state = {
            isSubmitting:false,
        }
    }

    add = (data,files) => {
        console.log("add function is triggered!");
        this.setState({
            isSubmitting:true,
        })
        HttpClient
            .UPLOAD("POST","/product",data, files)
            .then(res => {
                console.log("res of add product is >>", res);
                notify.showSuccess("Product Added Succeddfull");
                this.props.history.push('/view_product');
            })
            .catch(err => {
                notify.handleError(err);
                this.setState({
                    isSubmitting:false,
                })
            })
    }
    render() {
        return (
            <ProductForm title="Add Product faster" isSubmitting={this.state.isSubmitting} buttonLabel="Add Product" submitCallBack={this.add} ></ProductForm>
        )
    }
}