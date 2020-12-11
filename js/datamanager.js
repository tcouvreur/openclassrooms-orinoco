class DataManager{

  products = null;

  /**
   * [constructor description]
   *
   * @param   {String}  src  adresse du serveur de la base de données
   *
   * @return  {[type]}       [return description]
   */
  constructor(src){
    this.src = src;
  }

  async getAllData(){
    const data = await fetch(this.src);
    this.products = await data.json();
    return this.products;
  }

  getCartContent(){
    const content = localStorage.getItem("cart");
    return content === null ? [] : JSON.parse(content);
  }

  saveCartContent(cartContent){
    localStorage.setItem("cart", JSON.stringify(cartContent));

  }
}