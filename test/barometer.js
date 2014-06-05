var MockFirmata = require("./mock-firmata"),
  five = require("../lib/johnny-five.js"),
  events = require("events"),
  sinon = require("sinon"),
  Board = five.Board,
  Barometer = five.Barometer;

function newBoard() {
  return new Board({
    io: new MockFirmata(),
    debug: true,
    repl: false
  });
}


exports["Barometer: BMP18X"] = {
  setUp: function (done) {
    this.board = newBoard();
    this.spy = sinon.spy(this.board.io, "digitalWrite");
    this.barometer = new Barometer({
      board: this.board,
      device: "BMP18X",
      pressureAtSeaLevel : 1008,
    });

    this.proto = [{
      name: "pressure"
    }, {
      name: "temperature"
    }, {
      name: "altitude"
    }];

    this.instance = [{
      name: "pressureAtSeaLevel"
    }];
    
    done();
  },
  shape: function(test) {
    test.expect(this.proto.length + this.instance.length);
    this.proto.forEach(function(method) {
      test.equal(typeof this.barometer[method.name], "function");
    }, this);

    this.instance.forEach(function(property) {
      test.notEqual(typeof this.barometer[property.name], "undefined");
    }, this);

    test.done();
  },
};