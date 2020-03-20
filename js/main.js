$(document).ready(function () {

    var source = $("#movie-info-template").html();     //richiamo del template di handlebars
    var template = Handlebars.compile(source);

    var urlBase = 'https://api.themoviedb.org/3';

    $('button').click(function() { // al click del bottone salvo nella variabile chiaveRicerca l'input acquisito dall'HTML
        var chiaveRicerca = $('input').val();
        $('.informazioni-film').empty();
        // console.log(chiaveRicerca);
        cercaFilm(chiaveRicerca);
    });

    function cercaFilm (input) {
        $.ajax({    //chiamata ajax al database di themoviedb
            url: urlBase + '/search/movie',
            data: {
                api_key: '0e632fcee10ca9b473d029f3731bf937',
                query: input,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var movies = data.results;
                console.log(movies);
                for (var i = 0; i < movies.length; i++) {
                    var movie = movies[i];
                    var infoMovie = {
                        titolo: movie.title,
                        titoloOriginale: movie.original_title,
                        linguaOriginale: movie.original_language,
                        voto: stelleVoto(movie.vote_average)
                    };
                    var specificheFilm = template(infoMovie);  //collegamento handlebars
                    $('.informazioni-film').append(specificheFilm);
                }
            },
            error: function (err) {
                alert('ERRORISSIMO!!!!!');
            }
        });
    };
    function stelleVoto (valutazione) {
        var recensione = Math.ceil(valutazione / 2);
        return recensione;
    };
});
