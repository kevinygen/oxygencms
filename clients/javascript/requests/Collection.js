'use strict';

function Collection(apiMethods) {
    this._apiMethods = apiMethods;
}

Collection.prototype = {
    get: function(key, snapshot) {
        if (!snapshot) {
            return this._apiMethods.get('/collection/' + key);
        }
        else {
            return this._apiMethods.get('/snapshot/' + snapshot + '/collection/' + key);
        }
    }
}

module.exports = Collection;