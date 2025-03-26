import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Serials extends Model {
  
  Iccid;
}

User.init(
  {
    Iccid: { type: DataTypes.STRING, allowNull: false},
  },
  {
    sequelize,
    tableName: "data",
  }
);

export default Serials;
