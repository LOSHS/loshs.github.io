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
            dataType: 'json'
        }).done(function (data, status) {
            successCallback(data, successParams);
        }).fail(function (data, status) {
            //do whatever you want with the return data upon successful return
            debugger;
            errorCallback(data, errorParams);
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
            if (!comentario || comentario == '') {
                alertify.error('Escribe una propuesta que no esté vacía.');
                return;
            }
            var post = {
                Contenido: comentario,
                Indice: -1,
                Publicador: null,
                Rol: null,
                EsPost: true,
                Titulo: '',
                Actividades: null,
                Resultados: null,
                Prioridad: null
            };
            Common_1.Common.makeAPICall(post, 'publicaciones/nueva', 'POST', _this.SubmitPostSuccess, null, _this.SubmitPostError, null);
        };
        //TODO: Implement datetime filter, to prevent retrieving posts older than the latest visible post
        this.GetLatestPosts = function (initialLoad) {
            Common_1.Common.makeAPICall(null, 'mural', 'GET', _this.PopulatePostsTable, initialLoad, _this.GetFeedError, null);
        };
        //prototype is still experimental
        this.PopulatePostsTable = function (recentPosts, initialLoad) {
            $.each(recentPosts, function (recentPostIndex, recentPost) {
                var publicacionFound = false;
                _this.feedPosts().forEach(function (feedPost) {
                    if ((!!recentPost.post && recentPost.post.post_id == feedPost.Indice && feedPost.EsPost)
                        || (!!recentPost.action && recentPost.action.action_id == feedPost.Indice && !feedPost.EsPost)) {
                        publicacionFound = true;
                        return;
                    }
                });
                if (!publicacionFound) {
                    var esPost = !!recentPost.post;
                    var newPublicacion = {
                        Contenido: esPost ? recentPost.post.content : recentPost.action.description,
                        Titulo: esPost ? null : recentPost.action.title,
                        Indice: esPost ? recentPost.post.post_id : recentPost.action.action_id,
                        Publicador: esPost ? recentPost.post.poster_name : recentPost.action.poster_name,
                        Rol: esPost ? recentPost.post.poster_role : recentPost.action.poster_role,
                        EsPost: esPost,
                        Actividades: esPost ? null : recentPost.action.tasks,
                        Resultados: esPost ? null : recentPost.action.results,
                        Prioridad: esPost ? recentPost.post.category : recentPost.action.category
                    };
                    if (!!initialLoad) {
                        _this.feedPosts.push(newPublicacion);
                    }
                    else {
                        _this.feedPosts.unshift(newPublicacion);
                    }
                }
            });
        };
        this.SubmitPostSuccess = function (data) {
            alertify.success('Tu publicacion fue generada');
            _this.GetLatestPosts(false);
        };
        this.SubmitPostError = function (data) {
            alertify.error('Hubo un error al publicar tu propuesta.');
        };
        this.GetFeedError = function (data) {
            alertify.error('Hubo un error al intentar leer tu mural.');
        };
        this.feedPosts = ko.observableArray([]);
    }
    return MuralBusiness;
}());
exports.MuralBusiness = MuralBusiness;
$(document).ready(function () {
    var mural = new MuralBusiness();
    mural.GetLatestPosts(true);
    $('#btnProponer').click(function () {
        var txtPropuesta = $('#txtPropuesta').val();
        mural.SubmitPost(txtPropuesta);
        $('#txtPropuesta').val('');
    });
    ko.applyBindings(mural);
});

},{"./Common":1}]},{},[2])


//# sourceMappingURL=bundle.js.map
