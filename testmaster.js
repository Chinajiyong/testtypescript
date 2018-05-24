"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
// import entire SDK
var AWS = require("aws-sdk");
///import { AWS } from 'aws-sdk';
var uuidv4 = require("uuid/v4");
//Credentials
var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;
console.log(credentials);
AWS.config.update({
    region: "us-east-2"
});
//var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
//var s3 = new AWS.S3();
var documentClient = new AWS.DynamoDB.DocumentClient();
var Master = /** @class */ (function () {
    function Master(name) {
        this.Name = name;
        this.Id = uuidv4();
    }
    Master.prototype.Save = function (awsDocuement) {
        return __awaiter(this, void 0, void 0, function () {
            var params, putObjectPromise, p;
            return __generator(this, function (_a) {
                params = {
                    TableName: "TS_LIST",
                    Item: {
                        TS_ID: awsDocuement.Id,
                        TS_NAME: awsDocuement.Name,
                        TS_PROPERTY1: Color[awsDocuement.Property1],
                        TS_PROPERTY2: awsDocuement.Property2,
                        TS_PROPERTY3: awsDocuement.Property3
                        //'TS_PROPERTY4': ts.Property4,
                    }
                };
                putObjectPromise = documentClient.put(params).promise();
                p = putObjectPromise.then(function (data) {
                    return new Promise(function (reslove) {
                        reslove(true);
                    });
                    //return true;
                })["catch"](function (err) {
                    console.log(err);
                    return new Promise(function (reslove) {
                        reslove(false);
                    });
                    //return false;
                });
                return [2 /*return*/, p];
            });
        });
    };
    return Master;
}());
exports.Master = Master;
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name) {
        return _super.call(this, name) || this;
    }
    Object.defineProperty(Child.prototype, "Address", {
        get: function () {
            return this.Property3;
        },
        set: function (address) {
            this.Property3 = address;
        },
        enumerable: true,
        configurable: true
    });
    Child.prototype.Save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                doc = {
                    Id: this.Id,
                    Name: this.Name,
                    Property1: this.Property1,
                    Property2: this.Property2,
                    Property3: this.Address
                };
                return [2 /*return*/, _super.prototype.Save.call(this, doc)];
            });
        });
    };
    return Child;
}(Master));
exports.Child = Child;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["White"] = 3] = "White";
    Color[Color["Purple"] = 4] = "Purple";
})(Color = exports.Color || (exports.Color = {}));
