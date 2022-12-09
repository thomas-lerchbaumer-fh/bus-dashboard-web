import {
    GET_ALL_SEARCH_REQUESTS
} from "../types";

export default (state,action)=>{
    switch (action.type){
        case GET_ALL_SEARCH_REQUESTS:
            return{
                ...state,
                searchRequests: action.payload,
                loadingLanding:false
            }

        default:
            return {
                ...state
            }
    }


}