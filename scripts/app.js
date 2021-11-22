var app = angular.module('app', []);
app.controller('searchCtrl', function ($scope, $http) {
    /*Globl Variables*/
    $scope.back = true;
    $scope.searchResultState = true;
    $scope.searchBoxState = false;
    $scope.app_id = "0ab49580-c84f-44d4-875f-d83760ea2cfe"; /*API KEY*/

    /*Get Artist Name from API*/
    $scope.getArtistNameFromApi = function (artist_name) {
        if ($scope.validateSearch(artist_name)) {
            $http.get("https://rest.bandsintown.com/artists/" + artist_name + "?app_id=" + $scope.app_id + "")
                .then(function (response) {
                    $scope.artist_result = response.data;
                    if (response.data.error === 'Not Found') {
                        $scope.artist_result = [];
                        $scope.searchResultState = true;
                    } else {
                        $scope.searchResultState = false;
                        $scope.searchBoxState = false;
                        window.localStorage.setItem(artist_name, JSON.stringify($scope.artist_result));
                    }
                });
        }
    }
    /*Get Artist Events from API*/
    $scope.getArtistEventsFromApi = function (artist_name) {
        $http.get("https://rest.bandsintown.com/artists/" + artist_name + "/events?app_id=" + $scope.app_id + "")
            .then(function (response) {
                $scope.artist_events = response.data;
                $scope.back = false;
                $scope.searchResultState = true;
                $scope.searchBoxState = true;
                window.localStorage.setItem(artist_name, JSON.stringify($scope.artist_events));
                // console.log(response.data);
            });
    }

    /*Back to result*/
    $scope.backToResult = function () {
        // $(".event_detail_wrapper").html('');
        $scope.artist_events = [];
        $scope.back = true;
        $scope.searchResultState = false;
        $scope.searchBoxState = false;
    }

    /*validate search box method*/
    $scope.validateSearch = function (artist_name) {
        var x = artist_name;
        if (x === "" || typeof (x) === "undefined") {
            alert("Artist name must be filled out");
            return false;
        } else {
            return true;
        }
    }

});