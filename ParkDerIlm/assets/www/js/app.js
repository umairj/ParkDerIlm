$(document).ready(function(){
	document.addEventListener("deviceready", function(){
		PDI.init();
	}, false);
});


PDI = function(){
	
	var init = function() {
		console.log("initiating the application !");
		
	};
	
	return {
		init:init
	};
	
	
}();