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

  /**
   * [getProductInfo description]
   *
   * @param   {String}  productID  [productID description]
   *
   * @return  {Object|null}             [return description]
   */
  async getProductInfo(productID){
    console.log(productID)
    if (this.products === null) this.products = await this.getAllData();
    for(let i=0, size = this.products.length; i< size; i++){
      if (this.products[i]._id === productID) return this.products[i];
    }
    return null;
  }
}