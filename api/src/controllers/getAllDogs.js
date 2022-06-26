const { getApiInfo } = require('./getApiInfo');
const { getDbInfo } = require('./getDbInfo');

const getAllDogs = async (next) => {
    try{
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const totalInfo = apiInfo.concat(dbInfo)
        // const totalInfo = apiInfo.concat(dbInfo).sort((a,b) => {
        //     return a.name < b.name ? -1: 1;
        // })
        return totalInfo;

    } catch(error) {
        next(error)
    }
}
module.exports = {
    getAllDogs,
}