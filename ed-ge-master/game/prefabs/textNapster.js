import Base from "../../engine/Base.js";
import textNapsterBehavior from "../behaviors/textNapsterBehavior.js";

export default class Napster extends Base.GameObject{
  constructor() {
    super(120,-30)
    this.addComponent(new textNapsterBehavior());
    

  }

}