// Best working model so far - 9/2/14 (Dave Thresher)
angular.module('App').directive('dcFormatCurrency', [function () {

    String.prototype.splice = function (idx, rem, s) {
        return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
    };

    function isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {

            // local variable to allow parsers and formatters to access them
            var sign = 1;
            var start = 0;
            var end = 0;

            // format and formatWithoutCommas moved inside of directive to allow access to the local variables
            var format = function (modelValue, setdec) {
                if (modelValue === "0.00" || modelValue === 0.00)
                    return "0.00";

                //if editing and number is negative, preserve it here
                if (modelValue < 0) {
                    sign = -1;
                }

                setdec = setdec !== undefined ? setdec : true;
                var intPart = 0;
                var decPart = 0;
                if (modelValue !== null) {
                    if (!angular.isUndefined(modelValue)) {
                        var decimalSplit = modelValue.toString().split(".");
                        intPart = decimalSplit[0];
                        decPart = decimalSplit[1];
                    }

                    intPart = (intPart === "" && setdec) ? "0" : intPart;
                    var startLength = intPart.length; // Save the length to decide where to put the caret
                    if (angular.isString(intPart)) {
                        intPart = intPart.replace(/[^\d]/g, '');
                    }
                    if (intPart.length > 3) {
                        var intDiv = Math.floor(intPart.length / 3);
                        while (intDiv > 0) {
                            var lastComma = intPart.indexOf(",");
                            if (lastComma < 0) {
                                lastComma = intPart.length;
                            }

                            if (lastComma - 3 > 0) {
                                intPart = intPart.splice(lastComma - 3, 0, ",");
                            }
                            intDiv--;
                        }
                    }


                    //  determine the caret position based on if the string grew or shrank
                    if (sign > 0) {
                        if (intPart.length > startLength) {
                            start++;
                        }
                        if (intPart.length < startLength) {
                            start--;
                        }
                    } else {
                        if (intPart.length > startLength) {
                            start = start + 2;
                        }
                        if (intPart.length < startLength) {
                            //start--;
                        }
                    }
                }

                if (decPart === undefined || decPart === null) {
                    if (setdec)
                        decPart = ".00";
                    else
                        decPart = "";
                }
                else {
                    if (setdec) {
                        if (decPart.length > 2)
                            decPart = decPart.slice(0, 2);
                        while (decPart.length < 2) {
                            decPart = decPart + "0";
                        }
                    }
                    decPart = "." + decPart;
                }

                // determine if the sign is positive or negative
                return [sign < 0 ? '-' : '', intPart, decPart].join('');
            };

            var formatWithoutCommas = function (modelValue, setdec) {
                setdec = setdec !== undefined ? setdec : true;
                var decimalSplit = modelValue.toString().split(".");
                var intPart = decimalSplit[0];
                var decPart = decimalSplit[1];

                intPart = (intPart === "" && setdec) ? "0" : intPart;
                intPart = intPart.replace(/[^\d]/g, '');

                if (decPart === undefined || decPart === null) {
                    if (setdec)
                        decPart = ".00";
                    else
                        decPart = "";
                }
                else {
                    if (setdec) {
                        if (decPart.length > 2)
                            decPart = decPart.slice(0, 2);
                        while (decPart.length < 2) {
                            decPart = decPart + "0";
                        }
                    }
                    decPart = "." + decPart;
                }

                // determine if the sign is positive or negative
                return [sign < 0 ? '-' : '', intPart, decPart].join('');
            };

            element.bind('keypress', function (e) {
                var charCode = (typeof e.which === "number") ? e.which : e.keyCode,
                    currentValue = $(this).val();
                start = this.selectionStart;
                end = this.selectionEnd;
                var insertValue = charCode !== 0 ? String.fromCharCode(charCode) : '',
                    charCount = end - start;
                var newValue = currentValue.splice(start, charCount, insertValue);

                if (charCode === 0 || charCode === 8)
                    return;

                // remember if it's a negative number in the local variable so the functions can see
                // that we had the minus sign entered
                if (charCode === 45 || charCode === 109 || charCode === 189) // - (minus)
                {
                    if (start === 0) {
                        sign = -1;
                        return;
                    }
                    e.preventDefault();
                }

                // clear out the sign if there isn't any data
                if (newValue.length < 1) {
                    sign = 1;
                }

                // remember to check if the value is positive or negative
                if (newValue.length > 0 && newValue[0] === '-') {
                    sign = -1;
                } else {
                    sign = 1;
                }

                if (String.fromCharCode(charCode).match(/[^\d.]/g)) {
                    e.preventDefault();
                    return;
                }

                if (currentValue.search(/(.*)\.[0-9][0-9]/) === 0 && (currentValue.length - 3) < start) {
                    e.preventDefault();
                    return;
                }

                if (newValue.split(".").length > 2 && charCode === 46) {
                    e.preventDefault();
                    return;
                }
            });

            $(element).bind('blur paste', function (e) {
                element.val(format($(this).val(), true, sign));
            });

            var skipValidation = function (event, element) {
                if (element.selectionStart !== element.selectionEnd) {
                    return true;
                }
                if (event.keyCode === 37 || event.keyCode === 39) { // Left/Right arrow
                    return true;
                }
            };

            $(element).bind('keyup', function (event) {
                var that = this;
                start = this.selectionStart;
                if (!skipValidation(event, that)) {
                    var value = format($(this).val(), false, sign);
                    element.val(value);
                    this.selectionStart = start;
                    this.selectionEnd = start;
                }
            });

            ctrl.$parsers.unshift(formatWithoutCommas);
            ctrl.$formatters.unshift(format);
        }
    };
}]);