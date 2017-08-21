'use strict';

function Content(apiMethods) {
    this._apiMethods = apiMethods;
}

Content.prototype = {
    get: function(key, snapshot) {
        if (!snapshot) {
            return this._apiMethods.get('/content/' + key);
        }
        else {
            return this._apiMethods.get('/snapshot/' + snapshot + '/content/' + key);
        }
    }
}

module.exports = Content;