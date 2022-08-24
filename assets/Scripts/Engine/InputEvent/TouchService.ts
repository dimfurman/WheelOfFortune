
import { _decorator, Component, EventTouch, PhysicsSystem2D, Collider2D, input, Input, Vec2 } from 'cc';
import { TouchedNode } from './TouchedNode';
const { ccclass, property } = _decorator;


@ccclass('TouchService')
export class TouchService extends Component {

    private _touchNode:TouchedNode = null;
    private _touchBeganPos:Vec2;

    onLoad () {
        input.on(Input.EventType.TOUCH_START, this.OnTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.OnTouchEnd, this);
     }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.OnTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.OnTouchEnd, this);
    }

    OnTouchStart(e: EventTouch){        
        this._touchBeganPos = e.getUIStartLocation();
        let arCollider = PhysicsSystem2D.instance.testPoint(this._touchBeganPos);
        if(arCollider.length>0){
            //search above Node
            let aboveColleder:Collider2D=null;
            let curIndex = -1;
            for(let collider of arCollider){
                if(collider.node.getSiblingIndex() > curIndex){
                    aboveColleder = collider;
                    curIndex = collider.node.getSiblingIndex();
                }
            }
            //set current TouchedNode
            if(aboveColleder){
                this._touchNode=aboveColleder.node.getComponent(TouchedNode);
                if(this._touchNode != null){
                    this._touchNode.TouchStart(e, this._touchBeganPos);
                }
            }
        }     
    }

    OnTouchMove(e: EventTouch){
        if(this._touchNode != null){
            this._touchNode.TouchMove(e, this._touchBeganPos);
        }
    }

    OnTouchEnd(e: EventTouch){
        if(this._touchNode != null){
            this._touchNode.TouchEnd(e, this._touchBeganPos);
            this._touchNode=null;
        }
    }
}