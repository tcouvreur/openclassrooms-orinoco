class CartPage{
  constructor(){

  }

  async getHTML(){
    return await this.showProducts() + this.renderForm();
  }

  async showProducts(){
    let content = "";
    this.total = 0;
    for(let i=0, size = cart.content.length; i<size; i++){
      content += await this.produitPanier(cart.content[i]);
    }
    return content;
  }

  async produitPanier(idProduct){
    const data = await dataManager.getProductInfo(idProduct);
    this.total += data.price;
    return `
      <article><i class="" onclick="pageManager.page.removeProduct("${idProduct}")></i> ${data.name} | ${data.price/100}
    `;
  }

  renderForm(){
    return `
      <input placeholder="test"> 
    
    `
  };
}