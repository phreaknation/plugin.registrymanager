# Phaser Registry Plugin
By Joel Dies

This is a third party plugin for Phaser.io to handle Cookies, LocalStorage, and API Calls.


## Including in a project
Include the script into your html page.

```
<script src="/path/to/plugin/registry.min.js"></script>
```

In your create of your phaser project.

```
game.plugins.add(Phaser.Plugin.Registry);
```

**Example:**
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
| Constant | value | Description |
| --- | --- | --- |
| NONE | 0 | Does not allow for any saving/loading. |
| CACHE | 1 | Set the registry for cookies. |
| LOCALSTORAGE | 2 | Set the registry for localstorage. |
| RESTFUL_API | 3 | Set the registry to use a RESTful API. |

### RESTAPI_METHODS
| Constant | value | Description |
| --- | --- | --- |
| GET | 0 | Value to use GET methods in API calls. |
| POST | 1 | Value to use POST methods in API calls. |

## Calls

### version()
Return the plugin version.
#### **Example:**
```
registry.version();
```

### description()
Return a description of this plugin.
#### **Example:**
```
registry.description();
```

### setRegistry(type)
Sets the registery type to available options.
#### **Example:**
```
// {number} [type=registry.REGISTRY_TYPES.LOCALSTORAGE]    Registry Type
registry.setRegistry(registry.REGISTRY_TYPES.LOCALSTORAGE);
```

### setRegistryName(name)
Sets the name of the registry for Cache and LocalStorage.
#### **Example:**
```
// {string} [name="GameRegistry"]    Name of the registry
registry.setRegistryName("My Game Title");
```

### setCacheLengthInDays(days)
Sets the number of days that the cache(cookies) will be stored for.
#### **Example:**
```
// {number} [days=365]    Number of days to keep the cache registry.
registry.setCacheLengthInDays(31);
```

### allowDestroy(confirmed)
If true is passed it will allow the destroyRegistry function to be usable.
#### **Example:**
```
/// {boolean} [accepted=false]    Pass true to enable destroyRegistry.
registry.allowDestroy(true);
```

### configREST(config)
...
#### **Example:**
```
...
```

### set(path, value)
| Type | Default | Argument | Description |
| --- | --- | --- | --- |
| string | | **path** | String path |
| string | | **value** | some kind of object type |
Sets a variable based on a string path. If no value is passed then it will just return like get.
#### **Example:**
```
// {string} path    String path of the key.
// {string} [value]    Object you wish to set to the 'path'
registry.set("string.path", true);
```

### get(path)
Returns the value of a string path.
#### **Example:**
```
// {string} path    String path of the key.
registry.set("string.path");
```

### save()
Saves the registry based on the registry type.
#### **Example:**
```
registry.save();
```

### load(name)
Loads the registry based on the registry type.
#### **Example:**
```
// {string} [name]    Name of the registry
registry.load('My Game Name');
```

### destroyRegistry([boolean] accepted)
If allowDestroy has been set to true, and true is passed then this will destroy the registry without a recoverable option.
#### **Example:**
```
// {boolean} [accepted=false]    Pass true if you accept to destroy the registry
registry.allowDestroy(true);
registry.destroyRegistry(true);
```
