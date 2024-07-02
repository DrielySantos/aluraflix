import React from "react";
import styles from "./Banner.module.css";

const Banner = ({item}) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }
    let description = item.overview;
    if(description.length > 200){
        description = description.substring(0, 200)+'...';
    }
    
    return(
        <section className={styles.banner} style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className={styles.bannerBackgroundVertical}>
                <div className={styles.bannerBackgroundHorizontal}>
                    <div className={styles.bannerName}>{item.original_name}</div>
                    <div className={styles.bannerInfo}>
                        <div className={styles.bannerPoints}>{item.vote_average} pontos</div>
                        <div className={styles.bannerYear}>{firstDate.getFullYear()}</div>
                        <div className={styles.bannerSeasons}>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className={styles.bannerDescription}>{description}</div>
                    <div className={styles.bannerButtons}>
                        <a href={`/watch/${item.id}`} className={styles.watchButton}>▶ Assistir</a>
                        <a href={`/list/add/${item.id}`} className={styles.myListButton}>+ Minha Lista</a>
                    </div>
                    <div className={styles.bannerGenres}><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}

export default Banner;