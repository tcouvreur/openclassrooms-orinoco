class HomePage {

  html = ":("
  constructor() {
  }

  async asyncConstructor(){
    this.html = await dataManager.getAllData(this.showProducts.bind(this));
  }

  showProducts(products) {
    let content = "";
    for (let i = 0, size = products.length; i < size; i++) {
      content += this.template_productList(products[i]);
    }
    console.log(content)
    return content;
  }

  template_productList(product) {
    return `
      <article  onclick="changePage('${product._id}')">
        <img src="${product.imageUrl}" width="200px">
        <h2>${product.name}</h2>
        <p>${product.price / 100} €</p>
        <button>ajouter au panier</button>
        <button>plus de détails</button>
      </article>
      `;
  }

  changePage(productId) {
    alert(productId);
  }
}
