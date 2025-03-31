import React from 'react';
import BucketItemsRepository from '../Repository/Repo';


describe('BucketItemsRepository', () => {
    let repository;
  
    beforeEach(() => {
      repository = new BucketItemsRepository();
    });
  
    test('adds new item correctly, get items', () => {
      const newItem = repository.addItem('Colosseum','Italy','Rome','Historical','Ancient amphitheater');
      
      expect(newItem).toEqual({ id: 5 ,name: 'Colosseum',country: 'Italy',city:
         'Rome',category: 'Historical',description: 'Ancient amphitheater',visited: false});
      
      const items = repository.getItems();
      expect(items).toContainEqual(newItem);
    });

    test('update an item, test update visited ', () => {
        const newItem = repository.addItem('Colosseum','Italy','Rome','Historical','Ancient amphitheater');

        const updatedItem = repository.updateItem(1, 'Catacombs', 'France', 'Paris', 'Historical', 'Underground cemetery');
        expect(updatedItem).toEqual({id: 1, name: 'Catacombs', country: 'France', city: 'Paris',
             category: 'Historical', description: 'Underground cemetery', visited: false});

        const items = repository.getItems();
        expect(items).toContainEqual(updatedItem);

        const visited = repository.updateVisited(1);
        expect(visited).toEqual({id: 1, name: 'Catacombs', country: 'France', city: 'Paris',
             category: 'Historical', description: 'Underground cemetery', visited: true});
        
    })

    test('delete item', () => {
        const itemA = repository.addItem('a', 'a', 'a', 'a', 'a');
        const itemB = repository.addItem('b', 'b', 'b', 'b', 'b');
        const items = repository.getItems();
        expect(items).toContainEqual(itemA, itemB);

        repository.deleteItem(1);
        expect(items).toContainEqual(itemB);

    })


  });