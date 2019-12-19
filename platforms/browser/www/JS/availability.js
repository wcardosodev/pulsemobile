$(document).ready(function() {
	var d = new Date();

	LoadCalendar(d);
	
	$('.month-header #month-prev').click(function() {
		d = PrevMonth(d);
		LoadCalendar(d);
	});
	
	$('.month-header #month-next').click(function() {
		d = NextMonth(d);
		LoadCalendar(d);
	});
	
	$('#reset-calendar').click(function () {
		ResetCalendarDate();
	})
	
	$('.availability-table tbody').on('click', 'td', function () {
		var clickedBtnID = $(this).attr('id');
		// if has an id value
		if (typeof clickedBtnID !== 'undefined') {
			GetDateForOverlay($(this).text(), d.getMonth());
			//TODO: need to load the availability currently set here based on the json response
			//$('#overlay').css('right', '0');
			//$('#overlay').css('left', '0');
			$('#overlay').addClass('active');
		}
	})
	
	$('#selectall-available').click(function () {
		SetAllAvailabilityAs('available');
	})
	
	$('#selectall-notsure').click(function () {
		SetAllAvailabilityAs('notsure');		
	})
	
	$('#selectall-notavailable').click(function () {
		SetAllAvailabilityAs('notavailable');		
	})
	
//	$('#submit-availability').click(function () {
//		removeOverlay();
//	})
	$('#availability-form').submit(function (e){
		e.preventDefault();
		//send stuff via ajax?
		//https://stackoverflow.com/questions/25983603/how-to-submit-html-form-without-redirection/30666118
		
		RemoveOverlay();
	})
	
	$('#cancel').click(function () {
		RemoveOverlay();
	})
	
	$('#overlay-cancel').click(function () {
		RemoveOverlay();
	})
});

function SetAllAvailabilityAs (status) {
	$('#availability-early-'+status).prop('checked', true);
	$('#availability-late-'+status).prop('checked', true);
	$('#availability-day-'+status).prop('checked', true);
	$('#availability-night-'+status).prop('checked', true);
}

function RemoveOverlay() {
	$('#overlay').removeClass('active');
	
	// untick radio buttons afterwards, when loading the availability information you will tick the buttons based on the database
	
	// nvm dont have to as it will change when they loaded anyway
}

function DaysInMonth (month, year) {
	return new Date(year, month, 0, 0, 0, 0, 0).getDate();
}

function StartDay (month, year) {
	return new Date(year, month - 1, 1, 0, 0, 0, 0).getDay();
}

function GetDateForOverlay(day, month) {
	// to find the day you need to get the column the number is in 0-6
	var d = day,
			m = IntToMonth(month),
			y = $('.month-header #yeartext').text();
	$('#overlay #overlay-header').html('Availability for ' + m + ' ' + OrdinalSuffix(d) + ', ' + y);
}

function OrdinalSuffix(i) {
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

function PrevMonth (date) {
	var month = date.getMonth(),
			year = date.getFullYear();
	
	return new Date(year, month, 0);
}

function NextMonth (date) {
	var month = date.getMonth(),
			year = date.getFullYear();
	
	return new Date(year, month + 2, 0);	
}

function IntToMonth (val) {
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

function LoadCalendarHeader (date) {
	var monthText = $('.month-header #monthtext'),
			yearText = $('.month-header #yeartext');
	
	monthText.html(IntToMonth(date.getMonth()));
	yearText.html(date.getFullYear());
}

// TODO: AFTER LOAD CALENDAR (at the end of the function)
// TODO: SET ALL UNUSED DATES (blank dates) color to black?

function LoadCalendar (date) {
	LoadCalendarHeader(date);
	
	ResetCalendar();
	
	var	startd = StartDay(date.getMonth() + 1, date.getFullYear()),
			days = DaysInMonth(date.getMonth() + 1, date.getFullYear()),
			table = $('.availability-table tbody')[0],
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
		
		// for testing the availability colors
//		if (i > 22) {
//			$cell.addClass('available');
//		} else if (i > 15) {
//			$cell.addClass('not-available');
//		} else if (i > 9) {
//			$cell.addClass('holiday');
//		} else if (i > 3) {
//			$cell.addClass('training');
//		}
		cellValue++;
	}
	
	if ($('.availability-table tbody td:not([id])')) {
		$('.availability-table tbody td:not([id])').addClass('blank');
	}
}

function ResetCalendar() {
	var table = $('.availability-table tbody td');
	table.html('');
	table.removeAttr('id');
	table.removeAttr('class');
}

// button to go back to todays date
// incase they go too far
function ResetCalendarDate() {
	var d = new Date();
	LoadCalendar (date);
}