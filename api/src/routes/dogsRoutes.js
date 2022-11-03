const { Router } = require("express");
const axios = require("axios");
const { getAllDogs } = require("../controllers/getAllDogs");
const { Dog, Temperament } = require("../db");


const dogsRoutes = Router();


dogsRoutes.get('/dogs', async (req, res, next) => {
    try {
        const name = req.query.name;
        let allDogs = await getAllDogs();
        if(name) {
            let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length
            ? res.status(200).send(dogName)
            : res.status(404).send('Lo sentimos, No se encontro la raza con ese Nombre') 
        } else {
            res.status(200).send(allDogs)
        }
    } catch(error) {
        next(error)
    }
})



dogsRoutes.get('/dogs/:id', async(req,res,next) => { 
    try{
        const id = req.params.id;  
        //const { id } = req.params //Con destructuring
        let dogDb = [];
        if (typeof id === 'string' && id.length > 6) {
            dogDb = await Dog.findAll({ where: { id: id }, include: Temperament});
        }
       

        if (dogDb.length){
            res.send(dogDb);
        } else {  
            const dogsTotal = await getAllDogs(); 
            let dogsId = await dogsTotal.filter(e => e.id == id)
                dogsId.length
                ? res.status(200).json(dogsId)
                : res.status(404).send('Lo sentimos, No se encontro la raza con ese Id')  
        }
    } catch(error) {
        next(error)
        
    }
})



dogsRoutes.post("/dogs", async (req, res, next) => {
    let {
        name,
        min_height,
        max_height,
        min_weight, 
        max_weight,
        life_span,
        temperament, //buscar donde estan todos los temperametos 
        createdInDb,
    } = req.body;
    //console.log(req.body, 'DEBEN LLEGAR DEL BODY')
      
    if(!name || !min_height || !max_height || !min_weight || !max_weight || !temperament){
        return res.status(404).send('Faltan datos obligatorios')
    }
    try {
        let dogCreated = await Dog.create({
            name,
            min_height,
            max_height,
            min_weight, 
            max_weight,
            life_span,
            createdInDb: true  
          });
        console.log(dogCreated, 'PERRO CREADO')
        
        let temperamentDb = await Temperament.findAll({
            where: {
                name: temperament
            }
        });
        console.log(temperamentDb, 'TEMPERAMENTOOOOOS')
        dogCreated.addTemperament(temperamentDb);
        res.status(200).send('Raza creada con éxito')
    
        } catch (error) {
          next(error);
        }
        
      });




//---------------------RUTAS ADICIONALES---------------------
//EDITAR EL PERRO, busca por su id para editar
dogsRoutes.put("/dogs/edit/:id", async (req, res, next) => {
    const { id } = req.params;
    let {
        name,
        height_min,
        height_max,
        weight_min, 
        weight_max,
        life_span,
        temperament, //buscar donde estan todos los temperametos    
    } = req.body;
   
    if(!name || !height_min || !height_max || !weight_min || !weight_max ||!life_span || !temperament){
        return res.status(404).send('Faltan datos obligatorios')
    }
    try {
        let dogEdit = await Dog.update({
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span,
            createdInDb: true  
          },
          {where: { id }}
        );
        //res.send(dogEdit)
        res.status(200).send(dogEdit, 'Raza Editada con éxito')
    
        } catch (error) {
          next(error);
        }
        
      });


//BORRAR solo el dog creado que esta en mi base de datos
dogsRoutes.delete('/dogs/delete/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    await Dog.destroy ({
      where: {id: id}
    })
    return res.send("Raza eliminada con exito!")
  } catch (error) {
    next(error);
  }
})


module.exports = dogsRoutes;