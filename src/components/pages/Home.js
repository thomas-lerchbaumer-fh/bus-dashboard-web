import React, {useState, useContext, useEffect} from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Button, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import GeneralInfos from "../dashboard/generalInfos";

const Home = (props) => {
    const authContext = useContext(AuthContext);
    const {login, error, clearErrors, isAuthenticated,loadUser,loading } = authContext;
    const navTo = useNavigate()

    useEffect(()=>{

    },[error,isAuthenticated, props.history]);


    return(
        <>
            <GeneralInfos></GeneralInfos>
        </>
    )
}

export default Home