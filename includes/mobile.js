$(document).ready(function(){

 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
 
 $("#menuList li").first().remove();
 $("#menuList li").last().remove();
 
 }

});