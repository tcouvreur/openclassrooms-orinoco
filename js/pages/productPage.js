/* global dataManager */
class productPage{
  /**
   * [imageUrl]
   * @type String
   */
  imageUrl;

  /**
   * [name]
   * @type String
   */
  name;

  /**
   * [description]
   * @type String
   */
  description;

  /**
   * [_id]
   * @type String
   */
  _id;

  /**
   * [variantes]
   * @type String
   */
  variantes;

  /**
   * [price]
   * @type String
   */
  price;

  constructor(productID){
    this._id = productID;
  }

  async getHTML(){
    const specs = await dataManager.getProductInfo(this._id);
    if (specs !== null) {
      for (const [key, value] of Object.entries(specs)) {
        this[key] = value;
      }
      return this.affiche();
    }
    return this.afficheErreur();
  }

  
  personnalise(){
    let content = "";
    for(let i=0, size = this.lenses.length|0; i<size; i++){
      content += `<li>${this.lenses[i]}</li>`;
    }
    return content;
  }

  affiche(){
    return `<h1>${this.name}</h1>
    <article>
        <img class="" src="${this.imageUrl}" alt="Image principale du produit">
        <!-- Description -->
        <p>${this.description}</p>
        <!-- Avis -->
        <h3>Donnez votre avis :</h3>
        <!-- Prix -->
        <p>Prix : ${this.price/100}€</p>
        <!-- Personnalisation -->
        <ul class="check-colors">
            ${this.personnalise()}
        </ul>
        <button onclick="cart.add('${this._id}')">Ajouter au panier</button>
    </article>`
  }

  afficheErreur(){

  }
  
}