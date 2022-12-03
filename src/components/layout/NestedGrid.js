import React from 'react';
import GridItem from "./GridItem";
import Grid from "@mui/material/Unstable_Grid2";




const NestedGrid = (props) =>{
    const {type} = props
    return(
        <Grid container xs={12} md={4} xl={4} lg={4} sx={{flexDirection:type}}>
            <Grid xs={12} xl={8} md={8} lg={8}>
                <GridItem>{props.children[0]}</GridItem>
            </Grid>
            <Grid xs={12} xl={8} md={8} lg={8}>
                <GridItem>{props.children[1]}</GridItem>
            </Grid>
        </Grid>
    )


}


export default NestedGrid;