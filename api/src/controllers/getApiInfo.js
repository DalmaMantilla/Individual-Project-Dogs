const axios = require('axios');
const { API_KEY } = process.env;


let apiData = []
const getApiInfo = async (req, res, next) => {
    if(apiData.length > 0) return apiData;
    try {
        const apiUrl = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        //.then(res => res.data.map(el => {
        const apiInfo = await apiUrl.data.map((e) => {
            return {
                id: e.id,
                name: e.name,
                height_min: e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
                height_max: e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
                // weight_min: e.weight.metric.split(" - ")[0] !== "NaN" 
                //             ? e.weight.metric.split(" - ")[0]
                //             : 6,
                weight_min: e.weight.metric.split(" - ")[0] && e.weight.metric.split(" - ")[0],
                weight_max: e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
                // life_time_min: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
                // life_time_max: e.life_span.split(" - ")[1] && e.life_span.split(" - ")[1],
                life_span: e.life_span,
                temperament: e.temperament ? e.temperament : null,
                image: e.image.url,
            }
        });
    return apiData = apiInfo;
    //console.log(apiData)
    } catch(error) {
        next(error)
        
    }
}

module.exports = {
    getApiInfo,
}

