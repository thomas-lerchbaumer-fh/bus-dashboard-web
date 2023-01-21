import React from 'react'
import { DataGrid } from '@mui/x-data-grid';



const NoResultsGrid = props =>{
    const {data} = props
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'taskFrom_address',
            headerName: 'From',
            width: 200,
        },
        {
            field: 'createdAt',
            headerName: 'Request on',
            width: 200,
        },
        {
            field: 'taskFrom_time',
            headerName: 'Departure Time',
            width: 200,
        },
        {
            field: 'taskTo_address',
            headerName: 'To',
            width: 200,
        },
        {
            field: 'pax',
            headerName: 'Pax',
            width: 110,
        },
        {
            field: 'distanceInMeters',
            headerName: 'Distance in km',
            width: 200,
            valueGetter: (params) =>
                `${(params.row.distanceInMeters/1000).toLocaleString(undefined, {maximumFractionDigits:2}) }km`,
        },
        {
            field: 'bookingIntegration_id',
            headerName: 'External request',
            width: 200,
        },
    ];


    return(
        <>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={20}
                sx={{height:"90%"}}
                rowsPerPageOptions={[20]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </>

    )




}

export default NoResultsGrid