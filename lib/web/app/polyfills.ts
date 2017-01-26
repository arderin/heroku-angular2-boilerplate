//import polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/assign';
import 'zone.js/dist/zone';

// Typescript helpers
import 'ts-helpers';


//Extend array 
declare global{
	interface Array<T> {
	   compare(o: Array<T>): boolean;
	}
}


Array.prototype.compare = function(o) {
    if (this.length != o.length) return false;
    for (var i = 0; i < o.length; i++) {
        if (this[i].compare) { //To test values in nested arrays
            if (!this[i].compare(o[i])) return false;
        }
        else if (this[i] !== o[i]) return false;
    }
    return true;
}