"use strict";
var Common_1 = require('./Common');
var MuralBusiness = (function () {
    function MuralBusiness() {
        var _this = this;
        this.SubmitPost = function (comentario) {
            var post = {
                Contenido: comentario
            };
            new Common_1.Common().makeAPICall(post, 'publicaciones/nueva', 'POST', _this.SubmitPostSuccess, null, _this.SubmitPostError, null);
        };
        this.SubmitPostSuccess = function () {
            console.log('yes');
        };
        this.SubmitPostError = function () {
            console.log('yes');
        };
    }
    return MuralBusiness;
}());
exports.MuralBusiness = MuralBusiness;
