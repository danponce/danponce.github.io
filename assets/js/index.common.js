$( ".logout" ).click(function() {
    
    Parse.User.logOut();

    var currentUser = Parse.User.current();  // this will now be null
    
     window.location.href = "login.html";
});