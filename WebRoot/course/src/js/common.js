/*
 * 
 */
function display_hidden(obj){
	$(obj).click(function(){
		$(this).next().toggle();
	})
}

display_hidden('.toggle');
