var app = angular.module('inspinia');
app.controller('scrubbedMeasureController',['$scope', '$odataresource','toaster',
    function($scope, $odataresource, toaster){

        console.log('scrubbed measure controller');

        $scope.title = "NG Grid - Basic Example";

        $scope.ngData = [
            {Measure: "Moroni", Value: 50},
            {Measure: "Teancum", Value: 43},
            {Measure: "Jacob", Value: 27},
            {Measure: "Nephi", Value: 29},
            {Measure: "Joseph", Value: 22},
            {Measure: "Monica", Value: 43},
            {Measure: "Arnold", Value: 12},
            {Measure: "Mark", Value: 54},
            {Measure: "Amelia", Value: 33},
            {Measure: "Jesica", Value: 41},
            {Measure: "John", Value: 48},
            {Measure: "Berg", Value: 19}
        ];

        $scope.selectedMeasure = "";
        $scope.selectedValue = "";

        $scope.mySelections = [];

        $scope.showSelection = function(){
            //console.log($scope.mySelections[0]);
            $scope.selectedMeasure = $scope.mySelections[0].Measure;
            $scope.selectedValue = $scope.mySelections[0].Value;
        };

        $scope.ngOptions = {
            data: 'ngData',
            selectedItems: $scope.mySelections,
            multiSelect: false
        };

        $scope.updateRecord = function(){
            var index = $scope.ngData.findIndex(x => x.Measure==$scope.selectedMeasure);
            $scope.ngData[index].Value = $scope.selectedValue;
        };

    }]);