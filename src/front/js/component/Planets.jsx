import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PlanetCard from "./PlanetCard.jsx";

const Planets = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPlanets();
  }, []);

  return (
    <div className="container">
      <h1 className="home-title">Planets</h1>
      <div className="row flex-row flex-nowrap char-container">
        {store.planets.map((element, index) => {
          return <PlanetCard id={element.uid} key={element.uid} />;
        })}
      </div>
    </div>
  );
};

export default Planets;
