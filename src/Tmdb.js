const API_KEY = '8184a4064f591c083a45819cbb838f99';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) =>{ 
    const resposta = await fetch(`${API_BASE}${endpoint}`);
    const json = await resposta.json();
    return json;
}

const movieApi = {
    getHomeList: async () =>{
        return [
            {
                name: 'trending',
                title: 'Em Alta',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                name: 'originals',
                title: 'Originais',
                items: await basicFetch(`/discover/tv?with_network=213&languege=pt-BR&api_key=${API_KEY}`)
            },
            {
                name: 'toprated',
                title: 'Populares',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                name: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                name: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                name: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                name: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                name: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};
            if(movieId){
                switch(type){
                    case 'movie':
                        info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                    break;
                    case 'tv':
                        info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                    break;
                    default:
                        info = null; 
                    break;
                }
            }
        return info;
    },

    getTrailer: async (movieId, type) => {
        let trailer = await basicFetch(`/${type}/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`);
        let foundTrailer = trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube' && video.iso_639_1 === 'pt');
    
        if (!foundTrailer) {
            trailer = await basicFetch(`/${type}/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
            foundTrailer = trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube' && video.iso_639_1 === 'en');
        }
    
        return foundTrailer;
    }
}

export default movieApi;