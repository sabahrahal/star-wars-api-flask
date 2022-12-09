import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CharacterSingle from "../component/CharacterSingle.jsx";

export const Character = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <CharacterSingle />
    </>
  );
};
