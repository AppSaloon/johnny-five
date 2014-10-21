var Board = require("../lib/board.js"),
	events = require("events"),
	util = require("util"),
	__ = require("../lib/fn.js"),
	async = require("async");

var priv = new Map(),
	Devices;

Devices = {
	"BMP18X" : {
		address : 0x77,
		addresses :{
			CAL_AC1 : 0xAA, // R Calibration data (16 bits)
			CAL_AC2 : 0xAC, // R Calibration data (16 bits)
			CAL_AC3 : 0xAE, // R Calibration data (16 bits)
			CAL_AC4 : 0xB0, // R Calibration data (16 bits)
			CAL_AC5 : 0xB2, // R Calibration data (16 bits)
			CAL_AC6 : 0xB4, // R Calibration data (16 bits)
			CAL_B1 : 0xB6, // R Calibration data (16 bits)
			CAL_B2 : 0xB8, // R Calibration data (16 bits)
			CAL_MB : 0xBA, // R Calibration data (16 bits)
			CAL_MC : 0xBC, // R Calibration data (16 bits)
			CAL_MD : 0xBE, // R Calibration data (16 bits)
			CHIPID : 0xD0,
			VERSION : 0xD1,
			SOFTRESET : 0xE0,
			CONTROL : 0xF4,
			TEMPDATA : 0xF6,
			TEMPDATAL : 0XF7,
			PRESSUREDATA : 0xF6,
			READTEMPCMD : 0x2E,
			READPRESSURECMD : 0x34
		},
		i2c: {
			init : function () {
				var coeffs = [
					{get:"CAL_AC1", signed: true},
					{get:"CAL_AC2", signed: true},
					{get:"CAL_AC3", signed: true},
					{get:"CAL_AC4", signed: false},
					{get:"CAL_AC5", signed: false},
					{get:"CAL_AC6", signed: false},
					{get:"CAL_B1", signed: true},
					{get:"CAL_B2", signed: true},
					{get:"CAL_MB", signed: true},
					{get:"CAL_MC", signed: true},
					{get:"CAL_MD", signed: true}
				];

				async.forEachSeries(coeffs, function (coeff, callback) {
					that.board.sendI2CWriteRequest()
				})
				// Get all coeffs 
				// use async
				// emit "ready"
			}
		}, 
		descriptor: {
			// this is a descriptor object passed to Object.defineProperties
			temperature: {
				get: function() {
				 // this state object is updated by the i2c read/write methods 
				 return priv.get(this).temperature;
				}
			}, 
			pressure: {
				get: function() {
				 // this state object is updated by the i2c read/write methods 
				 return priv.get(this).pressure;
				}
			},
			altitude : {
				get: function () {
					return priv.get(this).altitude;
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
	Object.defineProperties(this, descriptor);

	this.pressureAtSeaLevel = typeof this.opts.pressureAtSeaLevel !== "undefined" ?
		this.opts.pressureAtSeaLevel : 1000;
	this.freq = opts.freq || 2000;

	 // Make private data entry
  priv.set(this, {
    altitude: 0,
    pressure: 0,
    temperature: 0
  });

	// Set up I2C data connection
	this.io.sendI2CConfig();
	
	device.i2c.init();
	//Get all coeffs
	
	//Set interval
	//Get pressure and temperature
	

	// events: data
}

util.inherits(Barometer, events.EventEmitter);

module.exports = Barometer;
