export default class Controller{
    constructor(game,view){
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlaying = false;



        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this))

        this.view.renderStartScreen() 

        }

        update() {
            this.game.movePieceDown();
            this.updateViev();
        }
        play() {
            this.isPlaying = true;
            this.startTimer();
            this.updateViev();
        }

        pause() {
            this.isPlaying = false;
            this.stopTimer();
            this.updateViev();
        }

        reset() {
            this.game.reset();
            this.play();
        }
        updateViev() {
            const state = this.game.getState();

            if (state.isGameOver) {
                this.view.renderEndScreen(state);
            } else if (!this.isPlaying) {
                this.view.renderPauseScreen();
            } else {    
                this.view.renderMainScreen(state);
            }
        }

        startTimer() {
            const speed = 1000 - this.game.getState().level * 100;

            if (!this.intervalId) {
                this.intervalId = setInterval(() => {
                    this.update()
                }, speed > 0 ? speed : 100);
            }
        }
        stopTimer() {
            if (this.intervalId){
            clearInterval(this.intervalId)
            this.intervalId = null;
            }
        }

        handleKeyDown(event) {
            const state = this.game.getState();

            switch (event.keyCode) {
                case 13: // enter
                    if (state.isGameOver){
                        this.reset();
                    } else if(this.isPlaying) {
                        this.pause();
                    } else{
                        this.play();
                    }
                    break;
                case 37: // LEFT ARROW
                    this.game.movePieceLeft();
                    this.updateViev();
                    break;
                case 38: // UP ARROW
                    this.game.rotatePiece();
                    this.updateViev();
                case 39: // RIGHT ARROW
                    this.game.movePieceRight();
                    this.updateViev();
                    break;
                case 40: // DOWN ARROW
                    this.stopTimer()
                    this.game.movePieceDown();
                    this.updateViev();
                    break;
        }
    }

    handleKeyUp(event) {
        switch(event.keyCode){
            case 40: // DOWN ARROW
                this.startTimer();
                break;
        }        
    }
}