import axios from "axios";


//conecto el front conb el back
export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs");
        console.log(json, 'ME TRAJO LOS PERROOOOOOOS')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })       
    } 
}


export function getTemperaments(){
    return async function (dispatch){
        var temp = await axios.get("http://localhost:3001/temperaments");
        console.log(temp, 'ME TRAJO LOS TEMPERAMENTOS')
        return dispatch ({
            type: 'GET_TEMPERAMENTS',
            payload: temp.data
        });  
    }
}

//-------ORDENAR----------------------------------------
export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}





export function orderByWeight(payload){
   
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}





//------------------------FILTERS----------------------------
export function filterCreated(payload){ 
    return {    
        type: "FILTER_CREATED",
        payload
    }
}

export function filterTemperament(payload){
    return {
        type: "FILTER_TEMPERAMENT",
        payload
    }
}

