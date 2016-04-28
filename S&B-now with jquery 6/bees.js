var leftkey = false;
var rightkey = false;
var currentswordids = [];
var sworddelay = 2000;
var swordspeed = 2000;
var score = 0;
var highscore = 0;
queuenextsword();
scoreincrease();

$(window).keydown(function(e) {
	//console.log("====== A key was pressed! OMG! ======");
	
	var key = e.which;
	//console.log("Key pressed: " + key);
	
	var posx = $("#bee").css("left");
	//console.log("Bee's current position: " + posx);
	
	if(key == 37 && leftkey == false){ //left arrowkey
		leftkey = true;
		var newposx = parseInt(posx) - 50;
		if(newposx < 0){
			newposx = 0;
		}	
		$("#bee").css("left", newposx + "px");
		
	} else if(key == 39 && rightkey == false){ //right arrowkey
		rightkey = true;
		var newposx = parseInt(posx) + 50;
		var beewidth = parseInt($("#bee").css("width"));
		if(newposx + beewidth > 1300){
			newposx = 1300 - beewidth;
		}
		$("#bee").css("left", newposx + "px");
	}
	
	//console.log("Bee's new position: " + $("#bee").css("left"));
	
	//console.log("Left key: " + leftkey + " / Right key: " + rightkey);
});

$(window).keyup(function(e) {
	//console.log("====== A key was released! OMG! ======");
	
	var key = e.which;
	//console.log("Key released: " + key);
	
	if(key == 37){ //left arrowkey
		leftkey = false;
	} else if(key == 39){ //right arrowkey
		rightkey = false;
	}
	
	//console.log("Left key: " + leftkey + " / Right key: " + rightkey);
});

//increases the score
function scoreincrease() {
	window.setTimeout(function(){
		score++;
		$("#scorecard").html("Current score: " + score);
		
		sworddelay -= 10;
		if (sworddelay < 150) {
			sworddelay = 150;
		}
		swordspeed -= 3;
		if (swordspeed < 1500) {
			swordspeed = 1500;
		}
		
		scoreincrease();
	},
	500);
}

function queuenextsword() {
	window.setTimeout(function() {
		var newswordid = getnewswordid();
		var swordimagenum = Math.floor(Math.random() * 13 + 1) + "";
		if(swordimagenum.length == 1){
			swordimagenum = "0" + swordimagenum;
		}
		$("body").append("<img src=\"images/sword" + swordimagenum + ".png\" class=\"sword\" id=\"" + newswordid + "\">");
		
		//Wait until image loads and is formatted by css to modify attributes
		$("#" + newswordid).load(function() {
		
			var swordwidth = parseInt( $("#" + newswordid).css("width") );
			$("#" + newswordid).css("left", Math.floor(Math.random() * (1300 - swordwidth)));
		
			$("#" + newswordid).css("top", parseInt($("#" + newswordid).css("top")) -
				getheightadjustment("#" + newswordid));
			animatesword("#" + newswordid, swordspeed);
			
		});
		
		//console.log("Generated a new sword with ID: " + newswordid);
		//console.log("Current sword ids: " + currentswordids);
		//console.log(sworddelay);
		queuenextsword();
		},
		sworddelay);
}
	
function getnewswordid() {
	var id = 0;
	while (currentswordids.indexOf(id) >= 0) {
		id++;
	}
	currentswordids.push(id);
	return id;
}

function getheightadjustment(sword) {
	if( parseInt($(sword).css("height")) / 2 < 100){
		return parseInt($(sword).css("height")) / 2;
	}
	return parseInt($(sword).css("height")) - 100;
}
	
function animatesword(sword, time) {
	$(sword).animate({
		top: (600 - getheightadjustment(sword)) + "px"
	}, {
		duration: time,
		easing: "linear",
		progress: function() {
			if (checkoverlap(sword) == true) {
				$(this).stop();
				currentswordids.splice(currentswordids.indexOf(parseInt(sword.replace("#", ''))), 1);
				$(this).remove();				
			}
		},
		complete: function() {
			//$(this).remove();
			fadesword(sword);
		}
	});
};

function fadesword(sword) {
	$(sword).animate({
		opacity: 0
	}, {
		duration: 500,
		easing: "linear",
		complete: function() {
			$(this).remove();
			currentswordids.splice(currentswordids.indexOf(parseInt(sword.replace("#", ''))), 1);
		}
	});
};

function checkoverlap(sword) {
	var beetop = parseInt( $("#bee").css("top").replace(/[^-\d\.]/g, ''));
	var beebottom = beetop + parseInt( $("#bee").css("height"));
	var beeleft = parseInt( $("#bee").css("left").replace(/[^\d\.]/g, '')) + 40;
	var beeright = beeleft + parseInt( $("#bee").css("width")) - 60;

	var swordtop = parseInt( $(sword).css("top").replace(/[^-\d\.]/g, ''));
	var swordbottom = swordtop + parseInt( $(sword).css("height"));
	var swordleft = parseInt( $(sword).css("left").replace(/[^-\d\.]/g, ''));
	var swordright = swordleft + parseInt( $(sword).css("width"));
	//console.log(swordtop + " " + swordbottom);
	
	if (swordbottom >= beetop) {
		//console.log("Sword in vertical space of bee");
		if (swordleft <= beeright && swordright >= beeleft) {
			//console.log("Sword in horizontal space of bee. Bee hit!");
			resetgame();
			return true;
		}
	}
	return false;
}

function resetgame() {
	sworddelay = 2000;
	swordspeed = 2000;
	
	if(score > highscore){
		highscore = score;
		$("#scorecard2").html("High score: " + highscore);
		
		$(".highscore").css("color", "#F94646")
		window.setTimeout(function(){
			$(".highscore").css("color", "#F9EF3A");
		},
		1000);
	}
	score = 0;
	
	$("#scorecard").html("Current score: " + score);
	
	$(".score").css("color", "#F94646")
	window.setTimeout(function(){
		$(".score").css("color", "#F9EF3A");
	},
	1000);
}

//Convoluted way of using .animate()
/*
$("#sword01").click(function() {
	$("#sword01").animate({
		top: "600px"
	}, {
		duration: 2000,
		easing: "linear",
		complete: function() {
			$(this).css("top", "0px");
		}
	});
});
*/

//jQuery .animate() basic explanation
/*
jQuery .animate() sucks ASS, so here's how to use it:

$("#<ID of target>").animate( {<list of animations}, duration, easing, complete );

list of animations, contained in {}, edits the .css. Formatted like this:
	{top: "600px", left: "300px", width: "200px"}
	
duration, given as an integer or string, taken in milliseconds:
	2000
	
easing, whether the animation is smooth or sudden, has two options:
	"swing" (default), or "linear" (sudden)
	
complete, an actual function that runs when the animation finishes:
	function() { <code you want to run here> }
*/

//parseInt("50px") --> 50
//parseInt("912nlasdf") --> 912

//Logic statements
/*
WHAT IS A LOGIC STATEMENT??
A logic statement is any form of logic that can be simplified until it is
either "true" or "false", NO EXCEPTIONS OR I HIT YOU!

Some logic statement operators that you already know:

== --> Checks if two thingies are identical
4 == 4 --> true
4 == 7 --> false you nitwit

< > <= >= --> All do exactly what you think they should

&& --> Checks if two thingies are both true ("and" operator)
(4 == 4) && (7 == 7) --> true
  true   &&   true   --> true

(4 == 4) && (4 == 7) --> false
  true   &&   false  --> false
  
|| --> Checks if either of two thingies are true ("or" operator)
(4 == 4) || (4 == 7) --> true
  true   ||   false  --> true
(4 == 7) || (4 >  7) --> false
  false  ||   false  --> false


*/

//Old shit down here, beware
/*
var bee = document.getElementById("bee");
bee.style.left = "0px";
bee.style.width = "100px";

var leftkey = false;
var rightkey = false;

window.onkeydown=function(e){
	if (!e) {
        e = window.event;
    }
    var code = e.keyCode;
 
	
 	if (code == 37){ //left
		leftkey = true;
		console.log(leftkey);
 		var left = parseInt(bee.style.left) - 100;
 		if (left < 0){
 			left = 0;
 		}
 		bee.style.left = left;
 	} else if (code == 39){ //right
		rightkey = true;
		console.log(rightkey);
    	var right = parseInt(bee.style.left) + parseInt(bee.style.width) + 100;
 		if (right > 1300){
 			right = 1300;
 		}

 		bee.style.left = right - parseInt(bee.style.width);
 	}
	
	console.log(leftkey + " " + rightkey);
}
	
window.onkeyup = function(e){
	if (!e) {
		e = window.event;
	}
	var code = e.keyCode;
	
	if (code == 37){ //left
		var leftkey = false;
		console.log(leftkey);
	} else if (code == 39){
		var rightkey = false;
		console.log(rightkey);
	}
}
*/