function gameInit() {
    // let gameDiv = document.getElementById('game-div');
    const gameDivWidth = 600;
    const gameDivHeight = 400;

    let gameBall = document.getElementById('ball');

    let gameBallVx; // indicates the velocity of the ball in x axis
    let gameBallVy; // indicates the velocity of the ball in y axis

    let player1Score = 0;
    let player2Score = 0;

    let gameInterval;

    startNewRound();

    function movement() {  // moves the ball based on vx and vy and also checks for wall collision to change the vx or vy accordingly
        let currentX = getBallX();
        let currentY = getBallY();

        if (currentX + 20 > gameDivWidth) {  // if the ball reaches any of the side walls of the div it means an score for one of the players
            player1WonRound();
            startNewRound();
            return;
        }
        if (currentX < 0) {
            player2WonRound();
            startNewRound();
            return;
        }

        // check if the ball hit the sticks

        // if the right side of the ball was equal-bigger to the
        // in these if statements, 10 is added because we dont need the whole ball to hit stick only half of it will work
        if (currentX + 20 + 8 >= gameDivWidth
            && getBallY() + 10 >= Number(player2Stick.style.top.replace('px', ''))
            && getBallY() + 20 - 10 <= Number(player2Stick.style.top.replace('px', '')) +80) {
            gameBallVx *= -1;
        }

        if (currentX < 8
            && getBallY() + 10> Number(player1Stick.style.top.replace('px', ''))
            && getBallY() + 20 -10 < Number(player1Stick.style.top.replace('px', '')) +80) {
            gameBallVx *= -1;
        }


        if (currentY + 20 > gameDivHeight || currentY < 0) {  // 20 is width and height of image
            gameBallVy *= -1;
        }
        gameBall.style.left = (currentX + gameBallVx).toString() + 'px';
        gameBall.style.top = (currentY + gameBallVy).toString() + 'px';
    }

    function getBallX() {
        return Number(gameBall.style.left.replace('px', ''));  // returns left of the ball image this will be considered as x
    }

    function getBallY() {
        return Number(gameBall.style.top.replace('px', '')); // returns top of the ball image this will be considered as y
    }


    function startNewRound() {
        gameBallVx = 2 * Math.pow(-1, Math.floor(Math.random()*2));
        gameBallVy = 2 * Math.pow(-1, Math.floor(Math.random()*2));

        gameBall.style.left = '300px';
        gameBall.style.top = '200px';

        document.querySelector('.scores-monitor').innerHTML = player1Score + ' - ' + player2Score;
        gameInterval = setInterval(movement, 10);  // this moves the ball every interval
    }


    function player1WonRound() {
        player1Score++;
        clearInterval(gameInterval);
    }

    function player2WonRound() {
        player2Score++;
        clearInterval(gameInterval);
    }

    // moving the player1 and player2's stick

    let player1Stick = document.getElementById('player1-stick');
    let player2Stick = document.getElementById('player2-stick');
    let deltaY = 32; // this indicates amount of movement for each stick in every move

    function moveElementUp(element) { // moves the input stick up
        let top = Number(element.style.top.replace('px', ''));
        let newPositionTop = top - deltaY;
        if (newPositionTop < 0) // we dont want the sticks to move up more that the game div
            return;
        element.style.top = (newPositionTop).toString() + 'px';
    }

    function moveElementDown(element) {  // moves the input stick down
        let top = Number(element.style.top.replace('px', ''));
        let newPositionTop = top + deltaY;
        if (newPositionTop + 80 > gameDivHeight) // 80 is the height of the sticks
            return;
        element.style.top = (newPositionTop).toString() + 'px';
    }

    function moveStick(event) {
        // player 1 KeyW KeyS
        // player 2 ArrowUp ArrowDown
        switch (event.code) {
            case 'KeyW':
                moveElementUp(player1Stick);
                break;
            case 'KeyS':
                moveElementDown(player1Stick);
                break;
            case 'ArrowUp':
                moveElementUp(player2Stick);
                break;
            case 'ArrowDown':
                moveElementDown(player2Stick);
                break;
        }
        console.log(event.code);
    }

    window.addEventListener('keyup', moveStick);
}

window.addEventListener('load', function () {
    console.log('game started');
    gameInit();
});
