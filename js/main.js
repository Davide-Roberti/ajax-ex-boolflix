$(document).ready(function () {

    var source = $("#movie-info-template").html();     //richiamo del template di handlebars
    var template = Handlebars.compile(source);

    var urlBase = 'https://api.themoviedb.org/3';

    $('button').click(function() { // al click del bottone salvo nella variabile chiaveRicerca l'input acquisito dall'HTML
        var chiaveRicerca = $('#ricerca').val();
        $('.informazioni-film').empty();
        // console.log(chiaveRicerca);
        cercaShow(chiaveRicerca, 'movie');
        cercaShow(chiaveRicerca, 'tv');
    });

    $('#ricerca').keydown(function(event) {
        var chiaveRicerca = $('#ricerca').val();
        if(event.keyCode == '13') {
            $('.informazioni-film').empty();
            cercaShow(chiaveRicerca, 'movie');
            cercaShow(chiaveRicerca, 'tv');
        }
    });

    function cercaShow (input, tipo) {
        $.ajax({    //chiamata ajax al database di themoviedb per cercare film e serie tv
            url: urlBase + '/search/' + tipo,
            data: {
                api_key: '0e632fcee10ca9b473d029f3731bf937',
                query: input,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var dataShow = data.results;
                createCard(dataShow);
            },
            error: function (err) {
                alert('ERRORISSIMO!!!!!');
            }
        });
    };

    function createCard (dataInput) {    //ciclo for per passare i valori a handlebars
        for (var i = 0; i < dataInput.length; i++) {
            var infoShow = dataInput[i];
            var info = {
                titoloSerie: infoShow.name,
                titolo: infoShow.title,
                titoloOriginaleSerie: infoShow.original_name,
                titoloOriginale: infoShow.original_title,
                linguaOriginale: bandierine(infoShow.original_language),
                voto: stelleVoto(infoShow.vote_average),
                plot: infoShow.overview,
                copertina: posterCopertina(infoShow.poster_path)
            };
            var specificheShow = template(info);  //collegamento handlebars
            $('.informazioni-film').append(specificheShow);
        };
    };

    function posterCopertina (valoreApiCover) {   //funzione per aggiungere l'immagine di copertina
        if (valoreApiCover !== null) {
            var urlBaseCover = 'https://image.tmdb.org/t/p/';
            var dimensione = 'w342/';
            return '<img class="cover" src="' + urlBaseCover + dimensione + valoreApiCover + '">';
        } else {
            return '<img class="cover" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flascrucesfilmfest.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fno-poster-available.jpg&f=1&nofb=1">';
        };
    };

    function bandierine (siglaNazione) {  //funzione per trasformare la lingua in bandierine
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

    function stelleVoto (valutazione) {    //funzione per trasformare la valutazione in stelline
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
