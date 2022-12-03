import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GridItem from '../layout/GridItem'
const HalfGridItem = (props) => {




return(
    <Grid item xs={12} xl={8} md={8} sm={8}>
        <GridItem>
        {props.children}
        </GridItem>
    </Grid>


)



}

export default HalfGridItem;