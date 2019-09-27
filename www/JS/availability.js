$(document).ready(function() {
	var d = new Date();

	loadCalendar(d);
	
	$('.month-header #month-prev').click(function() {
		d = prevMonth(d);
		loadCalendar(d);
	});
	
	$('.month-header #month-next').click(function() {
		d = nextMonth(d);
		loadCalendar(d);
	});
	
	$('#reset-calendar').click(function () {
		resetCalendarDate();
	})
	
	$('.availability-calendar table tbody').on('click', 'td', function () {
		var clickedBtnID = $(this).attr('id');
		// if has an id value
		if (typeof clickedBtnID !== 'undefined') {
			getDateForOverlay($(this).text(), d.getMonth());
			//TODO: need to load the availability currently set here based on the json response
			//$('#overlay').css('right', '0');
			//$('#overlay').css('left', '0');
			$('#overlay').addClass('active');
		}
	})
	
	$('#selectall-available').click(function () {
		setAllAvailabilityAs('available');
	})
	
	$('#selectall-notsure').click(function () {
		setAllAvailabilityAs('notsure');		
	})
	
	$('#selectall-notavailable').click(function () {
		setAllAvailabilityAs('notavailable');		
	})
	
	$('#cancel').click(function () {
		removeOverlay();
	})
	
	$('#overlay-cancel').click(function () {
		removeOverlay();
	})
});

function setAllAvailabilityAs (status) {
	$('#availability-early-'+status).prop('checked', true);
	$('#availability-late-'+status).prop('checked', true);
	$('#availability-day-'+status).prop('checked', true);
	$('#availability-night-'+status).prop('checked', true);
}

function removeOverlay() {
	$('#overlay').removeClass('active');
}

function daysInMonth (month, year) {
	return new Date(year, month, 0, 0, 0, 0, 0).getDate();
}

function startDay (month, year) {
	return new Date(year, month - 1, 1, 0, 0, 0, 0).getDay();
}

function getDateForOverlay(day, month) {
	// to find the day you need to get the column the number is in 0-6
	var d = day,
			m = intToMonth(month),
			y = $('.month-header #yeartext').text();
	$('#overlay-dateheader').html(m + ' ' + ordinalSuffix(d) + ', ' + y);
}

function ordinalSuffix(i) {
	var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function prevMonth (date) {
	var month = date.getMonth(),
			year = date.getFullYear();
	
	return new Date(year, month, 0);
}

function nextMonth (date) {
	var month = date.getMonth(),
			year = date.getFullYear();
	
	return new Date(year, month + 2, 0);	
}

function intToMonth (val) {
	month = new Array();
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';
	
	return month[val];
}

function loadCalendarHeader (date) {
	var monthText = $('.month-header #monthtext'),
			yearText = $('.month-header #yeartext');
	
	monthText.html(intToMonth(date.getMonth()));
	yearText.html(date.getFullYear());
}

// TODO: AFTER LOAD CALENDAR (at the end of the function)
// TODO: SET ALL UNUSED DATES (blank dates) color to black?

function loadCalendar (date) {
	loadCalendarHeader(date);
	
	resetCalendar();
	
	var	startd = startDay(date.getMonth() + 1, date.getFullYear()),
			days = daysInMonth(date.getMonth() + 1, date.getFullYear()),
			table = $('.availability-calendar table tbody')[0],
			rowValue = 0,
			cellValue = startd - 1,
			i;

	if (cellValue < 0) {
		cellValue = 6;
	}
	
	for (i = 1; i <= days; i++) {		
		if (cellValue > 6) {
			cellValue = 0;
			rowValue++;
		}
		
		var cell = table.rows[rowValue].cells[cellValue],
				$cell = $(cell);
		
		//$cell.removeClass();
		$cell.html(i);
		$cell.attr('id', 'date-' + i);
		//$cell.addClass('holiday');
		cellValue++;
	}
}

function resetCalendar() {
	var table = $('.availability-calendar table tbody td');
	table.html('');
	table.removeAttr('id');
}

// button to go back to todays date
// incase they go too far
function resetCalendarDate() {
	var d = new Date();
	loadCalendar (date);
}