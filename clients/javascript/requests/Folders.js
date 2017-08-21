'use strict';

function Folders(apiMethods) {
    this._apiMethods = apiMethods;
}

Folders.prototype = {
    get: function(key, snapshot) {
        if (!snapshot) {
            return this._apiMethods.get('/folder/' + key + '/content');
        }
        else {
            return this._apiMethods.get('/snapshot/' + snapshot + '/folder/' + key + '/content');
        }
    }
}

module.exports = Folders;