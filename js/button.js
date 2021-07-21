document.addEventListener("DOMContentLoaded", ()=>{
    let urlParams = new URLSearchParams(window.location.search);
    let idclub = urlParams.get("id");
    if(!(idclub===null||idclub===undefined)){
        deleteById(idclub)
        
    }
    
})
