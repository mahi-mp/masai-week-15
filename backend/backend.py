from flask import Flask
from flask import request
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/sports"
mongo = PyMongo(app)

@app.route("/add", methods=["POST"])
def add_player():
    info={}
    info["_id"] = ObjectId()
    info["name"]=request.json["name"]
    info["country"]=request.json["country"]
    info["age"]=request.json["age"]
    
    mongo.db.add.insert(info)
    return dumps(info)

@app.route("/show")
def display_allPlayer():
    users = mongo.db.add.find()
    return dumps(users)

@app.route("/players", methods=["POST"])
def play():
    opt1=request.json["opt1"]
    opt2=request.json["opt2"]
    court=request.json["court"]
    turn=request.json["turn"]
    p1score=request.json["plr1score"]
    p2score=request.json["plr2score"]
    win=""
    if(int(p1score)>int(p2score)):
        win=opt1
    elif(int(p1score)<int(p2score)):
         win=opt2
    else:
        win="Tie"
    
    mongo.db.players.insert({"player1":opt1,"player2":opt2,"court":court,"turn":turn,"p1score":p1score,"p2score":p2score,"win":win})  
    return json.dumps({"player1":opt1,"player2":opt2,"court":court,"turn":turn,"p1score":p1score,"p2score":p2score,"win":win})



@app.route("/played")
def display_played():
    users = mongo.db.players.find()
    return dumps(users)

@app.route('/add/delete/<ObjectId:user_id>')
def user_delete(user_id):
    mongo.db.add.remove({'_id': ObjectId( user_id)})
    return dumps({"message": "User Deleted"})
