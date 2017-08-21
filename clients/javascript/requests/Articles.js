'use strict';

function Articles(apiMethods) {
    this._apiMethods = apiMethods;
}

Articles.prototype = {
    _parameters: {},
    get: function(key) {
        return this._apiMethods.get('/articles/' + key);
    },
    list: function(page, pageSize) {
        Object.assign(this._parameters,
            {page: page},
            {pageSize: pageSize}
        );
        return this._apiMethods.get('/articles', this._parameters);
    },
    withTag: function(tag, page, pageSize, unpublished = false) {
        Object.assign(this._parameters,
            {tag: tag},
            {unpublished: unpublished}
        );
        return this.list();
    },
    duringMonth: function(month, year, page, pageSize, unpublished = false) {
        Object.assign(this._parameters,
            {month: month},
            {year: year},
            {unpublished: unpublished}
        );
        return this.list();
    },
    tags: function() {
        return this._apiMethods.get('/articles/summary/tags');
    },
    months: function() {
        return this._apiMethods.get('/articles/summary/months');
    }
};

module.exports = Articles;