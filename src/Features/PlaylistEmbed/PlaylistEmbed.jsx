// import { useEffect } from "react";
// import Button from "../../Shared/components/Buttons";
import styles from './PlaylistEmbed.module.css';

/* eslint-disable react/prop-types */
export default function PlaylistEmbed(props) {

  // useEffect(() => {
  //   const embedContainer = document.getElementById('embed-container');

  //   const hidePlaylistEmbed = (event) => {
  //     if (event.target === embedContainer) {
  //       props.togglePlaylistEmbed();
  //     }
  //   }

  //   window.addEventListener('click', hidePlaylistEmbed);

  //   return () => {
  //     window.removeEventListener('click', hidePlaylistEmbed);
  //   }
  // }, []);

  return (
    <div
      id="embed-container"
      className={props.isPlaylistEmbedded ? styles.embedContainer + " " + styles.playlistEmbedded : styles.embedContainer}>
      {/* <Button className='btn' title='Close player' onClickHandler={props.togglePlaylistEmbed} /> */}
      <div className={styles.embedHeader}>
        <span>Player</span>
        <i className={"fa-solid fa-xmark " + styles.xMark} onClick={props.togglePlaylistEmbed}></i>
      </div>
      <iframe
        title="Spotify Embed: Recommendation Playlist"
        src={`https://open.spotify.com/embed/playlist/${props.playlistId}?utm_source=generator&theme=0`}
        className={styles.spotifyEmbed}
        // allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}