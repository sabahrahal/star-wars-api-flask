import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const PlanetFavorite = (props) => {
    const { store, actions } = useContext(Context);
    const [planetDetails, setPlanetDetails] = useState({});

    const loadDetails = async () => {
        const data = await actions.getPlanetDetails(props.planet_id);
        setPlanetDetails(data);
    };

    useEffect(() => {
        loadDetails();
    }, []);

    return (
        <li key={props.id}>
            <div className="dropdown-item d-flex align-items-center justify-content-between">
                {planetDetails == undefined ? (
                    <div>Loading</div>
                ) : (
                    planetDetails.name
                )}
                <i
                    onClick={(event) => actions.handleDeleteFavoritePlanet(props.id)}
                    className="fas fa-trash ms-3"
                ></i>
            </div>
        </li>
    );
};
