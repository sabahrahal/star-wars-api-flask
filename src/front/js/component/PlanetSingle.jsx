import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const PlanetSingle = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [planetDetails, setPlanetDetails] = useState();

    const loadDetails = async () => {
        const data = await actions.getPlanetDetails(params.id);
        setPlanetDetails(data);
    };

    useEffect(() => {
        loadDetails();
    }, []);

    return (
        <div className="container mt-5">
            {planetDetails == undefined ? (
                <div>Loading...</div>
            ) : (
                <div className="d-flex justify-content-between">
                    <img
                        src={planetDetails.image}
                        height="auto"
                        width="400px"
                        alt="..."
                    />
                    <div className="ms-5">
                        <h1>{planetDetails.name}</h1>
                        <h2>A planet in the universe</h2>
                        <button
                            className="btn btn-outline-warning"
                            onClick={(e) => {
                                actions.handleNewFavoritePlanet(props.id);
                            }}
                        >
                            <i className={"far fa-heart"} />
                        </button>
                        <hr></hr>
                        <div className="d-flex mt-5 flex-wrap">
                            <div>
                                <h3 className="me-4">Name</h3>
                                <p>{planetDetails.name}</p>
                            </div>
                            <div className="me-4">
                                <h3>Climate</h3>
                                <p>{planetDetails.climate}</p>
                            </div>
                            <div className="me-4">
                                <h3>Terrain</h3>
                                <p>{planetDetails.terrain}</p>
                            </div>
                            <div className="me-4">
                                <h3>Population</h3>
                                <p>{planetDetails.population}</p>
                            </div>
                            <div className="me-4">
                                <h3>Diameter</h3>
                                <p>{planetDetails.diameter}</p>
                            </div>
                            <div className="me-4">
                                <h3>Gravity</h3>
                                <p>{planetDetails.gravity}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Link to="/" className="mt-4 btn-back-home btn btn-warning btn-lg">
                Back Home
            </Link>
        </div>
    );
};

export default PlanetSingle;
