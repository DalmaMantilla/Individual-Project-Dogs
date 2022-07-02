
const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []
   
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return { //retorna un nuevo estado
                ...state,
                dogs: action.payload
            };
        
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            };

        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            };
        case "GET_CLEAN":
            return{
                ...state,
                detail: action.payload
            };
        case "SEARCH_DOGS":
            return{
                ...state,
                dogs: action.payload
            }
        case "POST_DOG":
            return{
                ...state
            };
        case 'ORDER_BY_NAME':
            let sortName = action.payload === 'asc' ?
            state.dogs.sort(function(a,b){
                if (a.name > b.name){return 1};
                if (b.name > a.name){return -1};
                return 0;
            }) :
            state.dogs.sort(function(a,b) {
                if (a.name > b.name){return -1};
                if (b.name > a.name) {return 1};
                return 0;
            })
            return {
                ...state, 
                dogs: sortName
            }
    
        default :
            return {...state}           
    }
    
}




export default rootReducer;