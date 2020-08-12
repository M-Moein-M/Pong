function gameInit() {
    // let gameDiv = document.getElementById('game-div');
    const gameDivWidth = 600;
    const gameDivHeight = 400;

    let gameBall = document.getElementById('ball');
    gameBall.style.left = '300px';
    gameBall.style.top = '200px'

    let gameBallVx = 2; // indicates the velocity of the ball in x axis
    let gameBallVy = 2; // indicates the velocity of the ball in y axis

    let gameInterval = setInterval(movement, 5);  // this moves the ball every interval

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
}

window.addEventListener('load', function () {
    console.log('game started')
    gameInit();
});
