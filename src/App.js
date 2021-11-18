import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData,] = useState(null);
  const [blackHeader, setBlackHeader,] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
     
      let list = await Tmdb.getHomeList();
      setMovieList(list);

  
      let originals = list.filter(i => i.slug === 'originals');
      console.log(originals)
      let randoChosen = Math.floor(Math.random() * (originals[0].items.results.length) - 1);
      let chosen = originals[0].items.results[randoChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);

      const timeout =   setInterval(async () => {
        let randoChosen = Math.floor(Math.random() * (originals[0].items.results.length) - 1);
        let chosen = originals[0].items.results[randoChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

        setFeatureData(chosenInfo);
      }, 10000)
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])


  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData &&
        <FeaturedMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix<br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>

  );
}

export default App;
