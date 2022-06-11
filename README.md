# Fintonic Technical Challenge

```
IMPORTANT: I don't know your preferred language to respond the question on the challenge. Because it was sent me in Spanish, I will use that language in the following sections.
```

## Preguntas iniciales

### ¿Cuántos años llevas trabajando con Javascript?

Prácticamente desde que empecé mi carrera profesional, hará unos 12 años. Bien sea porque tenía que desarrollar en node, react o simplemente porque tenía que incluir algún script en jQuery en algúna web.

### ¿y con nodejs?

Dejando de lado pequeños sevicios o módulos internos, centrándonos sólo en soluciones que tuvieran el backend en node como framework principal, aproximádamente 2 años.

### ¿Con qué versiones de node.js?

Cuando entré en mi compañía actual, trabajan con versiones deprecadas de node. Por lo que tuve que trabajar con node 10 y node 12. No obstante, a lo largo de mi instancia en ella, el equipo tech llevó acabo varias iniciativas para reducir la deuda técnica. Por lo que migramos directamente a la versión 16.

### ¿Has trabajado con otros lenguajes de servidor?

Si.

Durante mi carrera profesional, estuve trabajando alrededor de 8 años con el framework de .Net, en todas sus versiones (.Net Core, .NetStandard, C#, VBNet, Webforms, Winforms...).

También parcitipe durante unos 2 años en un proyecto que tenía su backend en Phyton + Flask.

Y participando en menor medida o en proyectos de escasa relevancia, tuve que apoyar en el desarrollo del algunos modulos en proyectos que tenía su backend en PHP y Java.

### ¿Haces testing? ¿Qué usas para ello?

Definitivamente si, aunque las herramientas de testing depende del framework en concreto.

- En proyectos .Net, he trabajado con la suite the NetUnit
- En phyton con pytest y supertest
- En NodeJs y React con jest y supertest
- En Java con JUni
- Test E2E Cypress + Docker

En cuanto al approach de testing, independientemente de las herramientas, intento hacer TDD, me baso sobretodo en la pirámide del testing y suelo seguir un enfoque de dentro a hacia afuera, porque es el que me sale más natural. Es decir, multitud de test unitarios, en menor medida de integración, sólo happy-paths o features críticas con E2E y empezando desde la abstracción más pequeña hasta la exposición del endpoint.

Como nota, E2E entendido desde que pulsamos un botón en la web hasta la BD.

Adicionalmente, estoy bastante acostumbrado a que la ejecución de los test esté automatizada y se tiren en CI.

### ¿Cuál es la caracterísitca que más te gusta y usas de ES6 en adelante? ¿Por algún motivo?

Realmente desconzco que características se introdujeron en que versión específica, por lo que no se si estoy destacando algo que se introdujo antes o después de ES6. Pero suelo optar por arrow functions en vez de standard functions. No hay un motivo en especial, simplemente siento que es un stilyng más limpio.

### ¿Estás familiarizado con el uso de git?

Si, llevo varios años ya utilizando git como repositorio principal de código. Además he trabajado con muchas de sus features como gitflow o github actions.

### ¿Y con terminal Unix?

En este caso no mucha. Generalmente trabajo con equipos en Windows, lo poco que he tenido que trabajar con Unix ha sido cuando he tenido que modificar o crear algún pipeline en Jenkins o en el shell de la CI de github.

### ¿Algún sitio personal que podamos ver?

No tengo proyectos personales ni participo en proyectos open source, por lo que no tengo nada para mostrar en este caso.

Lo único que hay en mi repositorio personal de Github son pruebas de selección antiguas para otras empresas, y quizás fueron hechas cuando mi nivel de senority era menor.

No obstante, sentirios libres de curiosear en los repos de esta misma prueba.

## Ejecución del proyecto

### Requisitos previos

Como requisito previo para levantar la aplicación es necesario proporcionar una conexión a mongo válida. Para ello podéis:

- Utilizar la imagen de mongo incluida en el propio proyecto. Simplemente ejecutad `docker-compose up` en una consola
- Modificar el archivo `config.ts` cambiando los valores por defecto para generar una cadena de conexión diferente.
- Cambiar la variables de entorno según lo especificado en el archivo `config.ts` para que se genere la cadena de conexión adecuada al levantar la aplicación.

### Ejecución de la aplicación

Una vez generado una instancia de mongo (punto anterior):

- Ejecutad `npm run start`
- Las peticiones pueden realizarse a
  - `GET http://localhost:4000/products`
  - `POST http://localhost:4000/products`
    - Require authenticación. Simplemente introducid cualquier string `Barear loQueSea` en la cabecera de autenticación
    - El payload sólo admite:
      - `name: string` mandatory
      - `description?: string` opcional
  - `DELETE http://localhost:4000/products/:productId`
    - Al igual que el endpoint anterior, require authenticación.

### Ejecución de la aplicación

Una vez generado una instancia de mongo, simplemente hay que ejecutar `npm run test`

## Notas sobre el approach elegido

Creo necesario realizar algunos comentarios sobre algunos de los aspectos de la solución o matizar algún aspecto. Sin ningún orden en concreto:

- En una solución real, seguramente el endpoint para listar los productos tendría algún tipo de paginación. Pero por simplicidad de la solución he optado por no hacerlo en el challenge. Pero el approach hubiera sido incluir query params en la llamada, y tras normalizarlos y pasar por todas las capas, acabarían en el repositorio siendo parte de las llamas a los métodos `limit` y `skip`.
- No he incluido endpoints para retrivear un producto concreto o actualizarlo, porque se especificaba en el challenge no incluir cosas extra.
- En una aplicación real, la parte de authenticación estaría delegada en un framework de los más habituales, passport, OAuth, etc...
- La authenticación elegida en este caso, ha sido un Barear Token al uso. No obstante, por simplicidad de la solución, simplemente se acepta cualquier string que venga en la cabecera de autenticación. Pero considero que es suficiente, para evaluar el challenge o como podría estructurarse el código en una solución real.
- Respecto al logger, en una solución real, sería conveniente utilizar algún tipo de framework que mantenga el correlation-id durante todo el ciclo de vida de la petición.
- En cuanto al approach elegido, he intentado seguir una arquitectura hexagonal. La idea es que cada módulo sea un hexágono aislado del resto.
- Dentro de cada hexágono encontraríamos estás carpetas
  - _application_: Esta carpeta contiene casos de uso básicos, y su objetivo es ser consumidos por aquellos puntos de entrada al hexágono que gestionan la interacción con elementos de fuera del contexto (peticiones del cliente, suscriptores a eventos, etc...)
  - _domain_: Es el centro del hexágono y el que contiene la lógica del mismo. Suele tener varias secciones, de las cuales las más importantes son:
    - `entities`: Contiene las entidades de dominio
    - `services`: Contiene lógica de negocio que va ha ser consumida desde diferentes casos de uso o por otros hexágonos
  - _infraestructure_: Contiene toda la parte de interacción con elementos de fuera del contexto. Desde gestores de peticiones HTTP, preservación de información (bien en repositorios o en buckets de S3 o en...), suscriptores a eventos, ...
- En este caso, por simplificar la solución, he optado por tener una única suite de test. Generalmente suelo separarla en test de integración y unitarios. Debido a que los test de integración requieren levantar la BD y el API antes de su ejecución así como limpiar la BD antes de la ejecución de cada test, no pueden tirarse en paralelo, porque podría interferir el cleanup.
- En cuanto a la normalización de la respuesta, considero importante separar la definición de la entidad de dominio con el contrato que puede tener el api rest. Si bien en la mayoría de los casos pueden coincidir, no tienen por qué. Por ejemplo, en el caso de esta solución, se ha optado por un soft delete. La entidad de dominio tiene sentido que tenga el campo `archived`, quizás algún otro hexágono o un suscriptor, vaya a realizar una acción cuando se elimina un producto y necesitan esa información. No obstante, dicho campo no es expuesto al exterior, por lo que no tiene sentido que el endpoint devuelva directamente la entidad de dominio.
- De forma adicional al punto anterior, quizás dependiendo de quien consuma el endpoint, si un miembro del staff, un usuario logeado o un usuario anonónimo, podría tener sentido que ciertas propiedades quedan ocultas. Pero está lógica de serialización debe ser independiente de la entidad de dominio. La entidad es la que es, pero la normalización dependerá del caso concreto de consumo, por lo que considero que tiene sentido que la serialización tenga su propia abstracción.
