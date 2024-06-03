import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "./SearchResults";
import SearchBar from './SearchBar';
import Playlist from "./Playlist";
import { Spotify } from './util/Spotify/Spotify'

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Track Name 1",
      artist: "Example Track Artist 1",
      album: "Example Track Album 1",
      id: 1,
    },
    {
      name: "Example Track Name 2",
      artist: "Example Track Artist 2",
      album: "Example Track Album 2",
      id: 2,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Album 1",
      id: 11,
    },
    {
      name: "Example Playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Album 2",
      id: 22,
    },
  ]);
  
  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name)
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist")
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then(result => setSearchResults(result))
    console.log(term)
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Searchbar component here --> */}
        <SearchBar onSearch={search} />

        <div className={styles['App-playlist']}>
          {/* SearchResults component here */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          {/* Playlist component here */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  )
}
export default App;