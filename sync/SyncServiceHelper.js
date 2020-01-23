"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Config = __importStar(require("../utils/Config"));
var format = require("pg-format");
var Log_1 = require("../utils/Log");
var SyncServiceHelper = /** @class */ (function () {
    function SyncServiceHelper() {
    }
    SyncServiceHelper.BatchQuery = function (config, sqls) {
        var sqls_1, sqls_1_1;
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, db, res, sql, e_1_1, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Log_1.slog.info("-------------- Batch Query Starts --------------");
                        Log_1.slog.info("\tHost Query: " + config.host);
                        Log_1.slog.debug("\t\tBatch length: " + sqls.length);
                        db = new pg_1.Client(config);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 18, 20, 21]);
                        return [4 /*yield*/, db.connect()];
                    case 2:
                        _b.sent();
                        res = null;
                        return [4 /*yield*/, db.query("BEGIN")];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 10, 11, 16]);
                        sqls_1 = __asyncValues(sqls);
                        _b.label = 5;
                    case 5: return [4 /*yield*/, sqls_1.next()];
                    case 6:
                        if (!(sqls_1_1 = _b.sent(), !sqls_1_1.done)) return [3 /*break*/, 9];
                        sql = sqls_1_1.value;
                        return [4 /*yield*/, db.query(sql)];
                    case 7:
                        res = _b.sent();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _b.trys.push([11, , 14, 15]);
                        if (!(sqls_1_1 && !sqls_1_1.done && (_a = sqls_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _a.call(sqls_1)];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16:
                        Log_1.slog.info("END");
                        return [4 /*yield*/, db.query("COMMIT")];
                    case 17:
                        _b.sent();
                        return [3 /*break*/, 21];
                    case 18:
                        e_2 = _b.sent();
                        console.error(e_2);
                        return [4 /*yield*/, db.query("ROLLBACK")];
                    case 19:
                        _b.sent();
                        throw e_2;
                    case 20:
                        db.end();
                        return [7 /*endfinally*/];
                    case 21:
                        Log_1.slog.info("-------------- Batch Query Ends --------------");
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncServiceHelper.ExecuteQuery = function (config, sql) {
        return __awaiter(this, void 0, void 0, function () {
            var db, res, _a, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Log_1.slog.info("----------------- Query Starts----------------------------");
                        db = null;
                        Log_1.slog.info("\tHost Query: " + config.host);
                        Log_1.slog.debug(sql);
                        res = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        console.log("*********************************************************************");
                        if (!(config.host.indexOf("localhost") != -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, SyncServiceHelper.LocalPool.connect()];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, SyncServiceHelper.StagePool.connect()];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        db = _a;
                        return [4 /*yield*/, db.query(sql)];
                    case 6:
                        res = _b.sent();
                        return [2 /*return*/, { metaData: res.fields, rows: res.rows }];
                    case 7:
                        e_3 = _b.sent();
                        throw e_3;
                    case 8:
                        if (db)
                            db.release();
                        return [7 /*endfinally*/];
                    case 9:
                        Log_1.slog.info("----------------- Query Ends----------------------------");
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncServiceHelper.PrepareQuery = function (table, metaData, rows, filterIds, type, pk) {
        var metaData_1, metaData_1_1;
        return __awaiter(this, void 0, void 0, function () {
            var e_4, _a, columns, sql, records_1, filterRows, sql_1, ele, e_4_1, records_2, filterRows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        columns = metaData.map(function (ele) { return ele.name; });
                        if (!(type == "INSERT")) return [3 /*break*/, 1];
                        sql = "insert into " + table;
                        sql += " ( " + columns.join(",");
                        sql += " ) VALUES %L";
                        records_1 = [];
                        filterRows = rows.filter(function (ele) { return filterIds.indexOf(ele[pk]) > -1; });
                        filterRows.map(function (ele) {
                            records_1.push(Object.values(ele));
                        });
                        sql = format(sql, records_1);
                        return [2 /*return*/, sql];
                    case 1:
                        if (!(type == "UPDATE")) return [3 /*break*/, 14];
                        sql_1 = "update " + table + " as t set ";
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 13]);
                        metaData_1 = __asyncValues(metaData);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, metaData_1.next()];
                    case 4:
                        if (!(metaData_1_1 = _b.sent(), !metaData_1_1.done)) return [3 /*break*/, 6];
                        ele = metaData_1_1.value;
                        sql_1 +=
                            " " + ele.name + " = cast(c." + ele.name + " as " + SyncServiceHelper.TypeConvertion(ele.data_type) + " ), ";
                        _b.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _b.trys.push([8, , 11, 12]);
                        if (!(metaData_1_1 && !metaData_1_1.done && (_a = metaData_1.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(metaData_1)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13:
                        sql_1 = sql_1.substr(0, sql_1.length - 2) + " ";
                        sql_1 += " from ( values %L)";
                        sql_1 += " as c (" + columns.join(",") + ") where ";
                        sql_1 += "  cast(t." + pk + " as text ) =  cast(c." + pk + " as text )";
                        records_2 = [];
                        filterRows = rows.filter(function (ele) { return filterIds.indexOf(ele[pk]) > -1; });
                        filterRows.map(function (ele) {
                            records_2.push(Object.values(ele));
                        });
                        sql_1 = format(sql_1, records_2);
                        //  sql = sql.replace(/'t'/g, "'TRUE'");
                        //  sql = sql.replace(/'f'/g, "'FALSE'");
                        return [2 /*return*/, sql_1];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    SyncServiceHelper.TypeConvertion = function (type) {
        switch (type) {
            // case "int":
            //     return "integer";
            // case "int8":
            //     return "bigint";
            // case "int4":
            //     return "bigint";
            // case "bigint":
            //     return "bigint";
            case "bool":
                return "BOOLEAN";
            case "boolean":
                return "BOOLEAN";
            case "varchar":
                return "text";
            case "date":
                return "timestamp";
            default:
                return type;
        }
    };
    SyncServiceHelper.ChackAvalibleQuery = function (table, metaData, primaryKeys, pk) {
        return __awaiter(this, void 0, void 0, function () {
            var columns, sql;
            return __generator(this, function (_a) {
                columns = metaData.map(function (ele) { return ele.name; });
                sql = "select DISTINCT " + pk + " from " + table;
                sql += " where " + pk + " in  (%L)";
                sql = format(sql, primaryKeys);
                return [2 /*return*/, Promise.resolve(sql)];
            });
        });
    };
    SyncServiceHelper.TablesList = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var query, db, res, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT\n                tablename\n            FROM\n                pg_catalog.pg_tables\n            WHERE\n                schemaname != 'pg_catalog'\n            AND schemaname != 'information_schema'\n        ";
                        db = new pg_1.Client(config);
                        return [4 /*yield*/, db.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.query(query)];
                    case 2:
                        res = _a.sent();
                        rows = res.rows;
                        return [4 /*yield*/, db.end()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    SyncServiceHelper.MetadataTable = function (config, table) {
        return __awaiter(this, void 0, void 0, function () {
            var query, db, res, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n                SELECT DISTINCT\n                C.ordinal_position AS POS,\n                  C.column_name              AS NAME,\n                      C.is_nullable              AS IS_NULLABLE,\n                      C.udt_name                 AS DATA_TYPE,\n                      C.character_maximum_length AS MAX_LENGTH,\n                      ( CASE\n                          WHEN TC.constraint_type = 'PRIMARY KEY' THEN 'ID'\n                          WHEN TC.constraint_type = 'UNIQUE' THEN NULL\n                          ELSE CCU.table_name\n                        END ) AS REF\n            FROM   information_schema.columns C\n              LEFT JOIN information_schema.key_column_usage AS KCU\n                    ON ( KCU.table_name = c.table_name\n                          AND KCU.column_name = c.column_name )\n              LEFT JOIN information_schema.table_constraints TC\n                    ON TC.table_name = C.table_name\n                        AND TC.table_catalog = C.table_catalog\n                        AND TC.constraint_name = kcu.constraint_name\n              LEFT JOIN information_schema.constraint_column_usage CCU\n                    ON CCU.constraint_name = TC.constraint_name\n                        AND C.table_catalog = CCU.table_catalog\n            WHERE  C.table_catalog = '" + config.database + "'\n              AND C.table_name = '" + table + "'\n            ORDER  BY C.ordinal_position;\n        ";
                        db = new pg_1.Client(config);
                        return [4 /*yield*/, db.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.query(query)];
                    case 2:
                        res = _a.sent();
                        rows = res.rows;
                        return [4 /*yield*/, db.end()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // static async parallelQuery(query: string[]){
    //     let functionList: any[] = [];
    //
    //     asyncExec.parallel(functionList,  (err: any, results: any[]) =>{
    //
    //     })
    // }
    SyncServiceHelper.StageDBOptions = function () {
        return {
            host: Config.stageDbOptions.host,
            port: Config.stageDbOptions.port,
            user: Config.stageDbOptions.username,
            password: Config.stageDbOptions.password,
            database: Config.stageDbOptions.database
        };
    };
    SyncServiceHelper.LocalDBOptions = function () {
        return {
            host: "localhost",
            port: 5432,
            user: "postgres",
            password: "Test!234",
            database: "jps_prod"
        };
    };
    SyncServiceHelper.synTableColumns = "*";
    SyncServiceHelper.synTableName = "sync_table";
    SyncServiceHelper.syncSourceTableName = "sync_source";
    //public static syncTargetTableName: string = "";
    SyncServiceHelper.syncSourceDDLTableName = "sync_ddl";
    SyncServiceHelper.LocalPool = new pg_1.Pool(SyncServiceHelper.LocalDBOptions());
    SyncServiceHelper.StagePool = new pg_1.Pool(SyncServiceHelper.StageDBOptions());
    return SyncServiceHelper;
}());
exports.SyncServiceHelper = SyncServiceHelper;
