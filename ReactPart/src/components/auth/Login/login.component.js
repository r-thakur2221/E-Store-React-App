import React from "react";
import { Link } from "react-router-dom";
import { notify } from "../../../ultility/notify";
import {HttpClient} from "../../../ultility/HttpClient";

//material Ui imported
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

const defaultForm = {
  username: '',
  password:'',
}

const theme = createTheme();
export class LoginComponent extends React.Component{
    constructor() {
        // first of all this constructor is run
        super();
      this.state = {
        data: {
            ...defaultForm
        },
        error: {
          ...defaultForm
        },
        rememberMe: false,
        isSubmitting: false,
        isValidForm: false,
        }
    }

  
    handleChange = (e) => {
        // console.log("e.target is>>",e.target)
        let { name, value ,checked,type } = e.target;
        if (type === 'checkbox') {
          value = checked;
          this.setState({
            rememberMe: value,
          })
        }
        this.setState(preState=>({
          data: {
            ...preState.data,
            [name]:value,
          },
        }), () => {
          this.validateForm(name);
        })
    }

    handleSubmit = (e) => {
      e.preventDefault();
        this.setState({
            isSubmitting:true,
        })      
      HttpClient.POST(`/auth/login`, this.state.data,false)
        .then(response => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("rememberMe", this.state.rememberMe);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user",JSON.stringify(response.data.userData))
          console.log("login res>>", response);
          this.props.history.push('/dashboard/rahul')
          notify.showSuccess(`Welcome ${response.data.userData.username}`);
        })
        .catch(err => {
          notify.handleError(err);
          this.setState({
            isSubmitting:false,
          })
        });
  }
  
  componentDidMount() {
    if (localStorage.getItem("rememberMe")) {
      this.props.history.push("/dashboard/rahul");
    }
  }
  
  validateForm(fieldName) {
        let errMsg;
        switch (fieldName) {
            case 'username': {
                errMsg = this.state.data.username ? '' : "username is required";
                break;
            }
            case 'password': {
                errMsg = this.state.data.password ? "" : "password is required";
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

  render() {
        return (
            <>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              onChange={this.handleChange}
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
                    />
                    <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.username}
                </Typography>
            <TextField
              margin="normal"
              required
              onChange={this.handleChange}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
                    />
                    <Typography
                  color='red'
                  component='h6'
                  variant="h7"
                  >
                  {this.state.error.password}
                </Typography>
            <FormControlLabel
              control={<Checkbox  onChange={this.handleChange} name='rememberMe'  color="primary" />}
              label="Remember me"
            />
            <ButtonComponent
                label="Sign In"
                isSubmitting={this.state.isSubmitting}
                isDisabled={!this.state.isValidForm}
            />
            <Grid container>
              <Grid item xs>
                <Link to="#" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
            </>
        )
    }
}