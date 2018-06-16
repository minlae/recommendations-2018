export function compareValues(key, order='asc') {
 // sorts an array of objects by whatever property value you set - as a string
 // e.g. items.sort(compareValues('priority'));
 // default value is 'asc' but you can also do 'desc' to go in reverse
	return function(a, b) {
		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key) ) {
			// property doesn't exist on either object
			return 0;
		}

		const itemA = (typeof a[key] === 'string') ?
			a[key].toUpperCase() : a[key];
		const itemB = (typeof b[key] === 'string') ?
			b[key].toUpperCase() : b[key];

		let comparison = 0;

		if (itemA > itemB) {
			comparison = -1;
		} else if (itemA < itemB) {
			comparison = 1;
		}

		return (
		 (order == 'desc') ? (comparison * -1) : comparison
		);
	};
	// Great tutorial on how to write this here: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
}