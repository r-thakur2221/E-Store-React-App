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
import { HttpClient } from "../../../ultility/HttpClient";
import { notify } from "../../../ultility/notify";

import { ViewProduct } from "../ViewProduct.Component";

const theme = createTheme();


const formData = {
    name:'',
    category: '',
    brand: '',
    color: "",
    minPrice: "",
    maxPrice: "",
    isDiscountedItem: '',
    discountType: '',
    discountValue:'',
    warrentyStatus: '',
    warrentyPeriod:'',
}
export class SearchProduct extends React.Component{
    constructor() {
        super();
        this.state = {
            data: {
                ...formData,
            },
            isSubmitting: false,
            searchProducts:[],
        }
    }

    handleChange = (e) => {
        let { type, value, name, checked } = e.target;

        if (type === "checkbox") {
            value = checked;
        }

        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]:value,
            }
        }))

        console.log("name is ", name);
        console.log("value is ", value);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            isSubmitting: true,
        })

        HttpClient
            .POST('/product/search', this.state.data, true)
            .then(res => {
                console.log("res of search is", res);
                let searchProducts = res.data;
                if (searchProducts.length === 0) {
                    notify.showInfo("No Product Found From this Information !!!");
                }
                this.setState({
                    searchProducts,
                })
                //after this view the above result in view page with above data;
                
                //todos here
            })
            .catch(err => {
                notify.handleError(err);
            })
            .finally(() => {
                this.setState({
                    isSubmitting:false,
                })
            })
    }

    ResetFunction = () => {
        this.setState({
            searchProducts: [],
            data: {
                ...formData
            }
        })
    }
    render() {
        let searchContent = this.state.searchProducts.length ?
            (
                <ViewProduct searchData={this.state.searchProducts} resetSearch={ this.ResetFunction}/>
            )
            :
            (
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
            Advance Search
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  onChange={this.handleChange}
                  id="color"
                  label="color"
                  name="color"
                  value={this.state.data.color}
                  autoComplete="family-name"
                                    />               
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
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  onChange={this.handleChange}
                  type="number"
                  name="minPrice"
                  value={this.state.data.minPrice}
                  required
                  fullWidth
                  id="minPrice"
                  label="Minimun Price"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  onChange={this.handleChange}
                  id="maxPrice"
                  label="maxPrice"
                  name="maxPrice"
                  value={this.state.data.maxPrice}
                                    />               
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
                  label="Available or sold..."
                  name="status"
                  value={this.state.data.status}
                  autoComplete="status"
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
                            <ButtonComponent
                                label="Search"
                                isSubmitting={ this.state.isSubmitting}
                                />
                </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
        return searchContent;
    }
}