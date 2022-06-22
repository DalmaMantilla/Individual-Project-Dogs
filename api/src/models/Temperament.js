const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    id: { //id se define solo con sequelize
        type: DataTypes.UUID,//genera un id alfanumerico(string)
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        //primaryKey: true,
    },
  },
  {timestamps: false}
  );
};