## Phaser Registry Plugin
By Joel Dies

This is a THIRD party plugin for Phaser.io to handle Cookies, LocalStorage, and API Calls.


### Constants

#### REGISTRY_TYPES
Constant | value | Description
--- | --- | ---
NONE | 0 | Does not allow for any saving/loading.
CACHE | 1 | Set the registry for cookies.
LOCALSTORAGE | 2 | Set the registry for localstorage.
RESTFUL_API | 3 | Set the registry to use a RESTful API.

#### RESTAPI_METHODS
Constant | value | Description
--- | --- | ---
GET | 0 | Value to use GET methods in API calls.
POST | 1 | Value to use POST methods in API calls.

### Calls

#### version()
Return the plugin version.
##### **Example:**
registry.version();

#### description()
Return a description of this plugin.
##### **Example:**
registry.description();

#### setRegistry(type)
Type | Default | Argument | Description
--- | --- | --- | ---
number | registry.REGISTRY_TYPES.LOCALSTORAGE | **type** | Registry Type
Sets the registery type to available options.
##### **Example:**
registry.setRegistry(registry.REGISTRY_TYPES.LOCALSTORAGE);

#### setRegistryName(name)
Type | Default | Argument | Description
--- | --- | --- | ---
string | "GameRegistry" | **name** | Name of the registry
Sets the name of the registry for Cache and LocalStorage.
##### **Example:**
registry.setRegistryName("My Game Title");

#### setCacheLengthInDays(days)
Type | Default | Argument | Description
--- | --- | --- | ---
number | 365 | **days** | Number of days to keep the cache registry
Sets the number of days that the cache(cookies) will be stored for.
##### **Example:**
registry.setCacheLengthInDays(31);

#### allowDestroy(confirmed)
Type | Default | Argument | Description
--- | --- | --- | ---
boolean | false | **accepted** | Pass true to enable destroyRegistry
If true is passed it will allow the destroyRegistry function to be usable.
##### **Example:**
registry.allowDestroy(true);

#### configREST(config)
...
##### **Example:**
...

#### set(path, value)
Type | Default | Argument | Description
--- | --- | --- | ---
string | | **path** | String path
string | | **value** | some kind of object type
Sets a variable based on a string path.
##### **Example:**
registry.set("string.path", true);

#### get(path)
Type | Default | Argument | Description
--- | --- | --- | ---
string | | **path** | String path
Returns the value of a string path.
##### **Example:**
registry.set("string.path");

#### save()
Saves the registry based on the registry type.
##### **Example:**
registry.save();

#### load()
Loads the registry based on the registry type.
##### **Example:**
registry.load();

#### destroyRegistry([boolean] accepted)
Type | Default | Argument | Description
--- | --- | --- | ---
boolean | false | **accepted** | Pass true if you accept to destroy the registry
If allowDestroy has been set to true, and true is passed then this will destroy the registry without a recoverable option.
##### **Example:**
registry.allowDestroy(true);
registry.destroyRegistry(true);
