Dates
=====


JavaScript
----------

JavaScript's date representations are a bit *quirky*, months in particular:

	year  : normal
	month : 0-11
	day	  : 1-31


Weeks
-----

Weeks begin on Monday and end on Sunday.



### ISO Weeks

Not yet implemented.
Currently weeks just count up starting from 1.



Date Ranges
-----------

Internally all time periods and date ranges are specified as half-open intervals (unless noted otherwise).

For example the start and end dates for the year `2023` are as follows:

	yearStart : 2023-01-01
	yearEnd   : 2024-01-01


For display purposes these can be converted to closed intervals, eg:

	yearStart : 2023-01-01
	yearEnd   : 2023-12-31


