//$(function() {

    //Parse.$ = jQuery;

    Parse.initialize("ByL6KsOLSVjwIPsI5GEQ5ZKNTYsxDFsV5Ln6Ym93", "cZINkIPn1D5UA6apOQWghmm4pzIdZyxhB3jGxZ82");

        /*var TestObject = Parse.Object.extend("TestObject");
        var testObject = new TestObject();
          testObject.save({foo: "bar"}, {
          success: function(object) {
            $(".success").show();
          },
          error: function(model, error) {
            $(".error").show();
          }
        });*/

    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
    } else {
        // show the signup or login page
        //alert("No esta logeado!");
        window.location.href = "login.html";
    }
    
//});


