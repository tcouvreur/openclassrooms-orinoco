class DataManager{ // eslint-disable-line no-unused-vars

  /**
   * liste des produits
   * @type {Object|null}
   */
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

  removeProduct(productID){
    localStorage.removeItem("cart", productID);
  }

  /**
   * [getProductInfo description]
   *
   * @param   {String}  productID  [productID description]
   *
   * @return  {Object|null}             [return description]
   */
  async getProductInfo(productID){
    if (this.products === null) this.products = await this.getAllData();
    for(let i=0, size = this.products.length; i< size; i++){
      if (this.products[i]._id === productID) return this.products[i];
    }
    return null;
  }

  async sendForm(body){
    const data = await fetch(
      this.src+"/order",
      {
        "body" : JSON.stringify(body),
        "headers" : {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        "method": "POST",
      }
    );
    return await data.json();
  }
}