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

