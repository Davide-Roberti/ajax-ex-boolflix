$(document).ready(function () {

    var source = $("#movie-info-template").html();     //richiamo del template di handlebars
    var template = Handlebars.compile(source);

    var urlBase = 'https://api.themoviedb.org/3';

    $('button').click(function() { // al click del bottone salvo nella variabile chiaveRicerca l'input acquisito dall'HTML
        var chiaveRicerca = $('input').val();
        $('.informazioni-film').empty();
        // console.log(chiaveRicerca);
        cercaFilm(chiaveRicerca);
        cercaSerie(chiaveRicerca);
    });

    function cercaFilm (input) {
        $.ajax({    //chiamata ajax al database di themoviedb per cercare i film
            url: urlBase + '/search/movie',
            data: {
                api_key: '0e632fcee10ca9b473d029f3731bf937',
                query: input,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var movies = data.results;
                // console.log(movies);
                for (var i = 0; i < movies.length; i++) {
                    var movie = movies[i];
                    var infoMovie = {
                        titolo: movie.title,
                        titoloOriginale: movie.original_title,
                        linguaOriginale: bandierine(movie.original_language),
                        voto: stelleVoto(movie.vote_average),
                        copertina: posterCopertina(movie.poster_path)
                    };
                    var specificheFilm = template(infoMovie);  //collegamento handlebars
                    $('.informazioni-film').append(specificheFilm);
                    // console.log(infoMovie.linguaOriginale);
                }
            },
            error: function (err) {
                alert('ERRORISSIMO!!!!!');
            }
        });
    };

    function posterCopertina (valoreApiCover) {
        if (valoreApiCover !== null) {
            var urlBaseCover = 'https://image.tmdb.org/t/p/';
            var dimensione = 'w342/';
            return '<img src="' + urlBaseCover + dimensione + valoreApiCover + '">';
        } else {
            return 'no cover';
        };
    };

    function cercaSerie (input) {
        $.ajax({    //chiamata ajax al database di themoviedb per cercare le serie tv
            url: urlBase + '/search/tv',
            data: {
                api_key: '0e632fcee10ca9b473d029f3731bf937',
                query: input,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var series = data.results;
                console.log(series);
                for (var i = 0; i < series.length; i++) {
                    var serie = series[i];
                    var infoSerie = {
                        titolo: serie.name,
                        titoloOriginale: serie.original_name,
                        linguaOriginale: bandierine(serie.original_language),
                        voto: stelleVoto(serie.vote_average),
                        copertina: posterCopertina(serie.poster_path)
                    };
                    var specificheSerie = template(infoSerie);  //collegamento handlebars
                    $('.informazioni-film').append(specificheSerie);
                }
            },
            error: function (err) {
                alert('ERRORISSIMO!!!!!');
            }
        });
    };


    function bandierine (siglaNazione) {
        console.log(siglaNazione);
        var flag = '';
        if (siglaNazione == 'en') {
            flag = 'gb';
        } else if (siglaNazione == 'ja') {
            flag = 'jp';
        } else if (siglaNazione == 'zh') {
            flag = 'cn';
        } else if (siglaNazione == 'ko') {
            flag = 'kr';
        } else {
            flag = siglaNazione;
        }
        return '<img src="https://www.countryflags.io/' + flag + '/flat/16.png">'
    }

    function stelleVoto (valutazione) {
        var recensione = Math.ceil(valutazione / 2);
        var arrayStelleVoto = [];
        var a = 0;
        for (var i = 0; i < 5; i++) {
            if (a < recensione) {
                arrayStelleVoto.push('<i class="fas fa-star"></i>');
                a = a + 1;
            } else {
                arrayStelleVoto.push('<i class="far fa-star"></i>');
            }
        }
        return arrayStelleVoto.join('');
    };
});
