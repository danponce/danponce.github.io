<<<<<<< HEAD
//Que tipo de crop es
var tipoCrop;

=======
>>>>>>> origin/master
$(document).ready(function() {
    
    $('.btn-crop').click(function() {
        
<<<<<<< HEAD
        tipoCrop = $(this).attr('tipo-crop');
        console.log("TIPO CROP: " + tipoCrop);
        
=======
>>>>>>> origin/master
        html2canvas( $('#prev-container'), {
            onrendered: function(canvas) {
                // canvas is the final rendered <canvas> element
                var myImage = canvas.toDataURL("image/png");
<<<<<<< HEAD
                if(tipoCrop == "editar")
                    $('#foto-default-modal').attr('src', myImage);
                else
                    $('#foto-default').attr('src', myImage);
=======
                $('#foto-default-modal').attr('src', myImage);
>>>>>>> origin/master
                /*
                JcropAPI = $('#crop-img').data('Jcrop');
                JcropAPI.destroy()
                */
            }
        });
        
        $('#myModalCrop').modal('hide');
        
        //Para poder realizar el scroll al modal que queda
        $("body").addClass("modal-open");
        /*
        //reseteamos el Jcrop plugin
        JcropAPI = $('#crop-img').data('Jcrop');
        JcropAPI.destroy();*/
        
    });

    
    
});