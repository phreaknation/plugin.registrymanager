# Phaser Registry Plugin
By Joel Dies

This is a third party plugin for Phaser.io to handle Cookies, LocalStorage, and API Calls. This is not 100% documented but is on its way to being 100% documented.

If you wish to use this plugin in a commercial product, or get the full source.
[Registry](https://gum.co/fHTN)

## Including in a project
Include the script into your html page.

```
<script src="/path/to/plugin/helpers.min.js"></script>
<script src="/path/to/plugin/registry.min.js"></script>
```

In your create of your phaser project.

```
game.plugins.add(Phaser.Plugin.Registry);
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
      registry = this.game.plugins.add(Phaser.Plugin.Registry);
      registry.load('My Game');

      // Using the lodash Libarary
      if (_.isEmpty(registry.
      ())) {
          registry.set('test', {
              this: {
                  is: {
                      a: 'test',
                  },
              },
          });
          registry.save();
      }

      console.log(registry.get('test.this'));
      ...
    },
    ...
  };

  window.MyGame.states.MyState = state;
})();
```

## Constants

### REGISTRY_TYPES
```
0 NONE          Does not allow for any saving/loading.
1 CACHE         Set the registry for cookies.
2 LOCALSTORAGE  Set the registry for localstorage.
3 RESTFUL_API   Set the registry to use a RESTful API.
```

### RESTAPI_METHODS
```
0 GET   Value to use GET methods in API calls.
1 POST  Value to use POST methods in API calls.
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

### setRegistry(type)
Sets the registery type to available options.

#### Example:
```
// {number} [type=registry.REGISTRY_TYPES.LOCALSTORAGE]    Registry Type
registry.setRegistry(registry.REGISTRY_TYPES.LOCALSTORAGE);
```

### setRegistryName(name)
Sets the name of the registry for Cache and LocalStorage.

#### Example:
```
// {string} [name="GameRegistry"]    Name of the registry
registry.setRegistryName("My Game Title");
```

### setCacheLengthInDays(days)
Sets the number of days that the cache(cookies) will be stored for.

#### Example:
```
// {number} [days=365]    Number of days to keep the cache registry.
registry.setCacheLengthInDays(31);
```

### allowDestroy(confirmed)
If true is passed it will allow the destroyRegistry function to be usable.

#### Example:
```
/// {boolean} [accepted=false]    Pass true to enable destroyRegistry.
registry.allowDestroy(true);
```

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

### set(path, value)
Sets a variable based on a string path. If no value is passed then it will just return like get.

#### Example:
```
// {string} path    String path of the key.
// {string} [value]    Object you wish to set to the 'path'.
registry.set("string.path", true);
```

### get(path)
Returns the value of a string path.

#### Example:
```
// {string} path    String path of the key.
registry.get("string.path");
```

### save()
Saves the registry based on the registry type.

#### Example:
```
registry.save();
```

### load(name)
Loads the registry based on the registry type.

#### Example:
```
// {string} [name]    Name of the registry
registry.load('My Game Name');
```

### destroyRegistry([boolean] accepted)
If allowDestroy has been set to true, and true is passed then this will destroy the registry without a recoverable option.

#### Example:
```
// {boolean} [accepted=false]    Pass true if you accept to destroy the registry
registry.allowDestroy(true);
registry.destroyRegistry(true);
```
