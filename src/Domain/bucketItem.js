export default class BucketItems {
  constructor() {
    this.items = [
      {
        id: 1,
        name: 'Eiffel Tower',
        country: 'France',
        city: 'Paris',
        category: 'Historical',
        description: 'Iconic iron tower in Paris',
        visited: false
      },
      {
        id: 2,
        name: 'Grand Canyon',
        country: 'USA',
        city: 'Arizona',
        category: 'Natural',
        description: 'Massive canyon carved by Colorado River',
        visited: false
      },
      {
        id: 3,
        name: 'Tokyo Disneyland',
        country: 'Japan',
        city: 'Tokyo',
        category: 'Entertainment',
        description: 'Popular theme park in Japan',
        visited: false
      },
      {
        id: 4,
        name: 'Catacombs',
        country: 'France',
        city: 'Paris',
        category: 'Historical',
        description: 'Underground cemetery',
        visited: false
      }
    ];
    this.idCounter = this.items.length + 1;
  }

  addItem(name, country, city, category, description) {
    const newItem = { 
      id: this.idCounter++, 
      name, 
      country, 
      city, 
      category, 
      description, 
      visited: false 
    };
    this.items.push(newItem);
    return newItem;
  }

  getItems() {
    return [...this.items];
  }

  getItemById(id) {
    return this.items.find(item => item.id === id);
  }

  updateItem(id, newName, newCountry, newCity, newCategory, newDescription) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.name = newName;
      item.country = newCountry;
      item.city = newCity;
      item.category = newCategory;
      item.description = newDescription;
      return item;
    }
    return null;
  }

  updateVisited(id) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.visited = !item.visited;
      return item;
    }
    return null;
  }

  deleteItem(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      return this.items.splice(index, 1)[0];
    }
    return null;
  }
}