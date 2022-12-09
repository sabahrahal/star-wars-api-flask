import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import CharacterCard from "./CharacterCard.jsx";

const Characters = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getCharacters();
  }, []);

  return (
    <div className="container mb-5">
      <h1 className="home-title">Characters</h1>
      <div className="row flex-row flex-nowrap char-container">
        {store.characters.map((element) => {
          return <CharacterCard name={element.name} id={element.uid} key={element.uid} />;
        })}
      </div>
    </div>
  );
};

export default Characters;
