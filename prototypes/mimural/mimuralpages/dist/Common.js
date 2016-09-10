"use strict";
var $ = require("jquery");
var Common = (function () {
    function Common() {
        var _this = this;
        this.apiUrl = '';
        this.makeAPICall = function (data, moduleUrl, method, successCallback, successParams, errorCallback, errorParams) {
            $.ajax({
                url: _this.apiUrl + '/' + moduleUrl,
                type: method,
                data: data,
                dataType: 'jsonp',
                error: function (data) {
                    errorCallback(data, errorParams);
                },
                success: function (data) {
                    successCallback(data, successParams);
                }
            });
        };
    }
    return Common;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Common;
