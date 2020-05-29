"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var App_1 = require("../../utils/App");
var SalesTableDAO_1 = require("../repos/SalesTableDAO");
var InventTransDAO_1 = require("../repos/InventTransDAO");
var SalesLineDAO_1 = require("../repos/SalesLineDAO");
var CusttableDAO_1 = require("../repos/CusttableDAO");
var UsergroupconfigDAO_1 = require("../repos/UsergroupconfigDAO");
var ColorsDAO_1 = require("../repos/ColorsDAO");
var RawQuery_1 = require("../common/RawQuery");
var Props_1 = require("../../constants/Props");
var Overdue_1 = require("../../entities/Overdue");
var OverDueDAO_1 = require("../repos/OverDueDAO");
var InventbatchDAO_1 = require("../repos/InventbatchDAO");
var VisitCustomerService_1 = require("./VisitCustomerService");
var VisitCustomer_1 = require("../../entities/VisitCustomer");
var DesignerserviceRepository_1 = require("../repos/DesignerserviceRepository");
var AppliedDiscountsDAO_1 = require("../repos/AppliedDiscountsDAO");
var InventLoactionDAO_1 = require("../repos/InventLoactionDAO");
var UpdateInventoryService_1 = require("../services/UpdateInventoryService");
var SalesOrderTokensDAO_1 = require("../repos/SalesOrderTokensDAO");
var RedeemService_1 = require("../services/RedeemService");
var Log_1 = require("../../utils/Log");
var moment = require("moment");
// to generate uuid for salesline data
var uuid = require("uuid");
var Sms_1 = require("../../utils/Sms");
var SalesTableService = /** @class */ (function () {
    function SalesTableService() {
        this.salesOrderTokensDAO = new SalesOrderTokensDAO_1.SalesOrderTokensDAO();
        this.colorsDAO = new ColorsDAO_1.ColorsDAO();
        this.salestableDAO = new SalesTableDAO_1.SalesTableDAO();
        this.salesLineDAO = new SalesLineDAO_1.SalesLineDAO();
        this.usergroupconfigDAO = new UsergroupconfigDAO_1.UsergroupconfigDAO();
        this.rawQuery = new RawQuery_1.RawQuery();
        this.custtableDAO = new CusttableDAO_1.CusttableDAO();
        this.overDueDAO = new OverDueDAO_1.OverDueDAO();
        this.inventbatchDAO = new InventbatchDAO_1.InventbatchDAO();
        this.visitCustomerService = new VisitCustomerService_1.VisitCustomerService();
        this.designerServiceDAO = new DesignerserviceRepository_1.DesignerserviceRepository();
        this.appliedDiscountsDAO = new AppliedDiscountsDAO_1.AppliedDiscountsDAO();
        this.inventlocationDAO = new InventLoactionDAO_1.InventlocationDAO();
        this.visitCustomerService.sessionInfo = this.sessionInfo;
        this.inventTransDAO = new InventTransDAO_1.InventorytransDAO();
        this.updateInventoryService = new UpdateInventoryService_1.UpdateInventoryService();
        this.updateInventoryService.sessionInfo = this.sessionInfo;
        this.redeemService = new RedeemService_1.RedeemService();
    }
    SalesTableService.prototype.entity = function (id, type) {
        if (type === void 0) { type = null; }
        return __awaiter(this, void 0, void 0, function () {
            var data, promiseList, salesLine, _i, salesLine_1, item, baseSizeBatchesList_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.salestableDAO.entity(id.toUpperCase())];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            throw { message: "ORDER_NOT_FOUND" };
                        }
                        return [4 /*yield*/, this.calData(data)];
                    case 2:
                        _a.sent();
                        promiseList = [this.getcustomer(data), this.getpainter(data), this.getsalesman(data)];
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 3:
                        _a.sent();
                        data.custAccount = data.custAccount ? data.custAccount.trim() : null;
                        data.customer = data.customer ? data.customer : {};
                        data.painter = data.painter ? data.painter : {};
                        data.instantDiscChecked = data.instantDiscChecked ? data.instantDiscChecked : false;
                        data.voucherDiscChecked = data.voucherDiscChecked ? data.voucherDiscChecked : false;
                        data.originalPrinted = data.originalPrinted ? data.originalPrinted : false;
                        data.deleted = data.deleted ? data.deleted : false;
                        data.designServiceRedeemAmount = data.designServiceRedeemAmount ? parseFloat(data.designServiceRedeemAmount) : 0;
                        data.sendForApproval = data.designServiceRedeemAmount > 0 && data.transkind == "RETURNORDER" ? true : false;
                        data.isMovementIn = data.isMovementIn ? data.isMovementIn : false;
                        data.deleted = data.deleted ? data.deleted : false;
                        data.isCash = data.isCash ? data.isCash : false;
                        data.vatamount = data.vatamount ? parseFloat(data.vatamount) : 0;
                        data.movementType = data.movementType ? data.movementType : {};
                        salesLine = data.salesLine;
                        return [4 /*yield*/, this.allocateSalesLineData(salesLine)];
                    case 4:
                        _a.sent();
                        salesLine.sort(function (a, b) {
                            var lineA = a.lineNum, lineB = b.lineNum;
                            if (lineA < lineB)
                                //sort string ascending
                                return -1;
                            if (lineA > lineB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        _i = 0, salesLine_1 = salesLine;
                        _a.label = 5;
                    case 5:
                        if (!(_i < salesLine_1.length)) return [3 /*break*/, 8];
                        item = salesLine_1[_i];
                        item.product = item.size ? item.size.product : {};
                        item.size = item.size ? item.size : {};
                        delete item.size.product;
                        if (!(data.transkind == "TRANSFERORDER" && data.custAccount == this.sessionInfo.inventlocationid)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.inventoryOnHandCheck(item, data.transkind, data.custAccount)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [4 /*yield*/, this.rawQuery.getBaseSizeBatchesList(id)];
                    case 9:
                        baseSizeBatchesList_1 = _a.sent();
                        if (data.transkind == "SALESORDER" || data.transkind == "TRANSFERORDER") {
                            salesLine.map(function (item) {
                                item.batches = baseSizeBatchesList_1.filter(function (v) {
                                    return v.itemid == item.itemid &&
                                        v.configid == item.configId &&
                                        v.inventsizeid == item.inventsizeid &&
                                        v.saleslineid == item.id;
                                });
                            });
                        }
                        if (type == "mobile") {
                            delete data.salesLine;
                            data.selectedItems = salesLine;
                        }
                        else {
                            delete data.salesLine;
                            data.salesLine = salesLine;
                        }
                        return [2 /*return*/, data];
                    case 10:
                        error_1 = _a.sent();
                        throw error_1;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.getcustomer = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = data;
                        return [4 /*yield*/, this.custtableDAO.entity(data.custAccount)];
                    case 1:
                        _a.customer = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.getpainter = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = data;
                        return [4 /*yield*/, this.custtableDAO.entity(data.painter)];
                    case 1:
                        _a.painter = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.getsalesman = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = data;
                        return [4 /*yield*/, this.rawQuery.salesman(data.salesmanId)];
                    case 1:
                        _a.salesman = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.ecommerceEntity = function (id, type) {
        if (type === void 0) { type = null; }
        return __awaiter(this, void 0, void 0, function () {
            var data, tokenData, salesLine, _i, salesLine_2, item, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.salestableDAO.entity(id.toUpperCase())];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            throw { message: "ORDER_NOT_FOUND" };
                        }
                        return [4 /*yield*/, this.calData(data)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.rawQuery.getSalesToken(id.toUpperCase())];
                    case 3:
                        tokenData = _a.sent();
                        data.paymentStatus = data.status == "PAID" || data.status == "POSTED" ? true : false;
                        data.custAccount = data.custAccount ? data.custAccount.trim() : null;
                        // data.customer = await this.custtableDAO.entity(data.custAccount);
                        data.customer = data.customer ? data.customer : {};
                        data.painter = data.painter ? data.painter : {};
                        data.instantDiscChecked = data.instantDiscChecked ? data.instantDiscChecked : false;
                        data.voucherDiscChecked = data.voucherDiscChecked ? data.voucherDiscChecked : false;
                        data.originalPrinted = data.originalPrinted ? data.originalPrinted : false;
                        data.deleted = data.deleted ? data.deleted : false;
                        data.designServiceRedeemAmount = data.designServiceRedeemAmount ? parseFloat(data.designServiceRedeemAmount) : 0;
                        data.isMovementIn = data.isMovementIn ? data.isMovementIn : false;
                        data.deleted = data.deleted ? data.deleted : false;
                        data.isCash = data.isCash ? data.isCash : false;
                        data.vatamount = data.vatamount ? parseFloat(data.vatamount) : 0;
                        data.movementType = data.movementType ? data.movementType : {};
                        data.authToken = tokenData.authToken;
                        salesLine = data.salesLine;
                        return [4 /*yield*/, this.allocateSalesLineData(salesLine)];
                    case 4:
                        _a.sent();
                        salesLine.sort(function (a, b) {
                            var lineA = a.lineNum, lineB = b.lineNum;
                            if (lineA < lineB)
                                //sort string ascending
                                return -1;
                            if (lineA > lineB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        for (_i = 0, salesLine_2 = salesLine; _i < salesLine_2.length; _i++) {
                            item = salesLine_2[_i];
                            item.product = item.size ? item.size.product : {};
                            item.size = item.size ? item.size : {};
                            delete item.size.product;
                        }
                        delete data.salesLine;
                        salesLine.map(function (v) {
                            _this.calItem(v);
                        });
                        data.salesLine = salesLine;
                        return [2 /*return*/, data];
                    case 5:
                        error_2 = _a.sent();
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.allocateSalesLineData = function (salesLine) {
        salesLine.map(function (v) {
            v.lineNum = v.lineNum ? parseInt(v.lineNum) : 0;
            v.salesprice = v.salesprice ? parseFloat(v.salesprice) : 0;
            v.salesQty = v.salesQty ? parseInt(v.salesQty) : 0;
            v.lineAmount = v.lineAmount ? parseFloat(v.lineAmount) : 0;
            v.salesUnit = v.salesUnit ? parseFloat(v.salesUnit) : 0;
            v.netAmount = v.netAmount ? parseFloat(v.netAmount) : 0;
            v.qtyOrdered = v.qtyOrdered ? parseFloat(v.qtyOrdered) : 0;
            v.remainSalesPhysical = v.remainSalesPhysical ? parseFloat(v.remainSalesPhysical) : 0;
            v.remainSalesFinancial = v.remainSalesFinancial ? parseFloat(v.remainSalesFinancial) : 0;
            v.lineTotalDisc = v.lineTotalDisc ? parseFloat(v.lineTotalDisc) : 0;
            v.supplMultipleQty = v.supplMultipleQty ? parseFloat(v.supplMultipleQty) : 0;
            v.supplFreeQty = v.supplFreeQty ? parseFloat(v.supplFreeQty) : 0;
            v.multilndisc = v.multilndisc ? parseFloat(v.multilndisc) : 0;
            v.multilnPercent = v.multilnPercent ? parseFloat(v.multilnPercent) : 0;
            v.endDisc = v.endDisc ? parseFloat(v.endDisc) : 0;
            v.enddiscamt = v.enddiscamt ? parseFloat(v.enddiscamt) : 0;
            v.colorantprice = v.colorantprice ? parseFloat(v.colorantprice) : 0;
            v.totalReturnedQuantity = v.totalReturnedQuantity ? parseFloat(v.totalReturnedQuantity) : 0;
            v.totalSettledAmount = v.totalSettledAmount ? parseFloat(v.totalSettledAmount) : 0;
            v.vatamount = v.vatamount ? parseFloat(v.vatamount) : 0;
            v.vat = v.vat ? parseFloat(v.vat) : 0;
            v.voucherdiscamt = v.voucherdiscamt ? parseFloat(v.voucherdiscamt) : 0;
            v.voucherdiscpercent = v.voucherdiscpercent ? parseFloat(v.voucherdiscpercent) : 0;
            v.appliedDiscounts = v.appliedDiscounts ? v.appliedDiscounts : [];
            v.appliedDiscounts.map(function (value) {
                value.percentage = value.percentage ? parseFloat(value.percentage) : 0;
                value.discountAmount = value.discountAmount ? parseFloat(value.discountAmount) : 0;
            });
        });
    };
    SalesTableService.prototype.designerServiceEntity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, salesLine;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.salestableDAO.entity(id.toUpperCase())];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            throw { message: "ORDER_NOT_FOUND" };
                        }
                        return [4 /*yield*/, this.salesLineDAO.getDesignerServiceLines(id)];
                    case 2:
                        salesLine = _a.sent();
                        data.salesLine = salesLine;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    SalesTableService.prototype.inventoryOnHandCheck = function (item, transkind, custAccount) {
        return __awaiter(this, void 0, void 0, function () {
            var inventory, availabilty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rawQuery.inventoryOnHand({
                            inventlocationid: custAccount == this.sessionInfo.inventlocationid ? custAccount : this.sessionInfo.inventlocationid,
                            itemId: item.itemid,
                            configid: item.color ? item.color.code : null,
                            inventsizeid: item.size.code,
                        })];
                    case 1:
                        inventory = _a.sent();
                        availabilty = 0;
                        inventory.forEach(function (element) {
                            availabilty += Number(element.availabilty);
                        });
                        //console.log("--------------------------------------------", availabilty);
                        if (availabilty > 0) {
                            // item.batches = inventory;
                            //console.log("--------------------------------------------", transkind, item.status);
                            if (parseInt(item.salesQty) > availabilty && transkind == "SALESORDER") {
                                item.availablequatity = availabilty;
                                item.adjustedquantity = item.salesQty - availabilty;
                            }
                            else if (parseInt(item.salesQty) > availabilty && transkind == "TRANSFERORDER") {
                                if (item.status == "REQUESTED") {
                                    item.requestedQuantity = item.salesQty;
                                    item.availableQuantity = availabilty;
                                }
                                else if (item.status == "APPROVED") {
                                    item.requestedQuantity = item.salesQty;
                                    item.approvedQuantity = item.qtyOrdered;
                                }
                                else if (item.status == "SHIPPED") {
                                    item.requestedQuantity = item.salesQty;
                                    item.approvedQuantity = item.qtyOrdered;
                                    item.shippedQuantity = item.remainSalesPhysical;
                                }
                                else if (item.status == "RECEIVED") {
                                    item.requestedQuantity = item.salesQty;
                                    item.approvedQuantity = item.qtyOrdered;
                                    item.shippedQuantity = item.remainSalesPhysical;
                                    item.receivedQuantity = item.remainSalesFinancial;
                                }
                                else {
                                    item.requestedQuantity = item.salesQty;
                                }
                            }
                            else {
                                if (transkind == "TRANSFERORDER" && (item.status == "REQUESTED" || item.status == null)) {
                                    item.requestedQuantity = item.salesQty;
                                    item.availableQuantity = availabilty;
                                }
                                else {
                                    item.availablequatity = availabilty;
                                    item.adjustedquantity = 0;
                                }
                            }
                        }
                        else {
                            if (transkind == "TRANSFERORDER") {
                                if (item.status == "REQUESTED" || item.status == null) {
                                    item.requestedQuantity = item.salesQty;
                                    item.availableQuantity = availabilty;
                                    //console.log("--------------------------------------------", availabilty);
                                }
                                else if (item.status == "APPROVED") {
                                    item.requestedQuantity = item.salesQty;
                                    item.approvedQuantity = item.qtyOrdered;
                                }
                                else if (item.status == "SHIPPED") {
                                    item.requestedQuantity = item.salesQty;
                                    item.approvedQuantity = item.qtyOrdered;
                                    item.shippedQuantity = item.remainSalesPhysical;
                                }
                                else if (item.status == "RECEIVED") {
                                    item.requestedQuantity = item.salesQty;
                                    item.approvedQuantity = item.qtyOrdered;
                                    item.shippedQuantity = item.remainSalesPhysical;
                                    item.receivedQuantity = item.remainSalesFinancial;
                                }
                                else {
                                    item.requestedQuantity = item.salesQty;
                                }
                            }
                            else {
                                item.availablequatity = 0;
                                item.adjustedquantity = item.salesQty;
                            }
                        }
                        return [4 /*yield*/, item];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesTableService.prototype.search = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, newData_1, error_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        switch (reqData.type) {
                            case "quotation":
                                reqData.transkind = "('SALESQUOTATION')";
                                break;
                            case "movement":
                                reqData.transkind = "('INVENTORYMOVEMENT')";
                                break;
                            case "salesorder":
                                reqData.transkind = "('SALESORDER')";
                                break;
                            case "returnorder":
                                reqData.transkind = "('RETURNORDER')";
                                break;
                            case "transferorder":
                                reqData.transkind = "('TRANSFERORDER', 'ORDERSHIPMENT', 'ORDERRECEIVE')";
                                break;
                            case "ordershipment":
                                reqData.transkind = "('ORDERSHIPMENT')";
                                break;
                            case "orderrecieve":
                                reqData.transkind = "('ORDERRECEIVE')";
                                break;
                            case "purchaseorder":
                                reqData.transkind = "('PURCHASEORDER', 'PURCHASERETURN')";
                                break;
                            case "purchaseorderreturn":
                                reqData.transkind = "('PURCHASERETURN')";
                                break;
                            default:
                                reqData.transkind = null;
                        }
                        if (!reqData.transkind) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.salestableDAO.searchorders(reqData, this.sessionInfo.inventlocationid)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.salestableDAO.search(reqData, null)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        data = _a;
                        newData_1 = [];
                        data.forEach(function (item) {
                            if (item.transkind == "ORDERSHIPMENT" || item.transkind == "TRANSFERORDER") {
                                var fromWarehouseEn = item.toWarehouseEn;
                                var fromWarehouseAr = item.toWarehouseAr;
                                var toWarehouseAr = item.fromWarehouseAr;
                                var toWarehouseEn = item.fromWarehouseEn;
                                item.toWarehouseId = item.custAccount;
                                item.fromWarehouseId = item.inventLocationId;
                                item.fromWarehouseEn = fromWarehouseEn;
                                item.fromWarehouseAr = fromWarehouseAr;
                                item.toWarehouseAr = toWarehouseAr;
                                item.toWarehouseEn = toWarehouseEn;
                            }
                            if (item.transkind == "ORDERSHIPMENT") {
                                if (item.inSalesid != null && item.slSalesId != null) {
                                    if (item.custAccount == _this.sessionInfo.inventlocationid && item.status != "CREATED") {
                                        newData_1.push(item);
                                    }
                                    else if (item.inventLocationId == _this.sessionInfo.inventlocationid) {
                                        newData_1.push(item);
                                    }
                                    else if (item.jazeeraWarehouse == _this.sessionInfo.inventlocationid) {
                                        newData_1.push(item);
                                    }
                                }
                            }
                            else {
                                if (item.custAccount == _this.sessionInfo.inventlocationid && item.status != "CREATED") {
                                    newData_1.push(item);
                                }
                                else if (item.inventLocationId == _this.sessionInfo.inventlocationid) {
                                    newData_1.push(item);
                                }
                                else if (item.jazeeraWarehouse == _this.sessionInfo.inventlocationid) {
                                    newData_1.push(item);
                                }
                            }
                        });
                        return [2 /*return*/, newData_1];
                    case 5:
                        error_3 = _b.sent();
                        throw error_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.paginate = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        switch (reqData.type) {
                            case "quotation":
                                reqData.transkind = "('SALESQUOTATION')";
                                break;
                            case "movement":
                                reqData.transkind = "('INVENTORYMOVEMENT')";
                                break;
                            case "salesorder":
                                reqData.transkind = "('SALESORDER')";
                                break;
                            case "returnorder":
                                reqData.transkind = "('RETURNORDER')";
                                break;
                            case "transferorder":
                                reqData.transkind = "('TRANSFERORDER', 'ORDERSHIPMENT', 'ORDERRECEIVE')";
                                break;
                            case "ordershipment":
                                reqData.transkind = "('ORDERSHIPMENT')";
                                break;
                            case "orderreceive":
                                reqData.transkind = "('ORDERRECEIVE')";
                                break;
                            case "purchaseorder":
                                reqData.transkind = "('PURCHASEORDER')";
                        }
                        return [4 /*yield*/, this.salestableDAO.pagination(reqData, this.sessionInfo.inventlocationid)];
                    case 1:
                        data = _a.sent();
                        // data.map((v: any) => {});
                        return [2 /*return*/, data];
                    case 2:
                        error_4 = _a.sent();
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.save = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, custAccount, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 38, , 39]);
                        if (!(reqData.salesLine && reqData.salesLine.length > 0)) return [3 /*break*/, 36];
                        _a = reqData.transkind;
                        switch (_a) {
                            case "SALESQUOTATION": return [3 /*break*/, 1];
                            case "SALESORDER": return [3 /*break*/, 3];
                            case "RESERVED": return [3 /*break*/, 5];
                            case "RETURNORDER": return [3 /*break*/, 7];
                            case "DESIGNERSERVICERETURN": return [3 /*break*/, 9];
                            case "INVENTORYMOVEMENT": return [3 /*break*/, 11];
                            case "TRANSFERORDER": return [3 /*break*/, 13];
                            case "ORDERSHIPMENT": return [3 /*break*/, 15];
                            case "ORDERRECEIVE": return [3 /*break*/, 19];
                            case "PURCHASEREQUEST": return [3 /*break*/, 23];
                            case "PURCHASEORDER": return [3 /*break*/, 25];
                            case "PURCHASERETURN": return [3 /*break*/, 29];
                            case "DESIGNERSERVICE": return [3 /*break*/, 31];
                        }
                        return [3 /*break*/, 34];
                    case 1: return [4 /*yield*/, this.saveQuotation(reqData)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.saveSalesOrder(reqData)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.saveSalesOrder(reqData)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, this.saveReturnOrder(reqData)];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9: return [4 /*yield*/, this.saveReturnOrder(reqData)];
                    case 10: return [2 /*return*/, _b.sent()];
                    case 11: return [4 /*yield*/, this.saveInventoryMovementOrder(reqData)];
                    case 12: return [2 /*return*/, _b.sent()];
                    case 13: return [4 /*yield*/, this.saveQuotation(reqData)];
                    case 14: return [2 /*return*/, _b.sent()];
                    case 15:
                        if (!(reqData.interCompanyOriginalSalesId && reqData.interCompanyOriginalSalesId != "")) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.saveOrderShipment(reqData)];
                    case 16: return [2 /*return*/, _b.sent()];
                    case 17: throw { message: "INVOICE_ID_REQUIRED" };
                    case 18: return [3 /*break*/, 35];
                    case 19:
                        if (!(reqData.interCompanyOriginalSalesId && reqData.interCompanyOriginalSalesId != "")) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.saveOrderReceive(reqData)];
                    case 20: return [2 /*return*/, _b.sent()];
                    case 21: throw { message: "INVOICE_ID_REQUIRED" };
                    case 22: return [3 /*break*/, 35];
                    case 23: return [4 /*yield*/, this.saveQuotation(reqData)];
                    case 24: return [2 /*return*/, _b.sent()];
                    case 25: return [4 /*yield*/, this.rawQuery.get_vedor_related_custaccount(reqData.custAccount)];
                    case 26:
                        custAccount = _b.sent();
                        if (!custAccount) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.saveQuotation(reqData)];
                    case 27: return [2 /*return*/, _b.sent()];
                    case 28: throw { message: "NO_VENDOR_FOR_CUSTOMER" };
                    case 29: return [4 /*yield*/, this.saveReturnOrder(reqData)];
                    case 30: return [2 /*return*/, _b.sent()];
                    case 31:
                        if (!reqData.mobileNo) return [3 /*break*/, 33];
                        return [4 /*yield*/, this.saveQuotation(reqData)];
                    case 32: return [2 /*return*/, _b.sent()];
                    case 33: throw { message: "PLEASE_ENTER_MOBILE_NUMBER" };
                    case 34: throw { message: "TRANSKIND_REQUIRED" };
                    case 35: return [3 /*break*/, 37];
                    case 36: throw { message: "INVALID_DATA" };
                    case 37: return [3 /*break*/, 39];
                    case 38:
                        error_5 = _b.sent();
                        throw error_5;
                    case 39: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.validate = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var oldItem, statusData, uid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldItem = null;
                        if (!(!item.salesId || item.salesId == "" || item.salesId == "0")) return [3 /*break*/, 1];
                        item.salesId = null;
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(item.transkind == "SALESORDER")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.rawQuery.checkSalesStatus(item.salesId)];
                    case 2:
                        statusData = _a.sent();
                        if (statusData.status == "PAID" || statusData.status == "POSTED") {
                            return [2 /*return*/, "ALREADY_PAID"];
                        }
                        _a.label = 3;
                    case 3:
                        if (!!item.salesId) return [3 /*break*/, 5];
                        item.dataareaid = this.sessionInfo.dataareaid;
                        item.deleted = false;
                        item.inventLocationId = this.sessionInfo.inventlocationid;
                        item.createdby = this.sessionInfo.userName;
                        item.createddatetime = new Date(App_1.App.DateNow());
                        return [4 /*yield*/, this.getSalesid(item.transkind)];
                    case 4:
                        uid = _a.sent();
                        item.salesId = uid;
                        _a.label = 5;
                    case 5:
                        item.lastModifiedBy = this.sessionInfo.userName;
                        item.lastModifiedDate = new Date(App_1.App.DateNow());
                        if (item.cardAmount) {
                        }
                        if (item.cashAmount == "" || item.cashAmount == null) {
                            item.cashAmount = 0;
                        }
                        if (item.designServiceRedeemAmount == "" || item.designServiceRedeemAmount == null) {
                            item.designServiceRedeemAmount = 0;
                        }
                        if (item.cardAmount == "" || item.cardAmount == null) {
                            item.cardAmount = 0;
                        }
                        if (item.shippingAmount == "" || item.shippingAmount == null) {
                            item.shippingAmount = 0;
                        }
                        if (item.redeemAmount == "" || item.redeemAmount == null) {
                            item.redeemAmount = 0;
                        }
                        console.log(item.lastModifiedDate.toISOString());
                        return [2 /*return*/, true];
                }
            });
        });
    };
    SalesTableService.prototype.getSalesid = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var usergroupconfig, data, _a, hashString, date, prevYear, year, salesId, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 33, , 34]);
                        return [4 /*yield*/, this.usergroupconfigDAO.findOne({
                                groupid: this.sessionInfo.groupid,
                            })];
                    case 1:
                        usergroupconfig = _b.sent();
                        data = void 0;
                        _a = type;
                        switch (_a) {
                            case "SALESQUOTATION": return [3 /*break*/, 2];
                            case "SALESORDER": return [3 /*break*/, 4];
                            case "RESERVED": return [3 /*break*/, 6];
                            case "DESIGNERSERVICE": return [3 /*break*/, 8];
                            case "RETURNORDER": return [3 /*break*/, 10];
                            case "DESIGNERSERVICERETURN": return [3 /*break*/, 12];
                            case "INVENTORYMOVEMENT": return [3 /*break*/, 14];
                            case "TRANSFERORDER": return [3 /*break*/, 16];
                            case "ORDERSHIPMENT": return [3 /*break*/, 18];
                            case "ORDERRECEIVE": return [3 /*break*/, 20];
                            case "PURCHASEREQUEST": return [3 /*break*/, 22];
                            case "PURCHASEORDER": return [3 /*break*/, 24];
                            case "PURCHASERETURN": return [3 /*break*/, 26];
                        }
                        return [3 /*break*/, 28];
                    case 2:
                        this.seqNum = usergroupconfig.quotationsequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 3:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 4:
                        this.seqNum = usergroupconfig.salesordersequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 5:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 6:
                        this.seqNum = usergroupconfig.salesordersequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 7:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 8:
                        this.seqNum = usergroupconfig.salesordersequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 9:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 10:
                        this.seqNum = usergroupconfig.returnordersequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 11:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 12:
                        this.seqNum = usergroupconfig.returnordersequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 13:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 14:
                        this.seqNum = usergroupconfig.movementsequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 15:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 16:
                        this.seqNum = usergroupconfig.transferordersequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 17:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 18:
                        this.seqNum = usergroupconfig.ordershipmentsequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 19:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 20:
                        this.seqNum = usergroupconfig.orderreceivesequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 21:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 22:
                        this.seqNum = usergroupconfig.purchaserequestsequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 23:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 24:
                        this.seqNum = usergroupconfig.purchaseordersequencegroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 25:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 26:
                        this.seqNum = usergroupconfig.purchaseReturnSequenceGroup;
                        return [4 /*yield*/, this.rawQuery.getNumberSequence(this.seqNum)];
                    case 27:
                        data = _b.sent();
                        return [3 /*break*/, 29];
                    case 28: throw { message: "TRANSKIND_REQUIRED" };
                    case 29:
                        if (!(data && data.format)) return [3 /*break*/, 31];
                        hashString = data.format.slice(data.format.indexOf("#"), data.format.lastIndexOf("#") + 1);
                        date = new Date(data.lastmodifieddate).toLocaleString();
                        console.log(date);
                        console.log(data);
                        prevYear = new Date(data.lastmodifieddate).getFullYear().toString().substr(2, 2);
                        year = new Date(App_1.App.DateNow()).getFullYear().toString().substr(2, 2);
                        data.nextrec = prevYear == year ? data.nextrec : "000001";
                        salesId = data.format.replace(hashString, year) + "-" + data.nextrec;
                        //console.log(salesId);
                        return [4 /*yield*/, this.rawQuery.updateNumberSequence(this.seqNum, data.nextrec)];
                    case 30:
                        //console.log(salesId);
                        _b.sent();
                        return [2 /*return*/, salesId];
                    case 31: throw { message: "CANNOT_FIND_SEQUENCE_FORMAT_FROM_NUMBER_SEQUENCE_TABLE" };
                    case 32: return [3 /*break*/, 34];
                    case 33:
                        error_6 = _b.sent();
                        if (error_6 == {}) {
                            error_6 = { message: "SERVER_SIDE_ERROR" };
                        }
                        throw error_6;
                    case 34: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.onlineInvoicePaymentService = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var statusData, salesData, reqData, _i, _a, item, batches, _b, _c, v, batch, returnData, error_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.rawQuery.checkSalesStatus(data.orderId)];
                    case 1:
                        statusData = _d.sent();
                        if (statusData.status == "PAID" || statusData.status == "POSTED") {
                            throw "ALREADY_PAID";
                        }
                        return [4 /*yield*/, this.salestableDAO.entity(data.orderId)];
                    case 2:
                        salesData = _d.sent();
                        reqData = __assign({}, salesData);
                        reqData.status = "PAID";
                        reqData.paymentType = "ONLINE";
                        reqData.paymentStatus = true;
                        for (_i = 0, _a = reqData.salesLine; _i < _a.length; _i++) {
                            item = _a[_i];
                            batches = [];
                            for (_b = 0, _c = item.batch; _b < _c.length; _b++) {
                                v = _c[_b];
                                batch = {
                                    batchNo: v.batchNo,
                                    quantity: v.quantity,
                                };
                                batches.push(batch);
                            }
                            item.batches = batches;
                        }
                        returnData = __assign({}, reqData);
                        this.saveSalesOrderAfterOnlinePayment(reqData);
                        return [2 /*return*/, returnData];
                    case 3:
                        error_7 = _d.sent();
                        throw { message: error_7 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.convertToSalesOrder = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var salesData, canConvert, colors, items, sizes, itemsInStock, itemString, reqData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.salestableDAO.entity(data.salesId)];
                    case 1:
                        salesData = _a.sent();
                        canConvert = true;
                        colors = [];
                        items = [];
                        sizes = [];
                        salesData.salesLine.map(function (v) {
                            items.push("" + v.itemid), colors.push(v.configId), sizes.push(v.inventsizeid);
                        });
                        return [4 /*yield*/, this.rawQuery.checkItems(this.sessionInfo.inventlocationid, items, colors, sizes)];
                    case 2:
                        itemsInStock = _a.sent();
                        console.log("==========================", itemsInStock);
                        itemString = "";
                        salesData.salesLine.map(function (v) {
                            var index = itemsInStock.findIndex(function (value) {
                                return value.itemid.toLowerCase() == v.itemid.toLowerCase() &&
                                    value.configid.toLowerCase() == v.configId.toLowerCase() &&
                                    value.inventsizeid.toLowerCase() == v.inventsizeid.toLowerCase();
                            });
                            if (index >= 0) {
                                if (parseInt(v.salesQty) > parseInt(itemsInStock[index].qty)) {
                                    canConvert = canConvert == true ? false : false;
                                    itemString += v.itemid + ",";
                                }
                            }
                            else {
                                canConvert = canConvert == true ? false : false;
                                itemString += v.itemid + ",";
                            }
                        });
                        console.log(canConvert);
                        if (!canConvert) return [3 /*break*/, 5];
                        salesData.status = "CONVERTED";
                        return [4 /*yield*/, this.salestableDAO.save(salesData)];
                    case 3:
                        _a.sent();
                        salesData.interCompanyOriginalSalesId = salesData.salesId;
                        delete salesData.salesId;
                        reqData = __assign({}, salesData);
                        reqData.transkind = "SALESORDER";
                        reqData.status = "CREATED";
                        reqData.message = "CONVERTED";
                        reqData.inventLocationId = this.sessionInfo.inventlocationid;
                        reqData.salesLine = salesData.salesLine;
                        return [4 /*yield*/, this.save(reqData)];
                    case 4:
                        data = _a.sent();
                        data.status = "CONVERTED";
                        return [2 /*return*/, data];
                    case 5: throw {
                        message: "CANNOT_CONVERT_TO_SALESORDER",
                    };
                }
            });
        });
    };
    SalesTableService.prototype.convertToPurchaseOrder = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var salesData, reqData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.salestableDAO.entity(data.salesId)];
                    case 1:
                        salesData = _b.sent();
                        //console.log(salesData);
                        salesData.status = "CONVERTED";
                        return [4 /*yield*/, this.salestableDAO.save(salesData)];
                    case 2:
                        _b.sent();
                        salesData.interCompanyOriginalSalesId = salesData.salesId;
                        delete salesData.salesId;
                        reqData = __assign({}, salesData);
                        reqData.transkind = "PURCHASEORDER";
                        reqData.message = "CONVERTED";
                        reqData.status = "CREATED";
                        _a = reqData.warehouse;
                        return [4 /*yield*/, this.sessionInfo.inventlocationid];
                    case 3:
                        _a.inventLocationId = _b.sent();
                        delete reqData.warehouse;
                        reqData.salesLine = salesData.salesLine;
                        data.status = "CONVERTED";
                        return [2 /*return*/, data];
                }
            });
        });
    };
    SalesTableService.prototype.convertPurchaseOrderToSalesOrder = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var salesData, convertedData, canConvert_1, colors_1, items_1, sizes_1, itemString_1, itemsInStock_1, reqData, custAccount, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.salestableDAO.entity(data.salesId)];
                    case 1:
                        salesData = _a.sent();
                        //console.log(salesData);
                        salesData.status = "CONVERTED";
                        return [4 /*yield*/, this.rawQuery.salesTableInterCompanyOriginalData(data.salesId)];
                    case 2:
                        convertedData = _a.sent();
                        if (!(convertedData.length > 0)) return [3 /*break*/, 3];
                        throw { message: "ALREADY_CONVERTED" };
                    case 3: return [4 /*yield*/, this.salestableDAO.save(salesData)];
                    case 4:
                        _a.sent();
                        canConvert_1 = true;
                        colors_1 = [];
                        items_1 = [];
                        sizes_1 = [];
                        itemString_1 = "";
                        salesData.salesLine.map(function (v) {
                            items_1.push(v.itemid), colors_1.push(v.configId), sizes_1.push(v.inventsizeid);
                        });
                        return [4 /*yield*/, this.rawQuery.checkItems(this.sessionInfo.inventlocationid, items_1, colors_1, sizes_1)];
                    case 5:
                        itemsInStock_1 = _a.sent();
                        salesData.salesLine.map(function (v) {
                            var index = itemsInStock_1.findIndex(function (value) {
                                return value.itemid.toLowerCase() == v.itemid.toLowerCase() &&
                                    value.configid.toLowerCase() == v.configId.toLowerCase() &&
                                    value.inventsizeid.toLowerCase() == v.inventsizeid.toLowerCase();
                            });
                            if (index >= 0) {
                                if (parseInt(v.salesQty) > parseInt(itemsInStock_1[index].qty)) {
                                    canConvert_1 = canConvert_1 == true ? false : false;
                                    itemString_1 += v.itemid + ",";
                                }
                            }
                            else {
                                canConvert_1 = canConvert_1 == true ? false : false;
                                itemString_1 += v.itemid + ",";
                            }
                        });
                        console.log(canConvert_1);
                        if (!canConvert_1) return [3 /*break*/, 7];
                        salesData.interCompanyOriginalSalesId = salesData.salesId;
                        delete salesData.salesId;
                        reqData = __assign({}, salesData);
                        reqData.transkind = "SALESORDER";
                        reqData.message = "CONVERTED";
                        reqData.status = "CREATED";
                        reqData.inventLocationId = salesData.jazeeraWarehouse;
                        reqData.warehouse.inventLocationId = salesData.jazeeraWarehouse;
                        return [4 /*yield*/, this.rawQuery.get_vedor_related_custaccount(salesData.custAccount)];
                    case 6:
                        custAccount = _a.sent();
                        //console.log(custAccount);
                        if (custAccount) {
                            reqData.custAccount = custAccount;
                            reqData.salesLine = salesData.salesLine;
                            data.status = "CONVERTED";
                            return [2 /*return*/, data];
                        }
                        else {
                            throw { message: "NO_VENDOR_FOR_CUSTOMER" };
                        }
                        return [3 /*break*/, 8];
                    case 7: throw {
                        message: "CANNOT_CONVERT_TO_SALESORDER",
                    };
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_8 = _a.sent();
                        throw { message: error_8 };
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.convertPurchaseReturnToReturnOrder = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var purchaseReturnData, purchaseOrderData, salesOrderData, batches, _i, batches_1, batch, reqData, salesLine, _loop_1, _a, salesLine_3, item, custAccount, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.salestableDAO.entity(data.salesId)];
                    case 1:
                        purchaseReturnData = _b.sent();
                        //console.log(purchaseReturnData);
                        purchaseReturnData.status = "CONVERTED";
                        return [4 /*yield*/, this.salestableDAO.save(purchaseReturnData)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.rawQuery.salesTableData(purchaseReturnData.interCompanyOriginalSalesId)];
                    case 3:
                        purchaseOrderData = _b.sent();
                        //console.log(purchaseOrderData);
                        purchaseOrderData = purchaseOrderData.length > 0 ? purchaseOrderData[0] : {};
                        if (!(purchaseOrderData == {})) return [3 /*break*/, 4];
                        throw { message: "TECHNICAL_ISSUE,_PLEASE_CONTACT_YOUR_TECHNICAL_TEAM" };
                    case 4: return [4 /*yield*/, this.rawQuery.salesTableInterCompanyOriginalData(purchaseOrderData.salesid, "SALESORDER")];
                    case 5:
                        salesOrderData = _b.sent();
                        salesOrderData = salesOrderData.length > 0 ? salesOrderData[0] : {};
                        purchaseReturnData.interCompanyOriginalSalesId = salesOrderData.salesid;
                        return [4 /*yield*/, this.inventTransDAO.findAll({
                                invoiceid: purchaseReturnData.salesId,
                            })];
                    case 6:
                        batches = _b.sent();
                        for (_i = 0, batches_1 = batches; _i < batches_1.length; _i++) {
                            batch = batches_1[_i];
                            delete batch.id;
                            batch.returnQuantity = Math.abs(batch.qty);
                            batch.transrefid = purchaseReturnData.interCompanyOriginalSalesId;
                        }
                        delete purchaseReturnData.salesId;
                        reqData = __assign({}, purchaseReturnData);
                        reqData.transkind = "RETURNORDER";
                        reqData.message = "CONVERTED";
                        reqData.status = "CREATED";
                        salesLine = purchaseReturnData.salesLine;
                        _loop_1 = function (item) {
                            //console.log(item);
                            var batch = batches.filter(function (v) { return v.itemid == item.itemid && v.inventsizeid == item.inventsizeid && v.configid == item.configId; });
                            //console.log(batch);
                            item.batches = batch;
                        };
                        //console.log(batches);
                        for (_a = 0, salesLine_3 = salesLine; _a < salesLine_3.length; _a++) {
                            item = salesLine_3[_a];
                            _loop_1(item);
                        }
                        reqData.inventLocationId = purchaseReturnData.jazeeraWarehouse;
                        reqData.warehouse.inventLocationId = purchaseReturnData.jazeeraWarehouse;
                        return [4 /*yield*/, this.rawQuery.get_vedor_related_custaccount(purchaseReturnData.custAccount)];
                    case 7:
                        custAccount = _b.sent();
                        //console.log(custAccount);
                        reqData.custAccount = custAccount;
                        reqData.salesLine = salesLine;
                        data.status = "CONVERTED";
                        return [2 /*return*/, data];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_9 = _b.sent();
                        throw { message: error_9 };
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.updateinventtransstatus = function (id, status) {
        if (status === void 0) { status = null; }
        return __awaiter(this, void 0, void 0, function () {
            var salesData, batches, _i, batches_2, item, returnData, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.salestableDAO.entity(id)];
                    case 1:
                        salesData = _a.sent();
                        //console.log(salesData);
                        salesData.status = !status ? "SAVED" : status;
                        this.salestableDAO.save(salesData);
                        return [4 /*yield*/, this.inventTransDAO.findAll({ invoiceid: id })];
                    case 2:
                        batches = _a.sent();
                        _i = 0, batches_2 = batches;
                        _a.label = 3;
                    case 3:
                        if (!(_i < batches_2.length)) return [3 /*break*/, 6];
                        item = batches_2[_i];
                        item.reserveStatus = salesData.status;
                        item.transactionClosed = false;
                        item.dateinvent = new Date(App_1.App.DateNow());
                        return [4 /*yield*/, this.updateInventoryService.updateInventtransTable(item)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        returnData = {
                            id: id,
                            message: "UNRESERVED",
                            status: salesData.status,
                        };
                        //console.log(returnData);
                        return [2 /*return*/, returnData];
                    case 7:
                        error_10 = _a.sent();
                        throw error_10;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveQuotation = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var salesLine, cond, salesTable, promiseList, _i, salesLine_4, item, designerServiceData, returnData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salesLine = reqData.salesLine;
                        delete reqData.salesLine;
                        return [4 /*yield*/, this.validate(reqData)];
                    case 1:
                        cond = _a.sent();
                        if (!(cond == true)) return [3 /*break*/, 4];
                        reqData.payment = reqData.transkind == "DESIGNERSERVICE" ? "CASH" : false;
                        reqData.status = reqData.status ? reqData.status : "CREATED";
                        reqData.salesType = reqData.transkind == "TRANSFERORDER" ? 1 : null;
                        return [4 /*yield*/, this.salestableDAO.save(reqData)];
                    case 2:
                        salesTable = _a.sent();
                        promiseList = [];
                        promiseList.push(this.salesLineDelete(reqData));
                        for (_i = 0, salesLine_4 = salesLine; _i < salesLine_4.length; _i++) {
                            item = salesLine_4[_i];
                            item.id = uuid();
                            item.salesId = reqData.salesId;
                            item.createddatetime = new Date(App_1.App.DateNow());
                            item.createdBy = this.sessionInfo.userName;
                            item.numberSequenceGroupId = this.seqNum;
                            item.lastModifiedDate = new Date(App_1.App.DateNow());
                            promiseList.push(this.salesLineDAO.save(item));
                        }
                        if (reqData.status == "PAID") {
                            if (reqData.transkind == "DESIGNERSERVICE") {
                                designerServiceData = {
                                    custphone: reqData.mobileNo,
                                    amount: reqData.netAmount,
                                    invoiceid: reqData.salesId,
                                    dataareaid: this.sessionInfo.dataareaid,
                                    recordtype: 0,
                                    settle: 0,
                                    selectedforsettle: 0,
                                    approvalstatus: reqData.approvalstatus,
                                    createdby: this.sessionInfo.userName,
                                    createddatetime: new Date(App_1.App.DateNow()),
                                    lastmodifiedby: this.sessionInfo.userName,
                                    lastmodifieddate: new Date(App_1.App.DateNow()),
                                    customer: {
                                        accountnum: reqData.custAccount,
                                    },
                                };
                                promiseList.push(this.designerServiceDAO.save(designerServiceData));
                            }
                        }
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 3:
                        _a.sent();
                        returnData = {
                            id: salesTable.salesId,
                            message: "SAVED_SUCCESSFULLY",
                            status: reqData.status,
                        };
                        //console.log(returnData);
                        return [2 /*return*/, returnData];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.stockOnHandCheck = function (salesLine, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var canConvert_2, colors_2, items_2, sizes_2, itemString_2, itemsInStock_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(reqData.transkind == "PAID")) return [3 /*break*/, 2];
                        reqData.invoiceDate = new Date(App_1.App.DateNow());
                        canConvert_2 = true;
                        colors_2 = [];
                        items_2 = [];
                        sizes_2 = [];
                        itemString_2 = "";
                        salesLine.map(function (v) {
                            items_2.push(v.itemid), colors_2.push(v.configId), sizes_2.push(v.inventsizeid);
                        });
                        return [4 /*yield*/, this.rawQuery.checkItems(this.sessionInfo.inventlocationid, items_2, colors_2, sizes_2)];
                    case 1:
                        itemsInStock_2 = _a.sent();
                        salesLine.map(function (v) {
                            var index = itemsInStock_2.findIndex(function (value) {
                                return value.itemid.toLowerCase() == v.itemid.toLowerCase() &&
                                    value.configid.toLowerCase() == v.configId.toLowerCase() &&
                                    value.inventsizeid.toLowerCase() == v.inventsizeid.toLowerCase();
                            });
                            if (index >= 0) {
                                if (parseInt(v.salesQty) > parseInt(itemsInStock_2[index].qty)) {
                                    canConvert_2 = canConvert_2 == true ? false : false;
                                    itemString_2 += v.itemid + ",";
                                }
                            }
                            else {
                                canConvert_2 = canConvert_2 == true ? false : false;
                                itemString_2 += v.itemid + ",";
                            }
                        });
                        if (!canConvert_2) {
                            throw { message: "CANNOT_CREATE_SALESORDER" };
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.salesLineDelete = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var lineData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.salesLineDAO.findAll({
                            salesId: reqData.salesId,
                        })];
                    case 1:
                        lineData = _a.sent();
                        if (lineData) {
                            this.salesLineDAO.delete(lineData);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.inventryTransUpdate = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseList, batches, _i, batches_3, batch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promiseList = [];
                        return [4 /*yield*/, this.inventTransDAO.findAll({
                                invoiceid: reqData.salesId,
                            })];
                    case 1:
                        batches = _a.sent();
                        for (_i = 0, batches_3 = batches; _i < batches_3.length; _i++) {
                            batch = batches_3[_i];
                            if (batch.reserveStatus == "RESERVED") {
                                promiseList.push(this.updateInventoryService.updateUnReserveQty(batch));
                            }
                        }
                        promiseList.push(this.inventTransDAO.delete(batches));
                        return [2 /*return*/, Promise.all(promiseList)];
                }
            });
        });
    };
    SalesTableService.prototype.salesLineItemOrder = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseList, batches, _i, _a, batch, availability, fiofoBatches, fiofoBatches, _b, batches_4, batch;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("===========================================================");
                        promiseList = [];
                        batches = [];
                        item.batch = [];
                        if (!(item.salesQty > 0)) return [3 /*break*/, 9];
                        item.salesId = reqData.salesId;
                        item.createddatetime = new Date(App_1.App.DateNow());
                        item.createdBy = this.sessionInfo.userName;
                        item.numberSequenceGroupId = this.seqNum;
                        item.lastModifiedDate = new Date(App_1.App.DateNow());
                        console.log("--------------------------------------------", item.batches);
                        if (!(item.batches && item.batches.length > 0)) return [3 /*break*/, 7];
                        item.batches = item.batches.filter(function (v) { return v.quantity > 0; });
                        _i = 0, _a = item.batches;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        batch = _a[_i];
                        console.log("=================================================", batch);
                        return [4 /*yield*/, this.rawQuery.getbatchavailability({
                                inventlocationid: this.sessionInfo.inventlocationid,
                                itemid: item.itemid,
                                configid: item.configId,
                                inventsizeid: item.inventsizeid,
                                batchno: batch.batchNo,
                            })];
                    case 2:
                        availability = _c.sent();
                        if (!(availability <= 0 || availability < Math.abs(batch.qty))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dofifo(item, reqData.status)];
                    case 3:
                        fiofoBatches = _c.sent();
                        batches = batches.concat(fiofoBatches);
                        return [3 /*break*/, 5];
                    case 4:
                        batch.itemid = item.itemid;
                        batch.transrefid = item.salesId;
                        batch.invoiceid = item.salesId;
                        batch.batchno = batch.batchNo;
                        batch.configid = item.configId;
                        batch.inventsizeid = item.inventsizeid;
                        batch.inventlocationid = this.sessionInfo.inventlocationid;
                        batch.dataareaid = this.sessionInfo.dataareaid;
                        batch.qty = -batch.quantity;
                        batch.reserveStatus = reqData.status;
                        batch.dataareaid = this.sessionInfo.dataareaid;
                        batch.transactionClosed = reqData.status == "PAID" || reqData.status == "RESERVED" ? true : false;
                        batch.salesLineId = item.id;
                        batch.dateinvent = new Date(App_1.App.DateNow());
                        batches.push(batch);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.dofifo(item, reqData.status)];
                    case 8:
                        fiofoBatches = _c.sent();
                        batches = batches.concat(fiofoBatches);
                        _c.label = 9;
                    case 9:
                        //console.log("=======================================", batches)
                        promiseList = [];
                        for (_b = 0, batches_4 = batches; _b < batches_4.length; _b++) {
                            batch = batches_4[_b];
                            item.batch.push({
                                batchNo: batch.batchno,
                                quantity: batch.quantity,
                            });
                            batch.salesLineId = item.id;
                            this.updateInventoryService.sessionInfo = this.sessionInfo;
                            promiseList.push(this.updateInventoryService.updateInventtransTable(batch, true));
                        }
                        return [2 /*return*/, Promise.all(promiseList)];
                }
            });
        });
    };
    SalesTableService.prototype.saveSalesOrderPaidPursase = function (reqData, condData) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseList, batches, _i, batches_5, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promiseList = [];
                        batches = [];
                        return [4 /*yield*/, this.rawQuery.updateSalesTableWorkFlowStatus(reqData.interCompanyOriginalSalesId, "PAID")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.inventTransDAO.findAll({
                                invoiceid: reqData.salesId,
                            })];
                    case 2:
                        batches = _a.sent();
                        for (_i = 0, batches_5 = batches; _i < batches_5.length; _i++) {
                            v = batches_5[_i];
                            delete v.id;
                            v.invoiceid = reqData.interCompanyOriginalSalesId;
                            v.transrefid = reqData.salesId;
                            v.qty = Math.abs(v.qty);
                            v.dataareaid = this.sessionInfo.dataareaid;
                            v.inventlocationid = condData.inventlocationid;
                            this.updateInventoryService.sessionInfo = this.sessionInfo;
                            promiseList.push(this.updateInventoryService.updateInventtransTable(v, true));
                        }
                        return [2 /*return*/, Promise.all(promiseList)];
                }
            });
        });
    };
    SalesTableService.prototype.saveSalesOrderUpdateVocharDiscount = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseList, voucherData;
            return __generator(this, function (_a) {
                promiseList = [];
                if (reqData.voucherDiscChecked) {
                    voucherData = {
                        salesId: reqData.salesId,
                        voucherNum: reqData.voucherNum,
                        custAccount: reqData.custAccount,
                    };
                    promiseList.push(this.rawQuery.updateVoucherDiscounts(voucherData));
                }
                return [2 /*return*/, Promise.all(promiseList)];
            });
        });
    };
    SalesTableService.prototype.saveSalesVisitorData = function (reqData, customerDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var visitorData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        visitorData = new VisitCustomer_1.VisitCustomer();
                        this.visitCustomerService.sessionInfo = this.sessionInfo;
                        visitorData.visitorName = reqData.salesName;
                        visitorData.purchased = "Yes";
                        visitorData.visitorMobileNumber = reqData.mobileNo;
                        visitorData.visitorType =
                            Props_1.Props.RCUSTTYPE[customerDetails.rcusttype] && Props_1.Props.RCUSTTYPE[customerDetails.rcusttype][1]
                                ? Props_1.Props.RCUSTTYPE[customerDetails.rcusttype][1]
                                : "Individual";
                        return [4 /*yield*/, this.visitCustomerService.save(visitorData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveSalesOrderOverDue = function (reqData, userName, salesTable) {
        return __awaiter(this, void 0, void 0, function () {
            var paymTerDays, days, now, dueDate, overDue, overDueSaved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rawQuery.getPaymTermDays(reqData.paymtermid)];
                    case 1:
                        paymTerDays = _a.sent();
                        days = paymTerDays[0].numofdays;
                        now = new Date(App_1.App.DateNow());
                        dueDate = new Date(App_1.App.DateNow());
                        dueDate.setDate(dueDate.getDate() + days);
                        overDue = new Overdue_1.Overdue();
                        overDue.accountNum = reqData.custAccount;
                        overDue.payment = 0;
                        overDue.customerName = reqData.salesName;
                        overDue.invoiceAmount = reqData.netAmount;
                        overDue.invoicedate = now;
                        overDue.duedate = dueDate;
                        overDue.actualDueDate = dueDate;
                        overDue.createddatetime = now;
                        overDue.createdby = userName;
                        overDue.salesId = salesTable.salesId;
                        overDue.invoiceId = salesTable.salesId;
                        overDue.lastmodifiedby = userName;
                        overDue.lastModifiedDate = now;
                        this.overDueDAO = new OverDueDAO_1.OverDueDAO();
                        return [4 /*yield*/, this.overDueDAO.createOverDue(overDue)];
                    case 2:
                        overDueSaved = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveSalesOrderDesignerService = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var designerServiceData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        designerServiceData = {
                            custphone: reqData.mobileNo,
                            amount: -reqData.designServiceRedeemAmount,
                            invoiceid: reqData.designServiceId,
                            salesorderid: reqData.salesId,
                            dataareaid: this.sessionInfo.dataareaid,
                            recordtype: 0,
                            settle: 0,
                            selectedforsettle: 0,
                            approvalstatus: reqData.approvalstatus,
                            createdby: this.sessionInfo.userName,
                            createddatetime: new Date(App_1.App.DateNow()),
                            lastmodifiedby: this.sessionInfo.userName,
                            lastmodifieddate: new Date(App_1.App.DateNow()),
                            customer: {
                                accountnum: reqData.designerServiceCustAccount,
                            },
                        };
                        return [4 /*yield*/, this.designerServiceDAO.save(designerServiceData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveSalesOrderRedeem = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var redeemData, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        redeemData = {
                            TransactionId: reqData.salesId,
                            MobileNo: reqData.mobileNo.length == 9 ? "0" + reqData.mobileNo : reqData.mobileNo,
                            InvoiceNo: reqData.salesId,
                            InvoiceAmount: reqData.netAmount,
                            RedeemPoints: reqData.redeemPoints,
                            SyncStatus: 0,
                            InventLocationId: this.sessionInfo.inventlocationid,
                            LoyaltyStatus: 0,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redeemService.Redeem(redeemData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_11 = _a.sent();
                        console.error(error_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveSalesOrder = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseList, customerRecord, salesLine, returnData, cond, salesTable_1, _i, salesLine_5, item, salesline, condData, customerDetails, pmobileno, userName, ptokenData, pmessage, pmail, imail;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("1----------------------------");
                        promiseList = [];
                        salesLine = reqData.salesLine;
                        delete reqData.salesLine;
                        return [4 /*yield*/, this.stockOnHandCheck(salesLine, reqData)];
                    case 1:
                        _a.sent();
                        console.log("2----------------------------");
                        return [4 /*yield*/, this.validate(reqData)];
                    case 2:
                        cond = _a.sent();
                        if (!(cond == "ALREADY_PAID")) return [3 /*break*/, 3];
                        returnData = {
                            id: reqData.salesId,
                            message: "ALREADY_PAID",
                            status: reqData.status,
                            url: reqData.url,
                        };
                        return [2 /*return*/, returnData];
                    case 3:
                        if (!(cond == true)) return [3 /*break*/, 11];
                        !reqData.warehouse ? (reqData.warehouse = {}) : (reqData.warehouse = reqData.warehouse);
                        reqData.warehouse.inventLocationId = this.sessionInfo.inventlocationid;
                        reqData.url = reqData.onlineAmount > 0 ? Props_1.Props.ECOMMERCE_PAYMENT_URL + reqData.salesId : null;
                        reqData.paymentType = "OFFLINE";
                        reqData.status = reqData.status == "CREATED" || reqData.status == "UNRESERVED" ? "SAVED" : reqData.status;
                        console.log(reqData.lastModifiedDate.toISOString());
                        return [4 /*yield*/, this.salestableDAO.save(reqData)];
                    case 4:
                        salesTable_1 = _a.sent();
                        reqData.invoiceAccount =
                            reqData.invoiceAccount || reqData.invoiceAccount != "" ? reqData.invoiceAccount : reqData.custAccount;
                        return [4 /*yield*/, this.rawQuery.getCustomer(reqData.invoiceAccount)];
                    case 5:
                        customerRecord = _a.sent();
                        if (reqData.status == "SAVED" || reqData.status == "CONVERTED") {
                            this.rawQuery.salesTableInventlocation(reqData.inventLocationId, reqData.salesId);
                        }
                        console.log("3----------------------------");
                        promiseList = [];
                        promiseList.push(this.salesLineDelete(reqData));
                        promiseList.push(this.inventryTransUpdate(reqData));
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 6:
                        _a.sent();
                        console.log("4----------------------------");
                        promiseList = [];
                        for (_i = 0, salesLine_5 = salesLine; _i < salesLine_5.length; _i++) {
                            item = salesLine_5[_i];
                            item.id = reqData.paymentType == "ONLINE" ? item.id : uuid();
                            item.salesId = reqData.salesId;
                            promiseList.push(this.salesLineItemOrder(item, reqData));
                        }
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.salesLineDAO.save(salesLine)];
                    case 8:
                        salesline = _a.sent();
                        console.log("5----------------------------");
                        promiseList = [];
                        if (!(reqData.status == "PAID")) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.rawQuery.salesTableData(reqData.interCompanyOriginalSalesId)];
                    case 9:
                        condData = _a.sent();
                        condData = condData.length >= 0 ? condData[0] : {};
                        //console.log(condData);
                        promiseList.push(this.saveSalesOrderUpdateVocharDiscount(reqData));
                        condData = condData ? condData : {};
                        if (condData.transkind == "PURCHASEORDER") {
                            promiseList.push(this.saveSalesOrderPaidPursase(reqData, condData));
                        }
                        customerDetails = customerRecord ? customerRecord : {};
                        if (reqData.mobileNo) {
                            pmobileno = function () { return __awaiter(_this, void 0, void 0, function () {
                                var message, sms;
                                return __generator(this, function (_a) {
                                    message = "  \u0631\u0636\u0627\u0624\u0643\u0645 \u0647\u0648 \u0647\u062F\u0641\u0646\u0627 \u062F\u0647\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0632\u064A\u0631\u0629 \u062C\u0648\u062F\u0629 \u0648\u062C\u0645\u0627\u0644 \u0642\u064A\u0645\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A\u0643\u0645 \u0647\u064A " + reqData.netAmount.toFixed(2) + " ";
                                    sms = new Sms_1.Sms();
                                    return [2 /*return*/, sms.sendMessage("966", reqData.mobileNo, message)];
                                });
                            }); };
                            promiseList.push(pmobileno());
                        }
                        //console.log(reqData);
                        if (customerDetails.walkincustomer) {
                            promiseList.push(this.saveSalesVisitorData(reqData, customerDetails));
                        }
                        userName = this.sessionInfo.userName;
                        if (reqData.paymtermid != "CASH" && !reqData.isCash) {
                            promiseList.push(this.saveSalesOrderOverDue(reqData, userName, salesTable_1));
                        }
                        // }
                        if (reqData.designServiceRedeemAmount > 0) {
                            promiseList.push(this.saveSalesOrderDesignerService(reqData));
                        }
                        promiseList.push(this.saveSalesOrderRedeem(reqData));
                        _a.label = 10;
                    case 10:
                        console.log("6---------------------------- " + reqData.paymentType + reqData.onlineAmount);
                        if (reqData.onlineAmount > 0 && reqData.status != "PAID") {
                            ptokenData = function () { return __awaiter(_this, void 0, void 0, function () {
                                var tokenData;
                                return __generator(this, function (_a) {
                                    tokenData = {
                                        orderId: reqData.salesId,
                                        customerId: reqData.custAccount,
                                        email: reqData.custEmail,
                                        authToken: reqData.authToken,
                                        updatedBy: this.sessionInfo.userName,
                                        updatedOn: new Date(App_1.App.DateNow()),
                                    };
                                    return [2 /*return*/, this.saveSalesorderToken(tokenData)];
                                });
                            }); };
                            promiseList.push(ptokenData());
                            pmessage = function () { return __awaiter(_this, void 0, void 0, function () {
                                var message, sms;
                                return __generator(this, function (_a) {
                                    message = " Please click on the below link to complete payment of " + reqData.onlineAmount.toFixed(2) + " SAR \n " + reqData.url + " ";
                                    try {
                                        sms = new Sms_1.Sms();
                                        return [2 /*return*/, sms.sendMessage("966", reqData.mobileNo, message)];
                                    }
                                    catch (error) {
                                        Log_1.log.error(error);
                                    }
                                    return [2 /*return*/];
                                });
                            }); };
                            promiseList.push(pmessage());
                            pmail = function () { return __awaiter(_this, void 0, void 0, function () {
                                var _i, salesLine_6, item, template;
                                return __generator(this, function (_a) {
                                    try {
                                        salesTable_1.vatamount = salesTable_1.vatamount.toFixed(2);
                                        salesTable_1.lastModifiedDate = new Date(App_1.App.DateNow());
                                        for (_i = 0, salesLine_6 = salesLine; _i < salesLine_6.length; _i++) {
                                            item = salesLine_6[_i];
                                            if (reqData.status != "PAID") {
                                                if (item.lineTotalDisc != null || item.lineTotalDisc != undefined) {
                                                    item.lineTotalDisc = item.lineTotalDisc.toFixed(2);
                                                    item.unitPrice = item.lineAmount / item.salesQty;
                                                    if (item.colorantprice != null || item.colorantprice != undefined) {
                                                        item.productPrice = item.unitPrice + item.colorantprice;
                                                        item.productPrice = parseFloat(item.productPrice).toFixed(2);
                                                        item.price = item.lineAmount + item.colorantprice * item.salesQty;
                                                        item.priceVat =
                                                            item.lineAmount + item.colorantprice * item.salesQty - item.lineTotalDisc + item.vatamount;
                                                        item.price = parseFloat(item.price).toFixed(2);
                                                        item.priceVat = parseFloat(item.priceVat).toFixed(2);
                                                    }
                                                }
                                            }
                                        }
                                        console.log("Payment Link");
                                        template = reqData.lang == "en" ? "paymentgateway" : "paymentgateway-ar";
                                        salesTable_1.amount = salesTable_1.amount
                                            ? Math.round(parseFloat((salesTable_1.amount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                                            : 0;
                                        salesTable_1.vatamount = salesTable_1.vatamount
                                            ? Math.round(parseFloat((salesTable_1.vatamount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                                            : 0;
                                        salesTable_1.netAmount = salesTable_1.netAmount
                                            ? Math.round(parseFloat((salesTable_1.netAmount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                                            : 0;
                                        return [2 /*return*/, App_1.App.SendMail(reqData.custEmail, "Payment Link", template, {
                                                link: reqData.url,
                                                amount: reqData.onlineAmount,
                                                customer: customerRecord,
                                                salesLine: salesLine,
                                                salesTable: salesTable_1,
                                            })];
                                    }
                                    catch (error) {
                                        Log_1.log.error(error);
                                    }
                                    return [2 /*return*/];
                                });
                            }); };
                            promiseList.push(pmail());
                        }
                        if (reqData.status == "PAID" && reqData.paymentType == "ONLINE") {
                            imail = function () { return __awaiter(_this, void 0, void 0, function () {
                                var template, reportData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            template = reqData.lang == "en" ? "email-invoice-en" : "email-invoice-ar";
                                            return [4 /*yield*/, this.allocateInvoiceReportData(reqData, salesLine)];
                                        case 1:
                                            reportData = _a.sent();
                                            try {
                                                console.log(reportData);
                                                return [2 /*return*/, App_1.App.SendMail(reqData.custEmail, "Invoice", template, reportData)];
                                            }
                                            catch (error) {
                                                Log_1.log.error(error);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            promiseList.push(imail());
                        }
                        Promise.all(promiseList);
                        reqData.salesLine = salesLine;
                        returnData = {
                            id: salesTable_1.salesId,
                            message: "SAVED_SUCCESSFULLY",
                            status: reqData.status,
                            url: reqData.url,
                        };
                        console.log("7----------------------------");
                        return [2 /*return*/, returnData];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveReturnOrder = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var salesLine, cond, PrevReturnedData, desinerService, designerServiceData, promiseList, _i, salesLine_7, item, _a, _b, batches, returnData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        salesLine = reqData.salesLine;
                        delete reqData.salesLine;
                        return [4 /*yield*/, this.validate(reqData)];
                    case 1:
                        cond = _c.sent();
                        if (!(cond == true)) return [3 /*break*/, 10];
                        if (!(reqData.transkind == "DESIGNERSERVICERETURN")) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.salestableDAO.find({
                                interCompanyOriginalSalesId: reqData.interCompanyOriginalSalesId,
                            })];
                    case 2:
                        PrevReturnedData = _c.sent();
                        if (!PrevReturnedData) return [3 /*break*/, 3];
                        throw { status: 0, message: "ALREADY_RETURNED" };
                    case 3: return [4 /*yield*/, this.designerServiceDAO.search({
                            invoiceid: reqData.interCompanyOriginalSalesId,
                        })];
                    case 4:
                        desinerService = _c.sent();
                        console.log(desinerService);
                        if (desinerService.length > 1) {
                            throw { status: 0, message: "CAN_NOT_CREATE_RETURN_ORDER_AMOUNT_ALREADY_USED" };
                        }
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this.designerServiceDAO.findOne({
                            invoiceid: reqData.interCompanyOriginalSalesId,
                        })];
                    case 6:
                        designerServiceData = _c.sent();
                        delete designerServiceData.serviceid;
                        designerServiceData.amount = -designerServiceData.amount;
                        designerServiceData.salesorderid = reqData.salesId;
                        return [4 /*yield*/, this.designerServiceDAO.save(designerServiceData)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        promiseList = [];
                        promiseList.push(this.salestableDAO.save(reqData));
                        promiseList.push(this.salesLineDelete(reqData));
                        for (_i = 0, salesLine_7 = salesLine; _i < salesLine_7.length; _i++) {
                            item = salesLine_7[_i];
                            item.batch = [];
                            if (item.salesQty > 0) {
                                delete item.id;
                                item.id = uuid();
                                item.salesId = reqData.salesId;
                                item.createddatetime = new Date(App_1.App.DateNow());
                                item.createdBy = this.sessionInfo.userName;
                                item.numberSequenceGroupId = this.seqNum;
                                item.lastModifiedDate = new Date(App_1.App.DateNow());
                                if (item.batches && item.batches.length > 0) {
                                    for (_a = 0, _b = item.batches; _a < _b.length; _a++) {
                                        batches = _b[_a];
                                        if (batches.returnQuantity > 0) {
                                            batches.itemid = item.itemid;
                                            batches.transrefid = reqData.interCompanyOriginalSalesId;
                                            batches.invoiceid = item.salesId;
                                            batches.qty = reqData.transkind == "PURCHASERETURN" ? -batches.returnQuantity : batches.returnQuantity;
                                            batches.batchno = batches.batchno;
                                            batches.configid = item.configId;
                                            batches.inventsizeid = item.inventsizeid;
                                            batches.dataareaid = this.sessionInfo.dataareaid;
                                            batches.inventlocationid = this.sessionInfo.inventlocationid;
                                            batches.reserveStatus = reqData.transkind;
                                            batches.transactionClosed = false;
                                            batches.dateinvent = new Date(App_1.App.DateNow());
                                            batches.salesLineId = item.id;
                                            // await this.inventTransDAO.save(batches);
                                            item.batch.push({
                                                batchNo: batches.batchno,
                                                quantity: batches.returnQuantity,
                                            });
                                            this.updateInventoryService.sessionInfo = this.sessionInfo;
                                            promiseList.push(this.updateInventoryService.updateInventtransTable(batches));
                                        }
                                    }
                                }
                            }
                            promiseList.push(this.salesLineDAO.save(item));
                        }
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 9:
                        _c.sent();
                        reqData.salesLine = salesLine;
                        returnData = {
                            id: reqData.salesId,
                            message: "SAVED_SUCCESSFULLY",
                            status: reqData.status,
                        };
                        //console.log(returnData);
                        return [2 /*return*/, returnData];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveOrderShipment = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var salesLine, transactionClosed, salesData, checkStatus, cond, promiseList, _i, salesLine_8, item, _a, _b, batches, returnData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        salesLine = reqData.salesLine;
                        delete reqData.salesLine;
                        reqData.interCompanyOriginalSalesId;
                        transactionClosed = false;
                        checkStatus = false;
                        return [4 /*yield*/, this.salestableDAO.findOne({
                                salesId: reqData.interCompanyOriginalSalesId,
                            })];
                    case 1:
                        salesData = _c.sent();
                        if (!salesData) return [3 /*break*/, 3];
                        salesData.status = "SHIPPED";
                        salesData.salesType = 2;
                        return [4 /*yield*/, this.salestableDAO.save(salesData)];
                    case 2:
                        _c.sent();
                        reqData.salesType = 2;
                        reqData.isMovementIn = false;
                        reqData.status = "SHIPPED";
                        transactionClosed = true;
                        _c.label = 3;
                    case 3: return [4 /*yield*/, this.validate(reqData)];
                    case 4:
                        cond = _c.sent();
                        promiseList = [];
                        if (!(cond == true)) return [3 /*break*/, 6];
                        promiseList.push(this.salestableDAO.save(reqData));
                        salesLine = salesLine.filter(function (v) { return v.status == "SHIPPED"; });
                        console.log(salesLine);
                        for (_i = 0, salesLine_8 = salesLine; _i < salesLine_8.length; _i++) {
                            item = salesLine_8[_i];
                            delete item.id;
                            item.id = uuid();
                            item.salesId = reqData.salesId;
                            item.custAccount = reqData.custAccount;
                            item.createddatetime = moment().format();
                            item.createdBy = this.sessionInfo.userName;
                            item.numberSequenceGroupId = this.seqNum;
                            item.lastModifiedDate = new Date(App_1.App.DateNow());
                            item.batch = [];
                            if (item.batches && item.batches.length > 0) {
                                //console.log(item.batches);
                                for (_a = 0, _b = item.batches; _a < _b.length; _a++) {
                                    batches = _b[_a];
                                    if (batches.quantity > 0) {
                                        batches.itemid = item.itemid;
                                        batches.transrefid = reqData.interCompanyOriginalSalesId
                                            ? reqData.interCompanyOriginalSalesId
                                            : reqData.salesId;
                                        batches.invoiceid = reqData.salesId;
                                        batches.qty = -parseInt(batches.quantity);
                                        batches.batchno = batches.batchNo;
                                        batches.configid = item.configId;
                                        batches.inventsizeid = item.inventsizeid;
                                        batches.inventlocationid = reqData.inventLocationId;
                                        batches.dataareaid = reqData.dataareaid;
                                        batches.reserveStatus = reqData.status;
                                        batches.transactionClosed = false;
                                        batches.custvendac = reqData.custAccount;
                                        batches.dateinvent = moment().format();
                                        batches.salesLineId = item.id;
                                        item.batch.push({
                                            batchNo: batches.batchNo,
                                            quantity: batches.quantity,
                                        });
                                        this.updateInventoryService.sessionInfo = this.sessionInfo;
                                        promiseList.push(this.updateInventoryService.updateInventtransTable(batches, false));
                                    }
                                }
                            }
                        }
                        promiseList.push(this.salesLineDAO.save(salesLine));
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 5:
                        _c.sent();
                        returnData = {
                            id: reqData.salesId,
                            message: "SAVED_SUCCESSFULLY",
                            status: reqData.status,
                        };
                        // //console.log(returnData);
                        return [2 /*return*/, returnData];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveOrderReceive = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var salesLine, transactionClosed, salesData, checkStatus, promiseList, transferData, cond, salesTable, batches_6, _i, salesLine_9, item, _a, _b, batches_7, _c, _d, batches_8, returnData;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        salesLine = reqData.salesLine;
                        delete reqData.salesLine;
                        reqData.interCompanyOriginalSalesId;
                        transactionClosed = false;
                        checkStatus = false;
                        promiseList = [];
                        return [4 /*yield*/, this.salestableDAO.findOne({
                                salesId: reqData.interCompanyOriginalSalesId,
                            })];
                    case 1:
                        salesData = _e.sent();
                        if (!salesData) return [3 /*break*/, 3];
                        // salesData.status = "RECEIVED";
                        salesData.salesType = 3;
                        promiseList.push(this.salestableDAO.save(salesData));
                        reqData.salesType = 3;
                        reqData.isMovementIn = true;
                        reqData.status = "RECEIVED";
                        transactionClosed = true;
                        return [4 /*yield*/, this.salestableDAO.findOne({
                                salesId: salesData.interCompanyOriginalSalesId,
                            })];
                    case 2:
                        transferData = _e.sent();
                        if (transferData) {
                            transferData.status = "RECEIVED";
                            promiseList.push(this.salestableDAO.save(transferData));
                        }
                        _e.label = 3;
                    case 3: return [4 /*yield*/, this.validate(reqData)];
                    case 4:
                        cond = _e.sent();
                        if (!(cond == true)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.salestableDAO.save(reqData)];
                    case 5:
                        salesTable = _e.sent();
                        salesLine = salesLine.filter(function (v) { return v.status == "RECEIVED"; });
                        return [4 /*yield*/, this.inventTransDAO.findAll({
                                invoiceid: reqData.interCompanyOriginalSalesId,
                            })];
                    case 6:
                        batches_6 = _e.sent();
                        if (batches_6.length > 0) {
                            salesLine.map(function (v) {
                                v.batches = batches_6.filter(function (b) { return b.configid == v.configId && b.itemid == v.itemid && b.inventsizeid == v.inventsizeid; });
                            });
                        }
                        for (_i = 0, salesLine_9 = salesLine; _i < salesLine_9.length; _i++) {
                            item = salesLine_9[_i];
                            delete item.id;
                            item.id = uuid();
                            item.salesId = reqData.salesId;
                            item.createddatetime = new Date(App_1.App.DateNow());
                            item.lastModifiedDate = new Date(App_1.App.DateNow());
                            item.createdBy = this.sessionInfo.userName;
                            item.numberSequenceGroupId = this.seqNum;
                            item.custAccount = reqData.custAccount;
                            item.batch = [];
                            if (batches_6 && batches_6.length > 0) {
                                //console.log(item.batches);
                                for (_a = 0, _b = item.batches; _a < _b.length; _a++) {
                                    batches_7 = _b[_a];
                                    delete batches_7.id;
                                    batches_7.itemid = item.itemid;
                                    batches_7.transrefid = reqData.interCompanyOriginalSalesId;
                                    batches_7.invoiceid = reqData.salesId;
                                    batches_7.qty = Math.abs(batches_7.qty);
                                    batches_7.batchno = batches_7.batchno;
                                    batches_7.configid = item.configId;
                                    batches_7.inventsizeid = item.inventsizeid;
                                    batches_7.inventlocationid = reqData.inventLocationId;
                                    batches_7.dataareaid = reqData.dataareaid;
                                    batches_7.custvendac = reqData.custAccount;
                                    batches_7.reserveStatus = reqData.status;
                                    batches_7.transactionClosed = false;
                                    batches_7.dateinvent = new Date(App_1.App.DateNow());
                                    batches_7.salesLineId = item.id;
                                    item.batch.push({
                                        batchNo: batches_7.batchno,
                                        quantity: batches_7.qty,
                                    });
                                    this.updateInventoryService.sessionInfo = this.sessionInfo;
                                    promiseList.push(this.updateInventoryService.updateInventtransTable(batches_7, false));
                                }
                            }
                            else {
                                if (item.batches && item.batches.length > 0) {
                                    //console.log(item.batches);
                                    for (_c = 0, _d = item.batches; _c < _d.length; _c++) {
                                        batches_8 = _d[_c];
                                        if (batches_8.quantity > 0) {
                                            delete batches_8.id;
                                            batches_8.itemid = item.itemid;
                                            batches_8.transrefid = reqData.interCompanyOriginalSalesId
                                                ? reqData.interCompanyOriginalSalesId
                                                : reqData.salesId;
                                            batches_8.invoiceid = reqData.salesId;
                                            batches_8.qty = parseInt(batches_8.quantity);
                                            batches_8.batchno = batches_8.batchNo;
                                            batches_8.configid = item.configId;
                                            batches_8.inventsizeid = item.inventsizeid;
                                            batches_8.inventlocationid = reqData.inventLocationId;
                                            batches_8.dataareaid = reqData.dataareaid;
                                            batches_8.custvendac = reqData.custAccount;
                                            batches_8.reserveStatus = reqData.status;
                                            batches_8.transactionClosed = false;
                                            batches_8.dateinvent = new Date(App_1.App.DateNow());
                                            batches_8.salesLineId = item.id;
                                            item.batch.push({
                                                batchNo: batches_8.batchNo,
                                                quantity: batches_8.quantity,
                                            });
                                            this.updateInventoryService.sessionInfo = this.sessionInfo;
                                            promiseList.push(this.updateInventoryService.updateInventtransTable(batches_8, false));
                                        }
                                    }
                                }
                            }
                        }
                        promiseList.push(this.salesLineDAO.save(salesLine));
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 7:
                        _e.sent();
                        returnData = {
                            id: reqData.salesId,
                            message: "SAVED_SUCCESSFULLY",
                            status: reqData.status,
                        };
                        // //console.log(returnData);
                        return [2 /*return*/, returnData];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveInventoryMovementOrder = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var salesLine, transactionClosed, salesData, checkStatus, promiseList, cond, _i, salesLine_10, item, _a, _b, batches, batches, _c, batches_9, batch, returnData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        salesLine = reqData.salesLine;
                        delete reqData.salesLine;
                        reqData.interCompanyOriginalSalesId;
                        transactionClosed = false;
                        checkStatus = false;
                        promiseList = [];
                        switch (reqData.transkind) {
                            case "PURCHASEORDER":
                                reqData.isMovementIn = true;
                                reqData.status = reqData.status ? reqData.status : "PURCHASEORDER";
                                transactionClosed = true;
                                break;
                            default:
                                reqData.interCompanyOriginalSalesId = reqData.salesId;
                        }
                        return [4 /*yield*/, this.validate(reqData)];
                    case 1:
                        cond = _d.sent();
                        if (!(cond == true)) return [3 /*break*/, 9];
                        promiseList.push(this.salestableDAO.save(reqData));
                        if (reqData.status == "CONVERTED") {
                            promiseList.push(this.rawQuery.salesTableInventlocation(reqData.inventLocationId, reqData.salesId));
                        }
                        promiseList.push(this.salesLineDelete(reqData));
                        promiseList.push(this.inventryTransUpdate(reqData));
                        _i = 0, salesLine_10 = salesLine;
                        _d.label = 2;
                    case 2:
                        if (!(_i < salesLine_10.length)) return [3 /*break*/, 7];
                        item = salesLine_10[_i];
                        delete item.id;
                        item.id = uuid();
                        item.salesId = reqData.salesId;
                        item.createddatetime = new Date(App_1.App.DateNow());
                        item.lastModifiedDate = new Date(App_1.App.DateNow());
                        item.createdBy = this.sessionInfo.userName;
                        item.numberSequenceGroupId = this.seqNum;
                        item.batch = [];
                        if (!(item.batches && item.batches.length > 0)) return [3 /*break*/, 3];
                        //console.log(item.batches);
                        for (_a = 0, _b = item.batches; _a < _b.length; _a++) {
                            batches = _b[_a];
                            if (parseInt(batches.quantity) != 0) {
                                batches.itemid = item.itemid;
                                batches.transrefid = reqData.interCompanyOriginalSalesId
                                    ? reqData.interCompanyOriginalSalesId
                                    : reqData.salesId;
                                batches.invoiceid = reqData.salesId;
                                batches.qty = reqData.status == "PURCHASEORDER" ? parseInt(batches.quantity) : parseInt(batches.quantity);
                                batches.batchno = batches.batchNo;
                                batches.configid = item.configId;
                                batches.inventsizeid = item.inventsizeid;
                                batches.inventlocationid = this.sessionInfo.inventlocationid;
                                batches.dataareaid = this.sessionInfo.dataareaid;
                                batches.reserveStatus = reqData.transkind;
                                batches.transactionClosed = transactionClosed;
                                batches.dateinvent = new Date(App_1.App.DateNow());
                                batches.salesLineId = item.id;
                                //console.log(batches);
                                if (reqData.isMovementIn) {
                                    // batches.inventbatch = {
                                    //   inventBatchId: batches.batchNo,
                                    //   itemId: item.itemid,
                                    //   configId: item.configId,
                                    //   description: batches.description,
                                    //   dataAreaId: this.sessionInfo.dataareaid,
                                    //   createdDateTime: new Date(),
                                    //   dateinvent: new Date()
                                    // };
                                    // await this.inventbatchDAO.save(batches.inventbatch);
                                }
                                // await this.inventTransDAO.save(batches);
                                item.batch.push({
                                    batchNo: batches.batchNo,
                                    quantity: batches.quantity,
                                });
                                this.updateInventoryService.sessionInfo = this.sessionInfo;
                                promiseList.push(this.updateInventoryService.updateInventtransTable(batches));
                            }
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.inventTransDAO.findAll({
                            invoiceid: reqData.interCompanyOriginalSalesId,
                        })];
                    case 4:
                        batches = _d.sent();
                        for (_c = 0, batches_9 = batches; _c < batches_9.length; _c++) {
                            batch = batches_9[_c];
                            delete batch.id;
                            batch.transrefid = reqData.interCompanyOriginalSalesId;
                            batch.invoiceid = reqData.salesId;
                            batch.reserveStatus = reqData.transkind;
                            batch.transactionClosed = transactionClosed;
                            batch.inventlocationid = this.sessionInfo.inventlocationid;
                            batch.qty = reqData.isMovementIn ? Math.abs(batch.qty) : -Math.abs(batch.qty);
                            batch.dateinvent = new Date(App_1.App.DateNow());
                            // this.inventTransDAO.save(batch);
                            item.batch.push({
                                batchNo: batch.batchNo,
                                quantity: batch.quantity,
                            });
                            this.updateInventoryService.sessionInfo = this.sessionInfo;
                            promiseList.push(this.updateInventoryService.updateInventtransTable(batch));
                        }
                        _d.label = 5;
                    case 5:
                        promiseList.push(this.salesLineDAO.save(item));
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [4 /*yield*/, Promise.all(promiseList)];
                    case 8:
                        _d.sent();
                        returnData = {
                            id: reqData.salesId,
                            message: "SAVED_SUCCESSFULLY",
                            status: reqData.status,
                        };
                        // //console.log(returnData);
                        return [2 /*return*/, returnData];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.sendForTransferOrderRequest = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var transferorder, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.salestableDAO.entity(reqData.salesId)];
                    case 1:
                        transferorder = _a.sent();
                        transferorder.status = reqData.status ? reqData.status : "REQUESTED";
                        return [4 /*yield*/, this.salestableDAO.save(transferorder)];
                    case 2:
                        transferorder = _a.sent();
                        return [2 /*return*/, {
                                id: transferorder.salesId,
                                message: "REQUESTED",
                                status: transferorder.status,
                            }];
                    case 3:
                        error_12 = _a.sent();
                        throw error_12;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.rejectTransferOrder = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var transferorder, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.salestableDAO.entity(reqData.salesId)];
                    case 1:
                        transferorder = _a.sent();
                        transferorder.status = "REJECTED";
                        return [4 /*yield*/, this.salestableDAO.save(transferorder)];
                    case 2:
                        transferorder = _a.sent();
                        return [2 /*return*/, {
                                id: transferorder.salesId,
                                message: "REJECTED",
                                status: transferorder.status,
                            }];
                    case 3:
                        error_13 = _a.sent();
                        throw error_13;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.dofifo = function (item, status) {
        return __awaiter(this, void 0, void 0, function () {
            var batches, inventory, val_1, _i, inventory_1, batch, _a, inventory_2, batch;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        batches = [];
                        return [4 /*yield*/, this.rawQuery.inventoryOnHand({
                                inventlocationid: this.sessionInfo.inventlocationid,
                                itemId: item.itemid,
                                configid: item.configId,
                                inventsizeid: item.inventsizeid,
                            })];
                    case 1:
                        inventory = _b.sent();
                        console.log("======dofifo=======", inventory);
                        val_1 = parseInt(item.salesQty);
                        console.log("quantity", val_1);
                        for (_i = 0, inventory_1 = inventory; _i < inventory_1.length; _i++) {
                            batch = inventory_1[_i];
                            if (parseInt(batch.availabilty) >= val_1) {
                                batch.quantity = val_1;
                                val_1 = 0;
                                break;
                            }
                            else {
                                batch.quantity = parseInt(batch.availabilty);
                                val_1 -= parseInt(batch.availabilty);
                            }
                        }
                        for (_a = 0, inventory_2 = inventory; _a < inventory_2.length; _a++) {
                            batch = inventory_2[_a];
                            if (batch.quantity > 0) {
                                batch.itemid = item.itemid;
                                batch.transrefid = item.salesId;
                                batch.invoiceid = item.salesId;
                                batch.dataareaid = this.sessionInfo.dataareaid;
                                batch.inventlocationid = this.sessionInfo.inventlocationid;
                                batch.transactionClosed = status == "PAID" || status == "RESERVED" ? true : false;
                                batch.qty = -batch.quantity;
                                batch.reserveStatus = status;
                                batch.dateinvent = new Date(App_1.App.DateNow());
                                // this.inventTransDAO.save(batche);
                                batches.push(batch);
                                // await this.updateInventoryService.updateInventtransTable(batche, true);
                            }
                        }
                        return [4 /*yield*/, batches];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    SalesTableService.prototype.dofifo__ = function (batch, status) {
        return __awaiter(this, void 0, void 0, function () {
            var inventory, FIFObatch, val_1, _i, inventory_3, i, fifob, _a, FIFObatch_1, invent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.rawQuery.getInventTrans({
                            inventlocationid: this.sessionInfo.inventlocationid,
                            itemId: batch.itemid,
                            configid: batch.configid,
                            inventsizeid: batch.inventsizeid,
                        })];
                    case 1:
                        inventory = _b.sent();
                        FIFObatch = [];
                        val_1 = Math.abs(batch.qty);
                        //console.log(val_1);
                        inventory = inventory.filter(function (v) { return v.availabilty > 0; });
                        //console.log(inventory);
                        for (_i = 0, inventory_3 = inventory; _i < inventory_3.length; _i++) {
                            i = inventory_3[_i];
                            fifob = {
                                itemid: batch.itemid,
                                configid: batch.configid,
                                inventsizeid: batch.inventsizeid,
                                invoiceid: batch.invoiceid,
                                transrefid: batch.transrefid,
                                inventlocationid: batch.inventlocationid,
                                batchno: i.batchno,
                                transactionclosed: status == "PAID" || status == "RESERVED" ? true : false,
                                dateinvent: new Date(App_1.App.DateNow()),
                                reserveStatus: status,
                            };
                            if (i.availabilty >= val_1) {
                                fifob.qty = val_1;
                                val_1 = 0;
                                FIFObatch.push(fifob);
                                //console.log(val_1);
                            }
                            else {
                                fifob.qty = val_1;
                                val_1 -= i.availabilty;
                            }
                            if (val_1 == 0) {
                                break;
                            }
                        }
                        _a = 0, FIFObatch_1 = FIFObatch;
                        _b.label = 2;
                    case 2:
                        if (!(_a < FIFObatch_1.length)) return [3 /*break*/, 5];
                        invent = FIFObatch_1[_a];
                        return [4 /*yield*/, this.inventTransDAO.save(invent)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.inventTransDAO.delete(batch)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.groupBy = function (array, f) {
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    };
    SalesTableService.prototype.saveSalesorderToken = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.salesOrderTokensDAO.save(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesTableService.prototype.saveSalesOrderAfterOnlinePayment = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var salesLine, reportData, salesTable, promiseList, _i, salesLine_11, item, pmobileno, customerDetails, userName, imail, returnData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salesLine = reqData.salesLine;
                        return [4 /*yield*/, this.allocateInvoiceReportData(reqData, salesLine)];
                    case 1:
                        reportData = _a.sent();
                        delete reqData.salesLine;
                        reqData.paymentType = reqData.onlineAmount > 0 ? "ONLINE" : "OFFLINE";
                        return [4 /*yield*/, this.salestableDAO.save(reqData)];
                    case 2:
                        salesTable = _a.sent();
                        promiseList = [];
                        promiseList.push(this.inventryTransUpdate(reqData));
                        for (_i = 0, salesLine_11 = salesLine; _i < salesLine_11.length; _i++) {
                            item = salesLine_11[_i];
                            console.log(item);
                            promiseList.push(this.salesLineItemOrder(item, reqData));
                        }
                        promiseList.push(this.saveSalesOrderUpdateVocharDiscount(reqData));
                        if (reqData.mobileNo) {
                            pmobileno = function () { return __awaiter(_this, void 0, void 0, function () {
                                var message, sms;
                                return __generator(this, function (_a) {
                                    message = "  \u0631\u0636\u0627\u0624\u0643\u0645 \u0647\u0648 \u0647\u062F\u0641\u0646\u0627 \u062F\u0647\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0632\u064A\u0631\u0629 \u062C\u0648\u062F\u0629 \u0648\u062C\u0645\u0627\u0644 \u0642\u064A\u0645\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A\u0643\u0645 \u0647\u064A " + reqData.netAmount + " ";
                                    sms = new Sms_1.Sms();
                                    return [2 /*return*/, sms.sendMessage("966", reqData.mobileNo, message)];
                                });
                            }); };
                            promiseList.push(pmobileno());
                        }
                        return [4 /*yield*/, this.rawQuery.getCustomer(reqData.custAccount)];
                    case 3:
                        customerDetails = _a.sent();
                        if (customerDetails.walkincustomer) {
                            promiseList.push(this.saveSalesVisitorData(reqData, customerDetails));
                        }
                        if (reqData.designServiceRedeemAmount > 0) {
                            promiseList.push(this.saveSalesOrderDesignerService(reqData));
                        }
                        userName = this.sessionInfo.userName;
                        promiseList.push(this.saveSalesOrderRedeem(reqData));
                        imail = function () { return __awaiter(_this, void 0, void 0, function () {
                            var template;
                            return __generator(this, function (_a) {
                                template = reqData.lang == "en" ? "email-invoice-en" : "email-invoice-ar";
                                try {
                                    console.log(reportData);
                                    return [2 /*return*/, App_1.App.SendMail(reqData.custEmail, "Invoice", template, reportData)];
                                }
                                catch (error) {
                                    Log_1.log.error(error);
                                }
                                return [2 /*return*/];
                            });
                        }); };
                        promiseList.push(imail());
                        return [4 /*yield*/, Promise.all(promiseList)];
                    case 4:
                        _a.sent();
                        reqData.salesLine = salesLine;
                        returnData = {
                            id: salesTable.salesId,
                            message: "SAVED_SUCCESSFULLY",
                            status: reqData.status,
                            url: reqData.url,
                        };
                        console.log("7----------------------------");
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    SalesTableService.prototype.allocateInvoiceReportData = function (reqData, salesLine) {
        return __awaiter(this, void 0, void 0, function () {
            var reports, sNo, _i, salesLine_12, item, _a, _b, batch, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        reqData.date = new Date(App_1.App.DateNow()).toLocaleDateString();
                        reqData.paymentType = reqData.lang == "en" ? "ONLINE" : "عبر الانترنت";
                        reports = {
                            salesTable: reqData,
                            salesLine: [],
                            quantity: 0,
                        };
                        sNo = 1;
                        _i = 0, salesLine_12 = salesLine;
                        _c.label = 1;
                    case 1:
                        if (!(_i < salesLine_12.length)) return [3 /*break*/, 6];
                        item = salesLine_12[_i];
                        reports.quantity += parseInt(item.salesQty);
                        _a = 0, _b = item.batch;
                        _c.label = 2;
                    case 2:
                        if (!(_a < _b.length)) return [3 /*break*/, 5];
                        batch = _b[_a];
                        data = {
                            productName: item.size.product.nameEn,
                            productNameAr: item.size.product.nameAr,
                            colorantId: item.colorantId,
                            configId: item.configId,
                            colorName: item.color.nameEnglish,
                            sizeName: item.size.nameEnglish,
                            inventsizeid: item.inventsizeid,
                            itemid: item.itemid,
                        };
                        data.sNo = sNo;
                        data.batchNo = batch.batchNo;
                        data.quantity = parseInt(batch.quantity);
                        data.vat = item.vat;
                        data.vatAmount = (parseFloat(item.vatamount) / parseFloat(item.salesQty)) * data.quantity;
                        data.lineTotalDisc = (parseFloat(item.lineTotalDisc) / parseFloat(item.salesQty)) * data.quantity;
                        data.price = parseFloat(item.salesprice);
                        data.productPrice = data.price * data.quantity;
                        data.colorantPrice = parseFloat(item.colorantprice) * data.quantity;
                        data.lineAmountBeforeVat = data.productPrice + data.colorantPrice - data.lineTotalDisc;
                        data.lineAmount = data.lineAmountBeforeVat + data.vatAmount;
                        data.vatAmount = data.vatAmount
                            ? Math.round(parseFloat((data.vatAmount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        data.lineTotalDisc = data.lineTotalDisc
                            ? Math.round(parseFloat((data.lineTotalDisc * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        data.price = data.price
                            ? Math.round(parseFloat((data.price * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        data.productPrice = data.productPrice
                            ? Math.round(parseFloat((data.productPrice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        data.colorantPrice = data.colorantPrice
                            ? Math.round(parseFloat((data.colorantPrice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        data.productPrice = data.productPrice
                            ? Math.round(parseFloat((data.productPrice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        data.lineAmountBeforeVat = data.lineAmountBeforeVat
                            ? Math.round(parseFloat((data.lineAmountBeforeVat * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        data.lineAmount = data.lineAmount
                            ? Math.round(parseFloat((data.lineAmount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
                            : 0;
                        // console.log(data);
                        return [4 /*yield*/, reports.salesLine.push(data)];
                    case 3:
                        // console.log(data);
                        _c.sent();
                        sNo += 1;
                        _c.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [4 /*yield*/, reports];
                    case 7: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    SalesTableService.prototype.calItem = function (item) {
        item.salesprice = item.salesprice
            ? Math.round(parseFloat((item.salesprice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.salesQty = item.salesQty
            ? Math.round(parseFloat((item.salesQty * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.lineAmount = item.lineAmount
            ? Math.round(parseFloat((item.lineAmount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.remainSalesPhysical = item.remainSalesPhysical
            ? Math.round(parseFloat((item.remainSalesPhysical * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.lineTotalDisc = item.lineTotalDisc
            ? Math.round(parseFloat((item.lineTotalDisc * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.colorantprice = item.colorantprice
            ? Math.round(parseFloat((item.colorantprice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.vatamount = item.vatamount
            ? Math.round(parseFloat((item.vatamount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.qtyOrdered = item.qtyOrdered
            ? Math.round(parseFloat((item.qtyOrdered * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.voucherdiscpercent = item.voucherdiscpercent
            ? Math.round(parseFloat((item.voucherdiscpercent * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.voucherdiscamt = item.voucherdiscamt
            ? Math.round(parseFloat((item.voucherdiscamt * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.enddiscamt = item.enddiscamt
            ? Math.round(parseFloat((item.enddiscamt * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.endDisc = item.endDisc
            ? Math.round(parseFloat((item.endDisc * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.multilnPercent = item.multilnPercent
            ? Math.round(parseFloat((item.multilnPercent * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.multilndisc = item.multilndisc
            ? Math.round(parseFloat((item.multilndisc * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.linediscpercent = item.linediscpercent
            ? Math.round(parseFloat((item.linediscpercent * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.linediscamt = item.linediscamt
            ? Math.round(parseFloat((item.linediscamt * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.lineTotalDisc = item.lineTotalDisc
            ? Math.round(parseFloat((item.lineTotalDisc * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.promotiondisc = item.promotiondisc
            ? Math.round(parseFloat((item.promotiondisc * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.instantdiscamt = item.instantdiscamt
            ? Math.round(parseFloat((item.instantdiscamt * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.instantDisc = item.instantDisc
            ? Math.round(parseFloat((item.instantDisc * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        item.vat = item.vat ? Math.round(parseFloat((item.vat * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2) : 0;
    };
    SalesTableService.prototype.calData = function (data) {
        data.sumTax = parseFloat(data.sumTax);
        data.vatamount = parseFloat(data.vatamount);
        data.voucherdiscpercent = data.voucherdiscpercent
            ? Math.round(parseFloat((data.vatamount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        data.redeemAmount = data.redeemAmount
            ? Math.round(parseFloat((data.redeemAmount * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        data.voucherdiscamt = data.voucherdiscamt
            ? Math.round(parseFloat((data.voucherdiscamt * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
        data.redeempts = data.redeempts
            ? Math.round(parseFloat((data.redeempts * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)
            : 0;
    };
    SalesTableService.prototype.searchPainters = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data_1, paintersId_1, query1, painters_1, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log(item);
                        if (!item.inventlocationid) return [3 /*break*/, 3];
                        query = " select st.salesid ,st.salesname,st.painter,\n        ct.namealias as \"customerNameEn\",ct.name as \"customerNameAr\",\n        st.netamount as amount,st.lastmodifieddate\n        from salestable  st \n        inner join custtable ct on\n        ct.accountnum =st.invoiceaccount \n        where st.transkind ='SALESORDER'\n                       and st.inventlocationid ='" + item.inventlocationid + "'\n                       and  COALESCE(st.painter, '') != '' \n                       order by st.lastmodifieddate desc;;\n        ";
                        return [4 /*yield*/, this.salestableDAO.getDAO().query(query)];
                    case 1:
                        data_1 = _a.sent();
                        paintersId_1 = [];
                        data_1.forEach(function (item) {
                            if (item.painter != null && item.painter && item.painter.toString().trim().length > 0) {
                                paintersId_1.push(item.painter);
                            }
                        });
                        paintersId_1 = Array.from(new Set(paintersId_1));
                        query1 = "select ct1.accountnum as \"painterCode\",ct1.\"name\" as \"painterAr\",\n         ct1.namealias as \"painterEn\" \n         from custtable ct1\n         ";
                        if (paintersId_1.length > 0) {
                            query1 += "where ct1.accountnum  in (" + paintersId_1
                                .map(function (painterID) {
                                return "'" + painterID + "'";
                            })
                                .join(",") + ");";
                        }
                        return [4 /*yield*/, this.salestableDAO.getDAO().query(query1)];
                    case 2:
                        painters_1 = _a.sent();
                        data_1.forEach(function (item, index) {
                            var painter = painters_1.find(function (painterObj) {
                                return painterObj.painterCode == item.painter;
                            });
                            if (painter) {
                                data_1[index] = Object.assign({}, data_1[index], painter);
                            }
                        });
                        return [2 /*return*/, data_1];
                    case 3: throw { message: Props_1.Props.INVALID_DATA };
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_14 = _a.sent();
                        throw error_14;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SalesTableService;
}());
exports.SalesTableService = SalesTableService;
