$(document).ready(function() {

	$('.toggle').on('click', function() {
	
		var hiddenDivId = '#' + $(this).data('hidden-div');
		
		if(!!hiddenDivId){
			$(hiddenDivId).toggle();
		}
		
		$(this).text($(this).text() == 'less...' ? 'Learn more...' : 'less...');		
		
		return false;
	});	
});