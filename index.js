const express = require('express');
require('dotenv').config();
const app = express();
const fetch = require('node-fetch');
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('listening on', `http://localhost:${PORT}`)
});

app.get('/', (req, res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=4`)
        .then(result => result.json())
        .then(data => {
            console.log(data.results);
            res.render('pages/myMovies', { title: 'movies', data })
        })
})

app.get('/movieDetails/:id', (req, res) => {
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
        .then(result => result.json())
        .then(data => {
            console.log(data)
            //res.json(data)
            res.render('pages/movieDetails.ejs', {
                title: 'movieDetails',
                data: data
            })
        })


})

app.get('/genre', (req, res) => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`)
        .then(result => result.json())
        .then(data => {
            console.log(data.results);
            res.render('pages/genre', { title: 'movies', data })
        })
})