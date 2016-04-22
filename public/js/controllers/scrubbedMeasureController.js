var app = angular.module('inspinia');
app.controller('scrubbedMeasureController',['$scope', '$odataresource','toaster',
    function($scope, $odataresource, toaster){

        $scope.ngData = [];

        function getData(){
            $odataresource("http://windows-10:8888/ChangeMeasure")
                .odata()
            .query(function(data){
                    $scope.ngData = data;
            },
                 function(err) {
                     console.log('There was an error: ', err);
                 }
            )
        }

        getData();

        //$scope.ngData = [
        //    {Measure: "Changes Performed", Value: 50, ID: 1},
        //    {Measure: "Changes Successful", Value: 43, ID: 1},
        //    {Measure: "# Emergency Changes", Value: 27, ID: 1},
        //    {Measure: "% Emergency Changes", Value: 29, ID: 1},
        //    {Measure: "# of Process defect in failed changes", Value: 22, ID: 1},
        //    {Measure: "# of urgent/expedited/aler changes", Value: 43, ID: 1},
        //    {Measure: "% of urgent/expedited/aler changes", Value: 12, ID: 1},
        //    {Measure: "# of unclosed changes", Value: 54, ID: 1},
        //    {Measure: "% of unclosed changes", Value: 33, ID: 1},
        //    {Measure: "% of failed changes", Value: 41, ID: 1},
        //    {Measure: "# Changes lead to major incidents", Value: 48, ID: 1},
        //    {Measure: "# Problems opened", Value: 19, ID: 1}
        //];

        $scope.selectedMeasure = "";
        $scope.selectedValue = "";

        $scope.mySelections = [];

        $scope.showSelection = function(){
            //console.log($scope.mySelections[0]);
            $scope.selectedMeasure = $scope.mySelections[0].MeasureName;
            $scope.selectedValue = $scope.mySelections[0].Value;
        };

        $scope.ngOptions = {
            data: 'ngData',
            selectedItems: $scope.mySelections,
            multiSelect: false,
            columnDefs: [
                {
                    field:'MeasureName',
                    displayName:'Measure'
                },
                {
                    field:'Value',
                    displayName:'Value'
                }
            ]
        };

        $scope.updateRecord = function(){
            var index = $scope.ngData.findIndex(x => x.MeasureName==$scope.selectedMeasure);
            $scope.ngData[index].Value = $scope.selectedValue;
        };

    }]);