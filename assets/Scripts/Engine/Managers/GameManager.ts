
import { _decorator, Component, Node, log, tween, UIOpacity, Vec3, ParticleSystem2D, Vec2, Label, Color } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
import { AudioManager, MusicNames, SFXNames } from "db://assets/Scripts/Engine/Managers/AudioManager";
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

    @property({ type: Node })
    private SpinBtn = null;

    @property({ type: Label })
    public ScoreLabel: Label = null;

    @property({ type: Label })
    public SpinsLabel: Label = null;

    @property({ type: Label })
    public AddScoreLabel: Label = null;

    //Finish puzzle
    private _isGameFinish = false;

    private _tries = 10;
    private _score = 0;
    public currentWin = 0;

    Startup(): void {
        Managers.Log.WriteLog("Game manager starting...");
        this.status = ManagerStatus.Initializing;

        //load data

        this.status = ManagerStatus.Started;
    }

    start() {
        Managers.Audio.PlayMusic();
    }

    endSpin() {
        this.AddScoreLabel.string = '+' + this.currentWin;
        Managers.UIManager.showAddScoreLabel(this.AddScoreLabel);
        Managers.Audio.PlaySFX('score');
        setTimeout(() => {
            this._tries--;
            this._score += this.currentWin;
            Managers.UIManager.status = ManagerStatus.Started;
            this.SpinsLabel.string = 'Spins:' + this._tries;
            this.ScoreLabel.string = this._score.toString();
            this.CheckIsGameFinish();
        }, 1000);
    }

    CheckIsGameFinish(): boolean {
        if (this._tries == 0) {
            this._isGameFinish = true;
            if (this._score > 15000) {
                Managers.UIManager.setWin();
                Managers.Audio.PlaySFX('win');
            } else {
                Managers.UIManager.setLose();
                Managers.Audio.PlaySFX('lose');
            }
            Managers.UIManager.openFinish();
            return true;
        } else {
            return false;
        }
    }

    again() {
        this._tries = 10;
        this._score = 0;
        this.SpinsLabel.string = 'Spins:' + this._tries;
        this.ScoreLabel.string = this._score.toString();
    }

}


