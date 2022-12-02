import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";



const FullGridItem = (props) => {




return(
    <Grid item xs={12} xl={12} md={12} sm={12}>
        {props.children}
    </Grid>


)



}

export default FullGridItem;