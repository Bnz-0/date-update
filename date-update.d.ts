// Type definitions for date-update

export type timeUnit = 'y'|'M'|'d'|'h'|'m'|'s'|'ms';

declare global {
    interface Date {

        /**
         * returns a new date resetting the date/time not in `[a; b]`
         * @param {timeUnit} a one of `y`, `M`, `d`, `h`, `m`, `s`, `ms`
         * @param {timeUnit} b one of `y`, `M`, `d`, `h`, `m`, `s`, `ms`
         *
         * @example
         * var time = new Date().trim('h', 'ms') //keep only the time form hours to milliseconds
         */
        trim(a: timeUnit, b: timeUnit): Date;

        /**
         * add an amount of time to the date and return it in a new Date
         * @param {string} time2add a string representing an expression of the amount of time to add.
         * the expression must be a sequence of **integer** and **time unit of measure**
         * (which could be one of these: `y`, `M`, `d`, `h`, `m`, `s`, `ms`)
         *
         * @example
         * var date = new Date().add("+3d -1h") //adds 3 days and subtract 1 hour
         */
        add(time2add: string): Date;

		/**
		 * since this library reason in UTC to avoid some other problems, to get the correct local date you have to adjuts the timezone offset.
		 * This function returns a new date with the correct offset.
		 *
		 * @example
		 * new Date('2021/01/01').trim('y','d').getDate() // 31
		 * new Date('2021/01/01').trim('y','d').fixOffset().getDate() // 1
		 */
		fixOffset(): Date;

    }
}
