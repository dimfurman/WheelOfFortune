
import { _decorator, Component, log } from 'cc';
import { IGameManager, ManagerStatus } from './IGameManager';
import { Managers } from './Managers';
const { ccclass, property } = _decorator;


 
@ccclass('MetricsManager')
export class MetricsManager extends Component implements IGameManager {
    public status: ManagerStatus;
    public weightProcess: number = 10;

    public timeInSeconds = 0;

    private isDebug: boolean = false;

    Startup(): void {
        Managers.Log.WriteLog("Metrics manager starting...");
        this.status = ManagerStatus.Initializing;

        this.isDebug = Managers.Game.isDebug;

        this.status = ManagerStatus.Started;
    }

    StartTimeCounter(): void{
        this.schedule(function() {
            Managers.Metrics.timeInSeconds+=5;
            if(Managers.Metrics.timeInSeconds == 15){
                Managers.Metrics.ReachGoal("15-second");
            }     
            else if(Managers.Metrics.timeInSeconds == 30){
                Managers.Metrics.ReachGoal("30-second");
            }                   
            else if(Managers.Metrics.timeInSeconds == 60){
                Managers.Metrics.ReachGoal("one-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 120){
                Managers.Metrics.ReachGoal("two-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 300){
                Managers.Metrics.ReachGoal("five-minute");
            }
            else if(Managers.Metrics.timeInSeconds == 600){
                Managers.Metrics.ReachGoal("ten-minute");
            }
        }, 5);
    }

    ReachGoal(goalName: string): void{
        Managers.Log.WriteLog("Reach goal: " + goalName);

        if(this.isDebug) return;

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