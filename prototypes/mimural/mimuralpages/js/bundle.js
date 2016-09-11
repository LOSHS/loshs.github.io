(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="jquery.d.ts" />
"use strict";
var Common = (function () {
    function Common() {
    }
    Common.apiUrl = 'http://192.168.15.8';
    Common.makeAPICall = function (data, moduleUrl, method, successCallback, successParams, errorCallback, errorParams) {
        $.ajax({
            url: Common.apiUrl + '/' + moduleUrl,
            type: method,
            data: data,
            jsonp: false,
            jsonpCallback: 'callbackFunction',
            dataType: 'json',
            error: function (data) {
                errorCallback(data, errorParams);
            },
            success: function (data) {
                successCallback(data, successParams);
            }
        });
    };
    return Common;
}());
exports.Common = Common;

},{}],2:[function(require,module,exports){
"use strict";
/// <reference path="jquery.d.ts" />
/// <reference path="alertify.d.ts" />
/// <reference path="knockout.d.ts" />
var Common_1 = require('./Common');
var MuralBusiness = (function () {
    function MuralBusiness() {
        var _this = this;
        this.SubmitPost = function (comentario) {
            var post = {
                Contenido: comentario
            };
            Common_1.Common.makeAPICall(post, 'publicaciones/nueva', 'POST', _this.SubmitPostSuccess, null, _this.SubmitPostError, null);
        };
        //TODO: Implement datetime filter, to prevent retrieving posts older than the latest visible post
        this.GetLatestPosts = function () {
            Common_1.Common.makeAPICall(null, 'publicaciones/get', 'GET', null, null, null, null);
        };
        this.PopulatePostsTable = function (recentPosts) {
            $.each(recentPosts, function (recentPostIndex, recentPost) {
            });
        };
        this.SubmitPostSuccess = function (data) {
            alertify.success('Tu publicacion fue generada');
        };
        this.SubmitPostError = function (data) {
            alertify.success('Tu publicacion fue generada');
            //alertify.error('Hubo un error al publicar tu cosa');
        };
        this.feedPosts = ko.observableArray([]);
    }
    return MuralBusiness;
}());
exports.MuralBusiness = MuralBusiness;
$(document).ready(function () {
    var mural = new MuralBusiness();
    $('#btnProponer').click(function () {
        var txtPropuesta = $('#txtPropuesta').val();
        mural.SubmitPost(txtPropuesta);
        $('#txtPropuesta').val('');
    });
});

},{"./Common":1}]},{},[2])


//# sourceMappingURL=bundle.js.map
