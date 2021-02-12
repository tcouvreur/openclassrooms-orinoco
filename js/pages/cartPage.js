/* global dataManager */ 
class CartPage{

  elmForm = [
    {
      "id": "firstName",
      "type": "text",
      "placeholder":"votre prénom",
    },
    {
      "id": "lastName",
      "type": "text",
      "placeholder":"votre nom",
    },
    {
      "id": "address",
      "type": "text",
      "placeholder":"votre adresse",
    },
    {
      "id": "city",
      "type": "text",
      "placeholder":"votre ville",
    },
    {
      "id": "email",
      "type": "email",
      "placeholder":"votre email",
    },
  ];

  regex = {
    "text" : /^[a-zA-Z]*$/,
    "email" :/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  }

  formError = false;

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
    content += `<p>Total : ${this.total}</p>`;
    return content;
  }

  async produitPanier(idProduct){
    const data = await dataManager.getProductInfo(idProduct);
    this.total += data.price;
    return `
      <article><i class="fas fa-trash-alt" onclick="cart.rem('${idProduct}');"></i> ${data.name} | ${data.price/100}</article>
    `;
  }

  renderForm(){
    let html = "";
    for (let index = 0; index < this.elmForm.length; index++) {
      const element = this.elmForm[index];
      html += ` <label><input id="${element.id}" placeholder="${element.placeholder}" type="${element.type}"><div id="${element.id}Msg"></div></label>`
    }
    return html + `<button onclick="pageManager.page.order()">commander</button>
    `;
  }

  order(){
    this.formError = false;
    for (let index = 0; index < this.elmForm.length; index++) {
      const element = this.elmForm[index];
      this.elmForm[index].value = document.getElementById(element.id).value;
      document.getElementById(element.id+"Msg").innerHTML = this.validField(this.elmForm[index].value, element.type) ? "" : "mauvais format";
    }
    //ajouter requete
  }

  validField(value, typeField){
    if( value === "")                        return this.noValid();
    if (value.length < 2)                    return this.noValid();
    if (!isNaN(parseInt(value)) )            return this.noValid();
    if (! this.regex[typeField].test(value)) return this.noValid();
    return true;
  }
  
  noValid(){
    this.formError = true;  
    return false;
  }
}