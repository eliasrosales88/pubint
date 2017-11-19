const $ = require("jquery");

export class CommentsService {
    
    constructor(url){
        this.url = url;
    }

    // Obtener un listado de commentarios
    list(successCallback, errorCallback){
        $.ajax({
            url:this.url,
            success: successCallback,
            error: errorCallback
            
        });
    }
    
    // Crear un comentario
    create(comment, successCallback, errorCallback){
        $.ajax({
            url:this.url,
            method: "post",
            data: comment,
            success: successCallback,
            error: errorCallback
        });
    }
}