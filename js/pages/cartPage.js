/* global dataManager cart */ 
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
      "type": "textWithNumber",
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
    "textWithNumber" : /^[A-Za-z0-9 _]*$/,
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
      html += ` <label><input id="${element.id}" placeholder="${element.placeholder}" type="${element.type === "textWithNumber" ? "text" : element.type}"><div id="${element.id}Msg"></div></label>`
    }
    return html + `<button onclick="pageManager.page.order()">commander</button>
    `;
  }

  async order(){
    this.formError = false;
    for (let index = 0; index < this.elmForm.length; index++) {
      const element = this.elmForm[index];
      this.elmForm[index].value = document.getElementById(element.id).value;
      document.getElementById(element.id+"Msg").innerHTML = this.validField(this.elmForm[index].value, element.type) ? "" : "mauvais format";
    }
    if (this.formError) return;
    const contact = {};
    for (let index = 0; index < this.elmForm.length; index++) {
      contact[this.elmForm[index].id] =  document.getElementById(this.elmForm[index].id).value;
    }
    try{
      const result = await dataManager.sendForm({
        "contact" : contact,
        "products": cart.content
      });
      this.showConfirmOrder(result);
    }
    catch(err){
      console.error(err);
      alert("nous rencontrons un probleme technique");
    }
  }

  validField(value, typeField){
    if( value === "")                                                return this.noValid();
    if (value.length < 2)                                            return this.noValid();
    if (typeField !== "textWithNumber" && !isNaN(parseInt(value)) )  return this.noValid();
    if (! this.regex[typeField].test(value))                         return this.noValid();
    return true;
  }
  
  noValid(){
    this.formError = true;  
    return false;
  }

  showConfirmOrder(orderSpecs){
    this.modale = document.createElement("modale");
    this.modale.innerHTML = `
      <h1>merci ${orderSpecs.contact.firstName} ${orderSpecs.contact.lastName} pour votre commande numéro ${orderSpecs.orderId}</h1>
    `;
    this.modale.onclick=this.closeModal.bind(this);
    document.body.appendChild(this.modale);
    cart.clear();

  }
  closeModal(){
    document.body.removeChild(this.modale);
    pageManager.showPage("index");
  }
}