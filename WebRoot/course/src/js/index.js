(function(){
	$(function(){
		$(".tips .btn").click(function(){
			var $links = $(this).siblings(".links");
			if($links.css("top")=="-80px"){
				$links.css("top","50%")
			}else{
				$links.css("top","-80px")
			}
		});
	});
})();
