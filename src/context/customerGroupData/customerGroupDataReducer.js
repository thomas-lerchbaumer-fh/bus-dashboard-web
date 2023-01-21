import {
    GET_HEATMAP_FROM_DATA,
    GET_HEATMAP_TO_DATA,
    GET_DEPARTURE_RANKING,
    GET_DESTINATION_RANKING,
    GET_TIME_REQUESTS,
    GET_TIME_CALENDAR,
    GET_GENERAL_DATA,
    GET_NO_RESULTS,
    GET_USER_GROUPS,
    GET_FILTERED_CUSTOMER_DATA
} from "../types";


export default (state,action)=>{
    switch (action.type){
        case GET_USER_GROUPS:
            console.log(action.payload)
            return{
                ...state,
                groups: action.payload,
                loadingGroups:false
            }
        case GET_FILTERED_CUSTOMER_DATA:
            return {
                ...state,
                groupData: action.payload,
                loadingData: false
            }

    }


}