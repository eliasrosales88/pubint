window.$ = window.jQuery = require("jquery"); // Hace que jQuery sea accesible publicamente
  
import {ArticlesService} from "./ArticlesService";
import {CommentsService} from "./CommentsService";
import ArticlesListManager from "./ArticlesListManager";
import PubSub from "pubsub-js";

const articleService = new ArticlesService("/articles/");
const commentService = new CommentsService("/comments/");

const articlesListManager = new ArticlesListManager(".article-list", articleService, PubSub);
articlesListManager.init();

//////////////////////////////
//////////////////////////////
//////////COMENTARIOS/////////


//Cargar la lista de comentarios con Ajax
commentService.list(comments =>{
    
    //Comprobamos si hay comentarios
    if(comments.length == 0){
        
        //Mostramos el estado vacio
        $(".comment-list").removeClass("loading").addClass("empty");
    }else{
        console.log("ACCEDIENDO A LA BASE DE DATOS")
        //Componemos el html con todos los comentarios
        let html1 = "";
        
        for(let comment of comments){
                html1 += `<div class="all-comments">
                <div class="left-info">
                        <div class="user-detail">
                                <div class="user-image-detail">
                                    <img src="./img/elias-350px.jpg" alt="elias">
                                </div>
                                <div class="user-name-detail">
                                    ${comment.name} ${comment.lastnames}
                                </div>
                            </div>
                </div>
                <div class="right-info">
                    ${comment.comment}
                </div>
            </div>`;
        }
            //Metemos el html en el div que contiene los comentarios
            $(".comment-list .ui-status.ideal").html(html1);
            console.log("estoy aqui");
            //Quitamos el mensaje de cargando y mostramos el listado de articulos
            $(".comment-list").removeClass("loading").addClass("ideal");
    } 
}, error => {
    //Mostramos el estado de error
    $(".comment-list").removeClass("loading").addClass("error");
    
        //Hacemos log del error en la consola
        console.error("Error al cargar los comentarios", error);

})





//BACK TO TOP BUTTON
  $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });