// Copyright (c) 2021 Matteo Benzi <matteo.benzi97@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// ============================================================
//
// date-update 1.1.1 — new function: fixOffset
// date-update 1.1.0 — fully es5 compatible
// date-update 1.0.0 — an update for js' Date class
//
// https://github.com/Bnz-0/date-update
//


var time_unit = ['y','M','d','h','m','s','ms'];
var time_resetter = [
	function (date) { date.setUTCFullYear(1970) },
	function (date) { date.setUTCMonth(0) },
	function (date) { date.setUTCDate(1) },
	function (date) { date.setUTCHours(0) },
	function (date) { date.setUTCMinutes(0) },
	function (date) { date.setUTCSeconds(0) },
	function (date) { date.setUTCMilliseconds(0) },
];
var time_modifiers = {
	'y': function (date, x) { date.setUTCFullYear(date.getUTCFullYear() + x) },
	'M': function (date, x) { date.setUTCMonth(date.getUTCMonth() + x) },
	'd': function (date, x) { date.setUTCDate(date.getUTCDate() + x) },
	'h': function (date, x) { date.setUTCHours(date.getUTCHours() + x) },
	'm': function (date, x) { date.setUTCMinutes(date.getUTCMinutes() + x) },
	's': function (date, x) { date.setUTCSeconds(date.getUTCSeconds() + x) },
	'ms':function  (date, x) { date.setUTCMilliseconds(date.getUTCMilliseconds() + x) },
};


/**
 * returns a new date resetting the date/time not in `[a; b]`
 * @param {string} a one of `y`, `M`, `d`, `h`, `m`, `s`, `ms`
 * @param {string} b one of `y`, `M`, `d`, `h`, `m`, `s`, `ms`
 *
 * @example
 * var time = new Date().trim('h', 'ms') //keep only the time form hours to milliseconds
 */
Date.prototype.trim = function(a, b) {
	if(!b) b = 'ms';
	var date = new Date(this.getTime());
	var f = time_unit.indexOf(a);
	var t = time_unit.indexOf(b);
	if(f < 0 || t < 0) return date;

	while((t = (t+1) % time_unit.length) !== f)
		time_resetter[t](date);

	return date;
}


/**
 * add an amount of time to the date and return it in a new Date
 * @param {string} time2add a string representing an expression of the amount of time to add.
 * the expression must be a sequence of **integer** and **time unit of measure**
 * (which could be one of these: `y`, `M`, `d`, `h`, `m`, `s`, `ms`)
 *
 * @example
 * var date = new Date().add("+3d -1h") //adds 3 days and subtract 1 hour
 */
Date.prototype.add = function(time2add) {
	var date = new Date(this.getTime());
	var tm_regex = /([+-]{0,1}[0-9]+)\s*(ms|[yMdhms])/g;

	for(var t; (t = tm_regex.exec(time2add)) !== null; )
		time_modifiers[t[2]](date, parseInt(t[1]));

	return date;
}


/**
 * since this library reason in UTC to avoid some other problems, to get the correct local date you have to adjuts the timezone offset.
 * This function returns a new date with the correct offset.
 *
 * @example
 * new Date('2021/01/01').trim('y','d').getDate() // 31
 * new Date('2021/01/01').trim('y','d').fixOffset().getDate() // 1
 */
Date.prototype.fixOffset = function() {
	return this.add(-this.getTimezoneOffset()+'m');
}
