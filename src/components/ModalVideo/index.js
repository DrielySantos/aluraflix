import React from "react";
import styles from "./Modal.module.css";

const ModalVideo = ({ isOpen, onClose, videoKey }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalVideoOverlay}>
            <div className={styles.modalVideoContent}>
                <button onClick={onClose} className={styles.closeButton}>fechar</button>
                {videoKey ? 
                    ( <iframe 
                            width="100%" 
                            height="700" 
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                            title="Trailer" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen={true}
                        >
                        </iframe>
                    ) : ( <h2>Trailer não encontrado</h2> ) }
            </div>
        </div>
    );
};

export default ModalVideo;