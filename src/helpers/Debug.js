/* =============================================================================== */
// DEBUG LOGGER
// ------------------------------
// Debug.js
/* =============================================================================== */

// Debug Levels
export const DebugLevel = {
	NO_SAUCE: 0,
	SWEET: 1,
	MILD: 2,
	SPICY: 3
}

const setting = DebugLevel.MILD;

/**
*	Debug Class
* @name Debug
* @description Provides debug logging according to specified settings
*	@author Michael Smallcombe
*/
export class Debug {
	/* =============================================================================== */
	// STATIC FUNCTIONS
	/* =============================================================================== */
	/* ================================= */
	// Output Logger
	// description:
	// outputs the specified debug message if
	// the level is greater than the setting
	// parameters:
	// Integer level - priority value greater than 0, 1 being the highest
	// String component - component name
	// Object output - desired debug output
	/* ================================= */
	static output(level, component, output) {
		if(level > 0 && level <= setting) {
			if (typeof output === 'object') {
				console.log("[DEBUG] - " + component + ": ");
				console.log(output);
			} else {
				console.log("[DEBUG] - " + component + ": " + output);
			}
		}
	}
}
