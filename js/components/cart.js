/* global dataManager pageManager */

class Cart{

  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   * @constructor
   */
  constructor(domTarget){
    this.content = dataManager.getCartContent();
    this.DOM = domTarget;
    this.renderIcon();
  }

  renderIcon(){
    this.DOM.innerHTML = this.content.length;
  }

  add(productId){
    this.content.push(productId);
    dataManager.saveCartContent(this.content);
    this.renderIcon();
  }

  rem(productId){
    this.content.splice(productId);
      var index = content.indexOf(value);
      if (index > -1) {
        content.splice(index, 1);
      }
    
    dataManager.saveCartContent(this.conten);
    this.renderIcon();
  }

}