# Led

Run with:
```bash
node eg/led.js
```


```javascript
var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
  // Default to pin 13
  var led = new five.Led(process.argv[2] || 13);

  this.repl.inject({
    led: led
  });
});


```


## Breadboard/Illustration


![docs/breadboard/led.png](breadboard/led.png)
[docs/breadboard/led.fzz](breadboard/led.fzz)



This script will make `led` available in the REPL, by default on pin 13.
Now you can try, e.g.:

`>> led.on()`

or

`>> led.off()`

To use other `Led` methods, like `fade`, `pulse`, `animate`, you'll need to
wire the LED to a PWM pin. If you use a different pin, make sure to run
the script with the correct pin number:

`node eg/led.js [pinNumber]`





## Contributing
All contributions must adhere to the [Idiomatic.js Style Guide](https://github.com/rwldrn/idiomatic.js),
by maintaining the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>
Licensed under the MIT license.
