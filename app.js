function gameInit() {
    // let gameDiv = document.getElementById('game-div');
    const gameDivWidth = 600;
    const gameDivHeight = 400;

    let gameBall = document.getElementById('ball');
    gameBall.style.left = '300px';
    gameBall.style.top = '200px'

    let gameBallVx = 2; // indicates the velocity of the ball in x axis
    let gameBallVy = 2; // indicates the velocity of the ball in y axis

    let gameInterval = setInterval(movement, 50);  // this moves the ball every interval

    function movement() {  // moves the ball based on vx and vy and also checks for wall collision to change the vx or vy accordingly
        let current_x = getBallX();
        let current_y = getBallY();

        if (getBallX() + 20 > gameDivWidth || getBallX() < 0) { // 20 is width and height of image
            gameBallVx *= -1;
        }

        if (getBallY() + 20 > gameDivHeight || getBallY() < 0) {  // 20 is width and height of image
            gameBallVy *= -1;
        }
        gameBall.style.left = (current_x + gameBallVx).toString() + 'px';
        gameBall.style.top = (current_y + gameBallVy).toString() + 'px';
    }

    function getBallX() {
        return Number(gameBall.style.left.replace('px', ''));  // returns left of the ball image this will be considered as x
    }

    function getBallY() {
        return Number(gameBall.style.top.replace('px', '')); // returns top of the ball image this will be considered as y
    }


    // moving the player1 and player2's stick
    let player1StickMoveTop;
    let player1StickMoveDown;
    let player2StickMoveTop;
    let player2StickMoveDown;

    let player1Stick = document.getElementById('player1-stick');
    let player2Stick = document.getElementById('player2-stick');
    let deltaY = 32; // this indicates amount of movement for each stick in every move
    function moveElementUp(element) {
        let top = Number(element.style.top.replace('px', ''));
        let newPositionTop = top - deltaY;
        if (newPositionTop < 0) // we dont want the sticks to move up more that the game div
            return;
        element.style.top = (newPositionTop).toString() + 'px';
    }

    function moveElementDown(element) {
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
    console.log('game started')
    gameInit();
});
