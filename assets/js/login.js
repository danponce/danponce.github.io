$(function() {

    //Parse.$ = jQuery;

	Parse.initialize("ByL6KsOLSVjwIPsI5GEQ5ZKNTYsxDFsV5Ln6Ym93", "cZINkIPn1D5UA6apOQWghmm4pzIdZyxhB3jGxZ82");

	

	$('.form-login').on('submit', function(e) {
 
	    // Prevent Default Submit Event
	    e.preventDefault();
	   
        var username = $("#user").val();
        var password = $("#pass").val();       
       

		Parse.User.logIn(username, password, {
		  success: function(user) {
		    // Do stuff after successful login.
              
		    window.location.href = "index.html";
		    
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
		    alert("Error de Parse : " + error.message);
		  }
		});

	 	
	});    

    
});

