
import { _decorator, Component, log } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
const { ccclass, property } = _decorator;

export enum LogMessageType {
    Message,
    Warning,
    Error
}
 
@ccclass('LogManager')
export class LogManager extends Component implements IGameManager {
    public status: ManagerStatus;

    Startup(): void {
        Managers.Log.WriteLog("Log manager starting...");
        this.status = ManagerStatus.Started;
    }

    WriteLog(message: string, type:LogMessageType = LogMessageType.Message): void{
        if(Managers.Game.isDebug){
            let preString = "";
            if(type == LogMessageType.Warning) preString = "!---Warning---!: ";
            else if(type == LogMessageType.Error) preString = "!---Error---!: ";
            log(preString+message);
        }
    }

}


