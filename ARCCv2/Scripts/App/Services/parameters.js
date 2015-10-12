// The parameters service is designed to allow a developer to pass data from one controller to another.
// Simply inject it into the sender and reciever, using the appropriate methods to put data in and
// get data out.
angular.module('App').factory('parameters', function () {
    var parameters = {};
    return {
        add: function (name, value) {
            parameters[name] = value;
        },
        get: function (name) {
            return parameters[name];
        },
        delete: function (name) {
            delete parameters[name];
        }
    };
});