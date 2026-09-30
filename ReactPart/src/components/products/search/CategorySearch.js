import React from "react";

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import InputLabel from '@mui/material/InputLabel';
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
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";

const theme = createTheme();


const formData = {
    category: '',
}
export class CategorySearch extends React.Component{
    constructor() {
        super();
        this.state = {
            data: {
                ...formData,
            },
            isSubmitting: false,
            categories:[],
            searchProducts:[],
        }
    }


    componentDidMount() {
        HttpClient
            .GET('/product/search', true)
            .then(res => {
                let categories = [];
                res.data.forEach((item, i) => {
                    if (categories.indexOf(item.category) === -1) {
                        categories.push(item.category);
                    }
                })
                this.setState({
                    categories
                })
            })
            .catch(err => {
                notify.handleError(err);
            })
    }
    handleChange = (e) => {
        let { value, name } = e.target;

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
            Category Search
          </Typography>
          <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
              <Grid item xs={12}>
                 <InputLabel >Choose Category</InputLabel>
                 <Select aria-label="Category" sx={{ m: 1, minWidth: 280 }} name="category" label="Choose Category" value={this.state.data.category} onChange={this.handleChange} >
                     {
                         this.state.categories.map((item,i)=>(
                             <MenuItem key={i} value={item}>{ item }</MenuItem>
                         ))
                     }
                 </Select>
                 </Grid>
                 <Grid item xs={12}>
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