import { _decorator, Component, Node, tween } from 'cc';
import { Managers } from '../Engine/Managers/Managers';
const { ccclass, property } = _decorator;

@ccclass('SpinWheel')
export class SpinWheel extends Component {

    private static wheel_values = [
        100,
        350,
        300,
        2000,
        250,
        200,
        1000,
        150,
        100,
        10000,
        600,
        5000,
        550,
        500,
        450,
        3000
    ];

    public static currentAward: number;
    public static currentTime: number;

    public static SpinWheelCall() {
        this.spin_wheel();
    }

    private static spin_wheel(): void {
        let _deg_start: number = Managers.UIManager.WheelIMg.angle;
        let _fullSpinCount: number = Math.floor(Math.random() * 10);
        let _spin = _fullSpinCount * 360 + Math.floor(Math.random() * 3600) / 10;
        let _deg_final: number = _deg_start + _spin;
        this.SpinWheelTween(Managers.UIManager.WheelIMg, _fullSpinCount, _deg_final);
        setTimeout(() => {
            Managers.Game.currentWin = this.getAward(_deg_final - 360 * Math.floor(_deg_final / 360));
            Managers.Game.endSpin();
        }, (_fullSpinCount + 2)*500);
        
    }

    private static SpinWheelTween(node: Node, spinCount: number, angTo: number) {
        tween(node)
            .to(spinCount + 2, { angle: angTo }, {  // 
                easing: "quartInOut",                                   // Tween function
            })
            .union()
            .start();
    }

    private static getAward(a: number): number {
        let ang = 360 / this.wheel_values.length;
        for (let i = 0; i < 16; i++) {
            if (a < (i + 1) * ang) {
                return this.wheel_values[15 - i];
            }
        }
    }
}



