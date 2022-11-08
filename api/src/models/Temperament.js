const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {  //Sequelize genera id x defecto si yo no le paso uno
    name: {
      type: DataTypes.STRING,
      //x defecto crea una primary key
    },

  },
    {timestamps: false}
  );
};