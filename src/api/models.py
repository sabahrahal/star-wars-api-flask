from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __init__(self, **kwargs):
        self.username = kwargs["username"]
        self.password = kwargs["password"]

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        db.session.add(instance)
        try:
            db.session.commit()
            return instance
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
        }

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    birth_year = db.Column(db.String(120))
    hair_color = db.Column(db.String(120))
    eye_color = db.Column(db.String(120))
    gender = db.Column(db.String(120))
    height = db.Column(db.String(120))
    image = db.Column(db.String(120))
    uid = db.Column(db.Integer)


    def __init__(self, **kwargs):
        self.name = kwargs["name"]
        self.birth_year = kwargs["birth_year"]
        self.hair_color = kwargs["hair_color"]
        self.eye_color = kwargs["eye_color"]
        self.gender = kwargs["gender"]
        self.height = kwargs["height"]
        self.image = kwargs["image"]
        self.uid = kwargs["uid"]

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        db.session.add(instance)
        try:
            db.session.commit()
            return instance
        except Exception as error:
            raise Exception(error.args[0], 400)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "birth_year": self.birth_year,
            "hair_color": self.hair_color,
            "eye_color": self.eye_color,
            "height": self.height,
            "image": self.image,
            "uid": self.uid
        }

class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    climate = db.Column(db.String(120))
    terrain = db.Column(db.String(120))
    population = db.Column(db.String(120))
    diameter = db.Column(db.String(120))
    gravity = db.Column(db.String(120))
    image = db.Column(db.String(120))
    uid = db.Column(db.Integer)

    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.climate = kwargs['climate']
        self.terrain = kwargs['terrain']
        self.population = kwargs['population']
        self.diameter = kwargs['diameter']
        self.gravity = kwargs['gravity']
        self.image = kwargs["image"],
        self.uid = kwargs["uid"]


    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        db.session.add(instance)
        try:
            db.session.commit()
            return instance
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "climate": self.climate,
            "terrain": self.terrain,
            "population": self.population,
            "diameter": self.diameter,
            "gravity": self.gravity,
            "image": self.image,
            "uid": self.uid
        }

class PlanetFavorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planet.id'))

    def __init__(self, **kwargs):
        self.user_id = kwargs['user_id']
        self.planet_id = kwargs['planet_id']

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        db.session.add(instance)
        try:
            db.session.commit()
            return instance
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "planet_id": self.planet_id
        }

class CharacterFavorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('character.id'))

    def __init__(self, **kwargs):
        self.user_id = kwargs['user_id']
        self.character_id = kwargs['character_id']

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        db.session.add(instance)
        try:
            db.session.commit()
            return instance
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character_id": self.character_id
        }