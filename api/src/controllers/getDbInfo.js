const {Dog, Temperament} = require('../db');

const getDbInfo =  async () => {
    const data = await Dog.findAll({ 
        include: { 
            model: Temperament, 
            attributes: ['name'], 
            through: { 
                attributes: []
            }
        }
    })
    return data;     
};



















// const getDbInfo = async (req, res, next) => {
//     try {
//       const dogs = await Dog.findAll({
//         include: Temperament,
//       });
  
//       const info = dogs.map((e) => {
//         let temp = e.temperament.map((e) => e.name);
//         let aux = temp.join(", ");
//         //console.log("ACA ESTOY", e.temperament)
//         return {
//           name: e.name,
//           id: e.id,
//           createdInDb: e.createdInDb,
//           height_max: e.height_max,
//           height_min: e.height_min,
  
//           weight_max: e.weight_max,
//           weight_min: e.weight_min,
  
//           life_time_max: e.life_time_max,
//           life_time_min: e.life_time_min,
  
//           temperament: aux,
//           image: e.image
//             ? e.image
//             : "https://t2.uc.ltmcdn.com/es/posts/4/1/3/como_saber_si_un_shih_tzu_es_puro_50314_orig.jpg",
//         };
//       });
//       //console.log(info)
//       return info;
//     } catch (error) {
//       next(error)
//     }
//   };



module.exports = {
    getDbInfo,
}

