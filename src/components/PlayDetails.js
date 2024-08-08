import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/PlayDetails.css';

function PlayDetails() {
  const location = useLocation();
  const name = location.state.name;
  const genre = location.state.genre;
  const subject = location.state.subject;
  const director = location.state.director;
  const writer = location.state.writer;
  const assistant_director = location.state.assistant_director;
  const music = location.state.music;
  const lights = location.state.lights;
  const decor = location.state.decor;
  const actors = location.state.actors;
  const length = location.state.length;


  return (
    <div className="playdetail-main-container">
      <div style={{display:'flex', flexDirection:'row'}}>
        <div className="playdetail-sub-container">
              <h2>Kadro</h2>
              <p>Yönetmen: {director}</p>
              <p>Yazar: {writer}</p>
              <p>Yardımcı Yönetmen: {assistant_director}</p>
              <p>Dekor: {decor}</p>
              <p>Işık: {lights}</p>
              <p>Müzik: {music}</p>
              <h2>Tür</h2>
              <p>{genre}</p>
              <h2>Süre</h2>
              <p>{length}</p>
          </div>
          <div className="playdetail-sub-container">
              <h2>Konu</h2>
              <p>{subject}</p>
          </div>
          <div className="playdetail-sub-container">
              <h2>Oyuncular</h2>
              {actors.map((actor, key) => (
                <p key={key}>{actor}</p>
              ))}
          </div>
      </div>
      <Link to={`/plays/${name}/seat-select`} style={{ height: '200px'}}>
        <button className="playDetail-button">Seans ve Koltuk Bilgileri </button>
      </Link>
    </div>
    
  );
}

export default PlayDetails;
