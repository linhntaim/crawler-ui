# vue-starter

---

&raquo; [Project setup](#project-setup)

&raquo; [Environment variables](#environment-variables)

---

## Project setup

```
npm install
```

### Init the project

Build source code in `run` folder then setup and compile assets files to public folder:

```
npm run init
```

### Compiles and hot-reloads for development

```
npm run serve
```

** **Note**: Make sure you have assets setup and compile before executing 
by running [Init the project](#init-the-project) command.

### Compiles and minifies for production

```
npm run build
```

** **Note**: Please remember to create `.env` file, and make changes to values in it, 
especially for the [`VUE_APP_BUILD_PATH`](#vue_app_build_path) 
and [`VUE_APP_BUILD_COMPOSE`](#vue_app_build_compose) settings before making a build.

### Lints and fixes files

```
npm run lint
```

#### Build source code in `run` folder

```
npm run @run
```

#### Setup and compile asset files

```
npm run @assets
```

#### Setup asset files

Setup required asset files to `public` folder:

```
npm run @setup
```

#### Compile asset files

Compile asset files in `src/assets/css/public` folder and copy compiled files to `public` folder:

```
npm run @compile
```

#### Compose templates

You can compose Pug or Vue templates from HTML files by executing `@compose-*` commands.

HTML files should be placed in `src/assets/compose/html` directory.

##### Pug

Compose `.pug` files from HTML files in `src/assets/compose/html` directory.

```
npm run @compose-pug
```

Composed files will be stored in `src/assets/compose/pug` directory.

##### Vue

Compose `.vue` files from HTML files in `src/assets/compose` directory.

```
npm run @compose-vue
```

Composed files will be stored in `src/assets/compose/vue` directory.

Pug-composed files will also be stored in `src/assets/compose/pug` directory.

** **Note**: Make sure you have a template file named `.vue.template` in `src/views/templates` directory.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Environment variables

### VUE_APP_ENV

Determine environment to run.

Available values: 

- `production`: Run on production.
- `local`: Run on development.

### VUE_APP_KEY

A secret key for application to encrypt everything.

**Required** to set before running the application.

### VUE_APP_BUILD_PATH

Determine which folder to build source into.

Default value is `dist` folder.

If the source is built with [Laravel Starter](http://git-gbu.japaneast.cloudapp.azure.com/base/laravel-starter), 
the value should be `..\..\..\public\admin` (if you want to compose it as `standalone` part) 
or `..\..\..\public` (if you want to mix it with other main back-end host files)
('cause the source is usually put in `resources/themes/admin` folder of Laravel Starter).

### VUE_APP_BUILD_COMPOSE

Determine which target the build should be composed.

The possible values are:

- `standalone`: The build will include configuration files/folders. 
Used when built files are hosted independently.
- `<empty>`: The build will exclude configuration files/folders. 
Used when built files are hosted with other files.

### VUE_APP_DEBUG

Enable code for debugging.

Available values:

- `true`: Enable.
- `false`: Disable.

### VUE_APP_LOG_ONLY

Logs in application can be grouped by namespaces.

Only logs in namespaces set in value could be sent.

Namespaces are separated by the comma.

** **Note**: Debug must be enabled. 

### VUE_APP_ID

The unique name of the application.

Value is string. Should be valid with this regular expression: `^[a-z][a-z0-9_]*$`.

### VUE_APP_NAME

Display name of the application.

Value is string.

### VUE_APP_CLIENT

Value could be `admin` or `home`.

### VUE_APP_ADMIN_*

URI setting for `admin` application.

- **`VUE_APP_ADMIN_HOST`**: 
    - Value could be `sub` or `self`.
    - If value is `sub`, **`VUE_APP_ADMIN_HOST_SUB_PATH`** should be set. 
    It would append to current host that runs the `admin` application.
    - If value is `self`, **`VUE_APP_ADMIN_URL`** should be set. 
    It would be used as URI of the `admin` application.
    
### VUE_APP_HOME_*

URI setting for `home` application.

- **`VUE_APP_HOME_HOST`**: 
    - Value could be `sub` or `self`.
    - If value is `sub`, **`VUE_APP_HOME_HOST_SUB_PATH`** should be set. 
    It would append to current host that runs the `home` application.
    - If value is `self`, **`VUE_APP_HOME_URL`** should be set. 
    It would be used as URI of the `home` application.
    
### VUE_APP_SERVICE_*

Setting for `service` application.

- **`VUE_APP_SERVICE_HOST`**: 
    - Value could be `sub` or `self`.
    - If value is `sub`, **`VUE_APP_SERVICE_HOST_SUB_PATH`** should be set. 
    It would append to current host that runs the `service` application.
    - If value is `self`, **`VUE_APP_SERVICE_URL`** should be set. 
    It would be used as URI of the `service` application.
    
### VUE_APP_SERVICE_CLIENT_*

To authenticate via Laravel Passport using Password Grant Tokens, 
the application should know the client id (set by value of `VUE_APP_SERVICE_CLIENT_ID`) 
and secret (set by value of `VUE_APP_SERVICE_CLIENT_SECRET`) generated by Laravel Passport.

### VUE_APP_SERVICE_HEADER_*

Setting for some headers.

- **`VUE_APP_SERVICE_HEADER_SCREEN_NAME`**: 
    - Name of screen header for sending current screen information to service.
    - Default value should be `X-Screen`.
- **`VUE_APP_SERVICE_HEADER_SETTINGS_NAME`**: 
    - Name of settings header for sending localization settings to service.
    - Default value should be `X-Settings`.
- **`VUE_APP_SERVICE_HEADER_DEVICE_NAME`**:
    - Name of device header for sending device identification to service.
    - Default value should be `X-Device`.
- **`VUE_APP_SERVICE_HEADER_TOKEN_AUTHORIZATION_NAME`**: 
    - Name of authorization header for sending access token to service.
    - If **`VUE_APP_SERVICE_HEADER_BASIC_AUTHORIZATION`** is empty, the value could be anything.
    - If **`VUE_APP_SERVICE_HEADER_BASIC_AUTHORIZATION`** is set , the value should be `X-Authorization`.
- **`VUE_APP_SERVICE_HEADER_BASIC_AUTHORIZATION`**:
    - Set when basic authentication is set on the server.
    - Value should be `{username}:{password}`.
- **`VUE_APP_SERVICE_HEADER_BASIC_AUTHORIZATION_EXCEPTION`**:
    - For some reasons, application can be accessed via many domains. 
    Some of them can pass through basic authorization, some cannot.
    - Allowed domains should be set here, and they should be separated by the comma.

### VUE_APP_COOKIE_*

Settings for cookies.

- **`VUE_APP_COOKIE_DEFAULT_NAME`**:
    - Name of the default cookie of the application. This cookie is used for storing authentication, 
    i.e access token. 
    - Default value is taken from `APP_ID`.
- **`VUE_APP_COOKIE_DEVICE_NAME`**:
    - Name of the device cookie. On each browser accessing the application, 
    a device secret code will be generated and stored in this cookie for identification.
    - Default value is taken from `APP_ID` appended by `_device`.
- **`VUE_APP_COOKIE_SETTINGS_NAME`**:
    - Name of the cookie which contains localization settings.
    - Default value is taken from `APP_ID` appended by `_settings`.
- **`VUE_APP_COOKIE_DOMAIN`**:
    - The domain of all cookies.
    - Leave empty for use the current domain.
- **`VUE_APP_COOKIE_INCLUDE_SUBDOMAINS`**:
    - Set value to `true` to make the domain set for all cookies should be available for subdomains.
    
### Some default localization settings

- `VUE_APP_LOCALE`: 
    - Default locale of the application in ISO 639-1 format.
    - Value should be `ja` when deploying for Japan.
- `VUE_APP_TIMEZONE`: 
    - Default timezone of the application. 
    See [supported timezones](https://www.php.net/manual/en/timezones.php)
    - Value should be `Asia/Tokyo` when deploying for Japan.
- `VUE_APP_COUNTRY`: 
    - Default country of the application in ISO 3166-1 alpha-2 format.
    - Value should be `JP` when deploying for Japan.
- `VUE_APP_CURRENCY`: 
    - Default currency of the application in ISO 4217 format.
    - Value should be `JPY` when deploying for Japan.
- `VUE_APP_NUMBER_FORMAT`: 
    - Default number format of application.
    - Value could be:
        - `point_comma`: `1000000` will be formatted as `1,000,000.00`. It is the default value yet.
        - `point_space`: `1000000` will be formatted as `1 000 000.00`.
        - `comma_point`: `1000000` will be formatted as `1.000.000,00`.
        - `comma_space`: `1000000` will be formatted as `1 000 000,00`.

### VUE_APP_MAX_CHUNK_UPLOAD_SIZE

For uploading a large file by splitting it into chunks, the size of each chunk is set as the value in `bytes` here.

If value is empty, default size of `1MB` is applied.
