
const img_Url = 'https://image.tmdb.org/t/p/w500/'


$('#formSearch').on('submit', function(e) {
    e.preventDefault()
    const newdiv = $('<div></div>')
    let searchText = $('#searchText').val();
    $.getJSON(`https://api.themoviedb.org/3/search/movie?api_key=7937e4aff3faed4f92f3cca2a9390e8c&language=en-US&query=${searchText}&page=1&include_adult=false`, function(data) {
        console.log(data['results'][0]['original_title']);
        
        data['results'].forEach(movie => {
            const {original_title, poster_path, vote_average, overview} = movie;
            $(`<div>
            <picture>
                <source srcset="${img_Url + poster_path}" media="(min-width: 1024px)">
                <source srcset="${img_Url + poster_path}" media="(min-width: 768px)">
                <img src="${img_Url + poster_path}">
            </picture>

            <div>
                <h3>${original_title}</h3>
                <span>${vote_average}</span>

            </div>

            <div>
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>`).appendTo(newdiv)
        })
        
        $('#test').empty();

        newdiv.appendTo('#test')
        //$('test').replaceWith(`<h1>${data['results'][0]['original_title']}</h1>`);
    });
});