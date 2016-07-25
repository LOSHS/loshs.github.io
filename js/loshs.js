var isMx = false;
$(document).ready(function() {

	$('.toggle').on('click', function() {
	
		var hiddenDivId = '#' + $(this).data('hidden-div');
		
		if(!!hiddenDivId){
			$(hiddenDivId).toggle();
		}
		
		if(isMx) {
			$(this).text($(this).text() == 'menos...' ? 'Saber más...' : 'menos...');
		}
		else {
			$(this).text($(this).text() == 'less...' ? 'Learn more...' : 'less...');
		}
		
		return false;
	});	
	
	lookupCountryWithFreegeoip();		
});

// supports CORS and JSONP
function lookupCountryWithFreegeoip() {
    
        var dfr = $.ajax({
            url: 'http://freegeoip.net/json/',
            dataType: $.support.cors ? 'json' : 'jsonp'
        }).done(function(results){
        		
   			isMx = (results.country_code == 'MX');   
   			localizeText(); 		
        });
}

function localizeText() {
	debugger;
	if(isMx) {
		
		$.each($('.translatable'), function(index, element){
			$(element).text($(element).data('spanishtext'));
		});
	}
}