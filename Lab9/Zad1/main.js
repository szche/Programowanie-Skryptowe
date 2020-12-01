function ustaw() {
    //Azure
    var azure = document.getElementsByClassName('azure');
    for(var i=0; i<azure.length; i++) {
        azure[i].style.border = "2px solid #A8A8A8";
        azure[i].style.backgroundColor = "#EFF";
        azure[i].style.padding = "10px";
        azure[i].style.margin = "10px";
    }

    //Main
    var main = document.getElementById("main");
    main.style.cssFloat = "left";
    main.style.width = "45%";

    //Aside
    var aside = document.getElementById("aside");
    aside.style.cssFloat = "right";
    aside.style.width = "45%";

    //Nav
    var nav = document.getElementById("nav");
    nav.style.cssFloat = "left";
    nav.style.width = "200px";
    
    //Nav ul
    var navul = document.getElementById("navul");
    nav.style.marginLeft = "25px";
    nav.style.marginRight = "25px";

}

function skasuj() {
        //Azure
        var azure = document.getElementsByClassName('azure');
        for(var i=0; i<azure.length; i++) {
            azure[i].style.border = "";
            azure[i].style.backgroundColor = "";
            azure[i].style.padding = "";
            azure[i].style.margin = "";
        }
    
        //Main
        var main = document.getElementById("main");
        main.style.cssFloat = "";
        main.style.width = "";
    
        //Aside
        var aside = document.getElementById("aside");
        aside.style.cssFloat = "";
        aside.style.width = "";
    
        //Nav
        var nav = document.getElementById("nav");
        nav.style.cssFloat = "";
        nav.style.width = "";
        
        //Nav ul
        var navul = document.getElementById("navul");
        nav.style.marginLeft = "";
        nav.style.marginRight = "";
}