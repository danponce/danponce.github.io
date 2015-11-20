//Cuando hacemos click en un miembro y obtener el id para luego buscar la información
$('.miembro').on('click', function() {
    
    var id = $(this).attr('miembro-id');
    console.log("ID: " + id);
    
});
