# Phaser Registry Plugin
By Joel Dies

[Demo](http://codepen.io/phreaknation/details/vgjPem/)

A simple tool to help save game information in a cleaner format, instead of the game object, that can be accessed anywhere in the game. Also supports saving the data to the localstorage, cookies, or to a RESTful API.

**This is not 100% documented but is on its way to being 100% documented.**

Help support these efforts by becoming a [Patreon](https://www.patreon.com/user?u=4928922)

If you wish to use this plugin in a commercial product, or get the full source [you may do so this way](https://gum.co/fHTN).

## Including in a project
Include the script into your html page.

Required Modules:

 + [Utilities](https://github.com/phreaknation/phreaknation.utilities)
 + [AJV](https://github.com/epoberezkin/ajv) [CDNJS](https://cdnjs.cloudflare.com/ajax/libs/ajv/4.11.2/ajv.min.js)
 + [Lodash](lodash.com) [CDNJS](https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js)
 + [object-path](https://github.com/mariocasciaro/object-path)


```
<script src="/path/to/plugin/ajv.min.js"></script>
<script src="/path/to/plugin/lodash.min.js"></script>
<script src="/path/to/plugin/objectPath.min.js"></script>

<script src="/path/to/plugin/phreaknation.utilities.min.js"></script>
<script src="/path/to/plugin/phreaknation.manager.registry.min.js"></script>
```

In your create of your phaser project.

```
game.plugins.add(PhreakNation.Plugins.RegistryManager);
```


#### Example:
```
var registry;
(function() {
  'use strict';

  var state = function state(game) {};

  state.prototype = {
    ...
    create: function () {
      ...
      registry = this.game.plugins.add(PhreakNation.Plugins.RegistryManager);
      registry.load('My Game');

      var regTypes = registry.getRegistryTypes();
      if (regTypes.indexOf('LOCALSTORAGE') !== -1) {
          registry.setRegistry(regTypes.LOCALSTORAGE);
          registry.load('My Game');

          if (_.isEmpty(registry.get())) {
              registry.set('test', {
                  this: {
                      is: {
                          a: 'test',
                      },
                  },
              });

              registry.save();
          }
          registry.set('a', {});
          registry.set('a.b', {});
          registry.set('a.b.c', 'd');

          registry.save();

          console.log(registry.get('a'));
          registry.remove('a.b.c');

          console.log(registry.get());
      }
      ...
    },
    ...
  };

  window.MyGame.states.MyState = state;
})();
```

### Registry Adapters
```
Cookies       Utilizing cookies for caching of data this is a tride and true method of storing limited data.
LocalStorage  LocalStorage is an HTML5 compliant storage protocal to allow in browser storage with higher capacity than Cookies.
RESTful API   This adapter allows for storage through a service api.
```

## Calls

### version()
Return the plugin version.

#### Example:
```
registry.version();
```

### description()
Return a description of this plugin.

#### Example:
```
registry.description();
```

### addRegistryType(regType)
Allows you to add your own registry adapter type that can be set.

#### Example:
```
/// {object} regType    Registry object to be passed as a valid registry type.
registry.addRegistryType({
  name: 'KEY_TO_BE_USED',
  functions: {
    load: function() {
      // Your load function
    },
    remove: function() {
      // Your remove function
    },
    save: function() {
      // Your save function
    },
  },
});
```

### allowDestroy(confirmed)
If true is passed it will allow the destroyRegistry function to be usable.

#### Example:
```
/// {boolean} [accepted=false]    Pass true to enable destroyRegistry.
registry.allowDestroy(true);
```

### destroyRegistry([boolean] accepted)
If allowDestroy has been set to true, and true is passed then this will destroy the registry without a recoverable option.

#### Example:
```
// {boolean} [accepted=false]    Pass true if you accept to destroy the registry
registry.allowDestroy(true);
registry.destroyRegistry(true);
```

### get(path)
Returns the value of a string path.

#### Example:
```
// {string} path    String path of the key.
registry.get("string.path");
```

### getRegistryTypes()
Returns the type of the current Register adapter.

#### Example:
```
var registryType = registry.getRegistryTypes();
```

### getResgister(type)
Returns the current Register adapter.

#### Example:
```
// {integer} type    Index of the register type.
var registryType = registry.getRegistryTypes();
var register = registry.getResgister(registryType);
```

### load(name)
Loads the registry based on the registry type.

#### Example:
```
// {string} [name]    Name of the registry
registry.load('My Game Name');
```

### parseData(strData)
Validates that the data can be set to the registry.

#### Example:
```
// {string} strData    String JSON object.
var data = registry.parseData('{"data": true}');
```

### remove(strData)
Removes an object from the registry.

#### Example:
```
// {string} path    Valid object path of an object in the registry.
registry.remove('a.b.c');
```

### save()
Saves the registry based on the registry type.

#### Example:
```
registry.save();
```

### set(path, value)
Sets a variable based on a string path. If no value is passed then it will just return like get.

#### Example:
```
// {string} path    String path of the key.
// {string} [value]    Object you wish to set to the 'path'.
registry.set("string.path", true);
```

### setRegistry(type)
Sets the registery type to available options.

#### Example:
```
// {number} [type=registry.REGISTRY_TYPES.LOCALSTORAGE]    Registry Type
registry.setRegistry(registry.REGISTRY_TYPES.LOCALSTORAGE);
```

### setRegistryName(name)
Sets the name of the registry for adapters that support naming such as Cookies and LocalStorage.

#### Example:
```
// {string} [name="GameRegistry"]    Name of the registry
registry.setRegistryName("My Game Title");
```

## Adapter Specific

### COOKIES

### setCacheLengthInDays(days)
Sets the number of days that the cache(cookies) will be stored for.

#### Example:
```
// {number} [days=365]    Number of days to keep the cache registry.
registry.setCacheLengthInDays(31);
```

### LOCALSTORAGE

### isLocalStorageSupported()
Returns if the browser supports localStorage or not.

#### Example:
```
var hasLS = registry.isLocalStorageSupported();
if (hasLS)
  registry.setRegistry(regTypes.LOCALSTORAGE);
else
  registry.setRegistry(regTypes.COOKIES);
```

### RESTful API

## Constants

### RESTAPI_METHODS
```
0 GET   Value to use GET methods in API calls.
1 POST  Value to use POST methods in API calls.
```

## Calls

### configREST(config)
Sets the RESTful API configuration based on the config option. Use '{}' around keys to replace with their values.
Replaceable Keys:
**registryname**: Name of the registry
#### **Object Format: config**
```
{
  method: Number,
  urls: {
    save: String,
    load: String,
    remove: String,
  },
  callback: {
    save: Function,
    load: Function,
    remove: Function,
  },
}
```

#### Example:
```
// {object} config    Config Object
registry.configREST({
  urls: {
    save: '/new/save/url/{registryname}',
  },
});
```
