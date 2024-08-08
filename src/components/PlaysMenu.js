import React from 'react'
import '../styles/PlaysMenu.css';
import { Data } from '../helpers/Data';
import PlaysMenuItem from './PlaysMenuItem';

export default function Plays() {
  return (
    <div className="menu">
      <h1 className="menuTitle">Tüm Oyunlar</h1>
      <div className="menuList">
        {Data.map((menuItem, key) => {
          return (
            <PlaysMenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              genre={menuItem.genre}
              date={menuItem.date}
              subject={menuItem.subject}
              director={menuItem.director}
              writer={menuItem.writer}
              assistant_director={menuItem.assistant_director}
              music={menuItem.music}
              lights={menuItem.lights}
              decor={menuItem.decor}
              actors={menuItem.actors}
              length={menuItem.length}
            />
          );
        })}
      </div>
    </div>
  )
}
