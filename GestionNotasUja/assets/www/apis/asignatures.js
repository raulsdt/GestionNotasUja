function peticionAsignaturas(){
	
	var cad = "[]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'lasig',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtml = '<ul data-role="listview" id="lista">';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<li><a href="#page2">'+ arrayRespuesta[i]["nombre"] +'</a> <a data-icon="gear"></a></li>';
				}
				codhtml = codhtml + '</ul>';
				
				$('#listaAsignaturas').html(codhtml);
				$('#lista').listview();
				
			}else{
				$('#listaAsignaturas').html("<h3>No se ha agredago ninguna asignatura</h3>");
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
		}
	});
	
}