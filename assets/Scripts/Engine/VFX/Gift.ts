
import { _decorator, Component, Node, tween, Vec3, find, Quat, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Gift')
export class Gift extends Component {

    start () {
        let shine:Node = find("Shine", this.node);
        //let giftImg = find("GiftImg", this.node);

        tween(shine)
            .by(20, {angle: 360})
            .repeatForever()
            .start();

        tween(shine.getComponent(UIOpacity))
            .to(1.3,{ opacity: 180 })
            .to(1.3,{ opacity: 100 })
            .union()
            .repeatForever()
            .start();       

    }

}
