$(function(){
	$('input[name="contactSubmit"]').prop('disabled', false);
	$('input[name="contactSubmit"]').val("Submit");
	$('#javascript-warn').text("");
});

function contactSubmit(){
	var name = $('input[name="contactName"]').val();
	var email = $('input[name="contactEmail"]').val();
	var message = document.getElementById("contact-textarea").value;
	if(name.toString().length > 2 && name.toString().length < 33 && checkEmail(email) && message.toString().length > 31 && message.toString().length < 2049){
		var at = $('var[id="ajaxToken"]')[0].getAttribute("data-ajaxtoken");
		var si = $('var[id="sessionID"]')[0].getAttribute("data-sessionid");
		$.post("/ajax?action=contact",
				    {
				        ajax_token: encodeURIComponent(at),
				        email: encodeURIComponent(email),
						name: encodeURIComponent(name),
						msg: encodeURIComponent(message),
				        sessionID: encodeURIComponent(si)
				    },
				    function(data){
				    	var ejson = JSON.parse(data);
						if(ejson['data']==null){
							if(ejson['error']!=null){
								console.log(ejson['error']);
							}
							return false;
						}
				        if(ejson['data']['status']=="S1") {
				        	$('input[name="contactName"]').val("");
							$('input[name="contactEmail"]').val("");
							document.getElementById("contact-textarea").value = "";
							$('input[name="slider"]').focus();
							return false;
				        }
				    });
	}
	return false;
}

function checkEmail() {
	var em = $('input[name="contactEmail"]').val();
	if(!em.length > 0) {
		return false;
	}
	if(em.length > 2) {
		if(em.length < 256) {
			if(validateEmail(em)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
	return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}