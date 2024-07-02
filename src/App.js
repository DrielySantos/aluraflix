import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieList from "./components/MovieList";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Rodape from "./components/Rodape";

const App = () => {
  
  const [movieList, setMovieList] = useState([]);
  const [bannerData, setBannerData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() =>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.name === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setBannerData(chosenInfo)
    }
    
    loadAll();
  }, []);

  useEffect(() =>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return(
    <div className="page">

      <Header black={blackHeader} />

      {bannerData && 
        <Banner item={bannerData} />
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieList key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <Rodape />

      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://i.pinimg.com/originals/d6/60/f0/d660f05d58164ba3b648838cd85d4561.gif" alt="Loanding"/>
        </div>
      }
    </div>
  );
}

export default App;
