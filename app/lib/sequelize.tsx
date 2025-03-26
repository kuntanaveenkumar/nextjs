
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("", {
  host: '127.0.0.1',
  port: 1433,
  dialect: 'mssql', 

  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});
const checkConnection = async () => {
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
await checkConnection();
sequelize.sync();
module.exports = sequelize;
//export default sequelize;
