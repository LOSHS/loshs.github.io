"use strict";
var $ = require("jquery");
var Common = (function () {
    function Common() {
        var _this = this;
        this.apiUrl = 'http://192.168.15.8';
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
exports.Common = Common;
