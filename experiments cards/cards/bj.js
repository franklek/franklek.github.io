var dsum = 0; // dealer sum
var ysum = 0; //your sum

var dacount = 0; //dealerAcecount
var yacount = 0; //yourAcecount

var hidden;
var deck;

var canhit = true;

window.onload = function(){
    buildDeck();
    shuffle();
    start();
}

function buildDeck(){
    let value = ["A", "2", "3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S"];
    deck = [];

    for(let i=0; i < types.length; i++){
        for(let j=0; j < value.length; j++){
            deck.push(value[j]+ "-" + types[i])
        }
    }

}
function shuffle(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck)
}

function start(){
    hidden = deck.pop();
    dsum += getValue(hidden);
    dacount += Check(hidden);
    console.log(hidden);
    console.log(dsum);

    while(dsum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src =  "./PNG/" + card + ".png";
        dsum += getValue(card);
        dacount += Check(card);
        document.getElementById("dealercards").append(cardImg);
    }
    console.log(dsum);

    for( let i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src =  "./PNG/" + card + ".png";
        ysum += getValue(card);
        yacount += Check(card);
        document.getElementById("playercards").append(cardImg);
    }

    console.log(ysum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("deal").addEventListener("click", deal);

}

function hit(){
    if(!canhit){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src =  "./PNG" + card + ".png";
    ysum += getValue(card);
    yacount += Check(card);
    document.getElementById("playercards").append(cardImg);

    if(reducea(ysum,yacount)> 21){
        canhit = false;
    }

}

function stay(){
    dsum = reducea(dsum,dacount);
    ysum = reducea(ysum,yacount);

    canhit = false;
    document.getElementById("hidden").src = "./PNG"  + hidden + ".png";

    
    if(ysum > 21){
        alert("You Lose!");
    }
    else if(dsum > 21){
        alert("You Win!");
    }
    else if(ysum == dsum){
        alert("Tie!");
    }
    else if(ysum > dsum){
        alert("You Win!");
    }
    else if(ysum < dsum){
        alert("You Lose!");
    }

    document.getElementById("dealer-sum").innerText = dsum;
    document.getElementById("player-sum").innerText = ysum;

}

function getValue(card){
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)){
        if(value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function Check(card){
    if(card[0]=="A"){
        return 1;
    }
    return 0;
}

function reducea(ysum,yacount){
    while(ysum > 21 && yacount > 0){
        ysum -= 10;
        yacount -= 1;
    }
    return ysum;
}

function deal(){
    shuffle();
    buildDeck();
}