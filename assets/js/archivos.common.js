var parseFile;

//para almacenar el nombre del archivo
var nombreArchivo;

Parse.initialize("ByL6KsOLSVjwIPsI5GEQ5ZKNTYsxDFsV5Ln6Ym93", "cZINkIPn1D5UA6apOQWghmm4pzIdZyxhB3jGxZ82");

$(function() {
    
            
    var Archivos = Parse.Object.extend("Archivos");
    var query = new Parse.Query(Archivos);
    // Retrieve the most recent ones
    query.descending("createdAt");
    query.limit(10);
    query.find({
      success: function(results) {
          $('.spinner-ultimos').fadeOut();
          $('.listado-archivos').fadeIn();
          
          var contador = 0;
          var flag = 0;
          //el codigo para añadir cada archivo
          var codigo;
                    
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];            
            var archivo = object.get('archivo');
            console.log("URL : " + archivo.url());
            var nombre= archivo.name();
            var nameParts = nombre.split("-");
            var filename = nameParts[nameParts.length - 1];
            
            //ahora encontramos el tipo de archivo
            var filenameParts = filename.split(".");
            var tipo = filenameParts[1];
            console.log("tipo: " + tipo);
            
            console.log("FILENAME: " + filename);
            
            if(tipo == "pdf")
            {
                codigo = '<div id="tipo ' + contador + '" class="col-md-2 col-sm-2 box2 clearfix tipo' + contador + '">' + 
                            '<div class="box3">' + 
                                '<p><i class="fa fa-file-pdf-o fa-3x"></i></p>' + 
                                '<p><b>' + filename + '</b></p>' + 
                            '</div>' + 
                            '<div class="mask mask' + contador + '"><a href="' + archivo.url() + '" download><span class="fa fa-download fa-3x"></span><span class="descargar">Descargar</span></div></a>' + 
                        '</div>';
            }
            if(tipo == "jpeg" || tipo == "jpg")
            {
                codigo = '<div id="tipo ' + contador + '" class="col-md-2 col-sm-2 box2 clearfix tipo' + contador + '">' + 
                            '<div class="box3">' + 
                                '<p><i class="fa fa-file-image-o fa-3x"></i></p>' + 
                                '<p><b>' + filename + '</b></p>' + 
                            '</div>' + 
                            '<div class="mask mask' + contador + '"><a href="' + archivo.url() + '" download><span class="fa fa-download fa-3x"></span><span class="descargar">Descargar</span></div></a>' + 
                        '</div>';
            }
            
            
            //comprobamos si ya hicimos el nuevo row
            if(flag == 0)
                $('.listado-archivos').append(codigo);
            else
                $('.listado-archivos2').append(codigo);
            
            AplicarMask(contador);
            
            contador = contador + 1;
            if(contador == 5)
            {
                console.log("ENTRE A CONTADOR 3!!");
                var nuevoRow = '</div><div class="row listado-archivos2 lista">';
                $('.custom-check').append(nuevoRow);
                flag = 1;
            } 
            if(contador == 10)
            {
                console.log("Entre a cont 10!!");
                
            }
            
          //alert(object.id + ' - ' + archivo.name());
        }
          //para guardar que mask se esta haciendo hover
          var mask;
          //Aplicamos esto cuando hacemos hover a un elemento
            $('.box2').hover(
              function() {
                var idName = $( this ).attr( 'id' );
                  console.log("Nombre ID: " + idName);
                  var nroTipo = idName.split(" ");
                  mask = "mask" + nroTipo[1];
                  $('.mask' + nroTipo[1]).fadeIn();
              }, function() {
                  $('.' + mask).fadeOut();
              }
            );
                    
          var height = $('.white-panel').height();
          console.log("Height: " + height);
          $('.white-panel').height(height);
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
});

function AplicarMask()
{
    var cont = arguments[0];
    console.log("cont: " + cont);
    //Primero averiguamos el tamaño del box 2
    var maskHeight = $('.tipo' + cont).height();
    var maskWidth = $('.tipo' + cont).width();
    console.log("Mask Height = " + maskHeight);
    console.log("Mask Width = " + maskWidth);
    
    //Luego aplicamos al div mask
    $('.mask' + cont).height(maskHeight);
    $('.mask' + cont).width(125);
    
}

//funcion para convertir color en transparente
function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}


$( ".filestyle" ).change(function() {    
      
    $('.spinner-agregar').fadeIn();    
    
    var fileUploadControl = $(".filestyle")[0];
    var file = fileUploadControl.files[0];
    var reader  = new FileReader();
    reader.readAsDataURL(file);
    
    //Una vez que se lean los datos del archivo se activa esta funcion
    reader.onloadend = function () {
        parseFile = new Parse.File(file.name, { base64: reader.result });
        parseFile.save().then(function()
        {
            // The file has been saved to Parse.
           GuardarArchivo();
        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            alert('ERROR SAVE with error code: ' + error.message);
        });
    }
   console.log("File = " + file.name + " Tamaño = " + file.size);
      
    //Guardamos el nombre del archivo para la notificación
    nombreArchivo = file.name;
    
});

var currentUser = Parse.User.current();


function GuardarArchivo()
{
    var Archivo = Parse.Object.extend("Archivos");
    var archivo = new Archivo();    
    archivo.set("archivo", parseFile); 
    archivo.set("autor", currentUser.get("username"));
    archivo.save(null, {
      success: function(archivo) {
        // Execute any logic that should take place after the object is saved.
          $('.spinner-agregar').fadeOut(); 
          $('.fa-check').delay(200).fadeIn("slow");
          $('.fa-check').delay(1500).fadeOut("slow");
          $('.form-control').val("");
          
          //Creamos una nueva notificacion que el usuario agregó un nuevo archivo
          var Notificacion = Parse.Object.extend("Notificaciones");
            var notificacion = new Notificacion();

            notificacion.set("autor", currentUser.get('username'));
            notificacion.set("notificacion", " agregó el archivo " + nombreArchivo);
            notificacion.set("tipo", "archivo");
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
      },
      error: function(archivo, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
}