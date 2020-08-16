# date-update — an update for js' Date class

Js' Date is a very useful class, but sometimes to doing something "simple" you have to write a lot of boring code (even with other similar libraries).

That's why I've wrote this package that add some methods to Date objects which simplify the usage of them.

This package mainly helps in manage the date "as a value" (mathematical and data stuff) and NOT in formatting or similar.

**Any suggestions are welcome, fell free to make a pull request!**


## Usage

Install it form npm
```bash
$ npm install date-update
```
and import it into your project:
```javascript
require('date-update');
```

## Added methods

**All of these method create a new Date object and don't modify itself**

> In this extension all **time unit of measure** have a string that represent itself:
> - Years: `y`
> - Month: `M`
> - Days: `d`
> - Hours: `h`
> - Minutes: `m`
> - Seconds: `s`
> - Milliseconds: `ms`

- **trim(a, b)**: \
	returns a new date resetting the date/time not in `[a; b]`, where `a` and `b` are a _time unit_. \
	For example, if you use it in this way
	```javascript
	var time = new Date("2020-08-16T08:19:46.590Z").trim('h', 'ms')
	```
	you will obtain `"1970-01-01T08:19:46.590Z"`, i.e. resets years, months and days and keep hours, minutes, seconds and milliseconds

- **add(s)**: \
	add an amount of time (specified by an expression of _time unit_) to the date. \
	The expression must be a sequence of **integer** and **time unit** (for example "2M -4h" which add 2 month and subtract 4 hours):
	```javascript
	var date = new Date("2020-08-16T08:19:46.590Z").add("+5M -15d")
	```
	date will be `"2021-01-01T08:19:46.590Z"`

	> **NB**: it supports even "broken value" (for example "+365d" will add a year, if the actual year is not bissextile) and also repetition of the same time unit (for example "+3h -5h")

