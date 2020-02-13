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
var SyncDMLService_1 = require("./SyncDMLService");
var SyncDDLService_1 = require("./SyncDDLService");
var Log_1 = require("../utils/Log");
var dns = require("dns").promises;
var cron = require("node-cron");
var stagingId = "STAGING";
var storeId = process.env.ENV_STORE_ID || "LOCAL-TEST";
var SyncService = /** @class */ (function () {
    function SyncService() {
        this.syncDMLService = new SyncDMLService_1.SyncDMLService();
        this.syncDDLService = new SyncDDLService_1.SyncDDLService();
        Log_1.slog.log("debug", "&&&&&&&&&&&&&&&&&&&&&& ENV_STORE_ID : " + process.env.ENV_STORE_ID + " &&&&&&&&&&&&&&&&&&&&&&");
        if (process.env.ENV_STORE_ID) {
            Log_1.slog.log("info", ">>>>>>>>>>>>>>>>> INIT <<<<<<<<<<<<<<<<<<<");
            this.init();
        }
    }
    SyncService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isMasterProceed, isTranscationProceed;
            var _this = this;
            return __generator(this, function (_a) {
                isMasterProceed = true;
                cron.schedule("*/10 * * * * *", function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 8, , 9]);
                                if (!(isMasterProceed == true)) return [3 /*break*/, 6];
                                isMasterProceed = false;
                                Log_1.slog.debug("(((((((((( SYNC START MASTER))))))))))");
                                return [4 /*yield*/, this.checkInternet()];
                            case 1:
                                if (!_a.sent()) return [3 /*break*/, 4];
                                Log_1.slog.log("info", ">>>>>>>>>>>>>>>> DDL <<<<<<<<<<<<<<<<<<<<<<<");
                                return [4 /*yield*/, this.syncDDLService.execute()];
                            case 2:
                                _a.sent();
                                Log_1.slog.log("info", ">>>>>>>>>>>>>>>>> DML <<<<<<<<<<<<<<<<<<<<<<<");
                                return [4 /*yield*/, this.syncDMLService.execute("M")];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                Log_1.slog.warn(">>>>>>>>>>>>>>>>> No Internet connection <<<<<<<<<<<<<<<<<<<<");
                                _a.label = 5;
                            case 5:
                                Log_1.slog.debug("(((((((((( SYNC CLOSE MASTER ))))))))))");
                                isMasterProceed = true;
                                return [3 /*break*/, 7];
                            case 6:
                                Log_1.slog.warn("still processing ...................................");
                                _a.label = 7;
                            case 7: return [3 /*break*/, 9];
                            case 8:
                                error_1 = _a.sent();
                                Log_1.slog.error("--------- CRON MASTER ERROR ---------");
                                Log_1.slog.error(error_1);
                                Log_1.slog.error("--------- CRON MASTER ERROR ---------");
                                return [3 /*break*/, 9];
                            case 9: return [2 /*return*/];
                        }
                    });
                }); });
                isTranscationProceed = true;
                cron.schedule("*/10 * * * * *", function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 7, , 8]);
                                if (!(isTranscationProceed == true)) return [3 /*break*/, 5];
                                isTranscationProceed = false;
                                Log_1.slog.debug("(((((((((( SYNC START TRANS ))))))))))");
                                return [4 /*yield*/, this.checkInternet()];
                            case 1:
                                if (!_a.sent()) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.syncDMLService.execute("T")];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                Log_1.slog.warn(">>>>>>>>>>>>>>>>> No Internet connection <<<<<<<<<<<<<<<<<<<<");
                                _a.label = 4;
                            case 4:
                                Log_1.slog.debug("(((((((((( SYNC CLOSE TRANS ))))))))))");
                                isTranscationProceed = true;
                                return [3 /*break*/, 6];
                            case 5:
                                Log_1.slog.warn("still processing ...................................");
                                _a.label = 6;
                            case 6: return [3 /*break*/, 8];
                            case 7:
                                error_2 = _a.sent();
                                Log_1.slog.error("--------- CRON TRANSACTION ERROR ---------");
                                Log_1.slog.error(error_2);
                                Log_1.slog.error("--------- CRON TRANSACTION ERROR ---------");
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    SyncService.prototype.checkInternet = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dns
                        .lookup("google.com")
                        .then(function () { return true; })
                        .catch(function () { return false; })];
            });
        });
    };
    return SyncService;
}());
exports.SyncService = SyncService;
