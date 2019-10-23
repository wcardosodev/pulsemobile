var allowFill;

$(document).ready(function() {
	allowFill = true;
	
	fillShiftTable();
	
	$('#dateFrom').prop('value', '2019-08-07');
	$('#dateTo').prop('value', '2019-08-07');
	
	$('#shifts-table').on('click', '.arrived', function() {
		GetGeoLocation();		
	});
	
	$('#shifts-table').on('click', '.left', function() {
		GetGeoLocation();
	});
	
	$('input:radio[name="shift-date"]').change(function(){	
			if ($(this).val() == 'Between Dates'){
				$('.datepickers').show();	
			} else {
				$('.datepickers').hide();
			}
		});
	
	$('#button-submit').click(function(event) {
		event.preventDefault();
		fillShiftTable();
	});
	
	$('#button-reset').click(function(event) {
		event.preventDefault();
		clearShiftTable();
	})
});

function fillShiftTable() {
	if (allowFill) {
		allowFill = false;
		
		// clear table to begin
		clearShiftTable();

		// check what dates to use based on radio selected
		var date1, 
				date2;	
		if ($("input[name='shift-date'][value='This Week']").prop("checked")) {
			date1 = getMonday(new Date());
			date2 = getSunday(new Date());
		}
		else if ($("input[name='shift-date'][value='Next Week']").prop("checked")) {
			var dateM = new Date();
			var dateS = new Date();
			date1 = getMonday(dateM.setDate(dateM.getDate() + 7));
			date2 = getSunday(dateS.setDate(dateS.getDate() + 7));
		}
		else if ($("input[name='shift-date'][value='Between Dates']").prop("checked")) {
			// get the dates from the date pickers	
		}

		var xmlhttp = new XMLHttpRequest();
		// get table id . get all tags named tbody (tags being p h1 h2 etc) at index 0 being first element
		var table = $('#shifts-table tbody')[0],
				i;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var objArr = JSON.parse(this.responseText);
				for (i = 0; i < objArr.rtnLiveStaff.length; i++){

					var row = table.insertRow(i);
					var cell_day = row.insertCell(0);
					var cell_date = row.insertCell(1);
					var cell_location = row.insertCell(2);
					var cell_start = row.insertCell(3);
					var cell_end = row.insertCell(4);
					var cell_Actions = row.insertCell(5);

					// replace these with the values from the json response
					cell_day.innerHTML = objArr.rtnLiveStaff[i].NurseNo;
					cell_date.innerHTML = '20-03-2019';//objArr.rtnLiveStaff[i].Firstname;
					cell_location.innerHTML = objArr.rtnLiveStaff[i].Surname;
					cell_start.innerHTML = '07:00';
					cell_end.innerHTML = '14:00';
					cell_Actions.innerHTML = '<input type="button" class="arrived" id="arrived_shift' + (i + 1) + '" value="Arrived"><input type="button" class="left" id="left_shift' + (i + 1) + '" value="Left">';
//						'<a href="" class="arrived" id="arrived_shift' + (i + 1) + '">Arrived</a> <a href="" class="left" id="left_shift' + (i + 1) +'">Left</a>';
				}
			}
		};
		xmlhttp.open("GET", "http://xojo.pulsesoftware.info/special/rtnlivestaff", true);
		xmlhttp.send();
		
		
		setTimeout(function () {
			allowFill = true;
		}, 1000)	
	}
	
}

function clearShiftTable() {	
	$("#shifts-table tbody tr").remove();
}

function getMonday(d) {
	d = new Date(d);
	var day = d.getDay();
	var diff = d.getDate() - day + (day == 0 ? -6:1);
	return new Date(d.setDate(diff));
}

function getSunday(d) {
	d = new Date(d);
	var day = d.getDay();
	var diff = d.getDate() + 7 - day;
	return new Date(d.setDate(diff));
}

function GetGeoLocation() {
	navigator.geolocation.getCurrentPosition(OnGeoSuccess, OnGeoError);
}

function OnGeoSuccess(pos, arrivalStatus) {
	// if successfull you want to send the information to db or wherever
	var now = new Date(),
			hour = now.getHours(),
			minute = now.getMinutes(),
			seconds = now.getSeconds(),
			current_time = hour + ':' + minute + ':' + seconds,
			latitude = pos.coords.latitude,
			longitude = pos.coords.longitude;
	//alert('arrivalStatus');
	
//	var location_info = {
//		shift_id: 1,
//		arrival_info: {
//			time: '08:00',
//			latitude: '',
//			longitude: '';
//		},
//		leaving_info: {
//			time: '20:00',
//			latitude: '',
//			longitude: '';
//		};		
//	}
	
	// send ^^
	alert('Latitude: ' + pos.coords.latitude + 'Longitude: ' + pos.coords.longitude);
}

function OnGeoError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert('Permission to use geolocation is denied, please allow geolocation for this feature.');
			break;
		case error.POSITION_UNAVAILABLE:
			alert('Position is currently unavailable.');
			break;
		case error.TIMEOUT:
			alert('The request timed out.');
			break;
		case error.UNKNOWN_ERROR:
			alert('An unknown error occurred.');
			break;		
	}
}

//function ShowPosition(pos) {
//	
//}