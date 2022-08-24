
import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PulseButton')
export class PulseButton extends Component {
 
    private tweenAnim = null;

    start () {
        this.onEnable();     
    }

    onDisable(){
        this.tweenAnim.stop;
    }

    onEnable(){
        if(this.tweenAnim){
            this.tweenAnim.start();
        }
        else{
            this.tweenAnim=tween(this.node)
                .to(1, {scale: new Vec3(1.06,1.06,1)})
                .to(1, {scale: new Vec3(1,1,1)})
                .union()
                .repeatForever()
                .start();  
        }         
    }
}

