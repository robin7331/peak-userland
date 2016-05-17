var PeakModule = function (peak, customData) {
   this.packageJSON = require('./package.json');
   this.config = require('./config');
   this.peak = peak;
   this.nativeMethods = customData.native;
   this.JSMethods = customData.js;
}


/**
 * Binds a custom JS function to the PeakCore system.
 * @param  {string} functionName The name of the function.
 * @param  {object} func         The function itself.
 */
PeakModule.prototype.bind = function(functionName, func){

	var JSMethodDefinition = this.peak.getJSMethodDefinition("peakUserland",functionName);

	if(JSMethodDefinition === undefined){
		this._error(functionName +"() is not declared in method definitions!")
		return;
	}

	//Register a callable JS Function that simply broadcasts an event that has the same name as the function
	this[functionName] = func;
	if(this.peak.config.debug){
		this._info(functionName + "() has been binded to " + this.name);
	}
};

module.exports = PeakModule;
