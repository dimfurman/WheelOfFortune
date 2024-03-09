
import {_decorator, Component, Label, Node, ParticleSystem2D, tween, UIOpacity, Vec3} from 'cc';
import {IGameManager, ManagerStatus} from "db://assets/Scripts/Engine/Managers/IGameManager";
import {Managers} from "db://assets/Scripts/Engine/Managers/Managers";
const { ccclass, property } = _decorator;

@ccclass('VFXManager')
export class VFXManager extends Component implements IGameManager{
    public status: ManagerStatus;

    @property(ParticleSystem2D)
    public trueEffect: ParticleSystem2D = null!;

    Startup(): void {
        Managers.Log.WriteLog("VFX manager starting...");
        this.status = ManagerStatus.Started;
    }

    //------------BASIC TWEEN------------------
    //Slowly Show from Opacity
    public ShowFromOpacity(node:Node){
        let opacity = node.getComponent(UIOpacity);
        if(opacity){
            tween(opacity)
                .to(1, { opacity: 255 })
                .start();
        }
    }
    public HideFromOpacity(node:Node){
        let opacity = node.getComponent(UIOpacity);
        if(opacity){
            tween(opacity)
                .to(1.5, { opacity: 0 })
                .start();
        }
    }

    public PulseButton(node:Node){
        tween(node)
            .to(1, {scale: new Vec3(1.06,1.06,1)})
            .to(1, {scale: new Vec3(1,1,1)})
            .union()
            .repeatForever()
            .start();
    }

    showAddScoreLabel(node: Label) { //tween on current win
        tween(node.getComponent(UIOpacity))
            .to(1, { opacity: 255 },)
            .to(1, { opacity: 0 },)
            .start();
    }

    SpinWheelTween(node: Node, spinCount: number, angTo: number) { //tween for spining wheel
        tween(node)
            .to(spinCount, { angle: angTo }, {  // 
                easing: "quartInOut",
            })
            .union()
            .start();
    }

    //-----------------------------------------

    ShowTrueEffect(position:Vec3): void{
        this.trueEffect.node.worldPosition = position;
        this.trueEffect.resetSystem();
    }
}
