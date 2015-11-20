<<<<<<< HEAD
//Variables globales

//Para el crop
var x1,x2,y1,y2,w,h;

=======
>>>>>>> origin/master
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

<<<<<<< HEAD
/*
*Código para agregar el archivo de la foto al modal
*/
$(document).on('change', '.btn-foto-modal :file', function() { 
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
          document.getElementById('foto-default-modal').src = fr.result;
          $('#crop-img').attr('src', fr.result);
          $('.jcrop-preview').attr('src', fr.result);
          $('.jcrop-holder img').attr('src', fr.result);
          $('#myModalCrop').modal('show');
                    
              // Create variables (in this scope) to hold the API and image size
        var jcrop_api,
            boundx,
            boundy,

            // Grab some information about the preview pane
            $preview = $('#preview-pane'),
            $pcnt = $('#preview-pane .preview-container'),
            $pimg = $('#preview-pane .preview-container img'),

            xsize = $pcnt.width(),
            ysize = $pcnt.height();

        $('#crop-img').Jcrop({
          onChange: updatePreview,
          onSelect: updatePreview,
          aspectRatio: 1
        },function(){
          // Use the API to get the real image size
          var bounds = this.getBounds();
          boundx = bounds[0];
          boundy = bounds[1];
          // Store the API in the jcrop_api variable
          jcrop_api = this;

          // Move the preview into the jcrop container for css positioning
          $preview.appendTo(jcrop_api.ui.holder);
        });
          
        function updatePreview(c)
        {
          if (parseInt(c.w) > 0)
          {
            var rx = xsize / c.w;
            var ry = ysize / c.h;

            $pimg.css({
              width: Math.round(rx * boundx) + 'px',
              height: Math.round(ry * boundy) + 'px',
              marginLeft: '-' + Math.round(rx * c.x) + 'px',
              marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
          }
        };
          
          
            
      }
      fr.readAsDataURL(files[0]);
  }

  // No soporta FileReader
  else {
      
  }
    
});



=======
>>>>>>> origin/master
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

<<<<<<< HEAD
//Leemos las notificaciones
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
            var foto = object.get('foto');
            
    
            if(flag == 0)
            {                        
                var codigo = '<div class="col-md-2 col-sm-2 col-md-offset-1 box0 box-usuario miembro" data-toggle="modal" data-target="#myModal" miembro-id="' + object.id + '">' + 
                                '<div class="box1">' + 
                                    '<p><img src="' + foto.url() + '" class="img-circle img-ultimo" width="80"></p>' + 
=======
    
            if(flag == 0)
            {                        
                var codigo = '<div class="col-md-2 col-sm-2 col-md-offset-1 box0 box-usuario">' + 
                                '<div class="box1">' + 
                                    '<p><img src="assets/img/user.jpg" class="img-circle" width="80"></p>' + 
>>>>>>> origin/master
                                    '<p><b>' + object.get('nombre1') + " " + object.get('apellido1') + '</b></p>' + 
                                '</div>' + 
                            '</div>';
                $('.ultimos-usuarios').append(codigo);
<<<<<<< HEAD
                $('.box-usuario').fadeIn('slow');
=======
>>>>>>> origin/master
                flag = 1;
            }
            else
            {
<<<<<<< HEAD
                var codigo = '<div class="col-md-2 col-sm-2 box0 box-usuario miembro" data-toggle="modal" data-target="#myModal" miembro-id="' + object.id + '">' + 
                                '<div class="box1">' + 
                                    '<p><img src="' + foto.url() + '" class="img-circle img-ultimo" width="80"></p>' + 
=======
                var codigo = '<div class="col-md-2 col-sm-2 box0 box-usuario">' + 
                                '<div class="box1">' + 
                                    '<p><img src="assets/img/user.jpg" class="img-circle" width="80"></p>' + 
>>>>>>> origin/master
                                    '<p><b>' + object.get('nombre1') + " " + object.get('apellido1') + '</b></p>' + 
                                '</div>' + 
                            '</div>';
                $('.ultimos-usuarios').append(codigo);
            }
                    
        }
          
<<<<<<< HEAD
          $('.ultimos-usuarios').fadeIn("slow");
=======
          $('.ultimos-usuarios').show("slow");
>>>>>>> origin/master
          
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
});

<<<<<<< HEAD

//Cuando apretamos el botón buscar
function clickBusqueda() {
    
    //Vaciamos el div en caso que haya información de antes
    $('.busqueda-usuarios-wrap').empty();
    
    $('.busqueda-usuarios').fadeIn('slow');
    
    var bautizado = $('input[name=bautizado-radio]:checked').val();
    var discipulado = $('input[name=discipulado-radio]:checked').val();
    var quien = $('#search').val();
    var quienFinal = capitalizeFirstLetter(quien);
    var mesCumple = $('.select-cumple').val();
        
    console.log("Bautizado Search: " + bautizado);
    console.log("Discipulado Search: " + discipulado);
    console.log("Quien busca: " + quien);
    console.log("Quien FINAL: " + quienFinal);
    console.log("MES Cumple: " + mesCumple);
    
    //para saber si se utiliza query o no
    var flag = 0;
    

    var Miembros = Parse.Object.extend("Miembros");
    var query = new Parse.Query(Miembros);
    var query1 = new Parse.Query(Miembros);
    var query2 = new Parse.Query(Miembros);
    var query3 = new Parse.Query(Miembros);
    var query4 = new Parse.Query(Miembros);    
    
    if(quien != "")
    {
        query1.equalTo("nombre1", quienFinal);
        query2.equalTo("nombre2", quienFinal);
        query3.equalTo("apellido1", quienFinal);
        query4.equalTo("apellido2", quienFinal);
    }
        
    var querySemifinal1 = Parse.Query.or(query1, query2);
    var querySemifinal2 = Parse.Query.or(query3, query4);
    
    var query = Parse.Query.or(querySemifinal1, querySemifinal2);
    
    if(bautizado != undefined)
    {
        query.equalTo("bautizado", bautizado);
        flag = 1;
    }
    
    if(discipulado != undefined)
    {
        query.equalTo("discipulado", discipulado);
        flag = 1;
    }
        
    if(mesCumple != "nada")
    {
        query.equalTo("mes_cumpleanos", mesCumple);
        flag = 1;
    } 
    
    
    query.find({
      success: function(results) {
        //alert("NORMAL: Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
            
            var imgFile = object.get('foto');
            var imgUrl = imgFile.url();
            
            var date = object.get('fecha_nac');
            var day = date.getDate();
            var monthIndex = date.getMonth() + 1;
            var year = date.getFullYear();
            
            var fechaNac = day + "/" + monthIndex + "/" + year;
            
            var bautizo = object.get('bautizado');
            var bautizoCheck;
            if(bautizo == "Si")
                bautizoCheck = "fa-check";
            else
                bautizoCheck = "fa-times";
            
            var discipulado = object.get('discipulado');
            var discCheck;
            if(discipulado == "Si")
                discCheck = "fa-check";
            else
                discCheck = "fa-times";
                        
            var codigo = '<div class="box0 div-usuario miembro" data-toggle="modal" data-target="#myModal" style="display: none;" miembro-id="' + object.id + '">' + 
                            '<img src="' + imgUrl + '" class="img-circle" width="80">' + 
                            '<span class="usuario-nombre"><b>' + object.get('nombre1') + " " + object.get('apellido1') + '</b></span>'+
                            '<span class="usuario-nacimiento">' + fechaNac + '</span>' +
                            '<span class="usuario-correo">' + object.get('correo') + '</span>' +
                            '<span class="usuario-bautizado fa ' + bautizoCheck +  '"></span>' + 
                            '<span class="usuario-discipulado fa ' + discCheck +  '"></span>' + 
                        '</div>';
            
            $('.busqueda-usuarios-wrap').append(codigo);
            $('.div-usuario').fadeIn('slow');
            
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });    
    
}

//Pasamos información del id del miembro al modal
$(document).on("click", ".miembro", function () {
    
    var id = $(this).attr('miembro-id');
    $('.btn-eliminar-modal').attr('miembro-id', id);
     
    $('#bautizado-si').parent().iCheck('uncheck');
    $('#bautizado-no').parent().iCheck('uncheck');
    $('#discipulado-si').parent().iCheck('uncheck');
    $('#discipulado-no').parent().iCheck('uncheck');
    
    //Primero realizamos la búsqueda para luego introducir la informacion al formulario
    var Miembro = Parse.Object.extend("Miembros");
    var query = new Parse.Query(Miembro);
    query.equalTo("objectId", id);
    query.find({
      success: function(results) {

        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
            if(object.get('nombre2') == undefined)
                $('#nombres-modal').val(object.get('nombre1'));
            else
                $('#nombres-modal').val(object.get('nombre1') + " " + object.get('nombre2'));
            
            if(object.get('apellido2') == undefined)
                $('#apellidos-modal').val(object.get('apellido1'));
            else
                $('#apellidos-modal').val(object.get('apellido1') + " " + object.get('apellido2'));
            
            $('#correo-modal').val(object.get('correo'));
            $('#comuna-modal').val(object.get('comuna'));
            $('#direccion-modal').val(object.get('direccion'));
            $('#rut-modal').val(object.get('rut'));
            $('#año-ingreso-modal').val(object.get('ano_ingreso'));
            
            var foto = object.get('foto');
            $('#foto-default-modal').attr('src', foto.url());
            
            var date = object.get('fecha_nac');
            var day = date.getDate();
            var monthIndex = date.getMonth() + 1;
            var year = date.getFullYear();
            
            var yearString = year.toString();            
            
            $(".birth-modal .birthDate").data("selectBox-selectBoxIt").selectOption(day);
            $(".birth-modal .birthMonth").data("selectBox-selectBoxIt").selectOption(monthIndex);
            $(".birth-modal .birthYear").data("selectBox-selectBoxIt").selectOption(yearString);
            
            var bau = object.get('bautizado');
            if(bau == "Si")
                $('#bautizado-si-modal').parent().iCheck('check');
            else
                $('#bautizado-no-modal').parent().iCheck('check');
                
            
            var disc = object.get('discipulado');
            if(disc == "Si")
                $('#discipulado-si-modal').parent().iCheck('check');
            else
                $('#discipulado-no-modal').parent().iCheck('check');
            
            $('.btn-agregar-modal').click(function() {
    
                var bau = $('input[name=iCheckm]:checked').val();
                var disc = $('input[name=iCheckm2]:checked').val();

                var nombres = $('#nombres-modal').val();
                var apellidos = $('#apellidos-modal').val();
                var correo = $('#correo-modal').val();
                var rut = $('#rut-modal').val();
                var comuna = $('#comuna-modal').val();
                var direccion = $('#direccion-modal').val(); 
                var añoIngreso = $('#año-ingreso-modal').val();
                var diaNac = $('.birth-modal .birthDate').val();
                var mesNac = $('.birth-modal .birthMonth').val();
                var añoNac = $('.birth-modal .birthYear').val();
                var mesFinal = mesNac-1;
                var fecha = new Date(añoNac,mesFinal,diaNac);

                var mesCumple;
                switch(mesFinal) {
                    case 0:
                        mesCumple = "enero";
                        break;
                    case 1:
                        mesCumple = "febrero";
                        break;
                    case 2:
                        mesCumple = "marzo";
                        break;
                    case 3:
                        mesCumple = "abril";
                        break;
                    case 4:
                        mesCumple = "mayo";
                        break;
                    case 5:
                        mesCumple = "junio";
                        break;
                    case 6:
                        mesCumple = "julio";
                        break;
                    case 7:
                        mesCumple = "agosto";
                        break;
                    case 8:
                        mesCumple = "septiembre";
                        break;
                    case 9:
                        mesCumple = "octubre";
                        break;
                    case 10:
                        mesCumple = "noviembre";
                        break;
                    case 11:
                        mesCumple = "diciembre";
                        break;

                }

                //Separaremos nombres y apellidos
                var arrNombres = nombres.split(' ');
                var nombre1 = arrNombres[0];
                var nombre2 = arrNombres[1];

                var arrApellidos = apellidos.split(' ');
                var apellido1 = arrApellidos[0];
                var apellido2 = arrApellidos[1];


                object.set("nombre1", nombre1);
                object.set("nombre2", nombre2);
                object.set("apellido1", apellido1);
                object.set("apellido2", apellido2);
                object.set("correo", correo);
                object.set("rut", rut);
                object.set("bautizado", bau);
                object.set("discipulado", disc);
                object.set("direccion", direccion);
                object.set("comuna", comuna);
                object.set("fecha_nac", fecha);
                object.set("mes_cumpleanos", mesCumple);
                object.set("ano_ingreso", añoIngreso);
                object.set("autor", currentUser.get('username'));

                var fileUploadControl = $(".upload-modal")[0];
                    if (fileUploadControl.files.length > 0)
                    {
                        /*
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
                    object.set("foto", parseFile);*/
                        var imagen = $('#foto-default-modal').attr('src');
                        //var dataImagen = getBase64Image(imagen);

                        var file = new Parse.File("foto.png", { base64: imagen });

                            //put this inside if {
                        file.save().then(function()
                            {
                            // The file has been saved to Parse.
                            console.log("se guardo bien el file");
                            }, function(error) {
                            // The file either could not be read, or could not be saved to Parse.
                            console.log("Hubo un error con file: " + error.code + error.message);
                        });
                        object.set("foto", file);

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
                        object.set("foto", file);
                   }

                object.save(null, {
                  success: function(miembro) {
                    // Execute any logic that should take place after the object is saved.
                      
                    //Escondemos el modal
                    $('#myModal').modal('hide');
                    
                    var Notificacion = Parse.Object.extend("Notificaciones");
                    var notificacion = new Notificacion();

                    notificacion.set("autor", currentUser.get('username'));
                    notificacion.set("notificacion", " actualizó a " + nombre1 + " " + apellido1);
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
                        
            
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });    
    
});


//Para eliminar a un usuario a través del modal
$('.btn-eliminar-modal').click(function() {
    
    //obtenemos la id del usuario
    var id = $(this).attr('miembro-id');
    
    var Miembro = Parse.Object.extend("Miembros");
    var query = new Parse.Query(Miembro);
    query.equalTo("objectId", id);
    query.find({
      success: function(results) {

        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          object.destroy({
              success: function(myObject) {
                // The object was deleted from the Parse Cloud.
                  //Escondemos el modal
                $('#myModal').modal('hide');
                  
              },
              error: function(myObject, error) {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
              }
            });  
        }
          
        },
      error: function(error) {
          //Escondemos el modal
        $('#myModal').modal('hide');
        alert("Error: " + error.code + " " + error.message);
      }
    });  
    
});

//Botón para resetear los campos de búsqueda de usuarios
$('.btn-reset').click(function() {
    
    //$('#bau-radio').removeAttr('checked');
    //$('#dis-radio').removeAttr('checked');
    //$( "#bau-radio" ).buttonset('refresh');
    //$('#search').val("");
    var selectBox = $(".select-cumple").data("selectBox-selectBoxIt");

    // Chaining
    selectBox.selectOption(0);
    $('.iradio_square-yellow').attr('class', 'iradio_square-yellow');
    //var indiceDatos = $('.select-cumple')[0].selectedIndex;
    //$('.select-cumple')[0].selectedIndex = indiceDatos;
    
});

var currentUser = Parse.User.current();

//Agregamos un nuevo usuario
=======
var currentUser = Parse.User.current();

>>>>>>> origin/master
$( ".btn-agregar" ).click(function() {
    
    var nombres = $('#nombres').val();
    var apellidos = $('#apellidos').val();
    var correo = $('#correo').val();
    var rut = $('#rut').val();
<<<<<<< HEAD
    var comuna = $('#comuna').val();
=======
>>>>>>> origin/master
    var direccion = $('#direccion').val(); 
    var añoIngreso = $('#año-ingreso').val();
    var bautizado = $('input[name=iCheck]:checked').val();
    var discipulado = $('input[name=iCheck2]:checked').val();
    var diaNac = $('.birthDate').val();
    var mesNac = $('.birthMonth').val();
    var añoNac = $('.birthYear').val();
    var mesFinal = mesNac-1;
    var fecha = new Date(añoNac,mesFinal,diaNac);
    
<<<<<<< HEAD
    var mesCumple;
    switch(mesFinal) {
        case 0:
            mesCumple = "enero";
            break;
        case 1:
            mesCumple = "febrero";
            break;
        case 2:
            mesCumple = "marzo";
            break;
        case 3:
            mesCumple = "abril";
            break;
        case 4:
            mesCumple = "mayo";
            break;
        case 5:
            mesCumple = "junio";
            break;
        case 6:
            mesCumple = "julio";
            break;
        case 7:
            mesCumple = "agosto";
            break;
        case 8:
            mesCumple = "septiembre";
            break;
        case 9:
            mesCumple = "octubre";
            break;
        case 10:
            mesCumple = "noviembre";
            break;
        case 11:
            mesCumple = "diciembre";
            break;
        
    }
    
    alert("MES CUMPLE: " + mesCumple + "MES FINAL: " + mesFinal);
    
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
    miembro.set("comuna", comuna);
    miembro.set("fecha_nac", fecha);
    miembro.set("mes_cumpleanos", mesCumple);
=======
    miembro.set("fecha_nac", fecha);
>>>>>>> origin/master
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

<<<<<<< HEAD

//Para capitalizar la primera letra de la persona que se busca
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
=======
>>>>>>> origin/master
