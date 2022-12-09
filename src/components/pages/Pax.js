import React, {useContext, useEffect} from 'react'
import Grid from "@mui/material/Unstable_Grid2";
import GridItem from "../layout/GridItem";
import DashboardDataContext from "../../context/dashboardData/dashboardDataContext";
import NoResultsGrid from "../pax/NoResultsGrid";
import {CircularProgress} from "@mui/material";




const Pax = (props)=>{

    const dashboardDataContext = useContext(DashboardDataContext)
    const {
        noResultsForRequest,
        loadingNoResults,
        getNoResults,
    } = dashboardDataContext

    useEffect(() => {
        getNoResults()

    }, [getNoResults]);

    return(
        (loadingNoResults)?<CircularProgress></CircularProgress>:
        <>
            <Grid container spacing={4} alignItems={"stretch"}>
                <Grid container xs={12} sm={12} lg={12}>
                    <Grid item lg={12} height={"60vh"}>
                        <GridItem>
                        <NoResultsGrid data={noResultsForRequest}></NoResultsGrid>
                        </GridItem>
                        </Grid>
                </Grid>
            </Grid>


        </>
    )


}


export default Pax