var app = angular.module('app', []);
app.controller('searchCtrl', function ($scope, $http) {
    $scope.back = true;
    $scope.searchResultState = true;
    $scope.searchBoxState = false;
    $scope.app_id = "0ab49580-c84f-44d4-875f-d83760ea2cfe";
    $scope.getArtistNameFromApi = function (artist_name) {
        $http.get("https://rest.bandsintown.com/artists/" + artist_name + "?app_id=" + $scope.app_id + "")
            .then(function (response) {
                $scope.artist_result = response.data;
                $scope.searchResultState = false;
                $scope.searchBoxState = false;
                // console.log(response.data);
            });
    }
    $scope.getArtistEventsFromApi = function (artist_name) {
        $http.get("https://rest.bandsintown.com/artists/" + artist_name + "/events?app_id=" + $scope.app_id + "")
            .then(function (response) {
                $scope.artist_events = response.data;
                $scope.back = false;
                $scope.searchResultState = true;
                $scope.searchBoxState = true;
                // console.log(response.data);
            });
    }
    $scope.backToResult = function () {
        // $(".event_detail_wrapper").html('');
        $scope.artist_events = [];
        $scope.back = true;
        $scope.searchResultState = false;
        $scope.searchBoxState = false;
    }

    // $scope.enter_listner = addEventListener("keyup", function(event) {
    //     // Number 13 is the "Enter" key on the keyboard
    //     if (event.keyCode === 13) {
    //         // Cancel the default action, if needed
    //         event.preventDefault();
    //         // Trigger the button element with a click
    //         document.getElementById("myBtn").click();
    //     }
    // });
});