import {
    GET_HEATMAP_FROM_DATA,
    GET_HEATMAP_TO_DATA
} from "../types";


export default (state,action)=>{
    switch (action.type){
        case GET_HEATMAP_FROM_DATA:
            console.log(action.payload)
            return{
                ...state,
                heatmapFromData: action.payload,
                loading:false
            }
    }


}