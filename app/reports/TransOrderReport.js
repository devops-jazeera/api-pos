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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var App_1 = require("../../utils/App");
var TransOrderReport = /** @class */ (function () {
    function TransOrderReport() {
        this.db = typeorm_1.getManager();
    }
    TransOrderReport.prototype.execute = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data, query, warehouseQuery, regionalWarehouses, inQueryStr_1, warehouseQuery, regionalWarehouses, inQueryStr_2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        data = void 0;
                        query = "\n            select \n                distinct\n                s.salesid as \"salesId\",\n                s.inventlocationid as \"fromWareHouse\",\n                s.custaccount as \"ToWareHouse\",\n                to_char(s.createddatetime, 'DD-MM-YYYY') as \"createddatetime\",\n                to_char(s.lastmodifieddate, 'DD-MM-YYYY') as \"lastmodifieddate\",\n                s.status as status,\n                fwh.name as \"fromWareHouseNameAr\",\n                fwh.namealias as \"fromWareHouseNameEn\",\n                twh.name as \"toWareHouseNameAr\",\n                twh.namealias as \"toWareHouseNameEn\",\n                (select to_char(sum(sl.salesqty), 'FM999999990.00') from salesline sl where sl.salesid=s.salesid) as quantity\n                from salestable s\n                left join inventlocation fwh on fwh.inventlocationid=s.inventlocationid\n                left join inventlocation twh on twh.inventlocationid=s.custaccount\n            where( s.transkind = 'TRANSFERORDER' or s.transkind = 'ORDERSHIPMENT' or s.transkind = 'ORDERRECEIVE') and  s.createddatetime >= '" + params.fromDate + "' ::date\n            AND  s.createddatetime < ('" + params.toDate + "' ::date + '1 day'::interval) \n            ";
                        if (!(params.fromWareHouseId == "ALL")) return [3 /*break*/, 2];
                        warehouseQuery = "select regionalwarehouse from usergroupconfig where inventlocationid= '" + params.key + "' limit 1";
                        return [4 /*yield*/, this.db.query(warehouseQuery)];
                    case 1:
                        regionalWarehouses = _a.sent();
                        inQueryStr_1 = "";
                        regionalWarehouses[0].regionalwarehouse.split(",").map(function (item) {
                            inQueryStr_1 += "'" + item + "',";
                        });
                        inQueryStr_1 += "'" + params.key + "',";
                        query += " and s.inventlocationid in (" + inQueryStr_1.substr(0, inQueryStr_1.length - 1) + ") ";
                        return [3 /*break*/, 3];
                    case 2:
                        query += " and s.inventlocationid='" + params.fromWareHouseId + "' ";
                        _a.label = 3;
                    case 3:
                        if (!(params.toWareHouseId == "ALL")) return [3 /*break*/, 5];
                        warehouseQuery = "select regionalwarehouse from usergroupconfig where inventlocationid= '" + params.key + "' limit 1";
                        return [4 /*yield*/, this.db.query(warehouseQuery)];
                    case 4:
                        regionalWarehouses = _a.sent();
                        inQueryStr_2 = "";
                        regionalWarehouses[0].regionalwarehouse.split(",").map(function (item) {
                            inQueryStr_2 += "'" + item + "',";
                        });
                        inQueryStr_2 += "'" + params.key + "',";
                        query += " and s.custaccount in (" + inQueryStr_2.substr(0, inQueryStr_2.length - 1) + ") ";
                        return [3 /*break*/, 6];
                    case 5:
                        if (params.toWareHouseId) {
                            query += " and s.custaccount='" + params.toWareHouseId + "' ";
                        }
                        _a.label = 6;
                    case 6:
                        if (params.status != "ALL") {
                            query += " AND  s.status = '" + params.status + "' ";
                        }
                        return [4 /*yield*/, this.db.query(query)];
                    case 7:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 8:
                        error_1 = _a.sent();
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TransOrderReport.prototype.warehouseName = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "select inventlocationid, name, namealias from inventlocation where inventlocationid ='" + param + "' limit 1";
                        return [4 /*yield*/, this.db.query(query)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data ? data[0] : {}];
                }
            });
        });
    };
    TransOrderReport.prototype.report = function (result, params) {
        return __awaiter(this, void 0, void 0, function () {
            var renderData, file;
            return __generator(this, function (_a) {
                renderData = {
                    printDate: new Date().toLocaleString(),
                    fromDate: params.fromDate,
                    toDate: params.toDate,
                    status: params.status,
                    fromWareHouseId: params.fromWareHouseId,
                    toWareHouseId: params.toWareHouseId,
                    user: params.user
                };
                // console.log(result.salesLine[0].product.nameEnglish);
                renderData.data = result;
                console.log(renderData);
                if (params.type == "excel") {
                    file = params.lang == "en" ? "transorder-excel" : "transorder-excel-ar";
                }
                else {
                    file = params.lang == "en" ? "transorder-report" : "transorder-report-ar";
                }
                try {
                    return [2 /*return*/, App_1.App.HtmlRender(file, renderData)];
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    return TransOrderReport;
}());
exports.TransOrderReport = TransOrderReport;
