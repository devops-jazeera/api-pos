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
var CustTransMaster_1 = require("../../entities/CustTransMaster");
var CustTransMasterDAO = /** @class */ (function () {
    function CustTransMasterDAO() {
        this.dao = typeorm_1.getRepository(CustTransMaster_1.CustTransMaster);
    }
    CustTransMasterDAO.prototype.entity = function (salesId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.findOne(salesId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CustTransMasterDAO.prototype.search = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.find(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CustTransMasterDAO.prototype.getCreditUsed = function (custAccNum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao
                            .createQueryBuilder("CustTransMaster")
                            .where("CustTransMaster.accountnum = '" + custAccNum + "' and CustTransMaster.payment=0")
                            // .select(["overdue.invoiceamount"])
                            .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CustTransMasterDAO.prototype.createOverDue = function (overdue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.save(overdue)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CustTransMasterDAO.prototype.getCreditBalancesUsed = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "select c.creditmax,c.accountnum,(select sum(custtrans.invoiceamount) from (select ctm.accountnum,ctm.invoiceid,ctm.invoiceamount\n            from cust_trans_master ctm \n            where ctm.accountnum =c.accountnum ) as custtrans) as amountcusttrans,\n            (select coalesce(sum(coalesce (finaltable.amt,0)),0) as amount from (select o1.salesid ,o1.invoiceamount ,sum(coalesce (o1.invoiceamount,0) ) over (order by o1.lastmodifieddate asc ) as amt from overdue o1 \n            where o1.invoiceid in(select o.invoiceid from cust_trans_master ctm \n            inner join overdue o \n            on ctm.accountnum =o.accountnum \n            where \n            ctm.accountnum =c.accountnum and\n            ctm.invoiceid!=o.invoiceid \n            and o.duedate::timestamp <=current_date \n            and o.payment =0\n            )) as finaltable) as overdueamount\n            from custtable c \n            where c.accountnum ='" + account + "';";
                        return [4 /*yield*/, this.dao.query(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CustTransMasterDAO;
}());
exports.CustTransMasterDAO = CustTransMasterDAO;
Object.seal(CustTransMasterDAO);
