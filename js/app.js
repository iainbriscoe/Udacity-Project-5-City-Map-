
function viewModel(){
	var self = this; 
	map =[]; 
	openedInfoWindow = null; 
	var searchArray = []; 
	dataArray = [
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
	}];
	//the updateable list of items of the page 
	self.Places = ko.observableArray(dataArray);

	//if a list item is clicked creat a marker on the page 
	this.clickedListItem = function(model, event) { 
		markersArray.forEach(function(location) {
			if(location.title === model.name){
  				if (viewModel.openedInfoWindow != null){
					viewModel.openedInfoWindow.close();
        		};
        		
        		var infowindow = new google.maps.InfoWindow({
					content: model.valueString
				});
				
				
				infowindow.open(viewModel.map, location);
				
				viewModel.openedInfoWindow = infowindow; 

				google.maps.event.addListener(infowindow, 'closeclick', function() {
					viewModel.openedInfoWindow = null;
				});		
				google.maps.event.addListener(viewModel.map, "click", function() {
					infowindow.close();
				});
			};
		});
	};

	//search the list of items and change the displayed view
	this.searchList = function(){	
		var currentVal = $('.search-location-field').val();
		if(currentVal === "") { 
			//if the search is empty refill array
			self.Places(dataArray);
		}
		else {
			//search through items and make a smaller list 
			searchArray = []; 	
			dataArray.forEach(function(item){
				if((item.name).indexOf(currentVal) > -1) {
					searchArray.push(item); 
				}
			});
			self.Places(searchArray); 
		}
		this.clearMap();
		this.mapMarker(); 
	};

	this.mapMarker = function() {
		currentList = self.Places(); 
		//create map markers for each visible list item
		currentList.forEach(function(item){
			var latLng = new google.maps.LatLng(
	            ko.utils.unwrapObservable(item.lat),
	        	ko.utils.unwrapObservable(item.lng));
			var contentMarker = new google.maps.Data(
            	ko.utils.unwrapObservable(item.valueString));
			var marker = new google.maps.Marker({
		            map: this.map.googleMap,
		            position: latLng,
		            title: item.name,
		            content: contentMarker,
		            draggable: false
			}); 
			//create markers for with click listeners
			google.maps.event.addListener(marker,"click",function(){
        		
        		if (viewModel.openedInfoWindow != null){
					viewModel.openedInfoWindow.close();
        		};
        		
        		var infowindow = new google.maps.InfoWindow({
					content: item.valueString
				});
				
				
				infowindow.open(this.map, marker);
				
				viewModel.openedInfoWindow = infowindow; 

				google.maps.event.addListener(infowindow, 'closeclick', function() {
					viewModel.openedInfoWindow = null;
				});
				
				
				google.maps.event.addListener(viewModel.map, "click", function() {
					infowindow.close();
				});
				


		    });
		    markersArray.push(marker); 
			marker.setMap(viewModel.map);
		}); 
	
	};


	//take all map markers off of the map 
	this.clearMap = function() {
		
		if(markersArray != null){
			
	  		for (var i = 0; i < markersArray.length; i++) {
	    		markersArray[i].setMap(null);
	  		};
	  		markersArray = [];
  		};
	};
	//fetch data from wikipedia on each location and store it in the 
	//data for each item
	this.wikiData = function() {
		var data = self.Places();
		data.forEach(function(location){
			var wikiURL = location.link; 

			var value = $.ajax({
		        url: wikiURL, 
		        dataType: "jsonp",

		        success: function( response) {
		            var result = response[2]; 
		            location.valueString = result[0]; 
		        }
		    }); 
		});
	  
	};

}; 

//create the map on the page
function initMap() {
	viewModel.map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
			 center: new google.maps.LatLng(43.50, -80.5167),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
};

//array to store the markers being placed on the map
var markersArray = [];
	



$(document).ready(function() {
	mapDataViewmodel = new viewModel();
	ko.applyBindings(mapDataViewmodel);
	initMap();
	mapDataViewmodel.mapMarker(); 
	mapDataViewmodel.wikiData();

});
