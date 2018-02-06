# Peak Userland #

This is a Peak module that enables function native od JS function calls from within your application (userland).
The core module itself already has a couple of internal methods like the Logger which it uses to communicate between the native and iOS world.

You obviously want your very own function calls like f.ex. when a user clicks on a button in a webview you might want to trigger a native method. This is where this userland module comes to action.
Like Peak Core itself it uses `method definitions` to prevent any typos in function calls. 

## Installation ##

1. Add the peak userland library to your JS project via NPM ```npm install @peak-app/peak-userland --save```
2. Tell peak to use the userland module:

```javascript
const methodDefinitions = require('./method-definitions');
const peakUserland = peak.useModule(require('@peak-app/peak-userland'), methodDefinitions);
```

## Method definitions ##

Define all the methods, that you need in this particular App.
In this example we will build an mobile App that has a calculator functionality.
This calculator stores the latest result within the native App bundle.

We might need ```clear()``` as a JS function to reset the calculator and ```storeResult(result) aswell as getLastResult()``` as native methods that we then call from within JS.

Our method-definitions.js file might look like this:

```javascript

module.exports = {
   native: [
      {
      	name: 'storeResult',		
      	payloadType: 'number'
      },
      {
        name: 'getLastResult',
        callbackDataType: 'number'
      }
   ],
   js: [
      {
         name: 'clear'
      }
   ]
}
```

After defining all required methods we now just have to implement them.


## Implementing and binding JS Functions ##

We only have one JS function, this could be implemented like this:


```javascript

// grab a reference to the userland module
const userland = peak.modules.peakUserland 

userland.bind('clear', () => {
   // do whatever clear does...
   
   // Use peaks internal logger either through peak.logger.info() or conveniently via peak.info() or peak.error()
   peak.info("We have cleared the UI!")
})

// After binding a method to the userland module, you could also access it through:
userland.clear()
  
```

## Call native methods ##

```javascript

// all native methods defined in the method definitions are callable like this:
userland.storeResult(120);
```
