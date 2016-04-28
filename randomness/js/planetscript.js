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
    
    var earthrandtop = Math.floor(Math.random() * 1000) + "px";
    var earthrandleft = Math.floor(Math.random() * 1000) + "px";
        $(".earth").css("opacity",1);
        $(".earth").css("top", earthrandtop);
        $(".earth").css("left", earthrandleft);
        
        console.log(earthrandtop);
        console.log(earthrandleft);
        
        
    $(this).css("margin-top","40px");
});


