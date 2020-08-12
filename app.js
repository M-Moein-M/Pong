function gameInit() {
    // let gameDiv = document.getElementById('game-div');
    const gameDivWidth = 600;
    const gameDivHeight = 400;

    let gameBall = document.getElementById('ball');
    gameBall.style.left = '300px';
    gameBall.style.top = '50px'

    let gameBallVx = 2;
    let gameBallVy = 2;

    let gameInterval = setInterval(movement, 5);

    function movement() {
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
        return Number(gameBall.style.left.replace('px', ''));
    }

    function getBallY() {
        return Number(gameBall.style.top.replace('px', ''));
    }
}

window.addEventListener('load', function () {
    console.log('game started')
    gameInit();
});
