import BucketItems from "../Domain/bucketItem";

export default class BucketItemsRepository {
    
    constructor() {
      this.items = new BucketItems();
    }

    addItem(name, country, city, category, description) {
      return this.items.addItem(name, country, city, category, description);
    }

    getItems() {
      return this.items.getItems();
    }

    updateItem(id, newName, newCountry, newCity, newCategory, newDescription) {
      return this.items.updateItem(id, newName, newCountry, newCity, newCategory, newDescription);
    }

    updateVisited(id) {
      return this.items.updateVisited(id);
    }

    deleteItem(id) {
      return this.items.deleteItem(id);
    }


}