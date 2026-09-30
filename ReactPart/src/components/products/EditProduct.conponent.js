import React from "react";
import { ProductForm } from "./productform/ProductForm";
import { HttpClient } from "../../ultility/HttpClient";
import { notify } from "../../ultility/notify";
import { Loader } from "./../common/loader/loader.component";


export class EditProduct extends React.Component{
    constructor() {
        super()
        this.state = {
            product: '',
            isLoading:false,
        }
    }

    componentDidMount() {
        const productId = this.props.match.params['id'];
        this.setState({
            isLoading:true
        })
        HttpClient
            .GET(`/product/${productId}`, true)
            .then(res => {
                this.setState({
                    product:res.data[0],
                })
                console.log("res data", res.data);
                console.log("product data", this.state.product);
            })
            .catch(err => {
                notify.handleError(err);
            })
            .finally(() => {
                this.setState({
                isLoading:false,
            })
        })
        
    }

    edit = (product, files) => {
        const data = {
            ...product,
            vendor:product.vendor._id,
        }
        HttpClient
            .UPLOAD("PUT",`/product/${product._id}`, data, files)
            .then(res => {
                this.props.history.push("/view_product");
            })
            .catch(err => {
                notify.handleError(err);
            })
        
    }

    render() {
        let content = this.state.isLoading ? <Loader />
            :
            <ProductForm title="Edit Product" product={this.state.product} buttonLabel="Edit Product" submitCallBack={this.edit} ></ProductForm>
        
        return (
            <>
                {content}
            </>
        )
    }
}