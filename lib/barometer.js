var Board = require("../lib/board.js"),
  events = require("events"),
  util = require("util"),
  __ = require("../lib/fn.js");

var priv = new Map(),
	Devices;

Devices = {
	"BMP18X" : {
		i2c: {

		}, 
    descriptor: {
       // this is a descriptor object passed to Object.defineProperties
       temperature: {
         get: function() {
           // this state object is updated by the i2c read/write methods 
           return; //priv.get(this).temperature;
         }
       }, 
       pressure: {
         get: function() {
           // this state object is updated by the i2c read/write methods 
           return; //priv.get(this).pressure;
         }
       },
       altitude : {
       	get: function () {
       		return; //priv.get(this).altitude;
       	}
       }
    }
	},
	"MPL115A2" : {

	},
	"MPL3115A2" : {

	},
	"T5403" : {

	}
};

function Barometer(opts) {
	if (!(this instanceof Barometer)) {
    return new Barometer(opts);
  }

  var descriptor, device;

  // Initialize a Device instance on a Board
  Board.Device.call(
  	this, this.opts = Board.Options(opts)
  );

  device = Devices[this.opts.device];

	descriptor = device.descriptor;

  this.pressureAtSeaLevel = typeof this.opts.pressureAtSeaLevel !== "undefined" ?
    this.opts.pressureAtSeaLevel : 1000;
  this.freq = opts.freq || 2000;

  // Set up I2C data connection
  this.io.sendI2CConfig();
  
  //Get all coeffs
  
  //Set interval
  //Get pressure and temperature
  

  // events: data

  if (descriptor) {
    Object.defineProperties(this, descriptor);
  }
}

util.inherits(Barometer, events.EventEmitter);

Barometer.prototype.pressure = function () {

  return this;
};
Barometer.prototype.temperature = function () {

  return this;
};
Barometer.prototype.altitude = function () {

  return this;
};

module.exports = Barometer;
