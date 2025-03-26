

import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Rules extends Model {
  
  Id;
}

Rules.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fromState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "regulations",
  }
);

export default Rules;
