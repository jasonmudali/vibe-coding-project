import mysql from "mysql2/promise";


async function run() {
  try {
    console.log("Connecting database...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database ${process.env.DB_NAME} checked/created successfully.`);
    await connection.end();
  } catch (error) {
    console.error("Database error:", error);
  }
}

run();
