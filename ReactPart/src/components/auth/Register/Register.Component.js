import React from "react";
import { Link } from "react-router-dom";
import {HttpClient} from "../../../ultility/HttpClient";
import { notify } from "../../../ultility/notify";

//material UI components imported
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ButtonComponent } from "../../common/Buttons/Button.Component";


const theme = createTheme();
//state maintaining const
const defaultForm= {
    firstName: '',
    lastName:"",
    gender: '',
    tempAddress: '',
    permAddress: '',
    dob: '',
    phoneNumber: '',
    role: '',
    username: '',
    password: '',
    email: '',
}
export class RegisterComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm,
            },
            error: {
                ...defaultForm,
            },
            isSubmitting: false,
            isValidForm:false,
        }

        // console.log("Constructor at first");
    }

    componentDidMount() {
        // console.log("AT 3rd");
        // console.log("Initial condition are applied here");
        // console.log("this.props", this.props);
    }

    componentDidUpdate(preProps,preState) {
        //either props change or state change 
        //first arguments as previous props and 2nd argument as previous state
        // console.log("component did update")
    }

    componentWillUnmount() {
        console.log("component is destroyed");
        //cancel all the subscriptions
        // cancel all the asyn call
    }
    validateForm(fieldName) {
        let errMsg;
        switch (fieldName) {
            case 'username': {
                errMsg = this.state.data.username ? '' : "username is required";
                break;
            }
            
            case 'email': {
                errMsg = this.state.data.email ? '' : "Email is required";
                break;
            }
            case 'password': {
                errMsg = this.state.data.password ? this.state.data.password.length < 4 ? "Weak Password": "" : "password is required";
                break;
            }
            default:
                break;
        }

        this.setState((preState) => ({
            error: {
                ...preState.error,
            [fieldName]:errMsg,
            }
        }), () => {
            const errors = Object.values(this.state.error);
            const err = errors.filter(item => item)
            if (err.length === 0) {
                this.setState({
                    isValidForm:true,
                })
            }
        })
    }

    handleChange = (e) => {
        let {  name, value } = e.target;
        this.setState((preState) => ({
            data: {
                ...preState.data,
                [name]:value,
            }
        }), () => {
            this.validateForm(name);
        })
    }

    //handle submit button
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state", this.state);
      this.setState({
        isSubmitting:true,
      })
      HttpClient.POST("/auth/register", this.state.data,false)
        .then((response) => {
          console.log("http response is >>", response);
          notify.showSuccess("Registration successful")
          this.props.history.push('/');
        })
        .catch(err => {
          notify.handleError(err);
          this.setState({
            isSubmitting: false,
          })
        });
      
        if (!this.state.isValidForm) {
            return;
        }
    }
    render() {
        // console.log("Render at second")
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={this.handleChange}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                                        fullWidth
                                        onChange={this.handleChange}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={this.handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                 />
                 <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.email}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={this.handleChange}
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                                    />
                                     <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.username}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                                        fullWidth
                                        onChange={this.handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                                    />
                                     <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.password}
                </Typography>
                </Grid>
                                
                <Grid item xs={12}>
                <TextField
                  type='number'
                                        fullWidth
                                        onChange={this.handleChange}
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
                                </Grid>
                                <Grid item xs={12}>
                <TextField
                                        fullWidth
                                        onChange={this.handleChange}
                  id="tempAddress"
                  label="Temporary Address"
                  name="tempAddress"
                  autoComplete="tempAddress"
                />
                                </Grid>
                                <Grid item xs={12}>
                <TextField
                                        fullWidth
                                        onChange={this.handleChange}
                  id="permAddress"
                  label="Permanent Address"
                  name="permAddress"
                  autoComplete="permAddress"
                />
                                </Grid>
                                <Grid item xs={12}>
                <TextField
                                        fullWidth
                                        onChange={this.handleChange}
                  id="gender"
                  label="Gender"
                  name="gender"
                  autoComplete="gender"
                />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={this.handleChange}
                  type="date"
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  autoComplete="dob"
                />
                                </Grid>
                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        onChange={this.handleChange}
                  fullWidth
                  id="role"
                  label="Role"
                  name="role"
                  autoComplete="role"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Accept all terms and conditions."
                />
              </Grid>
            </Grid>
                            <ButtonComponent
                                label="Sign Up"
                                isSubmitting={this.state.isSubmitting}
                                isDisabled={!this.state.isValidForm} />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        )
    }
}