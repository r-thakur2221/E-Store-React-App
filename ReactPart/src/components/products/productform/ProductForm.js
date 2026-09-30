import React from "react";

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ButtonComponent } from "../../common/Buttons/Button.Component";

const ImageURL = process.env.REACT_APP_IMAGE_URL;

const theme = createTheme();

const defaultForm = {
    name: '',
    price: '',
    color: '',
    size: '',
    category: '',
    description: "",
    condition: '',
    warrentyStatus: false,
    warrentyPeriod: '',
    isDiscountedItem:false,
    discountType: '',
    discountValue: '',
    tags: '',
    modelNo:'',
}
export class ProductForm extends React.Component{
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm,
            },
            error: {
                ...defaultForm,
          },
            filesToUpload:[],
            isValidForm:true,
        }
    }

    componentDidMount() {
        console.log("this.props of product form", this.props);
      if (this.props.product) {
        this.setState({
          data: {
            ...defaultForm,
            ...this.props.product,
            isDiscountedItem: this.props.product.discount ? this.props.product.discount.isDiscountedItem : '',
            discountType:this.props.product.discount ? this.props.product.discount.discountType :'',
            discountValue:this.props.product.discount ? this.props.product.discount.discountValue :'',
            
            warrentyStatus: this.props.product.warrentyStatus,
            warrentyPeriod: this.props.product.warrentyStatus ? this.props.product.warrentyPeriod :'',
            // warrentyStatus: this.props.product.warrentyStatus ,
            tags:(this.props.product.tags || []).toString(),
            images:(this.props.product.images || []).toString(),
            // reviews:(this.props.product.reviews || []).toString(),
          }
        })
      }
    }

    validateForm(fieldName) {
        let errMsg;
        switch (fieldName) {
            case "category":
                errMsg = this.state.data.category ? "" : "Category is Required";
                break;
            case "name":
                errMsg = this.state.data.name ? "" : "Name is Required";
                break;
            case "price":
                errMsg = this.state.data.price ? "" : "Price is Required";
                break;
            default:
                break;
        }
        this.setState(preState => ({
            error: {
                ...preState.error,
                [fieldName]:errMsg,
            }
        }), () => {
            let errs = Object.values(this.state.error).filter(item => item).length;
            this.setState({
                isValidForm: errs === 0 ? true : false
            })
        })
  }
  
  
    handleChange = (e) => {
        let { type, name, value, checked ,files} = e.target;
        if (type === "checkbox") {
            value = checked;
        }

      if (type === "file") {
        console.log("e.taget.files is", files);
        const { filesToUpload } = this.state;
        filesToUpload.push(files[0]);
        this.setState({
          filesToUpload,
        })
      }
        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]:value
            }
        }), () => {
            this.validateForm(name);
        })
    }


  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("data is >>", this.state.data);
    this.props.submitCallBack(this.state.data,this.state.filesToUpload);
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} size="large">
            <ProductionQuantityLimitsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.props.title}
          </Typography>
          <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={this.handleChange}
                  autoComplete="given-name"
                  name="name"
                  value={this.state.data.name}
                  required
                  fullWidth
                  id="name"
                  label="Product Name"
                  autoFocus
                />
                 <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  onChange={this.handleChange}
                  id="price"
                  label="Price"
                  name="price"
                  value={this.state.data.price}
                  autoComplete="family-name"
                                    />
                     <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.price}
                </Typography>                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={this.handleChange}
                  id="category"
                  label="Category"
                  name="category"
                  value={this.state.data.category}
                  autoComplete="category"
                 />
                 <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.category}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={this.handleChange}
                  id="brand"
                  label="Brand"
                  name="brand"
                  value={this.state.data.brand}
                  autoComplete="brand"
                                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={this.handleChange}
                  name="condition"
                  value={this.state.data.condition}
                  label="Condition eg. brand new ,used,"
                  type="condition"
                  id="condition"
                  autoComplete="condition"
                                    />
                </Grid>
                    <Grid item xs={12}>
                <TextField
                  type='text'
                fullWidth
                onChange={this.handleChange}
                  id="description"
                  label="Description of this item"
                  name="description"
                  value={this.state.data.description}
                  autoComplete="description"
                />
                                </Grid>
                <Grid item xs={12}>
                <TextField
                  type='text'
                fullWidth
                onChange={this.handleChange}
                  id="color"
                  label="Color of this item"
                  name="color"
                  value={this.state.data.color}
                  autoComplete="color"
                />
                                </Grid>
                                <Grid item xs={12}>
                <TextField
                                        fullWidth
                                        onChange={this.handleChange}
                  id="size"
                  label="Size"
                  name="size"
                  value={this.state.data.size}
                  autoComplete="size"
                />
                                </Grid>
                                <Grid item xs={12}>
                <TextField
                                        fullWidth
                                        onChange={this.handleChange}
                  id="status"
                  label="Status of item in store ie Available or sold.."
                  name="status"
                  value={this.state.data.status}
                  autoComplete="status"
                />
                                </Grid>
                                <Grid item xs={12}>
                <TextField
                                        fullWidth
                                        onChange={this.handleChange}
                  id="modelNo"
                  label="Model"
                  name="modelNo"
                  value={this.state.data.modelNo}
                  autoComplete="modelNo"
                />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    
                                         onChange={this.handleChange}
                  type="string"
                  fullWidth
                  id="tags"
                  label="Tags for this product..."
                  name="tags"
                  value={this.state.data.tags}
                  autoComplete="tags"
                /> 
                                </Grid>
                 <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="warrentyStatus" checked={this.state.data.warrentyStatus} color="primary" onChange={this.handleChange}/>}
                  label="Warrenty Status"
                />
                
              </Grid>
              {
                    this.state.data.warrentyStatus &&
                    (
                        <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange}
                  type="string"
                  fullWidth
                  id="warrentyPeriod"
                  label="warrenty Period for this product..."
                  name="warrentyPeriod"
                  value={this.state.data.warrentyPeriod}
                  autoComplete="warrentyPeriod"
                />
                                </Grid>
                    )
                }
                                
                                    <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="isDiscountedItem" checked={this.state.data.isDiscountedItem} color="primary" onChange={this.handleChange}/>}
                  label="Is Discounted Item"
                />
              </Grid>
              {
                  this.state.data.isDiscountedItem &&
                  (
                      <>
                      <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange}
                  type="string"
                  fullWidth
                  id="discountType"
                  label="discountType for this product...Percentage or amount"
                  name="discountType"
                  value={this.state.data.discountType}
                  autoComplete="discountType"
                />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange}
                  type="string"
                  fullWidth
                  id="discountValue"
                  label="DiscountValue for this product..."
                  name="discountValue"
                  value={this.state.data.discountValue}
                  autoComplete="discountValue"
                />
                </Grid>
                                        </>
                  )
              }
              {
                this.props.product&&this.props.product.images&&this.props.product.images.length &&(
                <Grid>
                  <Typography component="h1" variant="h5">
                    Previous Image
                  </Typography>
                  <img  src={`${ImageURL}${this.props.product.images[0]}`} alt={ `${this.props.product.images[0]}`} height="200px" width="300px" />
                </Grid>
                )
              }
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleChange}
                  type="file"
                  fullWidth
                  id="images"
                  label="Select Image."
                  name="images"
                />
              </Grid>
            </Grid>
                            <ButtonComponent
                                label={this.props.buttonLabel}
                                isSubmitting={ this.props.isSubmitting}
                                isDisabled={!this.state.isValidForm}
                                />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        )
    }
    
}