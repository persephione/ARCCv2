angular.module('App').factory('dateValidation', [function () {
    // Date Validation : Each function requires that the user pass in a form element for each parameter.
    //                   This allows the service to set the validity values directly, but still needs to return the error messages.
    // NOTE: To set dates that haven't been touched to invalid (CSS shows red border), you may need to add "ng-dirty" to the class for that element.

    var invalidDate = 'Invalid Date';
    var endDateMissing = 'End Date required';
    var startDateMissing = 'Start Date required';
    var dateRangeError = 'Start Date > End Date';

    var validateDateRange = function (startDateElement, endDateElement, requireDatePairs) {
        var result = {
            valid: false,
            startError: '',
            endError: ''
        };

        var startDate = validateDateElement(startDateElement);
        var endDate = validateDateElement(endDateElement);

        if (startDate === false) { // Invalid Date
            setDateError(startDateElement);
            result.startError = invalidDate;
            // wait for both bad date edits before returning
        }

        if (endDate === false) { // Invalid Date
            setDateError(endDateElement);
            result.endError = invalidDate;
            // wait for both bad date edits before returning
        }

        // at least one bad date = invalid response
        if (startDate === false || endDate === false) {
            return result;
        }

        // both dates empty = valid
        if (startDate === null && endDate === null) {
            result.valid = true;
            return result;
        }

        // Only do these edits if both dates are required
        if (requireDatePairs) {
            if (startDate && endDate === null) {
                setDateError(endDateElement);
                result.endError = endDateMissing;
                return result;
            }

            if (startDate === null && endDate) {
                setDateError(startDateElement);
                result.startError = startDateMissing;
                return result;
            }
        }

        // We can only do this edit if both dates are specified, which is now optional
        if (startDate !== null && endDate !== null) {
            if (startDate.getTime() > endDate.getTime()) {
                setDateError(startDateElement);
                setDateError(endDateElement);
                result.startError = result.endError = dateRangeError;
                return result;
            }
        }

        result.valid = true;
        return result;
    };

    var validateDateElement = function (dateElement) {
        if (angular.isUndefined(dateElement.$viewValue) || dateElement.$viewValue === null || dateElement.$viewValue === "") {
            return null;
        }
        var date = new Date(dateElement.$viewValue);
        if (date.toDateString() === "Invalid Date") {
            return false;
        }
        return date;
    };

    var setDateError = function (dateElement) {
        dateElement.$setValidity(dateElement.$name, false);
        dateElement.$dirty = true;
        dateElement.$pristine = false;
    };

    return {
        validateDateRange: function (startDateElement, endDateElement) {
            return validateDateRange(startDateElement, endDateElement);
        },
        validateDateElement: function (dateElement) {
            return validateDateElement(dateElement);
        },
        setDateError: function (dateElement) {
            return setDateError(dateElement);
        }
    };

}]);
