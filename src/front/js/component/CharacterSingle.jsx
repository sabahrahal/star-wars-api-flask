import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const CharacterSingle = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [characterDetails, setCharacterDetails] = useState();

    const loadDetails = async () => {
        const data = await actions.getCharacterDetails(params.id);
        setCharacterDetails(data);
    };

    useEffect(() => {
        loadDetails();
    }, []);

    return (
        <div className="container mt-5">
            {characterDetails == undefined ? (
                <div>Loading...</div>
            ) : (
                <div className="d-flex justify-content-between">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`}
                        height="auto"
                        width="400px"
                        alt="..."
                    />
                    <div className="ms-5">
                        <h1>{characterDetails.name}</h1>
                        <h2>A character in the universe</h2>
                        <button
                            className="btn btn-outline-warning"
                            onClick={(e) => {
                                actions.handleNewFavoriteCharacter(params.id);
                            }}
                        >
                            <i className={"far fa-heart"} />
                        </button>
                        <hr></hr>
                        <div className="d-flex mt-5 flex-wrap">
                            <div>
                                <h3 className="me-4">Name</h3>
                                <p>{characterDetails.name}</p>
                            </div>
                            <div className="me-4">
                                <h3>Birth Year</h3>
                                <p>{characterDetails.birth_year}</p>
                            </div>
                            <div className="me-4">
                                <h3>Gender</h3>
                                <p>{characterDetails.gender}</p>
                            </div>
                            <div className="me-4">
                                <h3>Height</h3>
                                <p>{characterDetails.height}</p>
                            </div>
                            <div className="me-4">
                                <h3>Eye Color</h3>
                                <p>{characterDetails.eye_color}</p>
                            </div>
                            <div className="me-4">
                                <h3>Hair Color</h3>
                                <p>{characterDetails.hair_color}</p>
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

export default CharacterSingle;
