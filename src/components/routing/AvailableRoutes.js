import React, {useContext} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Container from "@mui/material/Container";
import AlertInfo from "../layout/AlertInfo";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../login/Login";
import AuthContext from "../../context/auth/authContext";
import HeatMaps from "../pages/HeatMaps";
import TimeRequests from "../pages/TimeRequests";

const AvailableRoutes = (props) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;

    return (
        <>
            <AlertInfo></AlertInfo>
            <Routes>

                <Route
                    path="/"
                    element={
                        <PrivateRoute auth={{isAuthenticated: isAuthenticated, loading: loading}}>
                            <Home/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/time"
                    element={
                        <PrivateRoute auth={{isAuthenticated: isAuthenticated, loading: loading}}>
                            <TimeRequests/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/heatmaps"
                    element={
                        <PrivateRoute auth={{isAuthenticated: isAuthenticated, loading: loading}}>
                            <HeatMaps/>
                        </PrivateRoute>
                    }
                />
                <Route exact path='/login' element={<Login/>}></Route>

            </Routes>
        </>

    )

}


export default AvailableRoutes