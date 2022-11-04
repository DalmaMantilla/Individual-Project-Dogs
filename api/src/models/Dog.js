const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
        type: DataTypes.UUID, 
        allowNull: false, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    min_height: {
        type: DataTypes.STRING,
        //allowNull: true,
    },
    max_height: {
        type: DataTypes.STRING,
        //allowNull: true,
    },
    min_weight: {
        type: DataTypes.STRING,
        //allowNull: false,
    },
    max_weight: {
        type: DataTypes.STRING,
        //allowNull: false,
    },
    life_time_min: {
        type: DataTypes.STRING,
        //allowNull: true,
    },
    life_time_max: {
        type: DataTypes.STRING,
        //allowNull: true,
    },
    life_span: {
      type: DataTypes.STRING,
     
    },
    image: {
      type: DataTypes.TEXT,
      //allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
    {timestamps: false} //sequelize NO agregue los 2 atributos por defecto: createdAt y updatedAt.
  );
};
