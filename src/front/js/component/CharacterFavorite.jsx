import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CharacterFavorite = (props) => {
    const { store, actions } = useContext(Context);
    const [characterDetails, setCharacterDetails] = useState({});

    const loadDetails = async () => {
        const data = await actions.getCharacterDetails(props.character_id);
        setCharacterDetails(data);
    };

    useEffect(() => {
        loadDetails();
    }, []);

    return (
        <li key={props.id}>
            <div className="dropdown-item d-flex align-items-center justify-content-between">
                {characterDetails == undefined ? (
                    <div>Loading</div>
                ) : (
                    characterDetails.name
                )}
                <i
                    onClick={(event) =>
                        actions.handleDeleteFavoriteCharacter(props.id)
                    }
                    className="fas fa-trash ms-3"
                ></i>
            </div>
        </li>
    );
};
