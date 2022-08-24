
import { _decorator, Component, Node, log, AudioSource, AudioClip } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
import {LogMessageType} from "./LogManager";
const { ccclass, property } = _decorator;

export enum SFXNames {
    ButtonClick = "ButtonClick",
    UndoCard = "UndoCard"
}

export enum MusicNames {
    MusicGame = "MusicGame"
}
 
@ccclass('AudioManager')
export class AudioManager extends Component implements IGameManager {
    public status: ManagerStatus;

    @property(AudioSource)
    public musicAudioSource: AudioSource = null!;

    @property(AudioSource)
    public sfxAudioSource: AudioSource = null!;

    private _sfxVolume = 1;
    public get sfxVolume():number{return this._sfxVolume}
    public set sfxVolume(value:number){
        this._sfxVolume = value;
        this.UpdateAudioVolume();
    }

    private _musicVolume = 0.6;
    public get musicVolume():number{return this._musicVolume}
    public set musicVolume(value:number){
        this._musicVolume = value;
        this.UpdateAudioVolume();
    }

    Startup(): void {
        Managers.Log.WriteLog("Audio manager starting...");
        this.status = ManagerStatus.Initializing;

        this.status = ManagerStatus.Started;
        //update volume
        this.UpdateAudioVolume();
    }

    //-------Many Exec Sounds-------------------
    public PlayButtonClick():void{this.PlaySFX(SFXNames.ButtonClick);}
    //------------------------------------------

    public ChangeMusicClip(clipName: string):void{
        let music:AudioClip = Managers.GameResources.GetMusic(clipName);
        if(music) {
            this.musicAudioSource.clip = music;
        }
        else {
            Managers.Log.WriteLog("Not find music " + clipName, LogMessageType.Error);
        }
    }

    public PlayMusic(): void {
        // Play the music
        if(!this.musicAudioSource.playing){
            this.musicAudioSource.play();
        }
    }

    public StopMusic(): void {
        this.musicAudioSource.stop();
    }

    public StopSFX(): void {
        this.sfxAudioSource.stop();
    }

    public PauseAllSound (): void {
        // Pause the music
        this.musicAudioSource.pause();
        //Stop all sounds
        this.sfxAudioSource.stop();
    }

    public PlaySFX (clipName: string, timeToStopMS:number = 0): void {
        let sfx:AudioClip = Managers.GameResources.GetSFX(clipName);
        if(sfx) {
            //stop sfx time
            if(timeToStopMS != 0){
                this.sfxAudioSource.clip = sfx;
                this.sfxAudioSource.play();
                setTimeout(()=>{this.StopSFX();},timeToStopMS);
            }
            else {
                this.sfxAudioSource.playOneShot(sfx);
            }
        }
        else {
            Managers.Log.WriteLog("Not find sfx " + clipName, LogMessageType.Error);
        }
    }

    //------------------------
    private UpdateAudioVolume():void{
        if(this.musicAudioSource) this.musicAudioSource.volume = this._musicVolume;
        if(this.sfxAudioSource) this.sfxAudioSource.volume = this._sfxVolume;
    }

}


