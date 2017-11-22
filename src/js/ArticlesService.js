const $ = require("jquery");

export class ArticlesService {
    
    
    constructor(url){
        this.url = url;
    }

    // Obtener un listado de articulos
    list(successCallback, errorCallback){
        $.ajax({
            url:this.url,
            success: successCallback,
            error: errorCallback
            
        });
    }

    delete(articleId, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}${articleId}`,
            method: 'delete',
            success: successCallback,
            error: errorCallback
        }) 
     }
}