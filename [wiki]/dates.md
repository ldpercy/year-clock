Dates
=====


JavaScript
----------

JavaScript's date representations are a bit *quirky*, months in particular:

	year  : normal
	month : 0-11
	day	  : 1-31


### Temporal

Coming soon:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal




Date Ranges
-----------

Internally all time periods and date ranges are specified as half-open intervals (unless noted otherwise).

For example the start and end dates for the year `2023` are as follows:

	yearStart : 2023-01-01
	yearEnd   : 2024-01-01


For display purposes these can be converted to closed intervals, eg:

	yearStart : 2023-01-01
	yearEnd   : 2023-12-31




Weeks
-----

Weeks begin on Monday and end on Sunday.


### ISO Weeks

> [!NOTE]
> Not yet implemented.
> Currently weeks just count up starting from 1

https://en.wikipedia.org/wiki/ISO_week_date

In the ISO week system the first few days of the year sometimes aren't part of the the current year's week 1, but are assigned to the previous year:

> If 1 January is on a Monday, Tuesday, Wednesday or Thursday, it is in W01. If it is on a Friday, it is part of W53 of the previous year. If it is on a Saturday, it is part of the last week of the previous year which is numbered W52 in a common year and W53 in a leap year. If it is on a Sunday, it is part of W52 of the previous year.



