
import { _decorator, Component, Node, Label, Event } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
import { SoundButtonToggle } from "db://assets/Scripts/Engine/UI/SoundButtonToggle";
import { SpinWheel } from '../../Game/SpinWheel';
const { ccclass, property } = _decorator;

export enum PopupNames {
    GameScene = "GameScene",
    StartPopup = "StartPopup",
    FinishPopup = "FinishPopup"
}

@ccclass('UIManager')
export class UIManager extends Component implements IGameManager {
    public status: ManagerStatus;

    @property({ type: Node })
    public gameScene: Node = null;

    @property({ type: Node })
    public WheelIMg: Node = null;

    @property({ type: Node })
    public SpinBtn: Node = null;

    //Popups
    @property({ type: Node })
    public startPopup: Node = null;

    @property({ type: Node })
    public finishPopup: Node = null;

    @property({ type: Label })
    public finishLabel: Label = null;

    @property({ type: Label })
    public finishText: Label = null;

    //what popup is active
    public activePopup: PopupNames = PopupNames.StartPopup;
    public isPopupActive: boolean;

    //--------------------------------------------
    Startup(): void {
        Managers.Log.WriteLog("UIManager manager starting...");
        this.status = ManagerStatus.Started;
        this.startPopup.active = true;
        this.gameScene.active = true;
        this.finishPopup.active = false;
        this.isPopupActive = true;
    }

    SoundButtonClick(event: Event): void {
        const buttonNode = event.target as Node;
        const soundButtonToggle = buttonNode.getComponent(SoundButtonToggle);

        soundButtonToggle.ToggleSprite();

        if (soundButtonToggle.btnEnabled == false) {
            Managers.Audio.MuteAllSFX();
        }
        else {
            Managers.Audio.UnmuteAllSFX();
        }
    }

    MusicButtonClick(event: Event): void {
        const buttonNode = event.target as Node;
        const soundButtonToggle = buttonNode.getComponent(SoundButtonToggle);

        soundButtonToggle.ToggleSprite();

        if (soundButtonToggle.btnEnabled == false) {
            Managers.Audio.MuteMusic();
        }
        else {
            Managers.Audio.UnmuteMusic();
        }
    }

    PlayBtnClick(): void {
        this.startPopup.active = false;
    }

    SpinBtnClick(): void { //click on Spin
        if (this.status == ManagerStatus.Started) {
            SpinWheel.SpinWheelCall();
            this.status = ManagerStatus.Spining;
        }
    }

    AgainBtnClick(): void { //new game
        this.gameScene.active = true;
        this.finishPopup.active = false;
        Managers.Game.again();
    }

    openFinish(): void {
        this.finishPopup.active = true;
    }

    setWin(): void {
        this.finishLabel.string = "YOU WIN!!!";
        this.finishText.string = "Call us to get reward!";
    }

    setLose(): void {
        this.finishLabel.string = "YOU LOSE...";
        this.finishText.string = "Try in another try...";
    }

}