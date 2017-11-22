// NO REQUIERE INVOCAR A JQUERY PORQUE ESTA IMPORTANDOSE DEL UIManager
import UIManager from "./UIManager";

export default class ArticleListManager extends UIManager{

    constructor(elementSelector, articlesService, pubSub){
        super(elementSelector); // Llamada al constructor de la clase UIManager
        this.articlesService = articlesService;
        this.pubSub = pubSub;
    }

    init(){
        this.loadArticles();
        let self = this;
        this.element.on("click",".article", function(){
            let articleId = this.dataset.id; 
            self.deleteArticle(articleId);
        });
        this.pubSub.subscribe("new-article", (topic, article) => {
            this.loadArticles();
        });
    }

    loadArticles(){
        this.articlesService.list(articles => {
                
                // Comprobamos si hay articulos
                if (articles.length == 0){
                    //Mostramos el estado vacio
                    this.setEmpty();
                }else{
                    // Componemos el html con todas los articulos
                    this.renderArticles(articles);
                    //Quitamos el mensaje de cargando y mostrando el listado de articulos
                    this.setIdeal();
                }   
            }, error =>{
                //Mostrar el estado de error
                this.setError();
                // Hacemos log del error en la consola
                console.error("Error al cargar los articulos", error);
                });
    }

    renderArticles(articles){
        let html = "";
        for (let article of articles){
            html += this.renderArticle(article);
            }

        // Metemos el html en el div que contiene las canciones
        this.setIdealHtml(html);
    }

    renderArticle(article){
        let imagen = article.imagen;
        let srcset = "";
        if (imagen =="") {
            imagen = "img/container-150px.jpg";
            srcset = ' srcset="img/container-150px.jpg 150w, img/container-250px.jpg 250w, img/container-300px.jpg 300w"';
        }
        return  `<article class="article" data-id="${article.id}">
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
    
    deleteArticle(articleId){
        this.setLoading();
        this.articlesService.delete(articleId, success =>{
            this.loadArticles();
        }, error => {
            this.setError();
        });
    }
} 