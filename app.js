(function(){

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService);

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http){
		this.getMatchedMenuItems = function(searchTerm){
			var promise = $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
			.then(function (response){
				var searchResult = 0;
				var returnItemsArray = [];
				var menu = response.data.menu_items;
				_.each(menu, function(item) {
					if(item.description.includes(searchTerm))
					{
						returnItemsArray.push(item.name);
					}
				});
				return returnItemsArray;
			});
			return promise;
		}
	}
	NarrowItDownController.$inject = ['$scope','MenuSearchService'];
	function NarrowItDownController($scope,MenuSearchService){
		$scope.narrowItDownMethod = function() {
		var termToSearch = $scope.searchTerm;
	  MenuSearchService.getMatchedMenuItems(termToSearch)
		 .then(function (response){
			$scope.foundItems = response;
		});
		//$scope.foundItems = MenuSearchService.getMatchedMenuItems(termToSearch);
		};
	};
``
})();
