angular.module('App').factory('webAccess',
['$rootScope', '$http', '$q', '$route', '$log',
function ($rootScope, $http, $q, $route, $log) {
    return {
        Get: function (controllerName) {
            return new WebAccess(controllerName);
        }
    };

    function WebAccess(controllerName) {
        this.Get = function () {
            return accessWebServer(controllerName, 'GET', arguments);
        };
        this.Add = function () {
            return accessWebServer(controllerName, 'PUT', arguments);
        };
        this.Update = function () {
            return accessWebServer(controllerName, 'POST', arguments);
        };
        this.Delete = function () {
            return accessWebServer(controllerName, 'DELETE', arguments);
        };
    }

    function accessWebServer(controller, method, args) {

        var deferred = $q.defer();

        var entity = null;
        var completeUrl = "api/" + controller;

        if (args.length > 0) {
            var argsArray = Array.prototype.slice.call(args);
            if (angular.isString(argsArray[0]) || angular.isNumber(argsArray[0])) {
                completeUrl += "/" + argsArray.join("/");
            } else {
                // If it's not an int or string, we're going to pass it to the server
                // as data.  The server shouldn't be expecting data when there isn't any,
                // like for a get.
                entity = argsArray[0];
            }
        }

        //$http.defaults.headers.common.SessionKey = dcCookie.get(dcSessionKey.Get());

        $http({
            method: method,
            url: completeUrl,
            data: entity,
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
        })
            .error(function (data, status, headers, config) {
            var message = "";
            var title = undefined;
            if (status == 500) {
                 //If the message list exists so we need to de-serialize it
                 //This should be working for both the MessageList and ColumnMessageList
                if (angular.isString(data.ExceptionType) && data.ExceptionType.indexOf("MessageList") > -1) {
                    message = angular.fromJson(data.ExceptionMessage);
                } else {
                    if (angular.isString(data.ExceptionType) && data.ExceptionType.indexOf("NotSignedIn") > -1) {
                        $log.error("User has been redirected to the SignIn screen after getting a 'NotSignedIn' message from the server.");
                        dcCookie.delete(dcSessionKey.Get()); // clear this out to prevent additional error messages - we already know that we're not signed in
                        //askForPassword();
                    } else {
                        if (angular.isString(data.ExceptionType) && data.ExceptionType.indexOf("NotAuthorized") > -1) {
                            message = "You are not Authorized to perform this operation.";
                        } else {
                            if (angular.isObject(data)) {
                                if (data.ExceptionMessage) {
                                    if (data.ExceptionMessage.indexOf("No Session Key") > -1) {
                                        //askForPassword();
                                    } else {
                                        message = data.ExceptionMessage;
                                        title = "Application Error:";
                                    }
                                } else {
                                    if (data.Message) {
                                        message = "Server Request Failed with a status of: " + status + "\n\nMessage: " + data.Message + "\n\nMessageDetail: " + data.MessageDetail;
                                    } else {
                                        message = "Server Request Failed with a status of: " + status;
                                    }
                                }
                            }
                        }
                    }
                    if (message.length > 0) {
                        systemError.open(message, title);
                    }
                }
            } else {
                if (status >= 400 && status < 600) {
                    message = "Server Request Failed with a status of: " + status + "\n\nMessage: " + data.Message + "\n\nMessageDetail: " + data.MessageDetail;
                }
                if (status > 0 && message.length < 1) {
                    message = "Unhandled error code: " + status;
                }
                if (message.length > 0) {
                    systemError.open(message, title);
                }
            }
            deferred.reject(message);
        });

        return deferred.promise;
    }

    //function askForPassword() {
     //   signInDialog.open().then(function (result) {
      //      if (result.success) {
       //         dcCookie.set(dcSessionKey.Get(), result.SessionKey);
                // Notify anyone who's interested that the we just signed in.
                // NOTE: Subsribe to this event using: $rootScope.$on("SignedIn", function(){...my process...});
                //       Specific listeners should be the GlobalBar and AppCtrl to load the respective nickname and appBar data on initial sign in.
        //        $rootScope.$emit("SignedIn");
                // This will reload the current page we were working on.  Any changes that were on the page when it
                // timed out will be lost.
          //      $route.reload();
           // } else {
   //             dcCookie.delete(dcSessionKey.Get());
   //         }
  //     });
   // }
}]);