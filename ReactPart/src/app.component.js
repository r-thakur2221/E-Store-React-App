import React from "react";
import { AppRouter } from "./app.routing";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

export const App = () => {
    return (
        <div className="App">
            <AppRouter />
            <ToastContainer />
        </div>
    )
}
