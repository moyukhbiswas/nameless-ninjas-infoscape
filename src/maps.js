var map;
function initialize() {

  // AJAX CALL

  // $.ajax({
  //   type:"GET",
  //   url: "http://10.86.113.27:8010/get_info",
  //   cache: false,
  //   dataType: 'jsonp',
  //   success: function(string){
  //     var obj = JSON.parse(string);
  //     console.log("JSON obj", obj);
  //   }
  // });

  var latLng = new google.maps.LatLng(17.4024771, 78.4878983);

  // Sample JSON Data
	var data = [
		{"entertainment": [
			{
				"latlng" : new google.maps.LatLng(17.3968048, 78.3139618),
				"subcat" : "music",
				"up" : 5,
				"down" : 1,
				"email" : "deepak.sharma.cse12@hotmail.com"
			},
			{
				"latlng" : new google.maps.LatLng(17.4881948, 78.398694),
				"subcat" : "music",
				"up" : 8,
				"down" : 2,
				"email" : "deepak.sharma.cse12@hotmail.com"
			}
		]},
		{"hazard": [
			{
				"latlng" : new google.maps.LatLng(17.4900915, 78.3899578),
				"subcat" : "waterLogging",
				"up" : 5,
				"down" : 1,
				"email" : "deepak.sharma.cse12@hotmail.com"
			},
			{
				"latlng" : new google.maps.LatLng(17.4973297, 78.3911697),
				"subcat" : "fire",
				"up" : 8,
				"down" : 2,
				"email" : "deepak.sharma.cse12@hotmail.com"
			}
		]},
	];

	// Extracting entertainment data out of data object
  var entertainmentData = data[0].entertainment;

	var mapOptions = {
		zoom: 10,
		center: latLng
	}

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Adding content if clicked
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';

    // info windows corresponding to the content string
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

	// Single Marker
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title: 'Click to zoom'
	});

	// Adding listener to a single marker
	marker.addListener('click', function() {
		// map.setZoom(12);
		// map.setCenter(marker.getPosition());
		infowindow.open(map, marker);
	});

	// Multiple Place markers
	for (var i=0; i < entertainmentData.length; i++){
		var marker = new google.maps.Marker({
			position: entertainmentData[i].latlng,
			map: map
		});
	}

      // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);

        });

        var prevMarker = null;

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          addMarker(event.latLng, map);
        });

      var geocoder = new google.maps.Geocoder;


      // Adds a marker to the map.
      function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        if(prevMarker == null){
	        var marker = new google.maps.Marker({
	          position: location,
	          map: map
	        });
	        geocodeLatLng(location, map, marker);
	        prevMarker = marker;
    	  }
      	else{
      		prevMarker.setMap(null);
      		prevMarker = null;
      	}
      }

      function geocodeLatLng(location, map, marker)
      {
 	     var latlng = {lat:location.lat(), lng : location.lng()};
 	     geocoder.geocode({'location' : latlng}, function(results, status){
 	     	if(status == google.maps.GeocoderStatus.OK){
 	     		if(results[1]){
              var length = results[1].address_components.length;
              var lat = location.lat().toFixed(3);
              var lng = location.lng().toFixed(3);
              var name = results[1].address_components[1].long_name;
              var state = results[1].address_components[length-3].long_name;
              var contentString="";
              contentString += "<div style = \"font-family:Arial; font-size: 14px;width: 200px; height: 60px;\">";
              contentString += "<div style =\"font-weight:bold;width: 200px; float: left;margin-top: 3px; margin-bottom:3px; font-size:16px;\"> "+ name + "<\/div>";
              contentString += "<div style = \"width: 200px;float: left;\"> " + state + "<\/div>";
              contentString += "<div style = \"font-size: 12px; margin-top: 3px;color: #aaa; width: 120px;float: left;\"> " + lat + "," + lng + "<\/div>";
              contentString += "";
              contentString += "<button onClick = \"window.showAddDialog("+location.lat()+","+location.lng()+")\" style = \"margin-top: -35px;cursor:pointer; color: white;background: #f44336 ; border: none; border-radius: 30px;float:right; width: 50px; height: 50px;\">+<\/button>";
              contentString += "<\/div>";
              infowindow.setContent(contentString);
              infowindow.open(map, marker);

 	     		}
 	     	}
 	     })
      }


 // Adding circle

  //  var circle = new google.maps.Circle({
  //     center: latLng,
  //     map: map,
  //     radius: 10000,          // IN METERS.
  //     fillColor: '#FF6600',
  //     fillOpacity: 0.3,
  //     strokeColor: "#FFF",
  //     strokeWeight: 0,         // DON'T SHOW CIRCLE BORDER.
  //     editable:true,
  //     clickable:true
  // });

   var drawingManager = new google.maps.drawing.DrawingManager({
    // drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.CIRCLE
      ]
    },
    circleOptions: {
      // radius: 10000,          // IN METERS.
      fillColor: '#FF6600',
      fillOpacity: 0.3,
      strokeColor: "#FFF",
      strokeWeight: 0,         // DON'T SHOW CIRCLE BORDER.
      editable:true,
      clickable:false
    }
  });
  drawingManager.setMap(map);
}
