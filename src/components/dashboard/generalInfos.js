import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const GeneralInfos = () =>{


    return(
        <>
            <Grid container spacing={5}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
        </>
    )

}


export default GeneralInfos