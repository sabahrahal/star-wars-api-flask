"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, PlanetFavorite, CharacterFavorite
from api.utils import generate_sitemap, APIException
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#            USER 

@api.route('/users', methods=['POST','GET'])
def handle_user():
    if request.method == 'GET':
        users = User.query.all()
        users_dictionary = []
        for user in users:
            users_dictionary.append(user.serialize())
        return jsonify(users_dictionary), 200
    else:
        new_user_data = request.json
        try:
            if "username" not in new_user_data or new_user_data["username"] == "":
                raise Exception("No mandaste user", 400)
            if "password" not in new_user_data or new_user_data["password"] == "":
                raise Exception("No mandaste password", 400)
            new_user = User.create(**new_user_data)
            return jsonify(new_user.serialize()), 201
        except Exception as error:
            return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

@api.route('/users/<int:position>', methods=["DELETE"])
def handle_user_delete(position):
    User.query.filter_by(id=position).delete()
    db.session.commit()
    return f"User {position} was deleted succesfully"

# TOKEN CREATOR

@api.route('/token', methods=['POST'])
def create_token():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify({"msg":"Bad username or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id, "username": user.username})

#            CHARACTER 

@api.route('/characters', methods=['POST','GET'])
def handle_character():
    if request.method == 'GET':
        characters = Character.query.all()
        characters_dictionary = []
        for character in characters:
            characters_dictionary.append(character.serialize())
        return jsonify(characters_dictionary), 200
    else:
        new_character_data = request.json
        try:
            new_character = Character.create(**new_character_data)
            return jsonify(new_character.serialize()), 201
        except Exception as error:
            raise Exception(error.args[0], error.args[1] if len(error.args) > 1 else 500)

@api.route('/characters/<int:position>', methods=["DELETE", "GET"])
def handle_character_single(position):
    if request.method == 'GET':
        get_character = Character.query.filter_by(uid=position).one_or_none()
        return jsonify(get_character.serialize()), 201      
    Character.query.filter_by(uid=position).delete()
    db.session.commit()
    return f"Character {position} was deleted succesfully"

#            CHARACTER FAVORITE

@api.route('/characters/favorites', methods=['POST'])
@jwt_required()
def handle_character_favorite():
    current_user_id = get_jwt_identity()
    new_character_favorite_data = request.json
    new_character_favorite_data["user_id"] = current_user_id
    try:
        new_character_favorite = CharacterFavorite.create(**new_character_favorite_data)
        return jsonify(new_character_favorite.serialize()), 201
    except Exception as error:
            raise Exception(error.args[0], error.args[1] if len(error.args) > 1 else 500)

@api.route('/characters/favorites', methods=['GET'])
@jwt_required()
def handle_character_favorite_get():
    current_user_id = get_jwt_identity()
    characters_favorite = CharacterFavorite.query.filter_by(user_id=current_user_id)
    characters_favorite_dictionary = []
    for favorite in characters_favorite:
        characters_favorite_dictionary.append(favorite.serialize())
    return jsonify(characters_favorite_dictionary), 200

@api.route('/characters/favorites/<int:position>', methods=["DELETE"])
@jwt_required()
def handle_character_favorite_delete(position):
    current_user_id = get_jwt_identity()
    CharacterFavorite.query.filter_by(id=position).delete()
    db.session.commit()
    return f"Character Favorite with ID {position} was deleted succesfully"


#            PLANET 

@api.route('/planets', methods=['POST','GET'])
def handle_planet():
    if request.method == 'GET':
        planets = Planet.query.all()
        planets_dictionary = []
        for planet in planets:
            planets_dictionary.append(planet.serialize())
        return jsonify(planets_dictionary), 200
    else:
        new_planet_data = request.json
        try:
            new_planet = Planet.create(**new_planet_data)
            return jsonify(new_planet.serialize()), 201
        except Exception as error:
            raise Exception(error.args[0], error.args[1] if len(error.args) > 1 else 500)

@api.route('/planets/<int:position>', methods=["DELETE", "GET"])
def handle_planet_single(position):
    if request.method == 'GET':
        get_planet = Planet.query.filter_by(uid=position).one_or_none()
        return jsonify(get_planet.serialize()), 201      
    Planet.query.filter_by(uid=position).delete()
    db.session.commit()
    return f"Planet {position} was deleted succesfully"

#            PLANET FAVORITE

@api.route('/planets/favorites', methods=['POST'])
@jwt_required()
def handle_planet_favorite():
    current_user_id = get_jwt_identity()
    new_planet_favorite_data = request.json
    new_planet_favorite_data["user_id"] = current_user_id
    try:
        new_planet_favorite = PlanetFavorite.create(**new_planet_favorite_data)
        return jsonify(new_planet_favorite.serialize()), 201
    except Exception as error:
            raise Exception(error.args[0], error.args[1] if len(error.args) > 1 else 500)

@api.route('/planets/favorites', methods=['GET'])
@jwt_required()
def handle_planet_favorite_get():
    current_user_id = get_jwt_identity()
    planets_favorite = PlanetFavorite.query.filter_by(user_id=current_user_id)
    planets_favorite_dictionary = []
    for favorite in planets_favorite:
        planets_favorite_dictionary.append(favorite.serialize())
    return jsonify(planets_favorite_dictionary), 200

@api.route('/planets/favorites/<int:position>', methods=["DELETE"])
@jwt_required()
def handle_planet_favorite_delete(position):
    current_user_id = get_jwt_identity()
    PlanetFavorite.query.filter_by(id=position).delete()
    db.session.commit()
    return f"Planet Favorite with ID {position} was deleted succesfully"

## FILL PLANET

@api.route('/fill/planets', methods=['GET'])
def handle_fill_planet():
    response = requests.get('https://swapi.dev/api/planets')
    data = response.json()
    planets = Planet.query.all()
    if len(planets) == data['count']:
        return jsonify('Los planetas ya existen'), 400
    
    null = False
    count = 1 
    for number in range(len(data['results'])):
        index = number
        map_response_planet(data, index, count)
        count += 1
    
    while not null:
        response = requests.get(data['next'])
        data = response.json()
        for number in range(len(data['results'])):
            index = number
            map_response_planet(data, index, count)
            count += 1
        null = data['next'] is None
    return jsonify(f'Se crearon {count-1} planetas')

def map_response_planet(data ,index, count):
    Planet.create(name = data['results'][index]['name'], climate = data['results'][index]['climate'], terrain = data['results'][index]['terrain'],
    population = data['results'][index]['population'], diameter = data['results'][index]['diameter'], gravity = data['results'][index]['gravity'],
    image = f"https://starwars-visualguide.com/assets/img/planets/{count}.jpg", uid = count)
    return print('Creando...')

## FILL CHARACTER

@api.route('/fill/characters', methods=['GET'])
def handle_fill_character():
    response = requests.get('https://swapi.dev/api/people')
    data = response.json()
    characters = Character.query.all()
    if len(characters) == data['count']:
        return jsonify('Los personajes ya existen'), 400
    
    null = False
    count = 1 
    for number in range(len(data['results'])):
        index = number
        map_response_character(data, index, count)
        count += 1
    
    while not null:
        response = requests.get(data['next'])
        data = response.json()
        for number in range(len(data['results'])):
            index = number
            map_response_character(data, index, count)
            count += 1
        null = data['next'] is None
    return jsonify(f'Se crearon {count-1} personajes')

def map_response_character(data ,index, count):
    Character.create(name = data['results'][index]['name'], birth_year = data['results'][index]['birth_year'], hair_color = data['results'][index]['hair_color'],
    eye_color = data['results'][index]['eye_color'], gender = data['results'][index]['gender'], height = data['results'][index]['height'],
    image = f"https://starwars-visualguide.com/assets/img/characters/{count}.jpg", uid = count)
    return print('Creando...')
