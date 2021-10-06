
//const img_Url = 'https://image.tmdb.org/t/p/w500/'

const baseURI = 'https://api.themoviedb.org/3/'

$('#formSearch').on('submit', function(e) {
    e.preventDefault()
    const newdiv = $('<div></div>')
    let searchText = $('#searchText').val();
    $.getJSON(`${baseURI}search/movie?api_key=7937e4aff3faed4f92f3cca2a9390e8c&language=en-US&query=${searchText}&page=1&include_adult=false`, function(data) {
        console.log(data['results'][0]['original_title']);
        
        data['results'].forEach(movie => {
            //const {original_title, poster_path, vote_average, overview} = movie;
            const {id, original_title, release_date, original_language} = movie;
            $(`<div class="movieObject">
                <header>
                    <input type="hidden" value="${id}">
                    <h3>${original_title}</h3>
                </header>
                <main>
                    Release Year: ${new Date(release_date).getFullYear()} <br>
                    Language: ${original_language}

                </main>
            </div>`).appendTo(newdiv);
        })
        
        $('#section').empty();

        newdiv.appendTo('#section');
        //$('test').replaceWith(`<h1>${data['results'][0]['original_title']}</h1>`);
    });
});

$(document).on('click', 'div.movieObject', function() {
    const id = $(this).children('header').eq(0).children('input').eq(0).val();
    const modalContent = $(`<div class="modalContent">
                        <span class="closeModal">&times;</span>
                        <header>
                            <h3 id="title"></h3>
                        </header>
                        <main>
                            Release Year: <span id="releaseYear"></span> <br>
                            Language: <span id="language"></span> <br>
                            Runtime: <span id="runtime"></span> <br>
                            Genres: 
                            <ul id="genres">

                            </ul>

                            <ul id="productionCompanies">

                            </ul>

                            Homepage: <a id="homepage">Movie Homepage</a>
                            <div>
                                Summary:
                                <p id="summary">

                                </p>
                            </div>

                            Actors:
                            <ul id="actors">

                            </ul>

                            Directors:
                            <ul id="directors">

                            </ul>

                            Script writers:
                            <ul id="scriptWriters">

                            </ul>

                            Executive producers:
                            <ul id="execProducers">

                            </ul>

                            Producers:
                            <ul id="producers">

                            </ul>

                            Music composers:
                            <ul id="musicComposers">
                                
                            </ul>

                        </main>

                    </div>`)
    $.getJSON(`${baseURI}movie/${id}?api_key=7937e4aff3faed4f92f3cca2a9390e8c&language=en-US`, function(data) {
        console.log(data['original_title'])
        
        const {original_title, release_date, original_language, runtime, overview, homepage, genres, production_companies} = data;
        
        
        modalContent.find('#title').text(original_title);
        modalContent.find('#releaseYear').text(new Date(release_date).getFullYear());
        modalContent.find('#language').text(original_language);
        modalContent.find('#runtime').text(runtime);
        modalContent.find('#summary').text(overview);
        modalContent.find('#homepage').attr('href', homepage);
        /*
       $('#title').text(original_title);
       $('#releaseYear').text(new Date(release_date).getFullYear());
       $('#language').text(original_language);
       $('#runtime').text(runtime);
       $('#summary').text(overview);
       $('#homepage').attr('href', homepage);
       */
        genres.forEach(genre => {
            $(`<li>${genre['name']}</li>`).appendTo(modalContent.find('#genres'));
        });

        production_companies.forEach(company => {
            $(`<li>${company['name']}</li>`).appendTo(modalContent.find('#productionCompanies'))
        });

        //$(original_title).appendTo()
        
    });


    $.getJSON(`${baseURI}movie/${id}/credits?api_key=7937e4aff3faed4f92f3cca2a9390e8c&language=en-US`, function(data) {
        const cast = data['cast'];
        const crew = data['crew'];

        cast.forEach(actor => {
            $(`<li>${actor['name']} as ${actor['character']}</li>`).appendTo(modalContent.find('#actors'));
        });

        crew.forEach(employee => {
            const job = employee['job']
            if (job.toLowerCase().includes('director')) {
                $(`<li>${employee['name']}</li>`).appendTo(modalContent.find('#directors'));
            } 
            else if (job.toLowerCase().includes('script')){
                $(`<li>${employee['name']}</li>`).appendTo(modalContent.find('#scriptWriters'));
            }
            else if (job.toLowerCase().includes('executive producer')){
                $(`<li>${employee['name']}</li>`).appendTo(modalContent.find('#execProducers'));
            }
            else if (job.toLowerCase().includes('producer')){
                $(`<li>${employee['name']}</li>`).appendTo(modalContent.find('#producers'));
            }
            else if (job.toLowerCase().includes('composer')){
                $(`<li>${employee['name']}</li>`).appendTo(modalContent.find('#musicComposers'));
            }
        });
    });

    modalContent.appendTo('#modal');
    $('#modal').show();
});

$(document).on('click', 'span.closeModal', function() {
    $('#modal').empty();
    $('#modal').hide();
});