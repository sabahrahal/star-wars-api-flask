import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const CharacterCard = (props) => {
    const { store, actions } = useContext(Context);
    const [characterDetails, setCharacterDetails] = useState();

    const loadDetails = async () => {
        const data = await actions.getCharacterDetails(props.id);
        setCharacterDetails(data);
    };

    useEffect(() => {
        loadDetails();
    }, []);

    return (
        <div className="col-4" key={props.id}>
            <div className="card">
                {characterDetails == undefined ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <img
                            src={characterDetails.image}
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                {characterDetails.name}
                            </h5>
                            <div>Gender: {characterDetails.gender}</div>
                            <div>Hair Color: {characterDetails.hair_color}</div>
                            <div>Eye Color: {characterDetails.eye_color}</div>
                            <div className="d-flex justify-content-between mt-2 flex-wrap">
                                <Link
                                    to={"/character/" + props.id}
                                    className="btn btn-primary"
                                >
                                    Learn more!
                                </Link>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={(e) => {
                                        actions.handleNewFavoriteCharacter(
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

export default CharacterCard;
