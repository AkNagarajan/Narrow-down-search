(function(){

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService);

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http){
		this.getMatchedMenuItems = function(searchTerm){
			return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
			.then(function (response) 	
			{
				var searchResult = 0;
				var j = 0;
				var menu = response.data.menu_items;
				var foundItems = _.filter (menu, function(item) {
					return item.description.includes(searchTerm);
				});
				return foundItems;
			});
		}
	}

	NarrowItDownController.$inject = ['$scope','MenuSearchService'];
	function NarrowItDownController($scope,MenuSearchService){
		$scope.narrowItDownMethod = function() {
		var termToSearch = $scope.searchTerm;
		$scope.foundItems = MenuSearchService.getMatchedMenuItems(termToSearch);
		};
	};
	
})();
