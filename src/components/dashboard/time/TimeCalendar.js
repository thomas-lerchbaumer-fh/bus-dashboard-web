import React from 'react'
import {CircularProgress, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { ResponsiveCalendar } from '@nivo/calendar'

const TimeCalendar = (props) =>{
    const{loading,data} = props

    const [date, setDate] = React.useState('2020');
    const handleChange = (event, newAlignment) => {
        setDate(newAlignment);
    };

    return(
            (loading)?<CircularProgress></CircularProgress>:
                <>
                    <ToggleButtonGroup
                        color="primary"
                        value={date}
                        exclusive
                        onChange={handleChange}
                        aria-label="Year"
                    >
                        <ToggleButton value="2020">2020</ToggleButton>
                        <ToggleButton value="2021">2021</ToggleButton>
                        <ToggleButton value="2022">2022</ToggleButton>
                    </ToggleButtonGroup>

            <ResponsiveCalendar
                data={data}
                from={`${date}-01-01`}
                to={`${date}-12-31`}
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