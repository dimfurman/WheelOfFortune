
import { _decorator, Component, Node, log, game } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { AudioManager } from './AudioManager';
import { GameManager } from './GameManager';
import { LogManager } from './LogManager';
import {MetricsManager} from "./MetricsManager";
import {UIManager} from "./UIManager";
import {VFXManager} from "./VFXManager";
import {GameResources} from "./GameResources";
const { ccclass, executionOrder, property } = _decorator;

@ccclass('Managers')
@executionOrder(-1)  // First exec class
export class Managers extends Component {

    // list of all managers
    private _startSequence:IGameManager[] = [];

    //values to any manager
    public static Game: GameManager;
    public static Audio: AudioManager;
    public static Log: LogManager;
    public static GameResources: GameResources;
    public static Metrics: MetricsManager;
    public static UIManager: UIManager;
    public static VFXManager: VFXManager;

    onLoad(){
        //save node between scenes
        game.addPersistRootNode(this.node);

        //get links to Mangers
        Managers.Log = this.getComponent("LogManager") as LogManager;
        Managers.GameResources = this.getComponent("GameResources") as GameResources;
        Managers.Game = this.getComponent("GameManager") as GameManager;
        Managers.Audio = this.getComponent("AudioManager") as AudioManager;
        Managers.UIManager = this.getComponent("UIManager") as UIManager;
        Managers.VFXManager = this.getComponent("VFXManager") as VFXManager;
        Managers.Metrics = this.getComponent("MetricsManager") as MetricsManager;


        //add managers to Array
        this._startSequence.push(Managers.Log);
        this._startSequence.push(Managers.GameResources);
        this._startSequence.push(Managers.Game);
        this._startSequence.push(Managers.Audio);
        this._startSequence.push(Managers.UIManager);
        this._startSequence.push(Managers.VFXManager);
        this._startSequence.push(Managers.Metrics);
    }

    start () {
        for(let manager of this._startSequence){
            manager.Startup();
        }

        Managers.Metrics.ReachGoal("on-load-game");
    }

}
