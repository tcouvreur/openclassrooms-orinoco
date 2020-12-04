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

  async getAllData(callback){
    let data = await fetch(this.src);
    data = await data.json();
    this.products = data;
    callback(data);
  }
}