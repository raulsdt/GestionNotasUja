var idTitulacionSeleccionada = '';
var idAsignaturaSeleccionada = '';

function peticionAnadirAsignatura(){
	var cad = "[" + JSON.stringify($("#formAnadeAsignatura").serializeObject()) + "]";
	alert(cad);
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'addasig',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//alert(respuesta);
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Creaci�n de asignatura incorrecta');
				navigator.notification.alert('Error al crear asignatura',null,'Nueva asignatura', 'Aceptar');
			}else{
				//Guardamos el Id de la sessi�n
				alert("Correcto");
				//Cargamos de nuevo la lista de asignaturas
				peticionAsignaturas(); //Lista de asignaturas del profesor
				location.href = "#pageSignatures";
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
		}
	});
	
}

function peticionTitulaciones(){
	var cad = "[]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'ltit',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			alert(respuesta);
			//titulaciones
			
			arrayRespuesta = eval(respuesta);

			var i;
			var codeButton = "";
			var codhtml = '<p>Titulacion</p>'; 
			codhtml = codhtml + '<select id="menuTitulaciones" name="titulacion" >';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<option value="'+ arrayRespuesta[i]["id"] +'">'+ arrayRespuesta[i]["nombre"] +'</option>';
				}
				codhtml = codhtml + '</select>';
				
				codeButton = "<a href=\"#\" data-role=\"button\" data-inline=\"true\" data-icon=\"\" onclick=\"peticionAnadirAsignatura()\"> A�adir </a>";
				
				$('#titulaciones').html(codhtml);
				$('#menuTitulaciones').selectmenu();
				$('#TitulaAsign').show();
				$('#botonConf').html(codeButton);
				
				$('#botonConf').trigger('create');
			}
			
			$('#menuTitulaciones').change(function() {
				idTitulacionSeleccionada = $('#menuTitulaciones').val()
				peticionAsignaturasTitulacion($('#menuTitulaciones').val());
			});
			
			//$('#botonAnadirAsignatura').button();
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
		},
		beforeSend: function(){
			$('#cargando2').show();
			$('#listarAsignaturasTitulacion').hide();
		},
		complete: function(){
			$('#cargando2').hide();
			$('#listarAsignaturasTitulacion').show();
		}
	});
	
}


function peticionAsignaturasTitulacion(idTitulacion){
	var cad = "[{\"titulacion\":\""+ idTitulacion +"\"}]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'lasigtit',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			alert(idTitulacion);

			
			//Asignaturas pertenecientes a una titulaci�n
			arrayRespuesta = eval(respuesta);

			var i;
			var codhtml = '<p>Asignaturas</p>';
			if(arrayRespuesta.length != 0){
				codhtml = codhtml + '<select id="menuAsigntauras" name="asignaturaTitulacion" >';
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<option value="'+ arrayRespuesta[i]["id"] +'">'+ arrayRespuesta[i]["nombre"] +'</option>';
				}
				codhtml = codhtml + '</select>';
			}else{
				codhtml = "<p>No hay asignaturas</p>";
			}
			
			$('#asignaturaElegida').html(codhtml);
			$('#menuAsigntauras').selectmenu();
			
			$('#menuAsigntauras').change(function() {
				idAsignaturaSeleccionada = $('#menuAsigntauras').val()
			});
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
		},
		beforeSend: function(){
			$('#cargando2').show();
			$('#listarAsignaturasTitulacion').hide();
		},
		complete: function(){
			$('#cargando2').hide();
			$('#listarAsignaturasTitulacion').show();
		}
	});
	
}

function hacerVisibleBloque(visible){
	if(visible == 0){
		$('#DivPorcentajes').hide();
		$('#DivNumeroDeGrupos').hide();
		$('#DivConfiguracionDeGrupos').hide();
	}else{
		$('#DivPorcentajes').show();
		$('#DivNumeroDeGrupos').show();
		$('#DivConfiguracionDeGrupos').show();
	}
	
}

function deshabilitarBoton(idComponente){
	var id = '#' + idComponente;
	$(id).button('disable'); 
}

/*-------------------------------------------------------*/
var numeroGruposTeoriaAnadidos = 1;
function addGruposTeoria(){
	var codhtml = '';
	var nombre = "GrupoT" + numeroGruposTeoriaAnadidos;
	
	codhtml = codhtml + '<select name=\"'+ nombre +'\" >';
	
	codhtml = codhtml + '<option value="A">Grupo A</option>';
	codhtml = codhtml + '<option value="A">Grupo B</option>';
	codhtml = codhtml + '<option value="A">Grupo C</option>';
	codhtml = codhtml + '<option value="A">Grupo D</option>';
	codhtml = codhtml + '<option value="A">Grupo E</option>';
	codhtml = codhtml + '<option value="A">Grupo F</option>';
	codhtml = codhtml + '<option value="A">Grupo G</option>';
	codhtml = codhtml + '<option value="A">Grupo H</option>';
	codhtml = codhtml + '<option value="A">Grupo I</option>';
	codhtml = codhtml + '<option value="A">Grupo J</option>';
	
	nombre="TurnoT" + numeroGruposTeoriaAnadidos;
	codhtml = codhtml + '</select>';
	
	codhtml = codhtml + '<select name=\"'+ nombre +'\">';
	
	codhtml = codhtml + '<option value="M">Manana</option>';
	codhtml = codhtml + '<option value="T">Tarde</option>';
	
	codhtml = codhtml + '</select><br>';
	
	
	numeroGruposTeoriaAnadidos ++;
	
	$('#DivGruposTeoria').append(codhtml);
	$('#listaGruposTeoria').trigger('create');
}

var numeroGruposPracticasAnadidos = 1;
function addGruposPracticas(){
	var codhtml = '';
	var nombre = "GrupoP" + numeroGruposPracticasAnadidos;
	
	codhtml = codhtml + '<select name=\"'+ nombre +'\" >';
	
	codhtml = codhtml + '<option value="A">Grupo A</option>';
	codhtml = codhtml + '<option value="A">Grupo B</option>';
	codhtml = codhtml + '<option value="A">Grupo C</option>';
	codhtml = codhtml + '<option value="A">Grupo D</option>';
	codhtml = codhtml + '<option value="A">Grupo E</option>';
	codhtml = codhtml + '<option value="A">Grupo F</option>';
	codhtml = codhtml + '<option value="A">Grupo G</option>';
	codhtml = codhtml + '<option value="A">Grupo H</option>';
	codhtml = codhtml + '<option value="A">Grupo I</option>';
	codhtml = codhtml + '<option value="A">Grupo J</option>';
	
	nombre="TurnoPE" + numeroGruposPracticasAnadidos;
	codhtml = codhtml + '</select>';
	
	codhtml = codhtml + '<table><tr>';
	
	codhtml = codhtml + '<td><select name=\"'+ nombre +'\" data-inline="true">';
	
	codhtml = codhtml + '<option value="M">9:30</option>';
	codhtml = codhtml + '<option value="T">10:30</option>';
	codhtml = codhtml + '<option value="T">11:30</option>';
	codhtml = codhtml + '<option value="T">12:30</option>';
	codhtml = codhtml + '<option value="T">13:30</option>';
	codhtml = codhtml + '<option value="T">14:30</option>';
	codhtml = codhtml + '<option value="T">15:30</option>';
	codhtml = codhtml + '<option value="T">16:30</option>';
	codhtml = codhtml + '<option value="T">17:30</option>';
	codhtml = codhtml + '<option value="T">18:30</option>';
	codhtml = codhtml + '<option value="T">19:30</option>';
	codhtml = codhtml + '<option value="T">20:30</option>';
	codhtml = codhtml + '<option value="T">21:30</option>';
	
	
	codhtml = codhtml + '</select></td>';
	
	nombre="TurnoPT" + numeroGruposPracticasAnadidos;
	
	codhtml = codhtml + '<td><select name=\"'+ nombre +'\" data-inline="true">';
	
	codhtml = codhtml + '<option value="M">9:30</option>';
	codhtml = codhtml + '<option value="T">10:30</option>';
	codhtml = codhtml + '<option value="T">11:30</option>';
	codhtml = codhtml + '<option value="T">12:30</option>';
	codhtml = codhtml + '<option value="T">13:30</option>';
	codhtml = codhtml + '<option value="T">14:30</option>';
	codhtml = codhtml + '<option value="T">15:30</option>';
	codhtml = codhtml + '<option value="T">16:30</option>';
	codhtml = codhtml + '<option value="T">17:30</option>';
	codhtml = codhtml + '<option value="T">18:30</option>';
	codhtml = codhtml + '<option value="T">19:30</option>';
	codhtml = codhtml + '<option value="T">20:30</option>';
	codhtml = codhtml + '<option value="T">21:30</option>';
	
	codhtml = codhtml + '</select></td>';
	
	codhtml = codhtml + '</tr></table> <br>';
	
	numeroGruposPracticasAnadidos ++;
	
	$('#DivGruposPracticas').append(codhtml);
	$('#listaGruposPracticas').trigger('create');
}


