import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"


export default class Text extends Base.GameObject {
  constructor(x, y, size, color) {
    super(x, y);
    let textComponent = new Components.TextComponent("10", size, color);
    this.addComponent(textComponent);
  }
}