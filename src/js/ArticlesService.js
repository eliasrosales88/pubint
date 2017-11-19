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
}