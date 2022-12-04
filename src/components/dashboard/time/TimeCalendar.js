import React from 'react'
import {CircularProgress} from "@mui/material";
import { ResponsiveCalendar } from '@nivo/calendar'

const TimeCalendar = (props) =>{
    const{loading,data} = props
    return(
            (loading)?<CircularProgress></CircularProgress>:
                <>
            <ResponsiveCalendar
                data={data}
                from="2020-01-01"
                to="2021-12-12"
                emptyColor="#eeeeee"
                colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
        </>
    )


}


export default TimeCalendar;