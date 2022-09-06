import { _decorator, Component, log } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
const { ccclass, property } = _decorator;

export enum MetricsEventNames {
    OnLoadGame= "on-load-game",
    StartGame = "start-game",
    FirstPair = "first-pair",
    SecondPair = "second-pair",
    FourPair = "four-pair",
    GameFinish = "game-finish",
    ClickCtaButton = "click-cta-button"
}
 
@ccclass('MetricsManager')
export class MetricsManager extends Component implements IGameManager {
    public status: ManagerStatus;

    public timeInSeconds = 0;

    private _isDebug: boolean = false;
    private _ymID = "83300000";

    Startup(): void {
        Managers.Log.WriteLog("Metrics manager starting...");
        this.status = ManagerStatus.Initializing;

        this._isDebug = Managers.Game.isDebug;

        this.status = ManagerStatus.Started;
    }

    StartTimeCounter(): void{
        this.schedule(function() {
            Managers.Metrics.timeInSeconds+=5;
            if(Managers.Metrics.timeInSeconds == 15){
                Managers.Metrics.ReachGoal("game-15-second");
            }
            else if(Managers.Metrics.timeInSeconds == 30){
                Managers.Metrics.ReachGoal("game-30-second");
            }
            else if(Managers.Metrics.timeInSeconds == 60){
                Managers.Metrics.ReachGoal("game-one-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 120){
                Managers.Metrics.ReachGoal("game-two-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 240){
                Managers.Metrics.ReachGoal("game-four-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 360){
                Managers.Metrics.ReachGoal("game-six-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 480){
                Managers.Metrics.ReachGoal("game-eight-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 600){
                Managers.Metrics.ReachGoal("game-ten-minute");
            }
        }, 5);
    }

    ReachGoal(goalName: string): void{
        Managers.Log.WriteLog("Reach goal: " + goalName);

        if(this._isDebug) return;

        //Yandex
        /*if (typeof ym !== 'undefined') {
            switch (goalName) {
                case "on-load-game":
                    ym(this._ymID,'reachGoal','on-load-game');
                    break;
                case "start-game":
                    ym(this._ymID,'reachGoal','start-game');
                    break;
                case "first-pair":
                    ym(this._ymID,'reachGoal','first-pair');
                    break;
                case "second-pair":
                    ym(this._ymID,'reachGoal','second-pair');
                    break;
                case "four-pair":
                    ym(this._ymID,'reachGoal','four-pair');
                    break;
                case "game-finish":
                    ym(this._ymID,'reachGoal','game-finish');
                    break;
                case "click-cta-button":
                    ym(this._ymID,'reachGoal','click-cta-button');
                    break;
                case "game-15-second":
                    ym(this._ymID,'reachGoal','game-15-second');
                    break;
                case "game-30-second":
                    ym(this._ymID,'reachGoal','game-30-second');
                    break;
                case "game-one-minute":
                    ym(this._ymID,'reachGoal','game-one-minute');
                    break;
                case "game-two-minute":
                    ym(this._ymID,'reachGoal','game-two-minute');
                    break;
                case "game-four-minute":
                    ym(this._ymID,'reachGoal','game-four-minute');
                    break;
                case "game-six-minute":
                    ym(this._ymID,'reachGoal','game-six-minute');
                    break;
                case "game-eight-minute":
                    ym(this._ymID,'reachGoal','game-eight-minute');
                    break;
                case "game-ten-minute":
                    ym(this._ymID,'reachGoal','game-ten-minute');
                    break;
            }
        }*/

        //Google
        /*if (typeof gtag !== 'undefined') {
            switch (goalName) {
                case "on-load-game":
                    gtag('event','on_load_game');
                    break;           
                case "start-game":
                    gtag('event','start_game');
                    break;
                case "send-email":
                    gtag('event','send_email');
                    break;    
                case "first-piece":
                    gtag('event','first_piece');
                    break;
                case "five-piece":
                    gtag('event','five_piece');
                    break;
                case "ten-piece":
                    gtag('event','ten_piece');
                    break;
                case "puzzle-finish":
                    gtag('event', 'puzzle_finish');
                    break;
                case "click-cta-button":
                    gtag('event','click_cta_button');
                    break;
                case "15-second":
                    gtag('event','game_15_second');
                    break;
                case "30-second":
                    gtag('event','game_30_second');
                    break;
                case "one-minute":
                    gtag('event','game_one_minute');
                    break;
                case "two-minute":
                    gtag('event','game_two_minute');
                    break;
                case "five-minute":
                    gtag('event','game_five_minute');
                    break;
                case "ten-minute":
                    gtag('event','game_ten_minute');
                    break;                
            }
        }

        //FB
        if (typeof fbq !== 'undefined') {
            switch (goalName) {
                case "send-email":
                    fbq('track', 'Lead');
                    break;
            }
        }        */
        
    }
    

}