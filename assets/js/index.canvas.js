//Que tipo de crop es
var tipoCrop;

$(document).ready(function() {
    
    $('.btn-crop').click(function() {
        
        tipoCrop = $(this).attr('tipo-crop');
        console.log("TIPO CROP: " + tipoCrop);
        
        html2canvas( $('#prev-container'), {
            onrendered: function(canvas) {
                // canvas is the final rendered <canvas> element
                var myImage = canvas.toDataURL("image/png");
                if(tipoCrop == "editar")
                    $('#foto-default-modal').attr('src', myImage);
                else
                    $('#foto-default').attr('src', myImage);
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