"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.dbOptions = {
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Mpos1234",
    database: "mpos_db",
    logging: true,
    synchronize: false,
    entities: [__dirname + "/../entities/**/*{.ts,.js}"],
};
// ============MS SQL CONNECTION=============
exports.mssqlDbOptions = {
    username: "sysoffline",
    password: "binjzrpos",
    host: "localhost",
    database: "DAX",
    port: 1433,
};
// host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "Mpos1234",
//   database: "mpos_db",
// =============== QA STAGING DATABASE ==================
exports.stageDbOptions = {
    name: "stage",
    type: "postgres",
    host: "jpos.xxxx.com",
    port: 5432,
    username: "xx",
    password: "xxx",
    database: "xx",
};

exports.localDbOptions = {
    name: "local",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Mpos1234",
    database: "mpos_db",
    logging: true,
    synchronize: false,
    entities: [__dirname + "/../entities/**/*{.ts,.js}"],
};
exports.mailOptions = {
    host: "smtp.gmail.com",
    port: 465,
    user: "jpos@jazeerapaints.com",
    pass: "J2123@2123",
};
exports.setEnvConfig = function () {
    var envData = process.env.ENV_JPOS;
    console.log(envData);
    if (envData) {
        envData = JSON.parse(envData);
        if (envData.dbHost) {
            exports.dbOptions.host = envData.dbHost;
            exports.dbOptions.port = envData.dbPort;
            exports.dbOptions.username = envData.dbUser;
            exports.dbOptions.password = envData.dbPassword;
            exports.dbOptions.database = envData.dbDatabase;
        }
        if (envData.mailHost) {
            exports.mailOptions.host = envData.mailHost;
            exports.mailOptions.port = envData.mailPort;
            exports.mailOptions.user = envData.mailUser;
            exports.mailOptions.pass = envData.mailPassword;
        }
    }
    console.log(envData);
};

