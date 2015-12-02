var parseFile;

<<<<<<< HEAD
//Ocuparemos esta variable para el caso de agregar una nueva carpeta y tener una forma de tener un nuevo jquery selector
var contCarpeta = 0;

//Para controlar el selector de jQuery al subir los archivos a cada carpeta
var contSubir = 0;

//Cada vez que agregamos un archivo guardamos el id para ocuparlo una vez que vayamos a subirlo a Parse
var idCarpetaSubir = 0;
var idTipoSubir = 0;

=======
>>>>>>> origin/master
//para almacenar el nombre del archivo
var nombreArchivo;

Parse.initialize("ByL6KsOLSVjwIPsI5GEQ5ZKNTYsxDFsV5Ln6Ym93", "cZINkIPn1D5UA6apOQWghmm4pzIdZyxhB3jGxZ82");

<<<<<<< HEAD
//Ejecutamos la query para obtener los archivos
$(function() {
    
    //Primero encontramos los tipos de archivo
    var TipoArchivo = Parse.Object.extend("Tipo_Archivo");
    var query = new Parse.Query(TipoArchivo);
    
    query.find({
          success: function(results) {
            
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
              var tipo = results[i];
                
                var codigo = '<div class="col-md-12" style="margin-bottom : 20px;">' + 
                        '<div class="white-panel pn panel-estudios">' + 
                            '<div class="panel-heading">' +
                                '<div class="pull-left"><h5 class="h5estudios"><span flag-arrow="no" class="fa fa-chevron-down fa-estudios" attr-id="' + tipo.id + '" ></span>' + tipo.get('nombre') + '</h5></div><br></div>' + 
                            '<span class="fa fa-circle-o-notch fa-spin fa-2x spinner-ultimos"></span>' +
                            '<div class="custom-check goleft mt">' +
                                '<div class="row listado-carpetas" style="display: none;" id="' + tipo.id + '">' +
                                '<div class="listado-footer"><input type="text" placeholder="Nombre de la carpeta..." style="display: none;" class="form-control input-agregar"><button class="btn-agregar-carpeta" id="carpeta-'+ tipo.id +'" flag-click="No" attr-id="'+tipo.id+'"><span class="fa fa-plus"></span>Agregar Carpeta</button></div>' +
                                '</div>' + 
                                
                                '</div></div></div>';
                
                $('.wrap-tipos').append(codigo);
              
            }
              
            //Cuando hacemos click en agregar carpeta
            $('.btn-agregar-carpeta').click(function() {
                
                var flag = $(this).attr('flag-click');
                
                if( flag == "No")
                {
                    $( this ).animate({
                      left: 220
                    }, {
                      duration: 1000,

                      complete: function() {
                        $( this ).html( "Agregar!" );
                        $(this).prev().fadeIn('slow');
                        $(this).attr('flag-click', 'Si');  
                    } 
                    });
                }
                else
                {
                    //Aumentamos el contador de carpeta para el jQuery selector
                    contCarpeta = contCarpeta + 1;
                    
                    var idTipo = $(this).attr('attr-id');
                    var nombreCarpeta = $(this).prev().val();
                    console.log("Nombre: " + nombreCarpeta);
                    
                    
                    var Carpeta = Parse.Object.extend("Carpetas");
                    var carpeta = new Carpeta();

                    carpeta.set("nombre", toTitleCase(nombreCarpeta));
                    carpeta.set("tipo_archivo", idTipo);

                    carpeta.save(null, {
                      success: function(carpeta) {
                        // Execute any logic that should take place after the object is saved.
                          
                          var codigo = '<div class="col-md-12 folder" attr-id="' + carpeta.id + '" attr-tipo-id="' + idTipo + '">' + 
                                    '<div class="carpeta carpeta'+ contCarpeta +'" flag-busqueda="" attr-tipo-id="' + idTipo + '" attr-id="' + carpeta.id + '"><span flag-folder="no" class="icono-folder fa fa-folder-o"></span><span class="nombre-folder">' + toTitleCase(nombreCarpeta) + '</div>' + 
                                    '<div class="archivos-carpeta" id="' + carpeta.id + '" style="display: none;"></div>' + 
                                    '<div class="archivos-carpeta2" id="' + carpeta.id + '2" style="display: none;"></div>' + 
                                    '<div class="agregar-archivo" id="' + carpeta.id + '3" style="display: none;">' + 
                                        '<span class="fa fa-check fa-2x fa-check-' + carpeta.id +'"></span>' +
                                        '<span class="fa fa-circle-o-notch fa-spin spinner-subir spinner-'+ carpeta.id +'" style="display: none;"></span>' +
                                        '<input type="text" class="input'+ contSubir +' input'+ carpeta.id +'" id="uploadFile" placeholder="Nombre archivo..." disabled="disabled" />' +
                                        '<div class="fileUpload fileUpload'+ carpeta.id +' btn btn-subir" carpeta-id="'+ carpeta.id +'" attr-subir="'+ contSubir +'" tipo-id="'+ idTipo +'">' +
                                            '<span>Subir archivo</span>' +
                                            '<input id="uploadBtn" type="file" class="upload" />' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                          
                            $(codigo).hide().prependTo('#' + idTipo).show("slow");                         
                          
                          
                            //Cuando el boton de upload cambia
                            $('.fileUpload' + carpeta.id).change( function() {
                                console.log("Hola fileUpload" + contSubir);

                                var nombreFile = $(this).parent().find('input[type=file]').val().split('\\').pop();

                                var valorSubir = $(this).attr('attr-subir');

                                $('.input' + valorSubir).val(nombreFile);

                                var idCarpeta = $(this).attr('carpeta-id');
                                
                                //Guardamos en la variable global el id del tipo de archivo
                                idTipoSubir = $(this).attr('tipo-id');

                                //Activamos el spinner correspontiente
                                $('.spinner-' + idCarpeta).fadeIn('slow');

                                //Lo guardamos en la variable global
                                idCarpetaSubir = idCarpeta;

                                var fileUploadControl = $(this).find('#uploadBtn')[0];
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

                            });
                          
                          contSubir = contSubir + 1;
                          
                           //Cuando apretamos la carpeta para cambiar el icono
                            $('.carpeta' + contCarpeta).click(function() 
                            {                                

                                var flag = $(this).find('.fa').attr('flag-folder');
                                if( flag == 'no')
                                {
                                    $(this).find('.icono-folder').attr('flag-folder', 'si');
                                    $(this).find('.icono-folder').attr('class', 'icono-folder fa fa-folder-open-o');
                                }
                                else
                                {
                                    $(this).find('.icono-folder').attr('flag-folder', 'no');
                                    $(this).find('.icono-folder').attr('class', 'icono-folder fa fa-folder-o');
                                }

                                
                                var idCarpeta = $(this).attr('attr-id');
                                console.log("ID Carpeta: " + idCarpeta);
                                
                                $('#' + idCarpeta + '3').toggle('slow');
                                
                                //Para saber si ya realizamos la busqueda
                                var flagBusqueda = $(this).attr('flag-busqueda');

                                if( flagBusqueda == '0')
                                    return;
                                if( flagBusqueda == '1')
                                {
                                    $('#' + idCarpeta).toggle('slow');     
                                    return;
                                }
                                if( flagBusqueda == '2')
                                {
                                    $('#' + idCarpeta).toggle('slow');
                                    $('#' + idCarpeta + '2').toggle('slow');
                                    return;
                                }

                                var idTipo = $(this).attr('attr-tipo-id');  
                                console.log("ID Tipo: " + idTipo);

                                //Hacemos la query para encontrar los archivos de la carpeta
                                var Archivos = Parse.Object.extend("Archivo");
                                var query3 = new Parse.Query(Archivos);
                                query3.equalTo("id_carpeta", idCarpeta);

                                var flag = 0;
                                var contador = 0;
                                var codigo;

                                query3.limit(10);
                                query3.find({
                                  success: function(results) {
                                      console.log("ID CARPETA: " + idCarpeta);
                                      //Si los resultados son mayores a 0 entonces aplicamos el height al div
                                      if( results.length > 0)
                                        {
                                            $('#' + idCarpeta).show('slow');
                                            
                                            $('.carpeta' + contCarpeta).attr('flag-busqueda', '1');
                                            
                                            //Aplicamos el style del borde
                                            $('#' + idCarpeta).css('border-left', '1px solid');
                                            $('#' + idCarpeta).css('border-right', '1px solid');
                                            $('#' + idCarpeta).css('border-top', '1px solid');
                                            
                                            if(results.length > 5)
                                            {
                                                $('.carpeta' + contCarpeta).attr('flag-busqueda', '2');

                                                $('#' + idCarpeta + '2').show('slow');
                                                
                                                $('#' + idCarpeta + '2').css('height', '130px');
                                                $('#' + idCarpeta + '2').css('border-left', '1px solid');
                                                $('#' + idCarpeta + '2').css('border-right', '1px solid');
                                                $('#' + idCarpeta + '2').css('border-bottom', '1px solid');
                                                
                                                //$(this).find('.archivos-carpeta2').toggle('slow');
                                            }
                                            else
                                            {
                                                $('#' + idCarpeta).css('border-bottom', '1px solid');
                                            }
                                        }
                                      else
                                          $('.carpeta' + contCarpeta).attr('flag-busqueda', '0');

                                    // Do something with the returned Parse.Object values
                                    for (var i = 0; i < results.length; i++) {
                                      var object = results[i];

                                        var archivo = object.get('archivo');
                                        var nombre= archivo.name();
                                        console.log("Name: " + nombre);
                                        var nameParts = nombre.split("-");
                                        var filename = nameParts[nameParts.length - 1];

                                        //ahora encontramos el tipo de archivo
                                        var filenameParts = filename.split(".");
                                        var tipo = filenameParts[1];

                                        console.log("Tipo de file: " + tipo);


                                        if(tipo == "pdf")
                                        {
                                            codigo = '<div id="tipo ' + contador + '" class="col-md-2 col-sm-2 box2 clearfix tipo' + contador + '">' + 
                                                        '<div class="box3">' + 
                                                            '<p><i class="icono-archivo fa fa-file-pdf-o"></i></p>' + 
                                                            '<p><b>' + filename + '</b></p>' + 
                                                        '</div>' + 
                                                        '<div class="mask mask' + contador + '"><a download="' + filenameParts[0] + '" href="' + archivo.url() + '" ><span class="fa fa-download fa-3x"></span><span class="descargar">Descargar</span></div></a>' + 
                                                    '</div>';
                                        }
                                        if(tipo == "jpeg" || tipo == "jpg")
                                        {
                                            codigo = '<div id="tipo ' + contador + '" class="col-md-2 col-sm-2 box2 clearfix tipo' + contador + '">' + 
                                                        '<div class="box3">' + 
                                                            '<p><i class="icono-archivo fa fa-file-image-o"></i></p>' + 
                                                            '<p><b>' + filename + '</b></p>' + 
                                                        '</div>' + 
                                                        '<div class="mask mask' + contador + '"><a download="' + filename + '" href="' + archivo.url() + '" ><span class="fa fa-download fa-3x"></span><span class="descargar">Descargar</span></div></a>' + 
                                                    '</div>';
                                        }


                                        //comprobamos si ya hicimos el nuevo row
                                        if(flag == 0)
                                        {
                                            $('#' + idCarpeta).append(codigo);

                                        }
                                        else
                                            $('#' + idCarpeta + '2').append(codigo);

                                        AplicarMask(contador);

                                        contador = contador + 1;
                                        if(contador == 5)
                                        {
                                            
                                            flag = 1;
                                        } 
                                        if(contador == 10)
                                        {

                                        }

                                    }

                                      //para guardar que mask se esta haciendo hover
                                      var mask;
                                      //Aplicamos esto cuando hacemos hover a un elemento
                                        $('.box2').hover(
                                          function() {
                                            var idName = $( this ).attr( 'id' );
                                              var nroTipo = idName.split(" ");
                                              mask = "mask" + nroTipo[1];
                                              $('.mask' + nroTipo[1]).fadeIn();
                                          }, function() {
                                              $('.' + mask).fadeOut();
                                          }
                                        );


                                  },
                                  error: function(error) {
                                    alert("Error: " + error.code + " " + error.message);
                                  }
                                });


                            });
                          
                            $('#carpeta-' + idTipo).prev().fadeOut('slow');
                            $('#carpeta-' + idTipo).prev().val("");
                            $( '#carpeta-' + idTipo ).animate({
                              left: 0
                            }, {
                              duration: 1000,

                              complete: function() {
                                $( '#carpeta-' + idTipo ).html( '<span class="fa fa-plus"></span>Agregar Carpeta' );                        
                                $('#carpeta-' + idTipo).attr('flag-click', 'No');
                            } 
                            });
                      },
                      error: function(carpeta, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                      }
                    });
                    
                    
                }
                
                
            });
              
            //Luego buscamos todas las carpetas
            var Carpetas = Parse.Object.extend("Carpetas");
            var query2 = new Parse.Query(Carpetas);

            query2.find({
              success: function(results) {

                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                  var object = results[i];

                    //Obtenemos el id del tipo de archivo
                    var tipoId = object.get("tipo_archivo");

                    var codigo = '<div class="col-md-12 folder" attr-id="' + object.id + '" attr-tipo-id="' + tipoId + '">' + 
                                    '<div class="carpeta carpeta'+ object.id +'" flag-busqueda="" attr-tipo-id="' + tipoId + '" attr-id="' + object.id + '"><span flag-folder="no" class="icono-folder fa fa-folder-o"></span><span class="nombre-folder">' + object.get('nombre') + '</div>' + 
                                    '<div class="archivos-carpeta" id="' + object.id + '" style="display: none;"></div>' + 
                                    '<div class="archivos-carpeta2" id="' + object.id + '2" style="display: none;"></div>' + 
                                    '<div class="agregar-archivo" id="' + object.id + '3" style="display: none;">' + 
                                        '<span class="fa fa-check fa-2x fa-check-' + object.id +'"></span>' +
                                        '<span class="fa fa-circle-o-notch fa-spin spinner-subir spinner-'+ object.id +'" style="display: none;"></span>' +
                                        '<input type="text" class="input'+ contSubir +' input'+ object.id +'" id="uploadFile" placeholder="Nombre archivo..." disabled="disabled" />' +
                                        '<div class="fileUpload btn btn-subir" tipo-id="'+ tipoId +'" carpeta-id="'+ object.id +'" attr-subir="'+ contSubir +'">' +
                                            '<span>Subir archivo</span>' +
                                            '<input id="uploadBtn" type="file" class="upload" />' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                    $('#' + tipoId).prepend(codigo);
                    
                    contSubir = contSubir + 1;

                }
                  
                //Cuando el boton de upload cambia
                $('.fileUpload').change( function() {

                    var nombreFile = $(this).parent().find('input[type=file]').val().split('\\').pop();

                    var valorSubir = $(this).attr('attr-subir');
                    
                    $('.input' + valorSubir).val(nombreFile);
                    
                    var idCarpeta = $(this).attr('carpeta-id');
                    
                    idTipoSubir = $(this).attr('tipo-id');
                    
                    //Activamos el spinner correspontiente
                    $('.spinner-' + idCarpeta).fadeIn('slow');
                    
                    //Lo guardamos en la variable global
                    idCarpetaSubir = idCarpeta;
                    
                    var fileUploadControl = $(this).find('#uploadBtn')[0];
                    var file = fileUploadControl.files[0];
                    
                    /*
                    var reader  = new FileReader();
                    reader.readAsDataURL(file);

                    //Una vez que se lean los datos del archivo se activa esta funcion
                    reader.onloadend = function () {
                        parseFile = new Parse.File(file.name, { base64: reader.result } );
                        parseFile.save().then(function()
                        {
                            // The file has been saved to Parse.
                           GuardarArchivo();
                        }, function(error) {
                            // The file either could not be read, or could not be saved to Parse.
                            alert('ERROR SAVE with error code: ' + error.message);
                        });
                    }
                    
                    */
                    
                    parseFile = new Parse.File( file.name, file);
                    nombreArchivo = file.name;
                    parseFile.save().then(function() 
                    {
                        
                        GuardarArchivo();
                    }, function(error) {
                        alert("Error al subir el archivo, intenta más tarde...");
                    });
                   console.log("File = " + file.name + " Tamaño = " + file.size);
                    
                    
                });
                  
                //Cuando apretamos la carpeta para cambiar el icono
                $('.carpeta').click(function() 
                {                                       
                    
                    var flag = $(this).find('.fa').attr('flag-folder');
                    
                    if( flag == 'no')
                    {
                        $(this).find('.icono-folder').attr('flag-folder', 'si');
                        $(this).find('.icono-folder').attr('class', 'icono-folder fa fa-folder-open-o');
                    }
                    else
                    {
                        $(this).find('.icono-folder').attr('flag-folder', 'no');
                        $(this).find('.icono-folder').attr('class', 'icono-folder fa fa-folder-o');
                        //$(this).nextAll().hide('slow');
                    }
                                                            
                    var idCarpeta = $(this).attr('attr-id');
                    console.log("ID Carpeta: " + idCarpeta);
                    
                    $('#' + idCarpeta + '3').toggle('slow');
                    
                    //Para saber si ya realizamos la busqueda
                    var flagBusqueda = $(this).attr('flag-busqueda');
                    
                    if( flagBusqueda == '0')
                        return;
                    if( flagBusqueda == '1')
                    {
                        $('#' + idCarpeta).toggle('slow');     
                        return;
                    }
                    if( flagBusqueda == '2')
                    {
                        $('#' + idCarpeta).toggle('slow');
                        $('#' + idCarpeta + '2').toggle('slow');
                        return;
                    }                                    
                    
                    var idTipo = $(this).attr('attr-tipo-id');  
                    console.log("ID Tipo: " + idTipo);
                    
                    //Hacemos la query para encontrar los archivos de la carpeta
                    var Archivos = Parse.Object.extend("Archivo");
                    var query3 = new Parse.Query(Archivos);
                    query3.equalTo("id_carpeta", idCarpeta);
                    
                    var flag = 0;
                    var contador = 0;
                    var codigo;
                    
                    query3.limit(10);
                    query3.find({
                      success: function(results) {
                          console.log("ID CARPETA: " + idCarpeta);
                          console.log("Nro RESULTADOS ===>> " + results.length);
                          //Si los resultados son mayores a 0 entonces aplicamos el height al div
                          if( results.length > 0)
                            {
                                $('#' + idCarpeta).show('slow');                                
                                
                                $('.carpeta' + idCarpeta).attr('flag-busqueda', '1');
                                
                                //Aplicamos el style del borde
                                $('#' + idCarpeta).css('border-left', '1px solid');
                                $('#' + idCarpeta).css('border-right', '1px solid');
                                $('#' + idCarpeta).css('border-top', '1px solid');
                                
                                if(results.length > 5)
                                {
                                    $('.carpeta' + idCarpeta).attr('flag-busqueda', '2');
                                                                        
                                    $('#' + idCarpeta + '2').show('slow');
                                    
                                    $('#' + idCarpeta + '2').css('height', '130px');
                                    $('#' + idCarpeta + '2').css('border-left', '1px solid');
                                    $('#' + idCarpeta + '2').css('border-right', '1px solid');
                                    $('#' + idCarpeta + '2').css('border-bottom', '1px solid');
                                    
                                    $('#' + idCarpeta + '2').css('border-top-left-radius', '0px');
                                    $('#' + idCarpeta + '2').css('border-top-right-radius', '0px');
                                    $('#' + idCarpeta).css('border-bottom-left-radius', '0px');
                                    $('#' + idCarpeta).css('border-bottom-right-radius', '0px');
                                    
                                }
                                else
                                {
                                    $('#' + idCarpeta).css('border-bottom', '1px solid');
                                }
                                
                            }
                          else
                              $('.carpeta' + idCarpeta).attr('flag-busqueda', '0');
                          
                        // Do something with the returned Parse.Object values
                        for (var i = 0; i < results.length; i++) {
                          var object = results[i];
                            
                            
                            var archivo = object.get('archivo');
                            var nombre= archivo.name();
                            console.log("Name: " + nombre);
                            var nameParts = nombre.split("-");
                            var filename = nameParts[nameParts.length - 1];

                            //ahora encontramos el tipo de archivo
                            var filenameParts = filename.split(".");
                            var tipo = filenameParts[1];
                            
                            console.log("Tipo de file: " + tipo);
                            var nombreCorto = AcortarString(filename);


                            if(tipo == "pdf")
                            {
                                codigo = '<div id="tipo ' + contador + '" class="col-md-2 col-sm-2 box2 clearfix tipo' + contador + '">' + 
                                            '<div class="box3">' + 
                                                '<p><i class="icono-archivo fa fa-file-pdf-o"></i></p>' + 
                                                '<p><b class="nombre-archivo" >' + nombreCorto + '</b></p>' + 
                                            '</div>' + 
                                            '<div class="mask mask' + contador + '"><a download="' + filename + '" href="' + archivo.url() + '" ><span class="fa fa-download fa-3x"></span><span class="descargar">Descargar</span></div></a>' + 
                                        '</div>';
                            }
                            if(tipo == "jpeg" || tipo == "jpg")
                            {
                                codigo = '<div id="tipo ' + contador + '" class="col-md-2 col-sm-2 box2 clearfix tipo' + contador + '">' + 
                                            '<div class="box3">' + 
                                                '<p><i class="icono-archivo fa fa-file-image-o"></i></p>' + 
                                                '<p><b class="nombre-archivo" >' + nombreCorto + '</b></p>' + 
                                            '</div>' + 
                                            '<div class="mask mask' + contador + '"><a download="' + filename + '" href="' + archivo.url() + '" ><span class="fa fa-download fa-3x"></span><span class="descargar">Descargar</span></div></a>' + 
                                        '</div>';
                            }


                            //comprobamos si ya hicimos el nuevo row
                            if(flag == 0)
                            {
                                $('#' + idCarpeta).append(codigo);
                                
                            }
                            else
                                $('#' + idCarpeta + '2').append(codigo);

                            AplicarMask(contador);

                            contador = contador + 1;
                            if(contador == 5)
                            {                                
                                flag = 1;
                            } 
                            if(contador == 10)
                            {

                            }

                        }
                          
                          //para guardar que mask se esta haciendo hover
                          var mask;
                          //Aplicamos esto cuando hacemos hover a un elemento
                            $('.box2').hover(
                              function() {
                                var idName = $( this ).attr( 'id' );
                                  var nroTipo = idName.split(" ");
                                  mask = "mask" + nroTipo[1];
                                  $('.mask' + nroTipo[1]).fadeIn();
                              }, function() {
                                  $('.' + mask).fadeOut();
                              }
                            );
                            
                        
                      },
                      error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                      }
                    });
                    

                });
                  
              },
              error: function(error) {
                alert("Error: " + error.code + " " + error.message);
              }
            })
              
            //Cuando apretamos la flecha abajo para mostrar las carpetas
            $('.fa-estudios').click(function() {
                var id = $(this).attr('attr-id');
                $('#' + id).toggle('slow');
                //Averiguamos si se ha cambiado la flecha de dirección
                var flag = $(this).attr('flag-arrow');
                if( flag == 'no')
                {
                    $(this).attr('flag-arrow', 'si');
                    $(this).attr('class', 'fa fa-chevron-up fa-estudios');
                }
                else
                {
                    $(this).attr('flag-arrow', 'no');
                    $(this).attr('class', 'fa fa-chevron-down fa-estudios');
                }

            });              
              
           
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
    })    

    
    
});



=======
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

>>>>>>> origin/master
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
<<<<<<< HEAD
    //$('.mask' + cont).height(maskHeight + 1);
    $('.mask' + cont).width(127);
=======
    $('.mask' + cont).height(maskHeight);
    $('.mask' + cont).width(125);
>>>>>>> origin/master
    
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

<<<<<<< HEAD
/*
=======

>>>>>>> origin/master
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

<<<<<<< HEAD
*/

=======
>>>>>>> origin/master
var currentUser = Parse.User.current();


function GuardarArchivo()
{
<<<<<<< HEAD
    var Archivo = Parse.Object.extend("Archivo");
    var archivo = new Archivo();    
    archivo.set("archivo", parseFile); 
    archivo.set("id_carpeta", idCarpetaSubir);
    archivo.set("id_tipo", idTipoSubir);
=======
    var Archivo = Parse.Object.extend("Archivos");
    var archivo = new Archivo();    
    archivo.set("archivo", parseFile); 
>>>>>>> origin/master
    archivo.set("autor", currentUser.get("username"));
    archivo.save(null, {
      success: function(archivo) {
        // Execute any logic that should take place after the object is saved.
<<<<<<< HEAD
          $('.input' + idCarpetaSubir).val('');
          $('.spinner-' + idCarpetaSubir).fadeOut('slow');
          
          $('.fa-check-' + idCarpetaSubir).delay(200).fadeIn("slow");
          $('.fa-check-' + idCarpetaSubir).delay(1500).fadeOut("slow");
=======
          $('.spinner-agregar').fadeOut(); 
          $('.fa-check').delay(200).fadeIn("slow");
          $('.fa-check').delay(1500).fadeOut("slow");
          $('.form-control').val("");
>>>>>>> origin/master
          
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
<<<<<<< HEAD
}

//Para transformar los nombres escogidos de la nueva carpeta y capitalizar la primera letra
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function AcortarString(str)
{
    var split = str.split('.');
    var string = split[0];
    console.log("split 1 : " + split[0]);
    console.log("split 2 : " + split[1]);
    console.log("str length : " + string.length);
    
    if(split[0].length > 12) 
    {
        string = split[0].substring(0,24)+"..";
    }
    
    
    var nuevaStr = string + "." + split[1];
    console.log("nueva String: " + nuevaStr);
    return nuevaStr;
=======
>>>>>>> origin/master
}