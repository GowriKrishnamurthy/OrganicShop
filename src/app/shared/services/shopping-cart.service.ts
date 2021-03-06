import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createNewCart() {
    // Create a new shopping cart id in firebase db under /shopping-carts
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartID();

    // Create a new shopping cart id in firebase db under /shopping-carts
    return this.db.object('/shopping-carts/' + cartId);
  }

  // To call the async method like sync methods.
  private async getOrCreateCartID(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    // Check  if the cart iD is present. if not, create a new one and save it in local storage
    if (cartId)
      return cartId;

    const result = await this.createNewCart();
    // Store the id of the newly created node in the local storage
    localStorage.setItem('cartId', result.key);
    // Return the reference to the newly created cart
    return result.key;
  }

  private getItem(cartID: string, productID: string) {
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productID);
  }

  async addToCart(product: Product) {
    this.updateCart(product, 1);
  }
  async removeFromCart(product: Product) {
    this.updateCart(product, -1);
  }

  private async updateCart(product: Product, change: number) {
    const cartId = await this.getOrCreateCartID();
    const item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({ product: product, quantity: item.payload.val().quantity + change });
      } else {
        item$.set({
          product: {
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
          }, quantity: 1
        });
      }
    });
  }
}
  // Refactoring the add to cart method
  //  async addToCart(product: Product) {
  //   const cartId = await this.getOrCreateCartID();
  //   const item$ = this.getItem(cartId, product.key);
  //   item$.snapshotChanges().take(1).subscribe(item => {
  //       item$.update({ product: product, quantity: (item.payload.val().quantity || 0 ) + 1 });
  //   });


