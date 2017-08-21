'use strict';

var axios = require('axios');

var requests = {
    content: require('./requests/content'),
    folders: require('./requests/folders'),
    collection: require('./requests/collection'),
    articles: require('./requests/articles')
};

function Oxygen(websiteId, secret) {
    if (!(this instanceof Oxygen)) {
        return new Oxygen(websiteId, secret);
    }

    var connection = this._setupConnection(websiteId, secret);
    var apiMethods = this._apiMethods(connection)

    this.content = new requests.content(apiMethods)
    this.collection = new requests.collection(apiMethods)
    this.articles = new requests.articles(apiMethods)
    this.folders = new requests.folders(apiMethods)
}

Oxygen.prototype = {
    _setupConnection: function (websiteId, secret) {
        return axios.create({
            baseURL: 'https://api.oxygencms.ca',
            auth: {
                username: websiteId,
                password: secret
            }
        });
    },
    _apiMethods: function (connection) {
        return {
            get: function (url, parameters) {
                if (parameters) {
                    url = url + '?';
                    for (var parameter in parameters) {
                        url = url + parameter + '=' + parameters[parameter] + '&';
                    }
                    url = url.slice(0,-1);
                }
                return connection.get(url);
            },
        }
    },
    _camelize: function (str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) return "";
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
      },
    parseResponse: function (response) {
        var data = {}
        for (var index in response.data) {
            var item = response.data[index];

            data[this._camelize(item.Name)] = {}
            for (var field in item.Fields) {
                data[this._camelize(item.Name)][this._camelize(field)] = item.Fields[field]
            }
        }
        return data;
    }
}

module.exports = Oxygen;