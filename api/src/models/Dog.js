const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
        type: DataTypes.UUID, //un id alfanumerico
        primaryKey: true,
        allowNull: false, //para q no este vacio
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true,
    },
    heightMin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    heightMax: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weightMin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weightMax: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    life_time_min: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    life_time_max: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
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
