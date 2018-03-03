
// Empty Object Check
export function isEmpty(object) {
	if(Object.keys(object).length === 0 && object.contructor === Object) {
		return true;
	} else {
		return false;
	}
}

// Truncate
export function truncate(string, length) {
	const ending = "...";
	// Check string length
	if (string.length > length) {
		// Truncate using substring, add the ending, and return the string
	  return string.substring(0, length - ending.length) + ending;
	} else {
		// String is within specified length, return without changes
	  return string;
	}
}
