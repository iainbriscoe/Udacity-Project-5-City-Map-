$(document).ready(function () {

	function viewModel(){
		var self = this; 
		self.model = {}; 

		self.model.Places = ko.observableArray([
		{
			name : "Wilfrid Laurier University",
			lat : 43.4753,
			lng : -80.5272,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=wilfrid_laurier_university&format=json&callback=wikiCallback",
			valueString : ""	
		},
		{ 
			name : "University of Waterloo",
			lat : 43.4689,
			lng : -80.5400,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=University_of_waterloo&format=json&callback=wikiCallback",
			valueString : ""
		},
		{ 
			name : "Conestoga College",
			lat : 43.479239,
			lng : -80.517953,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=Conestoga_college&format=json&callback=wikiCallback",
			valueString : ""
		}, 
		{
			name : "Phils",
			lat : 43.476095,
			lng : -80.524554,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=Phil_Gaglardi&format=json&callback=wikiCallback",
			valueString : ""
		}, 
		{
			name : "Chainsaw",
			lat : 43.466123,
			lng :  -80.522361,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=waterloo,_ontario&format=json&callback=wikiCallback",
			valueString : ""
		},
		{ 
			name : "Waterloo Park",
			lat : 43.466490,
			lng : -80.532416,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=waterloo,_ontario&format=json&callback=wikiCallback",
			valueString : ""
		}, 
		{
			name : "Bechtel Park",
			lat : 43.482695,
			lng :  -80.491708,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=waterloo,_ontario&format=json&callback=wikiCallback",
			valueString : ""
		},
		{ 
			name : "RIM Park",
			lat : 43.519484,
			lng : -80.502236,
			link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=rim_park&format=json&callback=wikiCallback",
			valueString : ""
		}
		]);
		
		//self.visibleListItem = new visibleListItem(self.model.Places());
		self.map = new initMap();
	
		self.searchList = new searchList(self.model.Places());

		//self.list = ko.observableArray(self.model.Places());


		
	};




		//showAllItems = function(places){
		//	var self = this; 
		//	self.list = ko.observableArray(places).destroyAll();
		//};

		//visibleListItem = function(places) {
		//	var self = this; 
		//	self.list = ko.observableArray(places);
		//};
		
		searchList = function(places){

			var currentVal = $('.search-location-field').val();
			if(currentVal === "") { 
				//showAllItems(self.model.places);
				//show all items
				//viewmodel.list = ko.observableArray(viewmodel.Places());
				//console.log(viewModel); 
				self.list = ko.observableArray(places);
			}
			else {
				//search through items and make a smaller list 
				self.list = ko.observableArray(); 
				console.log(places);
				self.list.push(places); 
				//console.log(self.list); 

			}

		};
	
		function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
				 center: new google.maps.LatLng(43.50, -80.5167),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		};



	ko.applyBindings(new viewModel());
});

