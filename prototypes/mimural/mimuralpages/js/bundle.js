(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="jquery.d.ts" />
"use strict";
var Common = (function () {
    function Common() {
    }
    Common.serverUrl = 'http://52.42.83.5';
    Common.makeAPICall = function (data, moduleUrl, method, successCallback, successParams, errorCallback, errorParams) {
        $.ajax({
            url: Common.serverUrl + '/' + moduleUrl,
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
                Contenido: comentario,
                Indice: -1,
                Publicador: null,
                Rol: null
            };
            Common_1.Common.makeAPICall(post, 'publicaciones/nueva', 'POST', _this.SubmitPostSuccess, null, _this.SubmitPostError, null);
        };
        //TODO: Implement datetime filter, to prevent retrieving posts older than the latest visible post
        this.GetLatestPosts = function () {
            Common_1.Common.makeAPICall(null, 'mural', 'GET', _this.PopulatePostsTable, null, _this.GetFeedError, null);
        };
        //prototype is still experimental
        this.PopulatePostsTable = function (recentPosts) {
            $.each(recentPosts, function (recentPostIndex, recentPost) {
                var publicacionFound = false;
                _this.feedPosts().forEach(function (feedPost) {
                    if (!!recentPost.post && recentPost.post.post_id == feedPost.Indice) {
                        publicacionFound = true;
                        return;
                    }
                });
                if (!publicacionFound && !!recentPost.post) {
                    var newPublicacion = {
                        Contenido: recentPost.post.content,
                        Indice: recentPost.post.post_id,
                        Publicador: recentPost.post.poster_name,
                        Rol: ''
                    };
                    _this.feedPosts.push(newPublicacion);
                }
            });
        };
        this.SubmitPostSuccess = function (data) {
            alertify.success('Tu publicacion fue generada');
        };
        this.SubmitPostError = function (data) {
            alertify.error('Hubo un error al publicar tu cosa');
        };
        this.GetFeedError = function (data) {
            alertify.error('Hubo un error al intentar leer tu mural');
        };
        this.feedPosts = ko.observableArray([]);
    }
    return MuralBusiness;
}());
exports.MuralBusiness = MuralBusiness;
$(document).ready(function () {
    var mural = new MuralBusiness();
    debugger;
    mural.GetLatestPosts();
    $('#btnProponer').click(function () {
        var txtPropuesta = $('#txtPropuesta').val();
        mural.SubmitPost(txtPropuesta);
        $('#txtPropuesta').val('');
    });
    ko.applyBindings(mural);
});

},{"./Common":1}]},{},[2])


//# sourceMappingURL=bundle.js.map
