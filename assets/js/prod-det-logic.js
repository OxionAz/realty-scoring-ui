$(document).ready(function() { // вся мaгия пoслe зaгрузки стрaницы

	
	$('button', '.tabs-nav').click(function(){
		
		var position = $(this).index()+1;
		var show = $('#'+position, 'div');
		
		$('.tab').hide();
		$('button', '.tabs-nav').removeClass('selected');
		$(this).addClass('selected');
		show.show();
		
	});
	
	$('#sell').click();
	
});