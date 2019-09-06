function fillShiftTable() {
	// clear table to begin
	clearShiftTable();
	
	// check what dates to use based on radio selected
	var date1, date2;	
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
	var table = document.getElementById("shifts-table").getElementsByTagName('tbody')[0];
	var i;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var objArr = JSON.parse(this.responseText);
			for (i = 0; i < objArr.rtnLiveStaff.length; i++){
				
				var row = table.insertRow(i);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
	
				// replace these with the values from the json response
				cell1.innerHTML = objArr.rtnLiveStaff[i].NurseNo;
				cell2.innerHTML = '20-03-2019';//objArr.rtnLiveStaff[i].Firstname;
				cell3.innerHTML = objArr.rtnLiveStaff[i].Surname;
				cell4.innerHTML = '07:00';
				cell5.innerHTML = '14:00';
				cell6.innerHTML = '<a href="">Arrived</a> <a href="">Left</a>';
			}
		}
	};
	xmlhttp.open("GET", "http://xojo.pulsesoftware.info/special/rtnlivestaff", true);
	xmlhttp.send();
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

$(document).ready(function() {
	
	fillShiftTable();
	
	$('#dateFrom').prop('value', '2019-08-07');
	$('#dateTo').prop('value', '2019-08-07');
	
	
	
	$('#shifts-table tbody').on('click', 'tr', function() {
		// do something based on them clicking depends what I wanna do
		alert('row2');	
	});
	
	$('input:radio[name="shift-date"]').change(function(){	
			if ($(this).val() == 'Between Dates'){
				$('.datepickers').show();	
			} else {
				$('.datepickers').hide();
			}
		}
	);
	
	$('#button-submit').click(function(event) {
		event.preventDefault();
		fillShiftTable();
	});
	
//	$('#button-reset').click(function(event) {
//		event.preventDefault();
//		clearShiftTable();
//	})
});