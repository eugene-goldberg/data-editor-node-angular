'use strict';

var app = angular.module('inspinia');
app.controller('scrubbedMeasureController', ['$scope', '$odataresource', 'toaster', function ($scope, $odataresource, toaster) {

    function popAlert() {
        toaster.pop('success', "Changes Saved", "Your edits have been saved");
        console.log('popping alert');
    }

    $scope.ngData = [];

    function getData() {
        $odataresource("http://windows-10:8888/ChangeMeasure").odata().query(function (data) {
            $scope.ngData = data;
        }, function (err) {
            console.log('There was an error: ', err);
        });
    }

    getData();

    $scope.selectedMeasure = "";
    $scope.selectedValue = "";
    $scope.justification = "";

    $scope.mySelections = [];

    $scope.showSelection = function () {
        //console.log($scope.mySelections[0]);
        $scope.selectedMeasure = $scope.mySelections[0].MeasureName;
        $scope.selectedValue = $scope.mySelections[0].Value;
    };

    $scope.ngOptions = {
        data: 'ngData',
        selectedItems: $scope.mySelections,
        multiSelect: false,
        columnDefs: [{
            field: 'MeasureName',
            displayName: 'Measure'
        }, {
            field: 'Value',
            displayName: 'Value'
        }]
    };

    $scope.updateRecord = function () {
        var index = $scope.ngData.findIndex(function (x) {
            return x.MeasureName == $scope.selectedMeasure;
        });
        $scope.ngData[index].Value = $scope.selectedValue;

        var measure = $odataresource("http://windows-10:8888/ChangeMeasure/", {}, {}, { odatakey: 'ID' });

        measure.odata().filter("ID", $scope.ngData[index].ID).query(function (result) {
            console.log("Everything went ok!");
            console.log($scope.selectedValue);
            result[0].Value = $scope.selectedValue;
            result[0].Justification = $scope.justification;
            result[0].$update();
            popAlert();
        }, function () {
            console.log("Oops, something wrong happened!");
        });
    };
}]);

//# sourceMappingURL=scrubbedMeasureController-compiled.js.map