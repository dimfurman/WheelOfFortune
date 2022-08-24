
import { _decorator, Component, Node, tween, Vec3, UIOpacity, Button, Label, Color, EditBox, find } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
const { ccclass, property } = _decorator;

export enum PopupNames {
    GameScene = "GameScene",
    StartPopup = "StartPopup",
    FinishPopup = "FinishPopup"
}

@ccclass('UIManager')
export class UIManager extends Component implements IGameManager {
    public status: ManagerStatus;

    @property({type: Node})
    public gameScene: Node = null;

    //Popups
    @property({type: Node})
    public startPopup: Node = null;

    @property({type: Node})
    public finishPopup: Node = null;

    //what popup is active
    public activePopup:PopupNames = PopupNames.StartPopup;

    //--------------------------------------------
    Startup(): void {
        Managers.Log.WriteLog("UIManager manager starting...");
        this.status = ManagerStatus.Started;
    }


}