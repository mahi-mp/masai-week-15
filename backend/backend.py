from flask import Flask
from flask import request
import json
app=Flask(__name__)

@app.route("/add", methods=["POST"])
def add_player():
    name=request.json["name"]
    country=request.json["country"]
    age=request.json["age"]
    alldata2=[]
    fl=open("add_player.txt","a")
    fl.writelines(name + " " + country + " "+ age +"\n")
    alldata2.append(name)
    alldata2.append(country)
    alldata2.append(age)    
    fl.close()
    
    return json.dumps({"data":alldata2})

@app.route("/show")
def display_allPlayer():
    alldata=[]
    fl=open("add_player.txt")
    for x in fl:
        alldata.append(x.split())
    fl.close()
    return json.dumps({"data":alldata})

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
    alldata2=[]
    fl=open("all_play.txt","a")
    fl.writelines(opt1 + " " + opt2 + " "+ court + " "+turn + " " + p1score + " "+ p2score +" "+ win +"\n")
    alldata2.append(opt1)
    alldata2.append(opt2)
    alldata2.append(court)    
    alldata2.append(turn)
    alldata2.append(p1score)
    alldata2.append(p2score)
    alldata2.append(win)   
    fl.close()    
    return json.dumps({"data":alldata2})

@app.route("/played")
def display_played():
    alldata=[]
    fl=open("all_play.txt")
    for x in fl:
        alldata.append(x.split())
    fl.close()
    return json.dumps({"data":alldata})
