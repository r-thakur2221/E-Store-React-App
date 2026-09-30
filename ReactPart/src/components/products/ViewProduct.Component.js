import React from "react";
import { HttpClient } from "../../ultility/HttpClient";
import { notify } from "../../ultility/notify";
import {Loader} from "./../common/loader/loader.component"

//material ui table imports
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageURL = process.env.REACT_APP_IMAGE_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


//material ui table portion ends here


export class ViewProduct extends React.Component{

    constructor() {
        super()
        this.state = {
            isLoading: false,
            product:[],
        }
    }

  componentDidMount() {
    if (this.props.searchData) {
      console.log("search props in view ", this.props.searchData);
      this.setState({
        product:this.props.searchData
      })
    } 
    else {
        this.setState({
                    isLoading: true,
                })
        HttpClient
            .GET(`/product`, true)
            .then(res => {
                // console.log("res of view product>>", res);
                this.setState({
                    product: res.data,
                })
                // console.log("this.state product", this.state.product);
            })
            .catch(err => {
                notify.handleError(err);
                
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            });
      }
    }

    removeProduct = (id,index) => {
        // let confirmation = confirm("Are you sure you want to remove this item ?");
        //         if (confirmation) {
                    HttpClient
            .DELETE(`/product/${id}`, true)
                        .then(res => {
                            notify.showSuccess("Product Removed !");
                const { product } = this.state;
                product.splice(index, 1);
                this.setState({
                    product
                })
            })
            .catch(err => {
                notify.handleError(err);
            })
                // }
        
    }

    editProduct = (id) => {
      this.props.history.push(`/edit_product/${id}`);
      
    }
  render() {
        let content = this.state.isLoading ? <Loader />
            :
            <>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SN</StyledTableCell>
            <StyledTableCell align="left">Images</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Category</StyledTableCell>
            <StyledTableCell align="left">Brand</StyledTableCell>
            <StyledTableCell align="left">Color</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>           
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.product.map((item,i) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="left" >
                <img src={`${ImageURL}${item.images[0]}`} alt={ `${item.images[0]}`} height="100px" width="150px" />
              </StyledTableCell>
              <StyledTableCell align="left">{item.name}</StyledTableCell>
              <StyledTableCell align="left">{item.price}</StyledTableCell>
              <StyledTableCell align="left">{item.category}</StyledTableCell>
              <StyledTableCell align="left">{item.brand}</StyledTableCell>
              <StyledTableCell align="left">{item.color}</StyledTableCell>
              <StyledTableCell align="left">
                <button onClick={()=>this.editProduct(item._id)}><EditIcon /></button>
                <button onClick={()=>this.removeProduct(item._id,i)}><DeleteIcon /></button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </>
        return (
          <>  
            {
              this.props.searchData && (
                <div backgroundColor='grey'>
                  <Button variant="contained" color="secondary" onClick={this.props.resetSearch}>Search Again</Button>
                </div>
              )  
            }
            {content}
          </>
        )
    }
}

