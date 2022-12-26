
import { _decorator, Component, Node, log, tween, UIOpacity, Vec3, ParticleSystem2D, Vec2 } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
import {AudioManager, SFXNames} from "db://assets/Scripts/Engine/Managers/AudioManager";
const { ccclass, property } = _decorator;


 
@ccclass('GameManager')
export class GameManager extends Component implements IGameManager {
    public status: ManagerStatus;

    @property
    public isDebug: boolean = false;

    //Finish puzzle
    private _isGameFinish=false;

    Startup(): void {
        Managers.Log.WriteLog("Game manager starting...");
        this.status = ManagerStatus.Initializing;

        //load data

        this.status = ManagerStatus.Started;
    }

    start () {
        Managers.Audio.PlaySFX(SFXNames.Win);
    }

    CheckIsGameFinish(): boolean{
        return true;
    }

}


