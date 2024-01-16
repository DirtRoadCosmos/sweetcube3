let candies = 0;
let candiesEaten = 0;
let candiesThrown = 0;
let throwThreshold = 10;
let featureThreshold = 30;
let frameRest = 10;
let candyCounter, eatCandyButton, eatenCandiesCounter;
let throwCandiesButton, thrownCandiesCounter, requestFeatureButton, statusBar;
let throwCandiesButtonVisible = false;
let requestFeatureButtonVisible = false;

function setup() {
    noCanvas();
    statusBar = select('#statusBar').html('+----------------------------------+<br/>');
    candyCounter = select('#candyCounter');
    eatCandyButton = select('#eatCandy').mousePressed(eatAllCandies);
    eatenCandiesCounter = select('#eatenCandies');
    throwCandiesButton = select('#throwCandies').mousePressed(throwCandies);
    thrownCandiesCounter = select('#thrownCandies');
    requestFeatureButton = select('#requestFeature').mousePressed(requestFeature);
}

function draw() {
    if (frameCount % frameRest === 0) {
        candies++;
        updateCandyCounter();
    }
    if (candies >= throwThreshold) {
        throwCandiesButtonVisible = true;
    }
    if (candies >= featureThreshold) {
        requestFeatureButtonVisible = true;
    }

    select('#throwCandies').style('display', throwCandiesButtonVisible ? 'block' : 'none');
    select('#requestFeature').style('display', requestFeatureButtonVisible ? 'block' : 'none');
}

function updateCandyCounter() {
    candyCounter.html('You have ' + candies + ' candies.');
    eatenCandiesCounter.html('You have eaten ' + candiesEaten + ' candies');
    thrownCandiesCounter.html('You have thrown ' + candiesThrown + ' candies on the ground ');
}

function eatAllCandies() {
    candiesEaten += candies;
    candies = 0;
    updateCandyCounter();
}

function throwCandies() {
    if (candies >= throwThreshold) {
        candies -= throwThreshold;
        candiesThrown += throwThreshold;
        updateCandyCounter();
        thrownCandiesCounter.style('display', 'block');
    }
}

function requestFeature() {
    if (candies >= featureThreshold) {
        candies -= featureThreshold;
        updateCandyCounter();
        statusBar.style('display', 'block');
        moveCandyCounter();
    }
}

function moveCandyCounter() {
    candyCounter.parent('statusBar');
}
