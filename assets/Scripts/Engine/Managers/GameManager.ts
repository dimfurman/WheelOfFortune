
import { _decorator, Component, Node, Label, } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
const { ccclass, property } = _decorator;



@ccclass('GameManager')
export class GameManager extends Component implements IGameManager {
    public status: ManagerStatus;

    @property
    public isDebug: boolean = false;

    //objects node
    /*     @property({ type: Node })
        public objectsNode: Node = null; */


    @property({ type: Node })
    private WheelImg = null;

    @property({ type: Label })
    public ScoreLabel: Label = null;

    @property({ type: Label })
    public SpinsLabel: Label = null;

    @property({ type: Label })
    public AddScoreLabel: Label = null;


    private _tries = 10;
    private _score = 0;
    private _gamePlayed = 0;
    public currentWin = 0;

    Startup(): void {
        Managers.Log.WriteLog("Game manager starting...");
        this.status = ManagerStatus.Initializing;

        //load data

        this.status = ManagerStatus.Started;
    }

    start(): void {
        Managers.Audio.PlayMusic();
    }

    endSpin(): void { //when wheel stop
        this.AddScoreLabel.string = '+' + this.currentWin;
        Managers.VFXManager.showAddScoreLabel(this.AddScoreLabel); //tween show award
        Managers.Audio.PlaySFX('score');
        setTimeout(() => {
            this._tries--;
            this._score += this.currentWin;
            Managers.UIManager.status = ManagerStatus.Started;
            this.SpinsLabel.string = 'Spins:' + this._tries;
            this.ScoreLabel.string = this._score.toString();
            this.checkIsGameFinish();
        }, 1000);
    }

    checkIsGameFinish(): void {
        if (this._tries == 0) {
            if (this._score > 15000) {
                Managers.UIManager.setWin();
                Managers.Audio.PlaySFX('win');
            } else {
                Managers.UIManager.setLose();
                Managers.Audio.PlaySFX('lose');
            }
            Managers.UIManager.openFinish();
        }
    }

    again() { //set new game
        this._tries = 10;
        this._score = 0;
        this._gamePlayed++;
        this.SpinsLabel.string = 'Spins:' + this._tries;
        this.ScoreLabel.string = this._score.toString();
    }

}


