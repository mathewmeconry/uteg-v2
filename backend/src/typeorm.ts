import * as dotenv from "dotenv"
dotenv.config()
import { DataSource } from "typeorm"
import * as path from "path"

const datasource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: true,
    entities: [path.join(__dirname, "..", "dist", "**", "*.entity.{ts,js}")],
    migrations: [path.join(__dirname, "..", "dist", "migrations", "*.{ts,js}")],
})

export default datasource