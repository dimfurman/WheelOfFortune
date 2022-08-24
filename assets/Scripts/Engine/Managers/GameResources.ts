
import {_decorator, log, SpriteFrame, SpriteAtlas, resources, Asset, Prefab, JsonAsset, AudioClip, Component} from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
const { ccclass, property } = _decorator;

 
@ccclass('GameResources')
export class GameResources extends Component implements IGameManager {
    public status: ManagerStatus;

    //Sounds
    private _music = new Map<string, AudioClip>();
    private _sfx = new Map<string, AudioClip>();

    //Load status
    private _resourcesInLoad=0;
    private _onCompleteCallback:()=>void | null = null;

    public Startup(): void {
        Managers.Log.WriteLog("Resources load starting...");
        this.status = ManagerStatus.Initializing;
        //load init data
        this.LoadInitResources();
    }

    public IsLoadComplete():boolean{
        if(this._resourcesInLoad==0){
            return true;
        }
        else {return false;}
    }

    //========GET ASSETS===================================
    public GetMusic(name:string):AudioClip{
        return this._music.get(name);
    }

    public GetSFX(name:string):AudioClip{
        return this._sfx.get(name);
    }

    //=============LOAD INIT RES============================
    private LoadInitResources():void{
        //load Sound
        this.LoadDir("Sounds/Music", AudioClip, "_music");
        this.LoadDir("Sounds/SFX", AudioClip, "_sfx");
    }

    //===========LOAD RESOURCES FUNC===========================
    //call callback function
    private CallCallbackFunction():void{
        if(this._onCompleteCallback) {
            this._onCompleteCallback();
            this._onCompleteCallback = null;
        }
    }

    //onComplete - callback function by load only this resource
    private LoadResource(path:string, type:any, toPropName: string):void{
        this._resourcesInLoad++;

        resources.load(path, type, (err, asset) => {
            this._resourcesInLoad--;

            if(err){
                Managers.Log.WriteLog(err.message);
                this[toPropName] = null;
            }
            else {
                this[toPropName] = asset;
                Managers.Log.WriteLog("Load resource complete: " + path);
                this.CheckIsLoadComplete();
            }
        });    

    }

    //onComplete - callback function by load only this resource
    private LoadDir(path:string, type:any, toPropName: string):void{
        this._resourcesInLoad++;

        resources.loadDir(path, type, (err, asset) => {
            this._resourcesInLoad--;

            if(err){
                Managers.Log.WriteLog(err.message);
            }
            else {
                for(let oneAsset of asset){
                    this[toPropName].set(oneAsset.name,oneAsset);
                }
                Managers.Log.WriteLog("Load resource complete: " + path);
                this.CheckIsLoadComplete();
            }
        });
    }

    //check is load complete
    private CheckIsLoadComplete():void{
        if(this.IsLoadComplete()) {
            if(this.status == ManagerStatus.Initializing){
                this.status = ManagerStatus.Started;
                Managers.Log.WriteLog("All resources loaded!");
            }
            //call callback function
            this.CallCallbackFunction();
        }
    }

}