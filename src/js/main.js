window.$ = window.jQuery = require("jquery"); // Hace que jQuery sea accesible publicamente
  
import {ArticlesService} from "./ArticlesService";

const articleService = new ArticlesService("/articles/");

//Cargar la lista de articulos con Ajax
articleService.list(articles =>{
    
    //Comprobamos si hay articulos
    if(articles.length == 0){
        
        //Mostramos el estado vacio
        $(".article-list").removeClass("loading").addClass("empty");
    }else{

        //Componemos el html con todos los articulos
        let html = "";
    
    for(let article of articles){
            html += `<article class="article">
            <div>
            <div class="photo">
                <div class="image">
                    <img src="img/container-1024px.jpg" alt="container">
                </div>  
                <div class="span-photo">
                        <div class="publish-date">
                        ${article.date}
                        </div>
                        <div class="title-photo">
                            ${article.title} - Este es un articulo genial
                        </div>
                    </div>
            </div>
                
                <div class="article-info">
                    <div class="article-description"><br>
                    ${article.description} Hola esta es la descripcion de un articulo
                    </div>
                    <hr>
                    <div class="user">
                        <div class="user-image">
                        <img src="./img/elias-350px.jpg" alt="elias">
                        </div>
                        <div class="user-name">
                            ${article.user}
                        </div>
                    </div>
                    <div class="social">
                    <div class="article-social-heart">
                        <i class="material-icons">favorite</i>+85
                    </div>
                    <div class="article-social-comment">
                        <i class="material-icons">chat_bubble</i>+60
                    </div>
                    </div>
                </div>
            </div>
        </article>`;
        }

        //Metemos el html en el div que contiene los articulos
        $(".article-list .ui-status.ideal").html(html);

        //Quitamos el mensaje de cargando y mostramos el listado de articulos
        $(".article-list").removeClass("loading").addClass("ideal");
    }
}, error =>{
    //Mostramos el estado de error
    $(".article-list").removeClass("loading").addClass("error");

    //Hacemos log del error en la consola
    console.error("Error al cargar los articulos", error);
})




//BACK TO TOP BUTTON
  $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });