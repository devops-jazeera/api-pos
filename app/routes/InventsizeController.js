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
var express_1 = require("express");
var App_1 = require("../../utils/App");
var Props_1 = require("../../constants/Props");
var InventsizeService_1 = require("../services/InventsizeService");
var InventsizeController = /** @class */ (function () {
    function InventsizeController() {
        this.componentName = "Products";
        this.router = express_1.Router();
        this.service = new InventsizeService_1.InventsizeService();
    }
    InventsizeController.prototype.moduleName = function () {
        return this.constructor.name;
    };
    InventsizeController.prototype.getRouter = function () {
        var _this = this;
        this.router.get("/:id", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var params, id, result, reqData, reqData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        params = request.params;
                        id = params.id;
                        // const id: any = request.params.id;
                        this.service.sessionInfo = request.body.sessionInfo;
                        result = null;
                        App_1.App.PrintLog(this.constructor.name, "Entity", this.service.sessionInfo);
                        return [4 /*yield*/, App_1.App.ValildateUserAccess(this.service.sessionInfo, this.componentName, Props_1.Props.ACCESS_READ)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 8];
                        if (!(id == "salesorderpagesizes")) return [3 /*break*/, 3];
                        reqData = request.query ? request.query : {};
                        return [4 /*yield*/, this.service.searchSalesOrderSizes(reqData)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(id = "sizeswithnoprice")) return [3 /*break*/, 5];
                        reqData = request.query ? request.query : {};
                        return [4 /*yield*/, this.service.searchSizesWithNoPrice(reqData)];
                    case 4:
                        result = _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.service.entity(id)];
                    case 6:
                        result = _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8: throw this.service.sessionInfo ? this.service.sessionInfo : { message: Props_1.Props.TOKEN_MESSAGE };
                    case 9:
                        response.send({ status: 1, data: result });
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _a.sent();
                        console.log(error_1);
                        response.send({ status: 0, error: error_1 });
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); });
        this.router.get("/", function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var params, reqData, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        params = request.params;
                        reqData = request.query ? request.query : {};
                        // const id: any = request.params.id;
                        this.service.sessionInfo = request.body.sessionInfo;
                        result = null;
                        App_1.App.PrintLog(this.constructor.name, "Search", this.service.sessionInfo);
                        return [4 /*yield*/, App_1.App.ValildateUserAccess(this.service.sessionInfo, this.componentName, Props_1.Props.ACCESS_READ)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.service.search(reqData)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw this.service.sessionInfo ? this.service.sessionInfo : { message: Props_1.Props.TOKEN_MESSAGE };
                    case 4:
                        response.send({ status: 1, data: result });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        response.send({ status: 0, error: error_2 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        return this.router;
    };
    return InventsizeController;
}());
exports.InventsizeController = InventsizeController;
