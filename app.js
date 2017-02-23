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
				var foundItems = [{}];
				var searchResult = 0;
				var j = 0;
				var menu = response.data.menu_items;
				var searchStringInList ="";
				var length = menu.length;
console.log("Menu "+menu+" Length "+length);
				for (var i=0; i<length; i++)
				{
				searchStringInList = menu.menu_items[i].description.toLowerCase();	
				searchResult = searchTerm.indexOf(searchStringInList);								
				if(searchResult >= 0)
				{	//console.log("searchStringInList "+searchStringInList);
					foundItems[j] = menu.menu_items[i];	
					//console.log(menu.menu_items[i].name+" "+foundItems[j].id);
					j=j+1;
				}
		        	}
				return foundItems;
			});
		}
	}

	NarrowItDownController.$inject = ['$scope','MenuSearchService'];
	function NarrowItDownController($scope,MenuSearchService){
		$scope.narrowItDownMethod = function() {
		var termToSearch = $scope.searchTerm;
		MenuSearchService.getMatchedMenuItems(termToSearch);
		};
	};
	
})();