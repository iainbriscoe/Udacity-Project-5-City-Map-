
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
		valueString : "1"	
	},
	{ 
		name : "University of Waterloo",
		lat : 43.4689,
		lng : -80.5400,
		link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=University_of_waterloo&format=json&callback=wikiCallback",
		valueString : "2"
	},
	{ 
		name : "Conestoga College",
		lat : 43.479239,
		lng : -80.517953,
		link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=Conestoga_college&format=json&callback=wikiCallback",
		valueString : "3"
	}, 
	{
		name : "Phils",
		lat : 43.476095,
		lng : -80.524554,
		link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=Phil_Gaglardi&format=json&callback=wikiCallback",
		valueString : "4"
	}, 
	{
		name : "Chainsaw",
		lat : 43.466123,
		lng :  -80.522361,
		link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=waterloo,_ontario&format=json&callback=wikiCallback",
		valueString : "5"
	},
	{ 
		name : "Waterloo Park",
		lat : 43.466490,
		lng : -80.532416,
		link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=waterloo,_ontario&format=json&callback=wikiCallback",
		valueString : "6"
	}, 
	{
		name : "Bechtel Park",
		lat : 43.482695,
		lng :  -80.491708,
		link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=waterloo,_ontario&format=json&callback=wikiCallback",
		valueString : "7"
	},
	{ 
		name : "RIM Park",
		lat : 43.519484,
		lng : -80.502236,
		link : "http://en.wikipedia.org/w/api.php?action=opensearch&search=rim_park&format=json&callback=wikiCallback",
		valueString : "8"
	}];

	self.Places = ko.observableArray(dataArray);

	this.clickedListItem = function(model, event) { 
	
		alert(model.name); 
	};


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
			google.maps.event.addListener(marker,"click",function(){
        		 //octopus.popWindow.open(data.mapObj.googleMap, data.mapObj.marker);
        		//console.log(marker.content);
        		if (viewModel.openedInfoWindow != null){
					viewModel.openedInfoWindow.close();
        		};
        		
        		var infowindow = new google.maps.InfoWindow({
					content: item.valueString
				});
				
				//marker.infowindow.close();
				infowindow.open(viewModel.map.googleMap, this);

				viewModel.openedInfoWindow = infowindow; 

				google.maps.event.addListener(infowindow, 'closeclick', function() {
					viewModel.openedInfoWindow = null;
				});
				/*
				google.maps.event.addListener(viewModel.map.googleMap, "click", function() {
					console.log("test"); 
					infowindow.close();
				});
				*/

		    });
			marker.setMap(viewModel.map);
		}); 
	};
}; 


function initMap() {
	viewModel.map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
			 center: new google.maps.LatLng(43.50, -80.5167),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
};



	


$(document).ready(function() {
	mapDataViewmodel = new viewModel();
	ko.applyBindings(mapDataViewmodel);
	self.map = new initMap();
	mapDataViewmodel.mapMarker(); 

});
