import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PlanetSingle from "../component/PlanetSingle.jsx";

export const Planet = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <PlanetSingle />
    </>
  );
};
