class PageManager{
  constructor(target){
    this.target = target;

    this.showPage(window.location.search.slice(1));
  }

  async showPage(uri){

    const classPage = uri.slice(0,7);
    
    switch(classPage){
      case "contact" : 
        this.page = new Contact();
        break;
        case "panier" : 
          this.page = new CartPage();
          break;
      case "product" : 
        const productId = uri.split("-",2)[1];
        this.page = new PageProduit(productId);
        break;
      default : 
        this.page = new HomePage();        
        break;
    }
    this.target.innerHTML = await this.page.getHTML();

  }

  changePage(newPage){
    window.history.pushState({}, '', window.location.href+"?"+newPage);
    this.showPage(newPage);
  }
}