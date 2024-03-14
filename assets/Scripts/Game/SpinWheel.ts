import { _decorator, Component } from 'cc';
import { Managers } from '../Engine/Managers/Managers';
const { ccclass, property } = _decorator;

@ccclass('SpinWheel')
export class SpinWheel extends Component {

    private wheel_values = [
        400,
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

    public SpinWheelCall(): void {
        Managers.Audio.PlaySFX('click');
        let _deg_start: number = this.node.angle;
        let _fullSpinCount: number = Math.floor(Math.random() * 10) + 2;
        let _spin = _fullSpinCount * 360 + Math.floor(Math.random() * 3600) / 10;
        let _deg_final: number = _deg_start + _spin;
        _fullSpinCount = _fullSpinCount / 2; //ускорение вращенрия
        Managers.VFXManager.SpinWheelTween(this.node, _fullSpinCount, _deg_final, () => {
            Managers.Game.currentWin = this.getAward(_deg_final - 360 * Math.floor(_deg_final / 360));
            Managers.Game.endSpin();
        }); //в колбэк функцию передать ниже
    }

    private getAward(a: number): number {
        let ang = 360 / this.wheel_values.length;
        for (let i = 0; i < 16; i++) {
            if (a < (i + 1) * ang) {
                return this.wheel_values[15 - i];
            }
        }
    }
}



