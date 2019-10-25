var allowFill;

$(document).ready(function() {
	allowFill = true;
	
	FillShiftTable();
	
	$('#date-from').prop('value', '2019-10-25');
	$('#date-to').prop('value', '2019-11-01');
	
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
	
		
	$('input:radio[name="radio-shifts"]').change(function () {
		var label_id = $(this).parent().attr('id');
		$('.main-footer .flex-buttons label').css('background-color', '#D8D7D7').css('color', 'black');

		$('#' + label_id).css('background-color', '#2E8DDF').css('color', 'white');
		
		if (label_id == 'label-between-dates') {
			$('.date-pickers div').css('display', 'block');
		} else {
			$('.date-pickers div').css('display', 'none');
		}
		
	})
	
	$('#button-submit').click(function(event) {
		event.preventDefault();
		FillShiftTable();
	});
	
	$('#button-reset').click(function(event) {
		event.preventDefault();
		ClearShiftTable();
	})
});

function FillShiftTable() {
	if (allowFill) {
		allowFill = false;
		
		// clear table to begin
		ClearShiftTable();

		// check what dates to use based on radio selected
		var date1, 
				date2;	
		if ($("input[name='shift-date'][value='This Week']").prop("checked")) {
			date1 = GetMonday(new Date());
			date2 = GetSunday(new Date());
		}
		else if ($("input[name='shift-date'][value='Next Week']").prop("checked")) {
			var dateM = new Date();
			var dateS = new Date();
			date1 = GetMonday(dateM.setDate(dateM.getDate() + 7));
			date2 = GetSunday(dateS.setDate(dateS.getDate() + 7));
		}
		else if ($("input[name='shift-date'][value='Between Dates']").prop("checked")) {
			// get the dates from the date pickers	
		}

		var xmlhttp = new XMLHttpRequest();
		// get table id . get all tags named tbody (tags being p h1 h2 etc) at index 0 being first element
		var table = $('#shifts-table tbody')[0];
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var objArr = JSON.parse(this.responseText);
				for (var i = 0; i < objArr.rtnLiveStaff.length; i++){					
					var row = table.insertRow(i),
							cell_actions = row.insertCell(0),
							cell_day = row.insertCell(1),
							cell_date = row.insertCell(2),
							cell_location = row.insertCell(3),
							cell_start = row.insertCell(4),
							cell_end = row.insertCell(5);

					cell_actions.innerHTML = '<input type="button" class="arrived" id="arrived_shift' + (i + 1) + '" value="Arrived"><input type="button" class="left" id="left_shift' + (i + 1) + '" value="Left">';
					cell_day.innerHTML = 'Mon';//objArr.rtnLiveStaff[i].NurseNo;
					cell_date.innerHTML = '20/03';//objArr.rtnLiveStaff[i].Firstname;
					cell_location.innerHTML = 'Location';//objArr.rtnLiveStaff[i].Surname;
					cell_start.innerHTML = '07:00';
					cell_end.innerHTML = '14:00';
					
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

function ClearShiftTable() {	
	$("#shifts-table tbody tr").remove();
}

function GetMonday(d) {
	d = new Date(d);
	var day = d.getDay();
	var diff = d.getDate() - day + (day == 0 ? -6:1);
	return new Date(d.setDate(diff));
}

function GetSunday(d) {
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