import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const PlanetCard = (props) => {
    const { store, actions } = useContext(Context);
    const [planetDetails, setPlanetDetails] = useState();

    const loadDetails = async () => {
        const data = await actions.getPlanetDetails(props.id);
        setPlanetDetails(data);
    };

    useEffect(() => {
        loadDetails();
    }, []);

    return (
        <div className="col-4">
            <div key={props.id} className="card">
                {planetDetails == undefined ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <img
                            src={planetDetails.image}
                            className="card-img-top"
                            alt="..."
                            width="400px"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{planetDetails.name}</h5>
                            <div>Population: {planetDetails.population}</div>
                            <div>Terrain: {planetDetails.terrain}</div>
                            <div className="d-flex flex-wrap justify-content-between mt-2">
                                <Link
                                    to={`/planet/${props.id}`}
                                    className="btn btn-primary"
                                >
                                    Learn more!
                                </Link>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={(e) => {
                                        actions.handleNewFavoritePlanet(
                                            props.id
                                        );
                                    }}
                                >
                                    <i className={"far fa-heart"} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PlanetCard;
