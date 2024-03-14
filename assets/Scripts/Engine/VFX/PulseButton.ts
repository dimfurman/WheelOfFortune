
import {_decorator, Button, Component, Node, tween, Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PulseButton')
export class PulseButton extends Component {
 
    private tweenAnim = null;

    @property
    public speed: number = 1;

    start () {
        this.onEnable();     
    }

    onDisable(){
        if(this.tweenAnim) {this.tweenAnim.stop;}
    }

    onEnable(){
        let button = this.node.getComponent(Button);
        if(!button.interactable) return;

        if(this.tweenAnim){
            this.tweenAnim.start();
        }
        else{
            this.tweenAnim=tween(this.node)
                .to(this.speed/2, {scale: new Vec3(1.06,1.06,1)})
                .to(this.speed/2, {scale: new Vec3(1,1,1)})
                .union()
                .repeatForever()
                .start();  
        }         
    }
}

