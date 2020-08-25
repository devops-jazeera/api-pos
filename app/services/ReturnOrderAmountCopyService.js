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
var SalesTableDAO_1 = require("../repos/SalesTableDAO");
var RawQuery_1 = require("../common/RawQuery");
var CusttableDAO_1 = require("../repos/CusttableDAO");
var typeorm_1 = require("typeorm");
var ReturnOrderAmountService = /** @class */ (function () {
    function ReturnOrderAmountService() {
        this.salesTableDAO = new SalesTableDAO_1.SalesTableDAO();
        this.rawQuery = new RawQuery_1.RawQuery();
        this.custtableDAO = new CusttableDAO_1.CusttableDAO();
        this.db = typeorm_1.getManager();
    }
    ReturnOrderAmountService.prototype.returnAmount = function (reqData, type) {
        return __awaiter(this, void 0, void 0, function () {
            var salesOrderData, prevReturnOrders, salesOrderDataCopy, customer, condition, salesLine_2, salesLineIds_1, sendForApproval, prevReturnOrderEquals, so_list_1, buyOneGetOneDiscountItems, _loop_1, _i, salesLine_1, item, error, filteredbuyOneGetOneDiscountItems_2, _loop_2, _a, filteredbuyOneGetOneDiscountItems_1, item, state_1, data, returnOrderData, returnData, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 16, , 17]);
                        return [4 /*yield*/, this.salesTableDAO.entity(reqData.salesid.toUpperCase())];
                    case 1:
                        salesOrderData = _b.sent();
                        return [4 /*yield*/, this.salesTableDAO.search({
                                interCompanyOriginalSalesId: reqData.salesid.toUpperCase(),
                            })];
                    case 2:
                        prevReturnOrders = _b.sent();
                        salesOrderDataCopy = JSON.parse(JSON.stringify(salesOrderData));
                        // let prevReturnOrderAmounts: any = await this.rawQuery.getPrevReturnOrderAmount(reqData.salesid.toUpperCase());
                        this.rawQuery.sessionInfo = this.sessionInfo;
                        return [4 /*yield*/, this.rawQuery.getCustomer(salesOrderData.custAccount)];
                    case 3:
                        customer = _b.sent();
                        return [4 /*yield*/, this.rawQuery.workflowconditions(this.sessionInfo.usergroupconfigid)];
                    case 4:
                        condition = _b.sent();
                        salesLine_2 = salesOrderDataCopy.salesLine;
                        delete salesOrderDataCopy.salesLine;
                        salesLineIds_1 = [];
                        sendForApproval = customer.custtype == 1 || customer.custtype == 2 ? true : false;
                        reqData.selectedBatches.map(function (v) {
                            salesLineIds_1.push(v.salesLineId);
                        });
                        return [4 /*yield*/, this.calReturnOrders(prevReturnOrders)];
                    case 5:
                        prevReturnOrderEquals = _b.sent();
                        reqData.selectedBatches = this.groupBy(reqData.selectedBatches, function (item) {
                            return [item.salesLineId];
                        });
                        so_list_1 = [];
                        reqData.selectedBatches.forEach(function (groupitem) {
                            var qty = groupitem.reduce(function (res, item) { return res + parseInt(item.qty); }, 0);
                            var returnQuantity = groupitem.reduce(function (res, item) { return res + parseInt(item.returnQuantity); }, 0);
                            var batches = [];
                            groupitem.map(function (v) {
                                batches.push({ batchno: v.batchno, returnQuantity: v.returnQuantity });
                            });
                            groupitem[0].qty = Math.abs(qty);
                            groupitem[0].returnQuantity = returnQuantity;
                            groupitem[0].batches = batches;
                            so_list_1.push(__assign({}, groupitem[0]));
                        });
                        reqData.selectedBatches = so_list_1;
                        buyOneGetOneDiscountItems = [];
                        salesLine_2.map(function (item) {
                            item.salesOrderQuantity = salesLine_2
                                .filter(function (v) { return v.linkId == item.linkId; })
                                .reduce(function (res, d) { return res + parseInt(d.salesQty); }, 0);
                            item.selectedQuantity = salesLine_2
                                .filter(function (v) { return v.linkId == item.linkId && v.isItemFree == false; })
                                .reduce(function (res, d) { return res + parseInt(d.salesQty); }, 0);
                            item.freeQuantity = salesLine_2
                                .filter(function (v) { return v.linkId == item.linkId && v.isItemFree == true; })
                                .reduce(function (res, d) { return res + parseInt(d.salesQty); }, 0);
                        });
                        _loop_1 = function (item) {
                            var line, prevReturnLine, returnQty, buyOneData, returnQty;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reqData.selectedBatches.find(function (v) { return v.salesLineId == item.id; })];
                                    case 1:
                                        line = _a.sent();
                                        return [4 /*yield*/, prevReturnOrderEquals.salesLine.find(function (v) {
                                                return v.itemid == item.itemid &&
                                                    v.inventsizeid == item.inventsizeid &&
                                                    v.configId == item.configId &&
                                                    v.colorantId == item.colorantId &&
                                                    v.linkId == item.linkId &&
                                                    v.isItemFree == item.isItemFree;
                                            })];
                                    case 2:
                                        prevReturnLine = _a.sent();
                                        if (line) {
                                            returnQty = prevReturnLine
                                                ? parseInt(prevReturnLine.salesQty) + parseInt(line.returnQuantity)
                                                : parseInt(line.returnQuantity);
                                            item.salesQty -= returnQty;
                                            item.batches = line.batches;
                                            buyOneData = item.appliedDiscounts.find(function (v) { return v.discountType == "BUY_ONE_GET_ONE_DISCOUNT"; });
                                            if (buyOneData) {
                                                buyOneGetOneDiscountItems.push({
                                                    linkId: item.linkId,
                                                    freeItem: item.isItemFree,
                                                    quantity: parseInt(line.returnQuantity),
                                                });
                                            }
                                        }
                                        else {
                                            returnQty = prevReturnLine ? parseInt(prevReturnLine.salesQty) : 0;
                                            item.salesQty -= returnQty;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, salesLine_1 = salesLine_2;
                        _b.label = 6;
                    case 6:
                        if (!(_i < salesLine_1.length)) return [3 /*break*/, 9];
                        item = salesLine_1[_i];
                        return [5 /*yield**/, _loop_1(item)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        error = null;
                        if (!(buyOneGetOneDiscountItems.length > 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.groupBy(buyOneGetOneDiscountItems, function (item) {
                                return [item.linkId, item.freeItem];
                            })];
                    case 10:
                        buyOneGetOneDiscountItems = _b.sent();
                        filteredbuyOneGetOneDiscountItems_2 = [];
                        buyOneGetOneDiscountItems.forEach(function (groupitem) {
                            var quantity = groupitem.reduce(function (res, item) { return res + parseInt(item.quantity); }, 0);
                            groupitem[0].quantity = Math.abs(quantity);
                            filteredbuyOneGetOneDiscountItems_2.push(__assign({}, groupitem[0]));
                        });
                        _loop_2 = function (item) {
                            var d = filteredbuyOneGetOneDiscountItems_2.filter(function (v) { return v.linkId == item.linkId; });
                            if (d.length > 1) {
                                if (d[0].quantity != d[1].quantity) {
                                    error = "PLEASE_ADD_FREE_ITEMS";
                                    return "break";
                                }
                            }
                            else {
                                error = "PLEASE_ADD_FREE_ITEMS";
                                return "break";
                            }
                        };
                        for (_a = 0, filteredbuyOneGetOneDiscountItems_1 = filteredbuyOneGetOneDiscountItems_2; _a < filteredbuyOneGetOneDiscountItems_1.length; _a++) {
                            item = filteredbuyOneGetOneDiscountItems_1[_a];
                            state_1 = _loop_2(item);
                            if (state_1 === "break")
                                break;
                        }
                        _b.label = 11;
                    case 11:
                        if (!(error == null)) return [3 /*break*/, 14];
                        salesOrderDataCopy.salesLine = salesLine_2;
                        return [4 /*yield*/, this.getDiscount(salesOrderDataCopy)];
                    case 12:
                        data = _b.sent();
                        return [4 /*yield*/, this.allocateReturnOrderData(salesOrderData, data, prevReturnOrderEquals, salesLineIds_1)];
                    case 13:
                        returnOrderData = _b.sent();
                        returnData = {
                            grossTotal: parseFloat(returnOrderData.amount),
                            total: parseFloat(returnOrderData.netAmount),
                            discount: parseFloat(returnOrderData.disc),
                            vatPrice: parseFloat(returnOrderData.vatamount),
                        };
                        returnData.returnOrderData = returnOrderData;
                        returnData.designServiceRedeemAmount = returnOrderData.designServiceRedeemAmount;
                        returnData.cashAmount = returnOrderData.cashAmount;
                        returnData.redeemAmount = returnOrderData.redeemAmount;
                        if (returnOrderData.designServiceRedeemAmount > 0) {
                            sendForApproval = true;
                        }
                        else if ((condition.rmApprovalRequired || condition.raApprovalRequired) && sendForApproval) {
                            sendForApproval = true;
                        }
                        else {
                            sendForApproval = false;
                        }
                        returnData.sendForApproval = sendForApproval;
                        return [2 /*return*/, returnData];
                    case 14: throw error;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        err_1 = _b.sent();
                        throw { message: err_1 };
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    ReturnOrderAmountService.prototype.calReturnOrders = function (data) {
        if (data.length > 0) {
            var returnLines_1 = [];
            data.map(function (v) {
                returnLines_1 = returnLines_1.concat(v.salesLine);
            });
            var groupReturnLines = this.groupBy(returnLines_1, function (item) {
                return [
                    item.itemid,
                    item.inventsizeid,
                    item.configId,
                    item.colorantId,
                    item.linkId,
                    item.isItemFree,
                    item.isParent,
                ];
            });
            var lines_list_1 = [];
            groupReturnLines.forEach(function (groupitem) {
                var salesQty = groupitem.reduce(function (res, item) { return res + parseInt(item.salesQty); }, 0);
                var lineAmount = groupitem.reduce(function (res, item) { return res + parseFloat(item.lineAmount); }, 0);
                var lineTotalDisc = groupitem.reduce(function (res, item) { return res + parseFloat(item.lineTotalDisc); }, 0);
                var vatamount = groupitem.reduce(function (res, item) { return res + parseFloat(item.vatamount); }, 0);
                var promotionalDiscount = 0;
                var buyOneGetOneDiscount = 0;
                var totalDiscount = 0;
                var lineDiscount = 0;
                var multilineDiscount = 0;
                var voucherDiscount = 0;
                var sabicCustomerDiscount = 0;
                var InteriorAndExteriorDiscount = 0;
                var instantDisocunt = 0;
                var salesDiscount = 0;
                groupitem.forEach(function (element) {
                    var a = element.appliedDiscounts.find(function (v) { return v.discountType == "PROMOTIONAL_DISCOUNT"; });
                    promotionalDiscount += a ? a.discountAmount : 0;
                    var b = element.appliedDiscounts.find(function (v) { return v.discountType == "BUY_ONE_GET_ONE_DISCOUNT"; });
                    buyOneGetOneDiscount += b ? b.discountAmount : 0;
                    var c = element.appliedDiscounts.find(function (v) { return v.discountType == "TOTAL_DISCOUNT"; });
                    totalDiscount += c ? c.discountAmount : 0;
                    var d = element.appliedDiscounts.find(function (v) { return v.discountType == "LINE_DISCOUNT"; });
                    lineDiscount += d ? d.discountAmount : 0;
                    var e = element.appliedDiscounts.find(function (v) { return v.discountType == "MULTI_LINE_DISCOUNT"; });
                    multilineDiscount += e ? e.discountAmount : 0;
                    var f = element.appliedDiscounts.find(function (v) { return v.discountType == "VOUCHER_DISCOUNT"; });
                    voucherDiscount += f ? f.discountAmount : 0;
                    var g = element.appliedDiscounts.find(function (v) { return v.discountType == "SABIC_CUSTOMER_DISCOUNT"; });
                    sabicCustomerDiscount += g ? g.discountAmount : 0;
                    var h = element.appliedDiscounts.find(function (v) { return v.discountType == "INTERIOR_AND_EXTERIOR"; });
                    InteriorAndExteriorDiscount += h ? h.discountAmount : 0;
                    var i = element.appliedDiscounts.find(function (v) { return v.discountType == "INSTANT_DISCOUNT"; });
                    instantDisocunt += i ? i.discountAmount : 0;
                    var j = element.appliedDiscounts.find(function (v) { return v.discountType == "SALES_DISCOUNT"; });
                    salesDiscount += j ? j.discountAmount : 0;
                });
                groupitem[0].promotionalDiscount = promotionalDiscount;
                groupitem[0].buyOneGetOneDiscount = buyOneGetOneDiscount;
                groupitem[0].totalDiscount = totalDiscount;
                groupitem[0].lineDiscount = lineDiscount;
                groupitem[0].multilineDiscount = multilineDiscount;
                groupitem[0].voucherDiscount = voucherDiscount;
                groupitem[0].sabicCustomerDiscount = sabicCustomerDiscount;
                groupitem[0].InteriorAndExteriorDiscount = InteriorAndExteriorDiscount;
                groupitem[0].instantDisocunt = instantDisocunt;
                groupitem[0].salesDiscount = salesDiscount;
                groupitem[0].salesQty = Math.abs(salesQty);
                groupitem[0].lineAmount = lineAmount;
                groupitem[0].lineTotalDisc = lineTotalDisc;
                groupitem[0].vatamount = vatamount;
                lines_list_1.push(__assign({}, groupitem[0]));
            });
            groupReturnLines = lines_list_1;
            var newData_1 = JSON.parse(JSON.stringify(data[0]));
            newData_1.amount = 0;
            newData_1.netAmount = 0;
            newData_1.disc = 0;
            newData_1.vatamount = 0;
            newData_1.cashAmount = 0;
            newData_1.redeemAmount = 0;
            newData_1.designServiceRedeemAmount = 0;
            delete newData_1.salesLine;
            data.map(function (v) {
                newData_1.amount += v.amount ? parseFloat(v.amount) : 0;
                newData_1.netAmount += v.netAmount ? parseFloat(v.netAmount) : 0;
                newData_1.disc += v.disc ? parseFloat(v.disc) : 0;
                newData_1.vatamount += v.vatamount ? parseFloat(v.vatamount) : 0;
                newData_1.cashAmount += v.cashAmount ? parseFloat(v.cashAmount) : 0;
                newData_1.redeemAmount += v.redeemAmount ? parseFloat(v.redeemAmount) : 0;
                newData_1.designServiceRedeemAmount += v.designerServiceAmount ? parseFloat(v.designServiceRedeemAmount) : 0;
                newData_1.cardAmount += v.cardAmount ? parseFloat(v.cardAmount) : 0;
            });
            newData_1.salesLine = groupReturnLines;
            return newData_1;
        }
        else {
            return { salesLine: [] };
        }
    };
    ReturnOrderAmountService.prototype.getDiscount = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sabicCustomers, INTERIOR_AND_EXTERIOR, _i, _a, item, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        result = void 0;
                        reqData.customerId = reqData.custaccount;
                        reqData.grossTotal = 0;
                        reqData.inventLocationId = this.sessionInfo.inventlocationid;
                        reqData.salesLine.map(function (v) {
                            v.colorantprice = v.colorantprice ? v.colorantprice : 0;
                            reqData.grossTotal += (parseFloat(v.salesprice) + parseFloat(v.colorantprice)) * parseFloat(v.salesQty);
                        });
                        reqData.disc = 0;
                        reqData.vatamount = 0;
                        reqData.instantDiscountChecked = reqData.instantDiscChecked;
                        reqData.voucherDiscountChecked = reqData.voucherDiscChecked;
                        reqData.vat = parseFloat(reqData.sumTax);
                        return [4 /*yield*/, this.sessionInfo.sabiccustomers];
                    case 1:
                        sabicCustomers = _b.sent();
                        INTERIOR_AND_EXTERIOR = false;
                        for (_i = 0, _a = reqData.salesLine; _i < _a.length; _i++) {
                            item = _a[_i];
                            sabicCustomers = item.appliedDiscounts.find(function (v) { return v.discountType == "SABIC_CUSTOMER_DISCOUNT"; });
                            INTERIOR_AND_EXTERIOR = item.appliedDiscounts.find(function (v) { return v.discountType == "INTERIOR_AND_EXTERIOR"; });
                            if (sabicCustomers) {
                                sabicCustomers = true;
                            }
                            else if (INTERIOR_AND_EXTERIOR) {
                                INTERIOR_AND_EXTERIOR = true;
                            }
                            else {
                                sabicCustomers = false;
                                INTERIOR_AND_EXTERIOR = false;
                            }
                        }
                        if (!(reqData.salesLine && reqData.salesLine.length > 0)) return [3 /*break*/, 8];
                        if (!sabicCustomers) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sabicCustomersDiscount(reqData)];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!INTERIOR_AND_EXTERIOR) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.aramkoTahkomDiscount(reqData)];
                    case 4:
                        result = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.calDiscount(reqData)];
                    case 6:
                        result = _b.sent();
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        result = reqData;
                        _b.label = 9;
                    case 9: return [2 /*return*/, result];
                    case 10:
                        error_1 = _b.sent();
                        throw error_1;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ReturnOrderAmountService.prototype.calDiscount = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var isTotalDiscount, isLineDiscount, isMultiLineDiscount, isNoDiscount, multilineDiscRanges, multilineQuantity, multlineDiscItems, total, totalBeforeVat, grossTotal, instantDiscountRanges, isInstantDiscount, isCashDisc, _loop_3, this_1, _i, _a, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reqData.disc = 0;
                        reqData.voucherdiscamt = 0;
                        isTotalDiscount = false;
                        isLineDiscount = false;
                        isMultiLineDiscount = false;
                        isNoDiscount = false;
                        multilineQuantity = 0;
                        multlineDiscItems = [];
                        reqData.salesLine.map(function (v) {
                            var data = v.appliedDiscounts.find(function (v) { return v.discountType == "MULTI_LINE_DISCOUNT"; });
                            if (data) {
                                multlineDiscItems.push(v.itemid);
                            }
                        });
                        reqData.salesLine.map(function (v) {
                            if (multlineDiscItems.includes(v.itemid)) {
                                multilineQuantity += parseInt(v.salesQty);
                            }
                        });
                        total = 0;
                        totalBeforeVat = 0;
                        grossTotal = 0;
                        instantDiscountRanges = [];
                        isInstantDiscount = false;
                        isCashDisc = false;
                        _loop_3 = function (item) {
                            var isValidVoucherItem, instantDiscountPercent, isSalesDiscount, _i, instantDiscountRanges_1, item_1, MultiLineDiscountData, salesDiscount, condition, appliedDiscounts, freeQty, promotionalDiscountAmount, buy_one_get_one, promotionalDiscountDetails, discountAmount, isPromotionDiscount, isBuyOneGetOneDiscount, buyOneGetOneDiscountDetails, selectedQuantity, getFreeQty, discountOnEachItem, freeItems, _a, _b, _c, j, i, itemDiscount, buyOneGetOneDiscountDetails, isNotB1G1;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        item.lineTotalDisc = 0;
                                        item.colorantprice = item.colorantprice ? item.colorantprice : 0;
                                        isValidVoucherItem = item.appliedDiscounts.find(function (v) { return v.discountType == "VOUCHER_DISCOUNT"; });
                                        isValidVoucherItem = isValidVoucherItem ? true : false;
                                        instantDiscountRanges = item.appliedDiscounts.find(function (v) { return v.discountType == "INSTANT_DISCOUNT"; });
                                        isInstantDiscount = instantDiscountRanges ? true : false;
                                        instantDiscountRanges = instantDiscountRanges ? instantDiscountRanges.cond : [];
                                        instantDiscountPercent = 0;
                                        isSalesDiscount = false;
                                        if (instantDiscountRanges.length > 0) {
                                            isInstantDiscount = true;
                                            for (_i = 0, instantDiscountRanges_1 = instantDiscountRanges; _i < instantDiscountRanges_1.length; _i++) {
                                                item_1 = instantDiscountRanges_1[_i];
                                                if (reqData.grossTotal &&
                                                    reqData.grossTotal >= parseFloat(item_1.minamount) &&
                                                    reqData.grossTotal <= parseFloat(item_1.maxamount)) {
                                                    instantDiscountPercent = item_1.discpercent;
                                                    break;
                                                }
                                            }
                                        }
                                        MultiLineDiscountData = item.appliedDiscounts.find(function (v) { return v.discountType == "MULTI_LINE_DISCOUNT"; });
                                        multilineDiscRanges = MultiLineDiscountData ? MultiLineDiscountData.cond : [];
                                        isMultiLineDiscount = MultiLineDiscountData ? true : false;
                                        salesDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "SALES_DISCOUNT"; });
                                        isSalesDiscount = salesDiscount ? true : false;
                                        isTotalDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "TOTAL_DISCOUNT"; });
                                        isTotalDiscount = isTotalDiscount ? true : false;
                                        isLineDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "LINE_DISCOUNT"; });
                                        isLineDiscount = isLineDiscount ? true : false;
                                        condition = (reqData.voucherDiscountChecked && isValidVoucherItem) || reqData.instantDiscountChecked
                                            ? "true"
                                            : "!item.isItemFree";
                                        condition = eval(condition);
                                        item.lineTotalDisc = 0;
                                        appliedDiscounts = [];
                                        if (!condition) return [3 /*break*/, 30];
                                        freeQty = 0;
                                        promotionalDiscountAmount = 0;
                                        buy_one_get_one = 0;
                                        promotionalDiscountDetails = item.appliedDiscounts.find(function (v) { return v.discountType == "PROMOTIONAL_DISCOUNT"; });
                                        discountAmount = promotionalDiscountDetails
                                            ? parseFloat(promotionalDiscountDetails.discountAmount)
                                            : 0;
                                        promotionalDiscountDetails = promotionalDiscountDetails ? promotionalDiscountDetails.cond : [];
                                        isPromotionDiscount = false;
                                        isBuyOneGetOneDiscount = false;
                                        buyOneGetOneDiscountDetails = void 0;
                                        if (!((!reqData.voucherDiscountChecked || isValidVoucherItem == false) && !reqData.instantDiscountChecked)) return [3 /*break*/, 9];
                                        promotionalDiscountDetails = promotionalDiscountDetails.length > 0 ? promotionalDiscountDetails[0] : null;
                                        selectedQuantity = reqData.salesLine
                                            .filter(function (v) { return v.itemid == v.itemid && v.inventsizeid == v.inventsizeid; })
                                            .reduce(function (res, item) { return res + parseInt(item.salesQty); }, 0);
                                        if (promotionalDiscountDetails && item.isParent) {
                                            selectedQuantity -= parseFloat(item.freeQuantity);
                                            getFreeQty = Math.floor(selectedQuantity / parseFloat(promotionalDiscountDetails.multipleQty)) *
                                                parseFloat(promotionalDiscountDetails.freeQty);
                                            isPromotionDiscount = true;
                                            discountOnEachItem = discountAmount / item.freeQuantity;
                                            promotionalDiscountAmount = discountOnEachItem * getFreeQty;
                                        }
                                        if (promotionalDiscountAmount > 0) {
                                            isPromotionDiscount = true;
                                        }
                                        else {
                                            isPromotionDiscount = false;
                                        }
                                        buyOneGetOneDiscountDetails = item.appliedDiscounts.find(function (v) { return v.discountType == "BUY_ONE_GET_ONE_DISCOUNT"; });
                                        buyOneGetOneDiscountDetails = buyOneGetOneDiscountDetails ? buyOneGetOneDiscountDetails.cond[0] : null;
                                        if (buyOneGetOneDiscountDetails) {
                                            if (buyOneGetOneDiscountDetails.multipleQty &&
                                                item.salesQty >= parseFloat(buyOneGetOneDiscountDetails.multipleQty)) {
                                                isBuyOneGetOneDiscount = true;
                                            }
                                        }
                                        if (!(item.appliedDiscounts == [])) return [3 /*break*/, 2];
                                        isNoDiscount = true;
                                        return [4 /*yield*/, this_1.noDiscount(item, reqData)];
                                    case 1:
                                        _d.sent();
                                        total += parseFloat(item.priceAfterVat) * parseInt(item.salesQty);
                                        totalBeforeVat += parseFloat(item.lineamountafterdiscount);
                                        grossTotal += (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(item.salesQty);
                                        _d.label = 2;
                                    case 2:
                                        if (!isBuyOneGetOneDiscount) return [3 /*break*/, 9];
                                        freeItems = reqData.salesLine.filter(function (v) { return v.linkId == item.linkId && v.isItemFree == true; });
                                        _a = [];
                                        for (_b in freeItems)
                                            _a.push(_b);
                                        _c = 0;
                                        _d.label = 3;
                                    case 3:
                                        if (!(_c < _a.length)) return [3 /*break*/, 8];
                                        j = _a[_c];
                                        i = reqData.salesLine.indexOf(freeItems[j]);
                                        reqData.salesLine[i].appliedDiscounts = [];
                                        itemDiscount = parseFloat(reqData.salesLine[i].salesprice) / 2;
                                        buy_one_get_one += parseFloat(itemDiscount) * parseInt(reqData.salesLine[i].salesQty);
                                        reqData.salesLine[i].buyOneGetOneDiscount =
                                            parseFloat(itemDiscount) * parseInt(reqData.salesLine[i].salesQty);
                                        if (!(isCashDisc || isTotalDiscount)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, this_1.totalDiscount(reqData.salesLine[i], reqData)];
                                    case 4:
                                        _d.sent();
                                        if (reqData.salesLine[i].enddiscamt > 0) {
                                            reqData.salesLine[i].appliedDiscounts.push({
                                                discountType: "TOTAL_DISCOUNT",
                                                percentage: parseFloat(reqData.salesLine[i].endDisc),
                                                discountAmount: parseFloat(reqData.salesLine[i].enddiscamt),
                                                cond: [],
                                            });
                                        }
                                        buy_one_get_one -= reqData.salesLine[i].enddiscamt;
                                        _d.label = 5;
                                    case 5: return [4 /*yield*/, this_1.buyOneGetOneDiscount(reqData.salesLine[i], reqData)];
                                    case 6:
                                        _d.sent();
                                        reqData.salesLine[i].appliedDiscounts.push({
                                            discountType: "BUY_ONE_GET_ONE_DISCOUNT",
                                            discountAmount: parseFloat(reqData.salesLine[i].buyOneGetOneDiscount),
                                            cond: [
                                                {
                                                    multipleQty: buyOneGetOneDiscountDetails.multipleQty,
                                                    freeQty: buyOneGetOneDiscountDetails.freeQty,
                                                },
                                            ],
                                        });
                                        reqData.salesLine[i].lineamountafterdiscount = parseFloat(reqData.salesLine[i].priceAfterdiscount);
                                        reqData.salesLine[i].vat = reqData.vat;
                                        reqData.salesLine[i].vatamount =
                                            parseFloat(reqData.salesLine[i].priceAfterdiscount) * (reqData.salesLine[i].vat / 100);
                                        reqData.salesLine[i].priceAfterVat =
                                            parseFloat(reqData.salesLine[i].priceAfterdiscount) + parseFloat(reqData.salesLine[i].vatamount);
                                        total += parseFloat(reqData.salesLine[i].priceAfterVat);
                                        totalBeforeVat += reqData.salesLine[i].lineamountafterdiscount;
                                        grossTotal +=
                                            (parseFloat(reqData.salesLine[i].salesprice) + parseFloat(reqData.salesLine[i].colorantprice)) *
                                                parseInt(reqData.salesLine[i].salesQty);
                                        _d.label = 7;
                                    case 7:
                                        _c++;
                                        return [3 /*break*/, 3];
                                    case 8:
                                        if (buy_one_get_one > 0) {
                                            isBuyOneGetOneDiscount = true;
                                        }
                                        else {
                                            isBuyOneGetOneDiscount = false;
                                        }
                                        _d.label = 9;
                                    case 9:
                                        if (!!isNoDiscount) return [3 /*break*/, 29];
                                        if (!isValidVoucherItem) return [3 /*break*/, 11];
                                        return [4 /*yield*/, this_1.calVoucherDiscount(item, reqData)];
                                    case 10:
                                        _d.sent();
                                        if (item.voucherdiscamt > 0) {
                                            appliedDiscounts.push({
                                                discountType: "VOUCHER_DISCOUNT",
                                                percentage: parseFloat(item.voucherdisc),
                                                discountAmount: parseFloat(item.voucherdiscamt),
                                            });
                                        }
                                        total += parseFloat(item.priceAfterVat);
                                        totalBeforeVat += parseFloat(item.lineamountafterdiscount);
                                        grossTotal += (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(item.salesQty);
                                        return [3 /*break*/, 29];
                                    case 11:
                                        if (!(isInstantDiscount && !isNoDiscount && !isSalesDiscount)) return [3 /*break*/, 13];
                                        return [4 /*yield*/, this_1.calInstantDiscount(reqData, item, instantDiscountPercent)];
                                    case 12:
                                        _d.sent();
                                        total += parseFloat(item.priceAfterVat);
                                        totalBeforeVat += item.lineamountafterdiscount;
                                        grossTotal += (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(item.salesQty);
                                        if (item.instantdiscamt > 0) {
                                            appliedDiscounts.push({
                                                discountType: "INSTANT_DISCOUNT",
                                                percentage: parseFloat(item.instantDisc),
                                                discountAmount: parseFloat(item.instantdiscamt),
                                                cond: instantDiscountRanges,
                                            });
                                        }
                                        return [3 /*break*/, 29];
                                    case 13:
                                        if (!isSalesDiscount) return [3 /*break*/, 15];
                                        return [4 /*yield*/, this_1.calSalesDiscount(item, reqData)];
                                    case 14:
                                        _d.sent();
                                        if (item.salesdiscamt > 0) {
                                            appliedDiscounts.push({
                                                discountType: "SALES_DISCOUNT",
                                                percentage: parseFloat(item.salesdisc),
                                                discountAmount: parseFloat(item.salesdiscamt),
                                            });
                                        }
                                        total += parseFloat(item.priceAfterVat);
                                        totalBeforeVat += parseFloat(item.lineamountafterdiscount);
                                        grossTotal += (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(item.salesQty);
                                        return [3 /*break*/, 29];
                                    case 15:
                                        if (!(!isLineDiscount &&
                                            !isTotalDiscount &&
                                            !isMultiLineDiscount &&
                                            !isPromotionDiscount &&
                                            !isBuyOneGetOneDiscount)) return [3 /*break*/, 17];
                                        return [4 /*yield*/, this_1.noDiscount(item, reqData)];
                                    case 16:
                                        _d.sent();
                                        total += parseFloat(item.priceAfterVat);
                                        totalBeforeVat += parseFloat(item.lineamountafterdiscount);
                                        grossTotal += item.lineAmount;
                                        return [3 /*break*/, 29];
                                    case 17:
                                        if (!(isTotalDiscount && !isNoDiscount)) return [3 /*break*/, 19];
                                        return [4 /*yield*/, this_1.totalDiscount(item, reqData)];
                                    case 18:
                                        _d.sent();
                                        if (item.enddiscamt > 0) {
                                            appliedDiscounts.push({
                                                discountType: "TOTAL_DISCOUNT",
                                                percentage: item.endDisc,
                                                discountAmount: item.enddiscamt,
                                                cond: [],
                                            });
                                        }
                                        _d.label = 19;
                                    case 19:
                                        if (!(isLineDiscount && !isNoDiscount && !isMultiLineDiscount)) return [3 /*break*/, 21];
                                        return [4 /*yield*/, this_1.lineDiscount(item, reqData)];
                                    case 20:
                                        _d.sent();
                                        if (item.linediscamt > 0) {
                                            appliedDiscounts.push({
                                                discountType: "LINE_DISCOUNT",
                                                percentage: parseFloat(item.linediscpercent),
                                                discountAmount: parseFloat(item.linediscamt),
                                                cond: [],
                                            });
                                        }
                                        _d.label = 21;
                                    case 21:
                                        if (!(isMultiLineDiscount && !isNoDiscount)) return [3 /*break*/, 24];
                                        return [4 /*yield*/, this_1.getMultiLinePercent(item, multilineDiscRanges, multilineQuantity)];
                                    case 22:
                                        _d.sent();
                                        return [4 /*yield*/, this_1.multiLineDiscount(item, reqData)];
                                    case 23:
                                        _d.sent();
                                        if (item.multilnPercent > 0) {
                                            appliedDiscounts.push({
                                                discountType: "MULTI_LINE_DISCOUNT",
                                                discountAmount: parseFloat(item.multilndisc),
                                                percentage: parseFloat(item.multilnPercent),
                                                cond: multilineDiscRanges,
                                            });
                                        }
                                        item.multilndisc;
                                        item.multilnPercent;
                                        _d.label = 24;
                                    case 24:
                                        if (!(isPromotionDiscount && !isNoDiscount)) return [3 /*break*/, 26];
                                        if (!(promotionalDiscountAmount > 0)) return [3 /*break*/, 26];
                                        item.promotionalDiscount = promotionalDiscountAmount;
                                        item.supplMultipleQty = promotionalDiscountDetails.multipleQty;
                                        item.supplFreeQty = promotionalDiscountDetails.freeQty;
                                        return [4 /*yield*/, this_1.promotionalDiscount(item, reqData)];
                                    case 25:
                                        _d.sent();
                                        appliedDiscounts.push({
                                            discountType: "PROMOTIONAL_DISCOUNT",
                                            discountAmount: parseFloat(item.promotionalDiscount),
                                            cond: [
                                                {
                                                    multipleQty: promotionalDiscountDetails.multipleQty,
                                                    freeQty: promotionalDiscountDetails.freeQty,
                                                },
                                            ],
                                        });
                                        _d.label = 26;
                                    case 26:
                                        if (!(isBuyOneGetOneDiscount && !isNoDiscount)) return [3 /*break*/, 28];
                                        item.buyOneGetOneDiscount = buy_one_get_one;
                                        return [4 /*yield*/, this_1.buyOneGetOneDiscount(item, reqData)];
                                    case 27:
                                        _d.sent();
                                        appliedDiscounts.push({
                                            discountType: "BUY_ONE_GET_ONE_DISCOUNT",
                                            discountAmount: buy_one_get_one,
                                            cond: [
                                                {
                                                    multipleQty: buyOneGetOneDiscountDetails.multipleQty,
                                                    freeQty: buyOneGetOneDiscountDetails.freeQty,
                                                },
                                            ],
                                        });
                                        _d.label = 28;
                                    case 28:
                                        item.lineamountafterdiscount = parseFloat(item.priceAfterdiscount);
                                        item.vat = reqData.vat;
                                        item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                                        item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                                        total += parseFloat(item.priceAfterVat);
                                        totalBeforeVat += item.lineamountafterdiscount;
                                        grossTotal += (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(item.salesQty);
                                        _d.label = 29;
                                    case 29:
                                        appliedDiscounts.map(function (v) {
                                            v.percentage = v.percentage ? parseFloat(v.percentage) : v.percentage;
                                        });
                                        return [3 /*break*/, 32];
                                    case 30:
                                        if (!item.isItemFree) return [3 /*break*/, 32];
                                        buyOneGetOneDiscountDetails = item.appliedDiscounts.find(function (v) { return v.discountType == "BUY_ONE_GET_ONE_DISCOUNT"; });
                                        isNotB1G1 = buyOneGetOneDiscountDetails ? false : true;
                                        if (!isNotB1G1) return [3 /*break*/, 32];
                                        return [4 /*yield*/, this_1.totalDiscount(item, reqData)];
                                    case 31:
                                        _d.sent();
                                        if (item.enddiscamt > 0) {
                                            appliedDiscounts.push({
                                                discountType: "TOTAL_DISCOUNT",
                                                percentage: item.endDisc,
                                                discountAmount: item.enddiscamt,
                                                cond: [],
                                            });
                                        }
                                        item.lineamountafterdiscount = parseFloat(item.priceAfterdiscount);
                                        item.vat = reqData.vat;
                                        item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                                        item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                                        total += parseFloat(item.priceAfterVat);
                                        totalBeforeVat += item.lineamountafterdiscount;
                                        grossTotal += (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(item.salesQty);
                                        _d.label = 32;
                                    case 32:
                                        item.appliedDiscounts = appliedDiscounts;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = reqData.salesLine;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        item = _a[_i];
                        return [5 /*yield**/, _loop_3(item)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        reqData.netAmount = total;
                        reqData.amount = grossTotal;
                        return [4 /*yield*/, this.calData(reqData)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, reqData];
                }
            });
        });
    };
    ReturnOrderAmountService.prototype.totalDiscount = function (item, reqData, isFree, getFreeQty) {
        if (isFree === void 0) { isFree = false; }
        if (getFreeQty === void 0) { getFreeQty = null; }
        return __awaiter(this, void 0, void 0, function () {
            var multiplyQty, totalPercentage;
            return __generator(this, function (_a) {
                multiplyQty = getFreeQty ? getFreeQty : item.salesQty;
                totalPercentage = item.appliedDiscounts.find(function (v) { return v.discountType == "TOTAL_DISCOUNT"; });
                totalPercentage = totalPercentage ? totalPercentage.percentage : 0;
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(multiplyQty);
                item.endDisc = parseFloat(totalPercentage);
                item.enddiscamt =
                    (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) *
                        parseInt(multiplyQty) *
                        (parseFloat(totalPercentage) / 100);
                item.priceAfterdiscount =
                    (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * parseInt(multiplyQty) -
                        parseFloat(item.enddiscamt);
                if (isFree != true) {
                    item.lineTotalDisc = item.lineTotalDisc ? item.lineTotalDisc : 0;
                    item.lineTotalDisc += item.enddiscamt;
                    reqData.disc += parseFloat(item.enddiscamt);
                }
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.lineDiscount = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var linePercentage;
            return __generator(this, function (_a) {
                linePercentage = item.appliedDiscounts.find(function (v) { return v.discountType == "LINE_DISCOUNT"; });
                linePercentage = linePercentage ? linePercentage.percentage : 0;
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.linediscpercent = parseFloat(linePercentage);
                item.linediscamt = parseFloat(item.salesprice) * parseInt(item.salesQty) * (parseFloat(linePercentage) / 100);
                item.priceAfterdiscount =
                    (parseFloat(item.priceAfterdiscount)
                        ? parseFloat(item.priceAfterdiscount) - parseFloat(item.linediscamt)
                        : (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty) -
                        parseFloat(item.linediscamt);
                item.lineTotalDisc = item.lineTotalDisc ? item.lineTotalDisc : 0;
                item.lineTotalDisc += parseFloat(item.linediscamt);
                reqData.disc += parseFloat(item.linediscamt);
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.multiLineDiscount = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var productPrice;
            return __generator(this, function (_a) {
                item.multilnPercent = item.multilnPercent ? parseFloat(item.multilnPercent) : 0;
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.multilndisc = parseFloat(item.salesprice) * parseInt(item.salesQty) * (parseFloat(item.multilnPercent) / 100);
                productPrice = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.priceAfterdiscount = item.priceAfterdiscount
                    ? parseFloat(item.priceAfterdiscount) - parseFloat(item.multilndisc)
                    : productPrice - parseFloat(item.multilndisc);
                item.lineTotalDisc = item.lineTotalDisc ? item.lineTotalDisc : 0;
                item.lineTotalDisc += item.multilndisc;
                reqData.disc += parseFloat(item.multilndisc);
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.buyOneGetOneDiscount = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.priceAfterdiscount = parseFloat(item.priceAfterdiscount)
                    ? parseFloat(item.priceAfterdiscount) - parseFloat(item.buyOneGetOneDiscount)
                    : (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty -
                        parseFloat(item.buyOneGetOneDiscount);
                item.lineTotalDisc = item.lineTotalDisc ? item.lineTotalDisc : 0;
                item.lineTotalDisc += parseFloat(item.buyOneGetOneDiscount);
                reqData.disc += parseFloat(item.buyOneGetOneDiscount);
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.promotionalDiscount = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.priceAfterdiscount = parseFloat(item.priceAfterdiscount)
                    ? parseFloat(item.priceAfterdiscount) - item.promotionalDiscount
                    : (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty - item.promotionalDiscount;
                item.lineTotalDisc = item.lineTotalDisc ? item.lineTotalDisc : 0;
                item.lineTotalDisc += parseFloat(item.promotionalDiscount);
                reqData.disc += parseFloat(item.promotionalDiscount);
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.calVoucherDiscount = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var voucherDiscount;
            return __generator(this, function (_a) {
                voucherDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "VOUCHER_DISCOUNT"; });
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.voucherdisc = voucherDiscount ? parseFloat(voucherDiscount.percentage) : 0;
                item.voucherdiscamt = parseFloat(item.salesprice) * item.salesQty * (item.voucherdisc / 100);
                item.priceAfterdiscount =
                    (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty - parseFloat(item.voucherdiscamt);
                item.vat = reqData.vat;
                item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                item.lineTotalDisc = item.lineTotalDisc ? parseFloat(item.lineTotalDisc) : 0;
                item.lineTotalDisc += item.voucherdiscamt;
                reqData.disc += parseFloat(item.voucherdiscamt);
                reqData.voucherdiscamt += item.voucherdiscamt;
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.calSalesDiscount = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var salesDiscount;
            return __generator(this, function (_a) {
                salesDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "SALES_DISCOUNT"; });
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.salesdisc = salesDiscount ? parseFloat(salesDiscount.discount) : 0;
                item.salesdiscamt = parseFloat(item.salesprice) * item.salesQty * (parseFloat(salesDiscount.discount) / 100);
                item.priceAfterdiscount =
                    (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty - parseFloat(item.salesdiscamt);
                item.vat = reqData.vat;
                item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                item.lineTotalDisc = item.lineTotalDisc ? parseFloat(item.lineTotalDisc) : 0;
                item.lineTotalDisc += item.salesdiscamt;
                reqData.disc += parseFloat(item.salesdiscamt);
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.calInstantDiscount = function (reqData, item, discount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.instantDisc = discount;
                item.instantdiscamt = parseFloat(item.salesprice) * item.salesQty * (discount / 100);
                item.priceAfterdiscount =
                    (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty - parseFloat(item.instantdiscamt);
                item.lineamountafterdiscount = parseFloat(item.priceAfterdiscount);
                item.vat = reqData.vat;
                item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                item.lineTotalDisc = item.lineTotalDisc ? parseFloat(item.lineTotalDisc) : 0;
                item.lineTotalDisc += item.instantdiscamt;
                reqData.disc += parseFloat(item.instantdiscamt);
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.sabicCustomersDiscount = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var total, grossTotal, totalPercentage, _i, _a, item, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        total = 0;
                        grossTotal = 0;
                        totalPercentage = 0;
                        reqData.disc = reqData.disc ? reqData.disc : 0;
                        for (_i = 0, _a = reqData.salesLine; _i < _a.length; _i++) {
                            item = _a[_i];
                            item.colorantprice = item.colorantprice ? item.colorantprice : 0;
                            item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                            data = item.appliedDiscounts.find(function (v) { return v.discountType == "SABIC_CUSTOMER_DISCOUNT"; });
                            totalPercentage = data ? parseFloat(data.percentage) : 0;
                            item.sabicCustomerDiscount = parseFloat(item.salesprice) * item.salesQty * (parseFloat(totalPercentage) / 100);
                            item.priceAfterdiscount =
                                (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty -
                                    parseFloat(item.sabicCustomerDiscount);
                            item.vat = parseFloat(reqData.vat);
                            item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                            item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                            item.lineTotalDisc = item.sabicCustomerDiscount;
                            total += parseFloat(item.priceAfterVat);
                            grossTotal += item.lineAmount;
                            reqData.disc += parseFloat(item.sabicCustomerDiscount);
                            item.appliedDiscounts = [
                                {
                                    discountType: "SABIC_CUSTOMER_DISCOUNT",
                                    percentage: parseFloat(totalPercentage),
                                    discountAmount: parseFloat(item.sabicCustomerDiscount),
                                },
                            ];
                        }
                        reqData.netAmount = total;
                        reqData.amount = grossTotal;
                        return [4 /*yield*/, this.calData(reqData)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, reqData];
                }
            });
        });
    };
    ReturnOrderAmountService.prototype.aramkoTahkomDiscount = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var total, grossTotal, totalPercentage, _i, _a, item, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        total = 0;
                        grossTotal = 0;
                        totalPercentage = 0;
                        reqData.disc = reqData.disc ? reqData.disc : 0;
                        for (_i = 0, _a = reqData.salesLine; _i < _a.length; _i++) {
                            item = _a[_i];
                            data = item.appliedDiscounts.find(function (v) { return v.discountType == "INTERIOR_AND_EXTERIOR"; });
                            item.colorantprice = item.colorantprice ? item.colorantprice : 0;
                            item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                            totalPercentage = data ? parseFloat(data.percentage) : 0;
                            item.aramkoTahkomDiscount = parseFloat(item.salesprice) * item.salesQty * (parseFloat(totalPercentage) / 100);
                            item.priceAfterdiscount =
                                (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty -
                                    parseFloat(item.aramkoTahkomDiscount);
                            item.vat = parseFloat(reqData.vat);
                            item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                            item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                            item.lineTotalDisc = item.lineTotalDisc ? parseFloat(item.lineTotalDisc) : 0;
                            item.lineTotalDisc = item.aramkoTahkomDiscount;
                            total += parseFloat(item.priceAfterVat);
                            grossTotal += item.lineAmount;
                            reqData.disc += parseFloat(item.aramkoTahkomDiscount);
                            item.appliedDiscounts = [
                                {
                                    discountType: "INTERIOR_AND_EXTERIOR",
                                    percentage: parseFloat(totalPercentage),
                                    discountAmount: parseFloat(item.aramkoTahkomDiscount),
                                },
                            ];
                        }
                        reqData.netAmount = total;
                        reqData.amount = grossTotal;
                        return [4 /*yield*/, this.calData(reqData)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, reqData];
                }
            });
        });
    };
    ReturnOrderAmountService.prototype.noDiscount = function (item, reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                item.lineAmount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.priceAfterdiscount = (parseFloat(item.salesprice) + parseFloat(item.colorantprice)) * item.salesQty;
                item.lineamountafterdiscount = parseFloat(item.priceAfterdiscount);
                item.vat = reqData.vat;
                item.vatamount = parseFloat(item.priceAfterdiscount) * (item.vat / 100);
                item.priceAfterVat = parseFloat(item.priceAfterdiscount) + parseFloat(item.vatamount);
                item.lineTotalDisc += item.lineTotalDisc ? parseFloat(item.lineTotalDisc) : 0;
                reqData.disc += 0;
                return [2 /*return*/];
            });
        });
    };
    ReturnOrderAmountService.prototype.getMultiLinePercent = function (line, multilineDiscRanges, quantity) {
        var percent = 0;
        var conditionQuantity = 0;
        line.multilnPercent = 0;
        for (var _i = 0, multilineDiscRanges_1 = multilineDiscRanges; _i < multilineDiscRanges_1.length; _i++) {
            var element = multilineDiscRanges_1[_i];
            conditionQuantity = parseInt(element.quantityamount);
            percent = parseFloat(element.percent1);
            if (quantity >= conditionQuantity && quantity <= parseInt(element.quantityamount)) {
                line.multilnPercent = percent;
                line.multilineDiscRanges = multilineDiscRanges;
            }
            else if (quantity > conditionQuantity) {
                line.multilnPercent = percent;
                line.multilineDiscRanges = multilineDiscRanges;
            }
        }
    };
    ReturnOrderAmountService.prototype.groupBy = function (array, f) {
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
    ReturnOrderAmountService.prototype.calData = function (reqData) {
        reqData.vatamount = 0;
        reqData.vat = parseFloat(reqData.vat);
        for (var _i = 0, _a = reqData.salesLine; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.vat = parseFloat(ele.vat);
            reqData.vatamount += ele.vatamount;
        }
        reqData.vatamount = reqData.vatamount;
        reqData.disc = reqData.disc;
        reqData.netAmount = reqData.netAmount;
        reqData.amount = reqData.amount;
    };
    ReturnOrderAmountService.prototype.allocateReturnOrderData = function (salesOrderData, returnOrderData, prevReturnOrderEquals, salesLineIds) {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, cashAmount, redeemAmount, designServiceRedeemAmount, returnNetAmount, salesLine, _loop_4, this_2, _i, _a, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        returnData = this.allocateSalesTableData(salesOrderData, "RETURNORDER");
                        cashAmount = 0;
                        redeemAmount = 0;
                        designServiceRedeemAmount = 0;
                        returnNetAmount = 0;
                        returnData.cashAmount = parseFloat(returnData.cashAmount);
                        if (prevReturnOrderEquals) {
                            returnData.amount -= prevReturnOrderEquals.amount ? parseFloat(prevReturnOrderEquals.amount) : 0;
                            returnData.netAmount -= prevReturnOrderEquals.netAmount ? parseFloat(prevReturnOrderEquals.netAmount) : 0;
                            returnData.disc -= prevReturnOrderEquals.disc ? parseFloat(prevReturnOrderEquals.disc) : 0;
                            returnData.vatamount -= prevReturnOrderEquals.vatamount ? parseFloat(prevReturnOrderEquals.vatamount) : 0;
                            returnData.cashAmount += parseFloat(returnData.cardAmount);
                            returnData.cashAmount -= prevReturnOrderEquals.cashAmount ? parseFloat(prevReturnOrderEquals.cashAmount) : 0;
                            returnData.designerServiceAmount -= prevReturnOrderEquals.designerServiceAmount
                                ? parseFloat(prevReturnOrderEquals.designerServiceAmount)
                                : 0;
                            returnData.cardAmount = 0;
                            returnData.redeemAmount -= prevReturnOrderEquals.redeemAmount
                                ? parseFloat(prevReturnOrderEquals.redeemAmount)
                                : 0;
                        }
                        designServiceRedeemAmount = returnData.designerServiceAmount;
                        returnData.amount -= parseFloat(returnOrderData.amount);
                        returnData.netAmount -= parseFloat(returnOrderData.netAmount);
                        returnData.disc -= parseFloat(returnOrderData.disc);
                        returnData.vatamount -= parseFloat(returnOrderData.vatamount);
                        returnNetAmount = returnData.netAmount;
                        if (parseFloat(returnData.cashAmount) >= returnNetAmount) {
                            returnData.cashAmount = returnNetAmount;
                            returnNetAmount = 0;
                        }
                        else {
                            returnNetAmount -= parseFloat(returnData.cashAmount);
                        }
                        if (returnNetAmount > 0) {
                            if (designServiceRedeemAmount >= returnNetAmount) {
                                returnData.designerServiceAmount -= returnNetAmount;
                                returnNetAmount = 0;
                            }
                            else {
                                returnNetAmount -= returnData.designerServiceAmount;
                            }
                        }
                        if (returnNetAmount > 0) {
                            redeemAmount = returnNetAmount;
                        }
                        returnData.cashAmount = parseFloat(returnData.cashAmount);
                        returnData.designerServiceAmount = parseFloat(returnData.designerServiceAmount);
                        returnData.cardAmount = 0;
                        returnData.redeemAmount = parseFloat(returnData.redeemAmount);
                        salesLine = [];
                        _loop_4 = function (item) {
                            var line, prevReturnLine, salesOrderLine, promotionalDiscount, buyOneGetOneDiscount, totalDiscount, lineDiscount, multilineDiscount, voucherDiscount, sabicCustomerDiscount, InteriorAndExteriorDiscount, instantDisocunt, salesDiscount, discount, discount, discount, discount, discount, discount, discount, discount, discount, discount;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!salesLineIds.includes(item.id)) return [3 /*break*/, 2];
                                        line = {};
                                        return [4 /*yield*/, this_2.allocateReturnItem(item)];
                                    case 1:
                                        line = _a.sent();
                                        prevReturnLine = prevReturnOrderEquals.salesLine.find(function (v) {
                                            return v.itemid == item.itemid &&
                                                v.inventsizeid == item.inventsizeid &&
                                                v.configId == item.configId &&
                                                v.colorantId == item.colorantId &&
                                                v.linkId == item.linkId &&
                                                v.isItemFree == item.isItemFree;
                                        });
                                        salesOrderLine = returnOrderData.salesLine.find(function (v) {
                                            return v.itemid == item.itemid &&
                                                v.inventsizeid == item.inventsizeid &&
                                                v.configId == item.configId &&
                                                v.colorantId == item.colorantId &&
                                                v.linkId == item.linkId &&
                                                v.isItemFree == item.isItemFree;
                                        });
                                        if (salesOrderLine) {
                                            line.salesQty -= parseFloat(salesOrderLine.salesQty);
                                            line.lineAmount -= parseFloat(salesOrderLine.lineAmount);
                                            line.lineTotalDisc = line.lineTotalDisc ? line.lineTotalDisc : 0;
                                            line.lineTotalDisc -= parseFloat(salesOrderLine.lineTotalDisc);
                                            line.vatamount -= parseFloat(salesOrderLine.vatamount);
                                            line.batches = salesOrderLine.batches;
                                            if (prevReturnLine) {
                                                line.lineTotalDisc -= parseFloat(prevReturnLine.lineTotalDisc);
                                                line.vatamount -= parseFloat(prevReturnLine.vatamount);
                                                line.salesQty -= parseFloat(prevReturnLine.salesQty);
                                            }
                                            promotionalDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "PROMOTIONAL_DISCOUNT"; });
                                            buyOneGetOneDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "BUY_ONE_GET_ONE_DISCOUNT"; });
                                            totalDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "TOTAL_DISCOUNT"; });
                                            lineDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "LINE_DISCOUNT"; });
                                            multilineDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "MULTI_LINE_DISCOUNT"; });
                                            voucherDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "VOUCHER_DISCOUNT"; });
                                            sabicCustomerDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "SABIC_CUSTOMER_DISCOUNT"; });
                                            InteriorAndExteriorDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "INTERIOR_AND_EXTERIOR"; });
                                            instantDisocunt = item.appliedDiscounts.find(function (v) { return v.discountType == "INSTANT_DISCOUNT"; });
                                            salesDiscount = item.appliedDiscounts.find(function (v) { return v.discountType == "SALES_DISCOUNT"; });
                                            if (promotionalDiscount) {
                                                promotionalDiscount.discountAmount = parseFloat(promotionalDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "PROMOTIONAL_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    promotionalDiscount.discountAmount -= parseFloat(prevReturnLine.promotionalDiscount);
                                                }
                                                if (discount) {
                                                    promotionalDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(promotionalDiscount);
                                                    }
                                                }
                                            }
                                            if (buyOneGetOneDiscount) {
                                                buyOneGetOneDiscount.discountAmount = parseFloat(buyOneGetOneDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "BUY_ONE_GET_ONE_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    buyOneGetOneDiscount.discountAmount -= parseFloat(prevReturnLine.buyOneGetOneDiscount);
                                                }
                                                if (discount) {
                                                    buyOneGetOneDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(buyOneGetOneDiscount);
                                                    }
                                                }
                                            }
                                            if (totalDiscount) {
                                                totalDiscount.discountAmount = parseFloat(totalDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "TOTAL_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    totalDiscount.discountAmount -= parseFloat(prevReturnLine.totalDiscount);
                                                }
                                                if (discount) {
                                                    totalDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(totalDiscount);
                                                    }
                                                }
                                            }
                                            if (lineDiscount) {
                                                lineDiscount.discountAmount = parseFloat(lineDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "LINE_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    lineDiscount.discountAmount -= parseFloat(prevReturnLine.lineDiscount);
                                                }
                                                if (discount) {
                                                    lineDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(totalDiscount);
                                                    }
                                                }
                                            }
                                            if (multilineDiscount) {
                                                multilineDiscount.discountAmount = parseFloat(multilineDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "MULTI_LINE_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    multilineDiscount.discountAmount -= parseFloat(prevReturnLine.multilineDiscount);
                                                }
                                                if (discount) {
                                                    multilineDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(multilineDiscount);
                                                    }
                                                }
                                            }
                                            if (voucherDiscount) {
                                                voucherDiscount.discountAmount = parseFloat(voucherDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "VOUCHER_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    voucherDiscount.discountAmount -= parseFloat(prevReturnLine.voucherDiscount);
                                                }
                                                if (discount) {
                                                    voucherDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(voucherDiscount);
                                                    }
                                                }
                                            }
                                            if (sabicCustomerDiscount) {
                                                sabicCustomerDiscount.discountAmount = parseFloat(sabicCustomerDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "SABIC_CUSTOMER_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    sabicCustomerDiscount.discountAmount -= parseFloat(prevReturnLine.sabicCustomerDiscount);
                                                }
                                                if (discount) {
                                                    sabicCustomerDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(sabicCustomerDiscount);
                                                    }
                                                }
                                            }
                                            if (InteriorAndExteriorDiscount) {
                                                InteriorAndExteriorDiscount.discountAmount = parseFloat(InteriorAndExteriorDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "INTERIOR_AND_EXTERIOR"; });
                                                if (prevReturnLine) {
                                                    InteriorAndExteriorDiscount.discountAmount -= parseFloat(prevReturnLine.InteriorAndExteriorDiscount);
                                                }
                                                if (discount) {
                                                    InteriorAndExteriorDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(InteriorAndExteriorDiscount);
                                                    }
                                                }
                                            }
                                            if (instantDisocunt) {
                                                instantDisocunt.discountAmount = parseFloat(instantDisocunt.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "INSTANT_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    instantDisocunt.discountAmount -= parseFloat(prevReturnLine.instantDisocunt);
                                                }
                                                if (discount) {
                                                    instantDisocunt.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(instantDisocunt);
                                                    }
                                                }
                                            }
                                            if (salesDiscount) {
                                                salesDiscount.discountAmount = parseFloat(salesDiscount.discountAmount);
                                                discount = salesOrderLine.appliedDiscounts.find(function (v) { return v.discountType == "SALES_DISCOUNT"; });
                                                if (prevReturnLine) {
                                                    salesDiscount.discountAmount -= parseFloat(prevReturnLine.salesDiscount);
                                                }
                                                if (discount) {
                                                    salesDiscount.discountAmount -= parseFloat(discount.discountAmount);
                                                    if (parseFloat(discount.discountAmount) > 0) {
                                                        line.appliedDiscounts.push(salesDiscount);
                                                    }
                                                }
                                            }
                                            salesLine.push(line);
                                        }
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        _i = 0, _a = salesOrderData.salesLine;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        item = _a[_i];
                        return [5 /*yield**/, _loop_4(item)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        returnData.salesLine = salesLine;
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    ReturnOrderAmountService.prototype.allocateSalesTableData = function (salesOrderData, type) {
        return {
            salesName: salesOrderData.salesName,
            custAccount: salesOrderData.custAccount,
            invoiceAccount: salesOrderData.invoiceAccount,
            currencyCode: salesOrderData.currencyCode,
            dataareaid: salesOrderData.dataareaid,
            custGroup: salesOrderData.custGroup,
            priceGroupId: salesOrderData.priceGroupId,
            numberSequenceGroup: salesOrderData.numberSequenceGroup,
            interCompanyOriginalSalesId: salesOrderData.salesId,
            salesGroup: salesOrderData.salesGroup,
            cityCode: salesOrderData.cityCode,
            districtCode: salesOrderData.districtCode,
            latitude: salesOrderData.latitude,
            longitude: salesOrderData.longitude,
            painter: salesOrderData.painter,
            taxGroup: salesOrderData.taxGroup,
            mobileNo: salesOrderData.mobileNo,
            isCash: salesOrderData.isCash,
            payment: salesOrderData.payment,
            sumTax: parseFloat(salesOrderData.sumTax),
            inventLocationId: salesOrderData.inventLocationId,
            region: salesOrderData.region,
            dimension: salesOrderData.dimension,
            dimension2_: salesOrderData.dimension2_,
            dimension3_: salesOrderData.dimension3_,
            dimension4_: salesOrderData.dimension4_,
            dimension5_: salesOrderData.dimension5_,
            salesmanId: salesOrderData.salesmanId,
            dimension7_: salesOrderData.dimension7_,
            dimension8_: salesOrderData.dimension8_,
            transkind: type == "purchasereturn" ? "PURCHASERETURN" : "RETURNORDER",
            status: "CREATED",
            warehouse: salesOrderData.warehouse,
            cashAmount: parseFloat(salesOrderData.cashAmount),
            designServiceRedeemAmount: parseFloat(salesOrderData.designServiceRedeemAmount),
            cardAmount: parseFloat(salesOrderData.cardAmount),
            redeemAmount: parseFloat(salesOrderData.redeemAmount),
            netAmount: parseFloat(salesOrderData.netAmount),
            amount: parseFloat(salesOrderData.amount),
            disc: parseFloat(salesOrderData.disc),
            vatamount: parseFloat(salesOrderData.vatamount),
        };
    };
    ReturnOrderAmountService.prototype.allocateReturnItem = function (item) {
        var returnItem = {};
        returnItem.itemid = item.itemid;
        returnItem.salesprice = parseFloat(item.salesprice);
        returnItem.currencyCode = item.currencyCode;
        returnItem.dataareaid = item.dataareaid;
        returnItem.inventsizeid = item.inventsizeid;
        returnItem.custAccount = item.custAccount;
        returnItem.configId = item.configId;
        returnItem.numberSequenceGroupId = item.numberSequenceGroupId;
        returnItem.inventLocationId = item.inventLocationId;
        returnItem.isItemFree = item.isItemFree;
        returnItem.linkId = item.linkId;
        returnItem.numberSequenceGroupId = item.numberSequenceGroupId;
        returnItem.vat = parseFloat(item.vat);
        returnItem.appliedDiscounts = [];
        returnItem.colorantprice = parseFloat(item.colorantprice);
        returnItem.colorantId = item.colorantId;
        returnItem.taxGroup = item.taxGroup;
        returnItem.taxItemGroup = item.taxItemGroup;
        returnItem.lineTotalDisc = parseFloat(item.lineTotalDisc);
        returnItem.lineAmount = parseFloat(item.lineAmount);
        returnItem.vatamount = parseFloat(item.vatamount);
        returnItem.salesQty = parseInt(item.salesQty);
        returnItem.isParent = item.isParent;
        return returnItem;
    };
    return ReturnOrderAmountService;
}());
exports.ReturnOrderAmountService = ReturnOrderAmountService;
