import React from "react";
import styles from "./Rodape.module.css";

const Rodape = () =>{
    return(
        <footer>
            <h3 className={styles.rodapeTitle}>
                Desenvolvido por  
                <a href="https://www.linkedin.com/in/drielysantos/"> Driely Santos</a>
            </h3>
            <p>Direitos de imagem para Netflix</p>
            <p>Dados pegos do site Themoviedb.org</p>
        </footer>
    )
}

export default Rodape;