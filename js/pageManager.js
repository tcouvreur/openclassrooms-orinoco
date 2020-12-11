class PageManager{
  constructor(target){
    this.target = target;

    this.showPage(window.location.search.slice(1, 8));
  }

  async showPage(classPage){
    
    switch(classPage){
      case "contact" : 
        this.page = new Contact();
        break;
      case "product" : 
        const productId = window.location.search.split("-",2)[1];
        this.page = new PageProduit(productId);
        break;
      default : 
        this.page = new HomePage();        
        this.target.innerHTML = await this.page.getHTML();
        break;
    }

  }

  changePage(newPage){
    // window.location.href = window.location.href+"?"+newPage; 
    // alert(newPage)   
    this.showPage(newPage);
  }
}