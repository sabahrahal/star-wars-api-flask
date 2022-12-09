import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CharacterFavorite } from "./CharacterFavorite.jsx";
import { PlanetFavorite } from "./PlanetFavorite.jsx";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [usernameRegisterInput, setUsernameRegisterInput] = useState("");
    const [passwordRegisterInput, setPasswordRegisterInput] = useState("");
    const [username, setUsername] = useState("");

    async function handleLogin(user, pass) {
        const response = await fetch('https://3001-4geeksacade-reactflaskh-esr7aixdbve.ws-us75.gitpod.io/api/token', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, password: pass })
        });
        if (!response.ok) {
            alert("Credenciales Invalidos");
            return;
        }
        if (response.status === 401 || response.status === 400) {
            throw ("Credenciales Invalidos")
        }
        const data = await response.json();
        localStorage.setItem("jwt-token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("user_id", data.user_id);
        setUsername(localStorage.getItem("username"));
        setStore({ username: localStorage.getItem("username") })
        actions.handleFavoriteCharacter();
        actions.handleFavoritePlanet();
        return data;
    }
    async function handleRegister() {
        const response = await fetch('https://3001-4geeksacade-reactflaskh-esr7aixdbve.ws-us75.gitpod.io/api/users', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usernameRegisterInput, password: passwordRegisterInput })
        })
        if (!response.ok) {
            alert("Ha ocurrido un problema al registrar");
            return;
        }
        const data = await response.json();
        handleLogin(usernameRegisterInput, passwordRegisterInput);
        console.log(data);
    }
    function handleLogOut() {
        localStorage.setItem("jwt-token", "");
        localStorage.setItem("username", "");
        localStorage.setItem("user_id", "");
        setUsername("");
    }

    useEffect(() => {
        setUsername(localStorage.getItem("username"))
        if (username != "") {
            actions.handleFavoriteCharacter();
            actions.handleFavoritePlanet();
        }
    }, [username])


    return (
        <>
            <nav className="navbar navbar-light bg-light sticky-top">
                <div className="container">
                    <Link to="/">
                        <img
                            height="75px"
                            src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG43.png"
                            className="navbar-brand mb-0 h1"
                        />
                    </Link>
                    {username === "" ?
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Login
                        </button> : <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                            <i className="fas fa-sign-out-alt btn p-2" onClick={e => handleLogOut()} />
                            <div className="fs-4">{username}!</div>
                            {/*---------------------------------------------------- FAVORITES  ----------------------------------------------------*/}
                            <div className="ml-auto dropdown me-2">
                                <button
                                    className="btn btn-warning dropdown-toggle me-2"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Favorites
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {store.characterFavorites.map((element, index) => {
                                        return (
                                            <CharacterFavorite id={element.id} character_id={element.character_id} key={index} />
                                        );
                                    })}
                                    {store.planetFavorites.map((element, index) => {
                                        return (
                                            <PlanetFavorite id={element.id} planet_id={element.planet_id} key={index} />
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    }

                </div>
            </nav>
            {/*---------------------------------------------------- MODAL  ----------------------------------------------------*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content d-flex flex-row justify-content-center">
                        <div className="left">
                            <div className="modal-header justify-content-center">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                            </div>
                            <div className="modal-body d-flex flex-column">
                                <input className="m-2" onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} placeholder="Username" />
                                <input className="m-2" type="password" onChange={e => { setPasswordInput(e.target.value) }} value={passwordInput} placeholder="Password" />
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => { handleLogin(usernameInput, passwordInput) }}>Login!</button>
                            </div>
                        </div>
                        <div className="right">
                            <div className="modal-header justify-content-center">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Sign up</h1>
                                <button type="button" className="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex flex-column">
                                <input className="m-2" onChange={e => { setUsernameRegisterInput(e.target.value) }} value={usernameRegisterInput} placeholder="Username" />
                                <input className="m-2" type="password" onChange={e => { setPasswordRegisterInput(e.target.value) }} value={passwordRegisterInput} placeholder="Password" />
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => { handleRegister() }}>Sign up!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
