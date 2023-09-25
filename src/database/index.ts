import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'cinecourse_development',
    username: 'postgres',
    password: 'luis040312',
    define: {
        underscored: true
    }
});