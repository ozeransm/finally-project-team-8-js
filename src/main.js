import axios from 'axios';

const BASE_GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const BAES_UPCOMING_URL = 'https://api.themoviedb.org/3/movie/upcoming';
const API_KEY = '057e36269a3ddafbb398756699f3ba82';
const refs = {
    galery: document.querySelector('.galery'),
    genre: document.querySelector('.genre'),
}
const respGenre = responseData(`${BASE_GENRE_URL}?api_key=${API_KEY}`);

// https://api.themoviedb.org/3/movie/upcoming?api_key=057e36269a3ddafbb398756699f3ba82&language=en-US&page=1
async function responseData(url=''){
    if(url){
    return await axios.get(url);
    }
}

responseData(`${BAES_UPCOMING_URL}?api_key=${API_KEY}&language=en-US&page=1`)
.then(markUp);


async function genreStr(arr){
        const data = await respGenre;
        return arr.map((el)=>el = data.data.genres.filter(({id})=>id == el)[0].name).join(' ');
      
 }


async function markUp(data){
    
    data.data.results.map(async ({poster_path ,original_title, id, release_date, vote_average, vote_count, popularity, overview, genre_ids})=>{
        
        const str = `<div class="item"><img src="${BASE_IMG_URL}${poster_path}" alt="${original_title}"><div><h1>${original_title}</h1><h2>Release date ${release_date}</h2><h2>Vote / Votes ${vote_average} / ${vote_count }</h2><h2>Popularity ${popularity}</h2><h2 class="genre">${await genreStr(genre_ids)}</h2><p>About ${overview}</p></div></div>`;
        refs.galery.insertAdjacentHTML('beforeend', str);
        
    });

    
       
}