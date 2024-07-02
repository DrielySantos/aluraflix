import React from "react";
import styles from "./Header.module.css"
import Logo from "../../imagens/logo.png";
import iconUser from "../../imagens/icon-user.png";

const Header = ({ black }) =>{
    return(
        <header className={black ? styles.headerBlack : styles.header}>
            <div className={styles.headerLogo}>
                <a href="/">
                    <img src={Logo} alt="Logo Aluraflix"/>
                </a>
            </div>
            <div className={styles.headerUser}>
                <a href="/">
                    <img src={iconUser} alt="Icone usuário" />
                </a>
            </div>
        </header>
    )
}

export default Header;