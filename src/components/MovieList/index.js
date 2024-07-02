import React, { useState} from "react";
import styles from "./MovieList.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModalVideo from "../ModalVideo";
import Tmdb from "../../Tmdb";

const MovieList = ({title, items, isTvShow }) =>{
    const [scrollX, setScrollX] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);

    const handleOnClick = async (item) =>{

    const type = isTvShow || item.media_type === 'tv' ? 'tv' : 'movie';    
    const trailer = await Tmdb.getTrailer(item.id, type)

        if(trailer){
            setTrailerKey(trailer.key);
        } else {
            setTrailerKey(null);
        }
    }

    const handleLeftArrow = () =>{
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 150;
        if((window.innerWidth - listWidth) > x){
            x = (window.innerWidth - listWidth) - 60;
        }
        setScrollX(x);
    }

    return(
        <div className={styles.movieListContainer}>
            <h2>{title}</h2>
            <div className={styles.movieListLeft} onClick={handleLeftArrow}>
                <ArrowBackIosIcon style={{fontSize: 50}}/>
            </div>
            <div className={styles.movieListRight} onClick={handleRightArrow}>
                <ArrowForwardIosIcon style={{fontSize: 50}}/>
            </div> 
            <div className={styles.movieListArea}>
                <div className={styles.movieList} style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className={styles.movieListItem}>
                            <button onClick={() => {
                                setOpenModal(true);
                                handleOnClick(item)
                            }}> 
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ModalVideo isOpen={openModal} onClose={() => setOpenModal(false)} videoKey={trailerKey} />
                
        </div>
    )
}

export default MovieList;