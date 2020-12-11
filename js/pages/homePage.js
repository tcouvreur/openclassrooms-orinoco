class HomePage {

  constructor() {
  }

  async getHTML(){
    return this.showProducts(await dataManager.getAllData());
  }

  showProducts(products) {
    let content = "";
    for (let i = 0, size = products.length; i < size; i++) {
      content += this.template_productList(products[i]);
    }
    return content;
  }

  template_productList(product) {
    return `
      <article  onclick="pageManager.changePage('product-${product._id}')">
        <img src="${product.imageUrl}" width="200px">
        <h2>${product.name}</h2>
        <p>${product.price / 100} €</p>
        <button onclick="cart.add('${product._id}')">ajouter au panier</button>
        <button>plus de détails</button>
      </article>
      `;
  }

  // changePage(productId) {
  //   alert(productId);
  // }
}
