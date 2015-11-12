$( ".logout" ).click(function() {
    
    Parse.User.logOut();

    var currentUser = Parse.User.current();  // this will now be null
    
     window.location.href = "login.html";
});

$("#birthdayPicker").birthdayPicker();


$("select").selectBoxIt();

$( ".btn-nuevo" ).click(function() {
  $( ".contact-form" ).toggle( "slow");
    $("html, body").animate({ scrollTop: 130 }, "slow");
});

/*
*Código para agregar el archivo de la foto
*/
$(document).on('change', '.btn-foto :file', function() { 
    var input = $(this),
      files = input.get(0).files,
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
    
    // FileReader support
  if (FileReader && files && files.length) {
    //console.log("entre a if");
      var fr = new FileReader();
      fr.onload = function () {
          document.getElementById('foto-default').src = fr.result;
      }
      fr.readAsDataURL(files[0]);
  }

  // No soporta FileReader
  else {
      
  }
    
});

$(document).ready( function() {
    $('.btn-foto :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            //if( log ) alert(log + "HOLAS");
        }
        
    });
});

$(function() {
    
    $('.spinner-notificaciones').fadeIn();
    
    var Notificaciones = Parse.Object.extend("Notificaciones");
    var query = new Parse.Query(Notificaciones);
    query.descending("createdAt");
    query.limit(5);
    query.find({
      success: function(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
            
            var tipo = object.get('tipo');
            console.log("TIPO : " + tipo);
            
            var codigo;
            
            if(tipo == "archivo")
            {
                var notificacion = object.get('notificacion');
                var split = notificacion.split("archivo ");
                var parte1 = split[0];
                var parte2 = split[1];
                                
                codigo = '<div class="desc" style="display: none;">' + 
                            '<div class="thumb">' +
                                '<span class="badge bg-theme"><i class="fa fa-clock-o"></i></span>' + 
                            '</div>' +
                            '<div class="details">' +
                                '<p><muted>2 Minutes Ago</muted><br/>' +
                                    '<a href="#">' + object.get('autor') + '</a>' +  parte1 + "archivo " + 
                                    '<span class="nombre-archivo">"' + parte2 + '"</span>' + '.<br/>' +
                                '</p>' + 
                            '</div>' + 
                          '</div>';
                
            }
            else
            {
                codigo = '<div class="desc" style="display: none;">' + 
                            '<div class="thumb">' +
                                '<span class="badge bg-theme"><i class="fa fa-clock-o"></i></span>' + 
                            '</div>' +
                            '<div class="details">' +
                                '<p><muted>2 Minutes Ago</muted><br/>' +
                                    '<a href="#">' + object.get('autor') + '</a>' +  object.get('notificacion') + '.<br/>' +
                                '</p>' + 
                            '</div>' + 
                          '</div>';   
            }           
            
            $('.spinner-notificaciones').fadeOut('slow');
            $('.lista-administradores').before(codigo);
            $('.desc').show('slow');
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
    
});

//Buscamos y agregamos los últimos miembros
$(function() {
    
    var Miembros = Parse.Object.extend("Miembros");
    var query = new Parse.Query(Miembros);
    
    //Para saber cuando agregamos el primer miembro y luego no aplicar el offset-1
    var flag = 0;
    
    // Retrieve the most recent ones
    query.descending("createdAt");
    query.limit(5);
    query.find({
      success: function(results) {
          
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i]; 
    
            if(flag == 0)
            {                        
                var codigo = '<div class="col-md-2 col-sm-2 col-md-offset-1 box0 box-usuario">' + 
                                '<div class="box1">' + 
                                    '<p><img src="assets/img/user.jpg" class="img-circle" width="80"></p>' + 
                                    '<p><b>' + object.get('nombre1') + " " + object.get('apellido1') + '</b></p>' + 
                                '</div>' + 
                            '</div>';
                $('.ultimos-usuarios').append(codigo);
                flag = 1;
            }
            else
            {
                var codigo = '<div class="col-md-2 col-sm-2 box0 box-usuario">' + 
                                '<div class="box1">' + 
                                    '<p><img src="assets/img/user.jpg" class="img-circle" width="80"></p>' + 
                                    '<p><b>' + object.get('nombre1') + " " + object.get('apellido1') + '</b></p>' + 
                                '</div>' + 
                            '</div>';
                $('.ultimos-usuarios').append(codigo);
            }
                    
        }
          
          $('.ultimos-usuarios').show("slow");
          
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
});

var currentUser = Parse.User.current();

$( ".btn-agregar" ).click(function() {
    
    var nombres = $('#nombres').val();
    var apellidos = $('#apellidos').val();
    var correo = $('#correo').val();
    var rut = $('#rut').val();
    var direccion = $('#direccion').val(); 
    var añoIngreso = $('#año-ingreso').val();
    var bautizado = $('input[name=iCheck]:checked').val();
    var discipulado = $('input[name=iCheck2]:checked').val();
    var diaNac = $('.birthDate').val();
    var mesNac = $('.birthMonth').val();
    var añoNac = $('.birthYear').val();
    var mesFinal = mesNac-1;
    var fecha = new Date(añoNac,mesFinal,diaNac);
    
    //Separaremos nombres y apellidos
    var arrNombres = nombres.split(' ');
    var nombre1 = arrNombres[0];
    var nombre2 = arrNombres[1];
    
    var arrApellidos = apellidos.split(' ');
    var apellido1 = arrApellidos[0];
    var apellido2 = arrApellidos[1];
    
    /*
    console.log("Nombre: " + nombres);
    console.log("Apellidos: " + apellidos);
    console.log("Correo: " + correo);
    console.log("Rut: " + rut);
    console.log("Direccion: " + direccion);
    console.log("Bautizado: " + bautizado);
    console.log("Discipulado: " + discipulado);
    console.log("Dia Nacimiento: " + diaNac);
    console.log("Mes Nacimiento: " + mesNac);
    console.log("Año Nacimiento: " + añoNac);
    console.log("Fecha Final: " + fecha);
    
    console.log("Nombre 1: " + nombre1);
    console.log("Nombre 2: " + nombre2);
    console.log("Apellido 1: " + apellido1);
    console.log("Apellido 2: " + apellido2);
    
    */
    
    //Agregamos el miembro a Parse
    
    var Miembro = Parse.Object.extend("Miembros");
    var miembro = new Miembro();

    miembro.set("nombre1", nombre1);
    miembro.set("nombre2", nombre2);
    miembro.set("apellido1", apellido1);
    miembro.set("apellido2", apellido2);
    miembro.set("correo", correo);
    miembro.set("rut", rut);
    miembro.set("bautizado", bautizado);
    miembro.set("discipulado", discipulado);
    miembro.set("direccion", direccion);
    miembro.set("fecha_nac", fecha);
    miembro.set("ano_ingreso", añoIngreso);
    miembro.set("autor", currentUser.get('username'));
    
    var fileUploadControl = $(".upload")[0];
       	if (fileUploadControl.files.length > 0)
       	{
    	   var file = fileUploadControl.files[0];
    	   console.log("File = " + file.name + " Tamaño = " + file.size);
    	   var name = "photo.png";

    	   var parseFile = new Parse.File(name, file);

    	   //put this inside if {
    	   parseFile.save().then(function()
    	   {
    	   // The file has been saved to Parse.
    	   }, function(error) {
    	   // The file either could not be read, or could not be saved to Parse.
    	    });

        // Be sure of ur parameters name
        // prod is extend of my class in parse from this: var prod = new products();
        miembro.set("foto", parseFile);
        
      	}
  	   else
  	   {
  	   	    //Creamos una imagen basada en la imagen user.jpg para que sea la imagen por default en caso de que el usuario no escoja alguna
  		    var imagen = new Image();
            imagen.src = "assets/img/user.jpg";
  		    var dataImagen = getBase64Image(imagen);

  		    var file = new Parse.File("foto_default.png", { base64: dataImagen });

  		    	//put this inside if {
  		    file.save().then(function()
  		    	{
  		    	// The file has been saved to Parse.
  		    	console.log("se guardo bien el file");
  		    	}, function(error) {
  		    	// The file either could not be read, or could not be saved to Parse.
  		    	console.log("Hubo un error con file: " + error.code + error.message);
  		    });
  		    miembro.set("foto", file);
  	   }

    miembro.save(null, {
      success: function(miembro) {
        // Execute any logic that should take place after the object is saved.
          
        $( ".contact-form" ).hide();  
        $("html, body").animate({ scrollTop: 0 }, "slow");
          
        var Notificacion = Parse.Object.extend("Notificaciones");
        var notificacion = new Notificacion();
        
        notificacion.set("autor", currentUser.get('username'));
        notificacion.set("notificacion", " agregó a " + nombre1 + " " + apellido1);
        notificacion.set("tipo", "usuario");
        notificacion.save(null, {
          success: function(notificacion) {
            // Execute any logic that should take place after the object is saved.
            
          },
          error: function(notificacion, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          }
        });
          
        },error: function(miembro, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
    
    
});

//Para obtener los datos para subir la imagen
function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

