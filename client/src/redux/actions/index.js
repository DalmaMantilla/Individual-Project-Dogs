import axios from "axios";
const Swal = require('sweetalert2')


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


export function getDetail (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/dogs/${id}`);
            return dispatch ({
                type: "GET_DETAILS",
                payload: json.data,
            })        
        }
        catch(error) {
            console.log(error)
        }
    }
}


export function getClean () {
    return{
        type: "GET_CLEAN",
        payload: []
    }
}


export function searchDogs(search) {
    return function (dispatch) {
        axios.get("/dogs?name=" + search)
        .then((dogs => {
            dispatch({
                type: "SEARCH_DOGS",
                payload: dogs.data
            })
        }))
        .catch(() => {
            // alert('Dog no found!');
            Swal.fire({
                icon: 'error',
                title: 'Dog no found!',
                width: 300,    
              })
        })
    }
}
   

// export function postDog (payload) {
//     return async function(dispatch) {
//         const response = await axios.post("/createDogs", payload);
//         //console.log("soy", response.temperament[1])
//         return response;
        
//     }
// }

export const postDog = (payload) => {
    return async (dispatch) => {
      try {
        const json = await axios.post("/createDog", payload);
        return json;
      } catch (error) {
        return { error: error.message};
      }
    };
  };


//-------ORDER----------------------------------------
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
    //En payload llega lo que yo le mando desde el componente
    return {
        type: "FILTER_TEMPERAMENT",
        payload
    }
}

