class PageManager{
  constructor(target){
    this.target = target;

    this.showPage(window.location.search.slice(1));
  }

  async showPage(classPage){
    
    switch(classPage){
      case "contact" : 
        this.page = new Contact();
        break;
      default : 
        this.page = new HomePage();
        await this.page.asyncConstructor();
        console.log(this.page)
        this.target.innerHTML = this.page.html;
        break;
    }

  }
}