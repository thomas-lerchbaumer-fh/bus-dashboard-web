import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from "react-router-dom";
import GeneralInfos from "../dashboard/generalInfos";
import Box from "@mui/material/Box";
import { styled, useTheme } from '@mui/material/styles';
import DashboardDataContext from "../../context/dashboardData/dashboardDataContext";
import {CircularProgress} from "@mui/material";
import HomeDataGrid from "../datagrids/HomeDataGrid";

const Home = (props) => {
    const authContext = useContext(AuthContext);
    const {login, error, clearErrors, isAuthenticated,loadUser,loading } = authContext;
    const navTo = useNavigate()
    const dashboardDataContext = useContext(DashboardDataContext)
    const {
        loadingGeneralData,
        getGeneralData,
        generalData
    } = dashboardDataContext

    useEffect(()=>{
        getGeneralData()
    },[getGeneralData]);


    return(
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <GeneralInfos data={generalData} loading={loadingGeneralData}></GeneralInfos>
                <HomeDataGrid></HomeDataGrid>
            </Box>

        </>
    )
}

export default Home