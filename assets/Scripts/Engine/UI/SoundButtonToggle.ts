
import { _decorator, Component, Node, Sprite, Button, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('SoundButtonToggle')
export class SoundButtonToggle extends Component {

    @property({type: SpriteFrame})
    public enableSprite: SpriteFrame = null;    

    @property({type: SpriteFrame})
    public disableSprite: SpriteFrame = null;

    public btnEnabled = true;

    private buttonSprite:Sprite;

    start(){
        this.buttonSprite = this.node.getComponent(Sprite);
    }

    ToggleSprite(): void {
        if(this.btnEnabled){
            this.buttonSprite.spriteFrame = this.disableSprite;
            this.btnEnabled = false;
        }
        else {
            this.buttonSprite.spriteFrame = this.enableSprite;
            this.btnEnabled = true;
        }
    }

}
