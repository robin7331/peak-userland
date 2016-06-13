# PEAK Userland #

## Installation ##

1. Add the peak userland Library to your JS project via NPM ```npm install @bitmechanics/peak-userland --save```
2. Use this module in peak:

```
#!javascript

const methodDefinitions = require('./method-definitions');
const peakUserland = peak.useModule(require('@bitmechanics/peak-userland'), methodDefinitions);
```

## Method definitions ##

Define all the methods, that you need in this particular App.
In this example we will build an mobile App that has a calculator functionality.
This calculator stores the latest result in the App bundle.

We might need ```clear()``` as a JS function to reset the calculator and ```storeResult(result) aswell as getLastResult()``` as native methods.

Our method-definitions.js file will look like this:

```
#!javascript

module.exports = {
   native: [
      {
      	name: 'storeResult',		
      	payloadType: 'number'
      },
      {
        name: 'getLastResult',
        callback: {
           callbackDataType: 'number'
        }
      }
   ],
   js: [
      {
         name: 'clear'
      }
   ]
}
```


In our App we now need to implement these functions.
We only have one JS function, this could be implemented like this:


```
#!javascript


new Vue({

   ready: function() {
     
      const userland = peak.modules.peakUserland; // grab a reference to the userland module
      userland.bind('clear', this.clearUI);       // 'bind' this.clearUI to the defined method definition. This method can now be called from native.
     
   },

   methods: {

      clearUI: function() {
         this.result = '';
         this.steps = [];
         ...
         this.peak.info("results cleared!");     // You can always access the logger via this.peak.info or this.peak.error (or this.peak.logger)
      }
   }
});

```