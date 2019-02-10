# Galería de gatos

## Requisitos funcionales

Implementar la funcionalidad de categorias de gatos o perros usando la tecnología Ajax. Las búsquedas se deben realizar con el servidor REST API  JSON SERVER o el externo https://my-json-server.typicode.com/DWEC-18-19/TheCatApi

1. Implementar una galeria de gatos o perros que muestre de la categoria seleccionada 50 gatos utilizando el API https://thecatapi.com/.
2. Implementar la paginación de la galería para mostrar los gatos en varias páginas. 

## Requisitos técnicos
1. No puede utilizarse jquery, debe utilizarse Vainilla JavaScript
2. Los Callbacks deben utilizar promesas o Async/await
3. Se valorará positivamente la utilización de  frameworks como Vue, Angular o React


### Descripción
Tras comprobar esta API, hemos visto que el máximo por categoria de gatos es de unas 40 imágenes, y hemos decidido mostrar 8 por página. Así, dependiendo del número por categoría, dividimos entre 8 para tener el número de páginas, y además incluimos dos botones, "<<" y ">>" para movernos a la primera y última página.

Sobre las tecnologías utilizadas, para la carga de los dos JSON, el de las imágenes en la API y el de las categorías en local, hemos utilizado AJAX: una función asíncrona que espera con dos await que esperan la carga de ambos JSON. Además, el resto de la página la creamos con DOM, logrando la visualización dinñamica de datos.
