/* calling the API and  creating the roles Dropdown */
var finalList;
swapiModule.getFilms().then(function (res) {
	finalList = res.results;
	swapiModule.getPeople().then(function (res) {
		rolesDropdown(res.results)
	}, function (err) {
		alert('api failed')
	})
}, function (err) {
	alert('api failed')
})

/*  we will call the films api when we select the role */
function rolesChange() {
	document.getElementById('spinner').className = 'd-block';
	let val = document.getElementById('roles').value;
	if (val) {
		document.getElementById("listContainer") ? document.getElementById("listContainer").remove() : "";
		document.getElementById("lastMovie") ? document.getElementById("lastMovie").remove() : "";
		var id = val.split("/")[5];
		swapiModule.getPerson(id).then(function (res) {
			filmsList(res.films);
		}, function (err) {
			alert('failure')
		})
	} else {
		console.log('nothing selected');
	}
}

/** list of fims */
function filmsList(charFilms) {
	var filmNames = [];
	charFilms.forEach(function (filmUrl) {
		var filmData = finalList.find(function (film) {
			return film.url == filmUrl
		})

		filmNames.push({
			name: filmData.title,
			year: filmData.release_date.split("-")[0]
		})
	});


	var moviesstr = '';
	var moviesList = '';
	var lastMovie = '';

	for (const film of filmNames) {
		moviesList += `<div class="film"> ${film.name}</div>`;
		lastMovie = film.name + " - " + film.year;
	}
	moviesstr = `<div id="movies">${moviesList}</div>
		<div id="lastMovie"> Last Movie Details <div id="lastMovieData">${lastMovie}</div></div>`;
	document.getElementById("dropdown").innerHTML = moviesstr ;
	document.getElementById('spinner').className = 'd-none';
}

/* dropdown */
function rolesDropdown(people) {

	let optStr = '';
	for (const val of people) {
		optStr +=  '<option value="'+ val.url +'"> ' + val.name+ '</option>';
	}
	var selectStr = '<select id="roles" name="role" class="form-select form-select-lg"> <option value=""> Select a character</option>' + optStr+'</select>';
	document.getElementById("dropdown").innerHTML = selectStr ;
	document.querySelector('#dropdown select').addEventListener('change', rolesChange);
	document.getElementById('spinner').className = 'd-none';
}
