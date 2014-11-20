var API_BASE_URL= "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";



/*************************************************************************************************/

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

/*
Details about repository of GitHub API 
https://developer.github.com/v3/repos/
*/

// button GET Gists
$("#button_get_gists").click(function(e) {
	e.preventDefault();
	getTodos();
});

// funcion
function getTodos() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/gists';
	$("#gists_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var gists = data;
				var link = jqxhr.getResponseHeader('Link');
				console.log(link);
				$.each(gists, function(i, v) {
					var gist = v;
					

					
					$('<p>').appendTo($('#'));	
					$('<strong> ID: </strong> ' + gist.id + '<br>').appendTo($('#gists_result'));
					$('<strong> URL: </strong> ' + gist.html_url + '<br>').appendTo($('#gists_result'));
					$('<strong> Description: </strong> ' + gist.description + '<br>').appendTo($('#gists_result'));
					$('<strong> User: </strong> ' + gist.owner.login + '<br>').appendTo($('#gists_result'));
					$('</p>').appendTo($('#gists_result'));
				});
				

	}).fail(function() {
		$("#todos_result").text("El usuario no tiene Gists.");
	});

}
$("#button_to_create").click(function(e){
	e.preventDefault();
	var newGist ;
	if($('#description_to_create').val() == "" || $('#content_to_create').val()==""){
		$('<div class="alert alert-info">Debes rellenar los campos descripcion y contenido</div>').appendTo($("#create_result"));
	}else{
		var filename = $('#archivo_to_create').val();
		newGist = {
			"description" : $('#description_to_create').val(),
			"public" : true,
			"files":{
				 "archivo1" :  {
					"content" : $('#content_to_create').val()
				}
			}
		}
		createGist(newGist);
	}
});
function createGist(newGist) {
	var url = API_BASE_URL + '/gists';
	var data = JSON.stringify(newGist);

	$("#create_result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Created</div>').appendTo($("#create_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
	});

}





function getToEdit(gist_id) {
	var url = API_BASE_URL + '/gists/' + gist_id;
	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
	var gist = data;
				
				$('#description_to_edit').val(gist.description);
				$('<div class="alert alert-info"> <strong>Oh!</strong> Vas bien </div>').appendTo($("#update_result"));
		
				

	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Gist not found </div>').appendTo($("#update_result"));
	});

}

//Save 
$("#button_to_save").click(function(e) {
	e.preventDefault();
	var gistEditado;
	if($('#description_to_edit').val() == "" ){
		$('<div class="alert alert-info">Debes rellenar los campos descripcion y nombre </div>').appendTo($("#update_result"));
	}else{
		 var id = $("#id_edit").val()
		 console.log(id)

    var newgist = new Object();
	
	newgist.description = $("#description_to_edit").val()
	console.log(newgist)
	
	
UpdateTodo(newgist, id);
	}
});



function UpdateTodo(newgist, id) {
	var url = API_BASE_URL + '/gists/' + id;
	console.log(url)
	var data = JSON.stringify(newgist);

	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Updated</div>').appendTo($("#update_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
	});

}

//boton DELETE GIST
$("#button_to_delete").click(function(e){
	e.preventDefault();
	if($('#id_delete').val() ==""){
		$('<div class="alert alert-info">Debes proporcionar una ID</div>').appendTo($("#delete_result"));
	}else{
		deleteGist($("#id_delete").val());
	}
});

function deleteGist(id_gist){
	$("#delete_result").text('');
	var url = API_BASE_URL + '/gists/' + id_gist;
	$.ajax({
		url: url,
		type : 'DELETE',
		crossDomain :true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Eliminado</div>').appendTo($("#delete_result"));				 
		console.log(data);
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#delete_result"));
	});
}

$("#button_get_todoID").click(function(e) {
	
	$("#todo_result").text('');
	e.preventDefault();
	if($('#todo_id').val() == ""){
		$('<div class="alert alert-info"> <strong>Oh!</strong> Debes proporcionar una ID </div>').appendTo($("#todo_result"));
	}else{
		getTodo($('#todo_id').val());
	}
	
});

function getTodo(todo_id) {
	var url = API_BASE_URL + '/gists/' + todo_id;
	$("#todo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var repo = data;

				
				$('<p>').appendTo($('#todo_result'));	
				$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#todo_result'));
				$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#todo_result'));
				$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#todo_result'));
				$('<strong> User: </strong> ' + repo.owner.login + '<br>').appendTo($('#todo_result'));
				$('</p>').appendTo($('#todo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Gist not found </div>').appendTo($("#todo_result"));
	});

}

$("#button_get_paginable").click(function(e) {
	e.preventDefault();
	if($('#num_page').val() =="" || $('#results_page').val() ==""){
		$('<div class="alert alert-info">Debes proporcionar datos</div>').appendTo($("#get_paginable_result"));
	}else{
		getPaginable($("#num_page").val(),$("#results_page").val() )
	}
	
	
});

function getPaginable(num_page, results_page) {


	var url = API_BASE_URL + '/users/' + USERNAME + '/gists?page=' + num_page + '&per_page='+ results_page;
	console.log(url);
	$("#get_paginable_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data;
				
				$.each(repos, function(i, v) {
					var gist = v;

					$('<p>').appendTo($('#todos_result'));	
					$('<strong> ID: </strong> ' + gist.id + '<br>').appendTo($('#get_paginable_result'));
					$('<strong> URL: </strong> ' + gist.html_url + '<br>').appendTo($('#get_paginable_result'));
					$('<strong> Description: </strong> ' + gist.description + '<br>').appendTo($('#get_paginable_result'));
					$('<strong> User: </strong> ' + gist.owner.login + '<br>').appendTo($('#get_paginable_result'));
					$('</p>').appendTo($('#todos_result'));
				});
				

	}).fail(function() {
		$("#get_paginable_result").text("No Gists.");
	});

}



	






