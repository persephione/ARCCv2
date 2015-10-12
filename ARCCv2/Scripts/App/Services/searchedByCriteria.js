angular.module('App').factory('searchedByCriteria', ['dcDateFilter', function (dcDateFilter) {

    // Create a search criteria item as well as a searched by list item.  This method will also detect if it is part of a pair (IE: ends in 1 or 2)
    // and add the correct text to the searchedByList based on that info.
    var createSearchedByList = function (labels, key, value, searchedBy, selected) {
        if (key.indexOf(2) > -1) {
            // If it's the #2 item, we need to append it to the previous value (if the prevous one was selected)
            var selectedName = key.replace('2', '1');
            var prefixLabel = '';
            if (selected.hasOwnProperty(selectedName)) { // We found that the first part was used, just append the last part
                searchedBy[searchedBy.length - 1] = searchedBy[searchedBy.length - 1] + labels[key] + value;
            } else { // We found that the first part was missing, so we need to add the prefix label and push a new row
                prefixLabel = labels[selectedName];
                searchedBy.push(prefixLabel + labels[key] + value);
            }
        } else {
            searchedBy.push(labels[key] + value);
        }

        if (key.indexOf(1) > -1) { // Make a note that we have found the 1st part of a pair
            selected[key] = key;
        }
    };

    return {
        // Iterate over all the properties in the model search criteria and create the appropriate values
        // for the search criteria on the server. NOTE: CRITERIA PROPERTY NAMES MUST MATCH THE SERVER SEARCH NAMES!!!
        create: function (searchCriteria, labels) {

            var criteriaList = []; // The list of search criteria items
            var searchedByList = []; // The human readable list of the values that were searched on to report to the user on the deposits page
            var itemsSelected = {}; // keeps track of 1st or 2nd date or amt etc.

            for (var key in searchCriteria) {
                if (searchCriteria.hasOwnProperty(key)) { // Checks for user created properties (not part of javascript)
                    var value = searchCriteria[key];
                    if (value !== null) {
                        if (angular.isDate(value)) {
                            createSearchedByList(labels, key, dcDateFilter(value), searchedByList, itemsSelected);
                            criteriaList.push({ Name: key.replace(/\d/g, ''), Value: value });
                            continue;
                        }
                        if (angular.isObject(value)) { // use the Value from the Id/Value pair - REQUIRED FOR OBJECTS!
                            if (value.Value != null && value.Value.length > 0) {
                                createSearchedByList(labels, key, value.Value, searchedByList, itemsSelected);
                                criteriaList.push({ Name: key.replace(/\d/g, ''), Value: value.Id });
                            }
                            continue;
                        }
                        if (angular.isNumber(value)) { // Just process it as a number
                            createSearchedByList(labels, key, value, searchedByList, itemsSelected);
                            criteriaList.push({ Name: key.replace(/\d/g, ''), Value: value });
                            continue;
                        }
                        // If it wasn't an object or number, we need to try to remove any commas
                        value = value.replace(/\,/g, '');
                        if (angular.isNumber(Number(value))) {
                            // Only send the values if they are > 0 - the directive formats empty values as .00
                            // Also, strip the numbers off of the parameter values - the server is depending on the names being the same and in the correct order
                            if (Number(value) > 0) {
                                createSearchedByList(labels, key, value, searchedByList, itemsSelected);
                                criteriaList.push({ Name: key.replace(/\d/g, ''), Value: value });
                                continue;
                            }
                        }
                        if (value.length > 0) {
                            createSearchedByList(labels, key, value, searchedByList, itemsSelected);
                            criteriaList.push({ Name: key.replace(/\d/g, ''), Value: value });
                        }
                    }
                }
            }
            return {
                searchCriteriaList: criteriaList,
                searchCriteriaString: searchedByList.join(" | ")
            };
        }
    };
}]);