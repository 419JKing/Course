//
$('.toggle').click(function(){
	$(this).next().toggle();
})

//
var $paination = $('.teachingSource_CAI .pagination li');
var $CAI_pages = $('.teachingSource_CAI .CAI_page');
$paination.click(function(){
	$paination.removeClass('active');
	$CAI_pages.addClass('hidden');
	$(this).addClass('active');
	$CAI_pages.eq($(this).index()).removeClass('hidden');
})
