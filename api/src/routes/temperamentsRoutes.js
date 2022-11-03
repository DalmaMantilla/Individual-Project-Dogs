const { Router } = require('express');
const axios = require ("axios");
const {Temperament} = require('../db');
const { API_KEY } = process.env;

temperamentsRoutes = Router();

temperamentsRoutes.get("/temperaments", async function (req, res) {
    try {
    const apiInfo = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`); 
    const getTemp = await apiInfo.data.map((e) => e.temperament);
    const nvoArrayTemp = getTemp.filter(Boolean);
    const nvoArrayTemp1 = nvoArrayTemp 
        .join(', ')
        .trim() 
        .split(', ')
        .sort();
    const nvoArrayTemp2 = new Set(nvoArrayTemp1);
    let result = [...nvoArrayTemp2] 
    //console.log(result);


    //Por cada elemento del array result creo un nuevo temperamento y los guardo en DB
    result.forEach( temp => {
        Temperament.findOrCreate({
            where: { name: temp}
        })
    })
  
    //Traigo todos los temperamentos
    const getTemperament = await Temperament.findAll();
    res.status(200).send(getTemperament)
    console.log('Temperamentooooooooooos',getTemperament)

    } catch(error){
        next(error);
    }
});
    

module.exports = temperamentsRoutes;

























// temperamentsRoutes.get("/temperaments", async function (req, res) {
//     try {
//     const apiInfo = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`); //netro al endpoint donde sacon los perros..
//     const getTemp = await apiInfo.data.map(e => e.temperament);//..y pido solo los temperamentos

//     const nvoArrayTemp = getTemp.filter(Boolean);//elimina valores nulos e indefinidos del array
//     const nvoArrayTemp1 = nvoArrayTemp 
//         .join(', ')//Une todos los elementos de un array o matriz y devuelve esa cadena
//         .trim() //Elimina espacios en blanco en ambos extremos del string
//         .split(', ')// //convierto el string de caracteres en un solo array, donde adentro estan los temperamentos separados por una coma
//         .sort();// ordena los elementos
//     const nvoArrayTemp2 = new Set(nvoArrayTemp1); //crea un objeto Set
//     let result = [...nvoArrayTemp2]//Muestra los elem del array, previamente eliminando elementos duplicados 
       //console.log(temperaments);
//     //Por cada elemento del array creo un nuevo temperamento y los guardo en DB
//     result.forEach( temp => {
//         Temperament.findOrCreate({
//             where: { name: temp}
//         })
//     })

//     //Traigo todos los temperamentos
//     const getTemperament = await Temperament.findAll();
//     res.status(200).send(getTemperament)

//     } catch(error){
//         next(error);
//     }
// });
    








