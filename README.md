# Comite API

## Menú
- [Estructura de carpetas](#estructura-de-carpetas)
- [Internacionalización](#internacionalizacion)
- [Manejo de errores](#manejo-de-errores)


# Estructura de carpetas

### Vista general de la estructura de carpetas

```
|-- docker
    |-- dev
    |-- prod
    |-- qa
|-- src
    |-- components
    |-- configs
    |-- helpers
    |-- middlewares
    |-- migrations
    |-- shared
```

# Docker

Esta carpeta tendra los archivos de configuracion de docker, para generar diferentes tipos de ambiente en docker por ejemplo dev, prod, qa etc.

```
|-- docker
    |-- dev
        |-- docker-compose.yml
        |-- Dockerfile
    |-- prod
        |-- docker-compose.yml
        |-- Dockerfile
    |-- qa
        |-- docker-compose.yml
        |-- Dockerfile
```

# src

Esta carpeta tendra la estructura de carpetas de nuestra aplicacion, dentro de esta carpeta se encontraran las carpetas de configuracion, helpers, middlewares, migrations, shared y components.

```
|-- src
    |-- components
    |-- configs
    |-- helpers
    |-- middlewares
    |-- migrations
    |-- shared
```

# Components

Esta carpeta tendra los modulos de nuestra aplicacion, cada modulo tendra su propia carpeta con su respectivo nombre, dentro de esta carpeta se encontraran los archivos de configuracion de dicho modulo, dentro la misma crearemos una subcarpeta que tendra por nombre el tipo del archivo que estemos creando, los unicos archivos que dejaremos fuera de carpetas serian routes, controller, service.

```
|-- components
    |-- users
        |-- entities
            |-- user.entity.ts
        |-- repositories
            |-- user.repository.ts
        |-- Exceptions
            |-- user.exception.ts
        |-- Interfaces
            |-- user.interface.ts
        |-- user.controller.ts
        |-- user.routes.ts
        |-- user.service.ts
```

# configs

Esta carpeta tendra los archivos de configuracion de nuestra aplicacion, como por ejemplo el archivo de configuracion de la base de datos, envs etc.

```
|-- configs
    |-- database.config.ts
    |-- envs.config.ts
```

# Helpers

Esta carpte tendra los archivos/modulos de ayuda para nuestra aplicacion, como por ejemplo modulos que podriamos reutilizar en otros modulos.

```
|-- helpers
    |-- email
        |-- email.service.ts
```

# middlewares

Esta carpeta tendra los archivos middlewares de nuestra aplicacion, como por ejemplo el middleware de autenticacion, en caso de ser necesario crear una subcarpeta con el nombre del middleare y dentro poner los archivos que pertenecen al mismo.

```
|-- middlewares
    |-- auth
        |-- auth.middleware.ts
```

# migrations

Esta carpeta tendra los archivos de migraciones de nuestra base de datos, es necesario crear una subcarpeta con el nombre del modulo al que pertenece la migracion y dentro de la carpeta generar el archivo de migracion

```
|-- migrations
    |-- users
        |-- 1621231231231-create_table_user.ts
        |-- 1625342231231-alter_table_user_add_profile_column.ts
```

# shared

Esta carpeta tendra archivos que podremos reutilizar para complementar alguna parte de nuestro codigo, por ejemplo, interfaces, enums, exceptions generales, etc.

```
|-- shared
    |-- enums
        |-- general.enum.ts
    |-- exceptions
        |-- general.exception.ts
    |-- interfaces
        |-- general.interface.ts

```

# Internacionalizacion

Para internacionalizar los mensajes se deben seguir los siguientes pasos:

- Dar de alta en el diccionario lo que queremos traducir. Los diccionarios son archivos .json ubicados en:

```js
src/internationalization/locales/
```

- Estos archivos .json contienen las traducciones de la API:

```js
// INGLÉS en.json
{
  "hello": "Hello",
  "shared": { // Traducciones globales
    "404Error": "Element Not Found"
  },
  "components": { // Traducciones por módulo
    "users": {
      "prueba": "Testing"
    }
  }
}

// ESPAÑOL es.json
{
  "hello": "HOLA",
  "shared": { // Traducciones globales
    "404Error": "Elemento no encontrado"
  },
  "components": { // Traducciones por módulo
    "users": {
      "prueba": "PRUEBA"
    }
  }
}
```

Una vez dado de alta lo que queremos traducir debemos de llamar a la función encargada de la traducción:

```js
// Importamos el módulo
import { ALS } from "../../shared/local-storage/internationalization.storage";

// Aplicamos la función
ALS.getI18n().__("hello");
```

A la función le tenemos que mandar el camino de donde está nuestra traducción. Basándonos en los archivos .json de arriba el ejemplo quedaría así:

```js
ALS.getI18n().__("shared.404Error"); // -> Elemento no encontrado
ALS.getI18n().__("components.users.prueba"); // -> PRUEBA
```

# Manejo de errores

Guía para manejo de errores en Comite API

Dentro de la ruta:

```js
src/shared/error-handler/custom-errors;
```

estarán dados de alta los errores comunes (400, 404, 4022, etc) que vayamos notando que pueden ser útiles en todoe el proyecto.
Una vez creado el error custom solo hay que importarlo donde lo necesitemos y usarlo de la siguiente manera:

```js
// IMPORTAMOS EL CUSTOM-ERROR
import { HTTP400Error } from "../../shared/error-handler/custom-errors/http-400-error.error";

const errorTesing = (error) => {
  if (error) {
      // LO LANZAMOS COMO SI FUERA UN EXCEPTION
    throw new HTTP400Error({
      description: "The user could not loggin cause an bad request error",
      name: "Error Login User",
    });
  }
};
```

ES IMPORTANTE MANEJAR LOS ERRORES DE ESTA MANERA YA QUE EN AUTOMÁTICO SE CREARAN LOGS DEL MISMO
