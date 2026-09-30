import React from "react";
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom';
import { LoginComponent } from "./components/auth/Login/login.component";
import { RegisterComponent } from "./components/auth/Register/Register.Component";
import { AppBarComponent } from "./components/common/headers/AppBar.component";
import { MessageComponent } from "./components/Message/messageComponent";
import { NotePad } from "./components/Notes/NotePad";
import { AddProduct } from "./components/products/AddProduct.component";
import { EditProduct } from "./components/products/EditProduct.conponent";
import { SearchProduct } from "./components/products/search/AdvanceSearch";
import { CategorySearch } from "./components/products/search/CategorySearch";
import { ViewProduct } from "./components/products/ViewProduct.Component";
// import { SideBar } from "./components/common/sidebar/SidebarComponent";

const PageNotFound = (props) => {
    console.log("Page not found props,", props)   
    return (
        <>
            <h2> Opps! ,Page Not Found </h2>
             <img
                src= "./../public/uploads/images/PageNotFound.png"
                alt="Page Not Found" />
        </>)
}

const Home = (props) => {
    return (<h1>I am your Home Page. </h1>)
}
const DashBoard = (props) => {
    // console.log("dashboard props",props)
    return(<h1>I am Your DashBoard</h1>)
}

const Support = (props) => {
    // console.log("Support props",props)
    return(<h1>I am Your Support</h1>)
}

const ProtectedRoute = ({component:Component,...rest}) => {
    return <Route
        {...rest}
        render={(routeProps) => (
            localStorage.isLoggedIn ?
                <>
                    <AppBarComponent isLoggedIn={ true }/>
                    {/* <SideBar isLoggedIn={true} /> */}
                    <div>
                        <Component {...routeProps}></Component>
                    </div>
                </>
                :
                <Redirect to="/"></Redirect>
        )}
    ></Route>
}

const PublicRoute = ({component:Component,...rest}) => {
    return <Route
        {...rest}
        render={(routeProps) => (
                <>
                    <AppBarComponent isLoggedIn={ false }/>
                    <div>
                        <Component {...routeProps}></Component>
                    </div>
                </>
        )}
    ></Route>
}

export const AppRouter = (props) => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <PublicRoute exact path="/" component={Home} ></PublicRoute>
                    <PublicRoute exact path="/login" component={LoginComponent } ></PublicRoute>
                    <PublicRoute path="/register" component={RegisterComponent } ></PublicRoute>
                    <ProtectedRoute path="/product" component={AddProduct} ></ProtectedRoute>
                    <ProtectedRoute path="/view_product" component={ViewProduct} ></ProtectedRoute>
                    <ProtectedRoute path="/edit_product/:id" component={EditProduct} ></ProtectedRoute>
                    <ProtectedRoute path="/dashboard/:name" component={DashBoard} ></ProtectedRoute>
                    <ProtectedRoute path="/search" component={SearchProduct} ></ProtectedRoute>
                    <ProtectedRoute path="/category" component={CategorySearch} ></ProtectedRoute>
                    <ProtectedRoute path="/notes" component={NotePad} ></ProtectedRoute>
                    <ProtectedRoute path="/support" component={Support} ></ProtectedRoute>
                    <ProtectedRoute path="/messages" component={MessageComponent} ></ProtectedRoute>
                    <PublicRoute component={PageNotFound} ></PublicRoute>
                </Switch>
            </BrowserRouter> 
        </>
        
    )
}