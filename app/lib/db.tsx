import sql, { ConnectionPool } from 'mssql';
export async function getDbConnection(): Promise<ConnectionPool> {
  const pool = await sql.connect({
    user: "",
    password: "",
    server: "",
    database: "",
    pool: {
      max: 50,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false,
      trustServerCertificate: false,
      trustedConnection: true
    }
  });
  return pool;
}