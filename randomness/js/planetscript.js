var images = ["Earth.png", "Jupiter.png", "Mars.png", "Mercury.png", "Neptune.png", "Pluto.png", "Saturn.png", "Uranus.png", "Venus.png", "Rocket.png"];
var colors = ["#F25536", "#44AFCC", "#E83DE4", "#88EDA2", "#E7FF57"];

var currentcolor = null;

$(".button").click(function() {
    
   //  console.log("hur durrr"); 
   var randomcolor = colors[Math.floor(Math.random() * colors.length)];
   while(randomcolor == currentcolor){
       randomcolor = colors[Math.floor(Math.random() * colors.length)];
   }
   currentcolor = randomcolor;
    $("body").css("background-color", randomcolor);
    

    $(".planetposition").each(function() {
        $(this).css("opacity",1);
        
        var randtop = Math.floor(Math.random() * 1000) + "px";
        var randleft = Math.floor(Math.random() * 1000) + "px";
    
        $(this).css("top", randtop);
        $(this).css("left", randleft);
  
    });
    $(this).css("margin-top","40px");
});


