//var urlCats = "https://api.thedogapi.com/v1/images/search?limit=40";

var urlCats = "https://api.thecatapi.com/v1/images/search?limit=40"; //50
//var urlCats = "https://thecatapi.com/v1/images?api_key=m00qjx";
var urlCategorias = "https://my-json-server.typicode.com/PazRubio/Gatitos/categorias";
//var urlCategorias = "https://api.thecatapi.com/v1/categories";
var urlCambioCategoria = urlCats;
var numPagina = 0;


window.onload = function(){
    controlador();
};

async function controlador(){
    infoCategorias = await datos_JSON(urlCategorias);
    datosGatos = await datos_JSON(urlCats);
    listaCategorias();
    imprimir(datosGatos , numPagina); 
}

function datos_JSON(url){
    console.log('Funcion datos_JSON');
    return new Promise(function(resolve, reject) {
        var  xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        if(url == urlCats){
            //xhttp.setRequestHeader("x-api-key", "DEMO-API-KEY");
            xhttp.setRequestHeader("x-api-key", "3d11189e-a3bc-43f0-ba7c-a6888f73312a");
        }
        xhttp.responseType = 'json';

        xhttp.onload = function() {
            var status = xhttp.status;
            var readyState = xhttp.readyState;   
            if (status == 200 && readyState==4) {
                resolve(xhttp.response);
            } else {
                reject(status);
            }
        };
        xhttp.send();
    });
} 

function listaCategorias(){
    console.log('Funcion crear categorias');
    console.log(infoCategorias);
    var categoriasInput= document.getElementById("select-categorias"),option;
    infoCategorias.forEach(function(categoria) {
        option= document.createElement("option");
        //mejor value de id porque creo que hay que buscar por el id de la categoria en la url
        option.setAttribute("value", categoria.id);
        option.innerHTML= categoria.name;
        categoriasInput.appendChild(option);
    });
    categoriasInput.addEventListener('change', function() {
        var option = this.options[this.selectedIndex].value;
        if(option == "Todas las categorías") {
            urlCambioCategoria = urlCats;
        } else{
            urlCambioCategoria = urlCats + '&category_ids=' + option;
        }
        console.log('cambio categoria en la url ' + urlCambioCategoria);
        cambiarFotosCategoria(urlCambioCategoria);

    });
}

function imprimir(datos , numPagina){
    console.log('Funcion imprimir');
    console.log(datos);
    var content = document.getElementById('search-content');
    content.innerHTML = '';

    var numeroImagenes =  datos.length;
    console.log('numeroImagenes '+ numeroImagenes);
    //mostramos un mensaje cuando el array viene vacio
    if (numeroImagenes == 0) {
        var mensaje = document.createElement('p');
        mensaje.textContent = "Categoria sin fotos, seleccione otra";
        mensaje.style.fontSize = "24px";
        mensaje.style.fontWeight = 'bolder';
        mensaje.style.marginTop = "10%";
        mensaje.style.marginBottom = "10%";
        content.appendChild(mensaje);
    } else {
        
        var tabla = document.createElement('table');
        tabla.classList.add('tabla');
        //0 - 7, 8 - 15, 16 - 23
        //9+npag*, (npag+1) * 8  
        for (var i = (numPagina*8); i < (numPagina*8)+7; i++) {
            var fila = document.createElement('tr');
            tabla.appendChild(fila);

            for (var j =0; j < 4 && i<datos.length; j++) {

                var celda = document.createElement('td'),
                    img = document.createElement('img');
                img.classList.add('fotos');
                img.setAttribute('src', datos[i].url);
                img.setAttribute('alt', datos[i].id);

                celda.appendChild(img);
                fila.appendChild(celda);
                if (j != 3) {
                    i++;  
                } 
            }
        }
        content.appendChild(tabla);

        /*<div class="pagination">
              <a href="#">&laquo;</a>
              <a href="#">1</a>
              <a href="#" class="active">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
              <a href="#">&raquo;</a>
        </div>*/
        var paginador = document.createElement('div');
        paginador.setAttribute("class" ,"pagination");
        //numero de paginas calculadas
        //si queremos que cambie el color de la pagina donde estamos añadir class active al enlace
        var enlace = document.createElement('a');
        enlace.textContent = "<<";
        enlace.setAttribute('href', '#');
        enlace.setAttribute('onclick', 'imprimir(datosGatos , 0)');
        paginador.appendChild(enlace);
        //calculamos el numero de paginas segun el numero de fotos de la categoria
        var numeroPaginas = parseInt((datosGatos.length-1)/8);
        for(var i = 0; i<=numeroPaginas; i++){
            enlace = document.createElement('a');
            enlace.textContent = i;
            enlace.setAttribute('href', '#');
            enlace.setAttribute('onclick', 'imprimir(datosGatos ,'+ i +')');
            paginador.appendChild(enlace);
            if(i == numPagina){
                enlace.setAttribute('class', 'active');
            }

        }
        enlace = document.createElement('a');
        enlace.textContent = ">>";
        enlace.setAttribute('href', '#');
        enlace.setAttribute('onclick', 'imprimir(datosGatos ,' + numeroPaginas + ')');
        paginador.appendChild(enlace);
        content.appendChild(paginador);
    }
}

async function cambiarFotosCategoria(urlCambioCategoria){
    console.log('Funcion actualizar fotos');
    console.log('urlCambioCategorias ' + urlCambioCategoria);
    datosGatos = await datos_JSON(urlCambioCategoria);
    console.log(datosGatos);
    imprimir(datosGatos , 0);

}




