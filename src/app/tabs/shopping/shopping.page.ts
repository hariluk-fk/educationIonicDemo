import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})

export class ShoppingPage implements OnInit {
  cart = [];
  items = [];

  sliderConfig = {
    spaceBetween: 7,
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  constructor(private cartService: CartService, private router: Router, private nav: NavController) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  openCart() {
    // this.myNavService.myParam = {locs:locs};
    // await this.navCtrl.goForward('/map-page');
    // // const test = 'test send data';
    this.router.navigate(['/tabs/shopping/cart']);
    // this.router.navigate(['/tabs/shopping/cart'], 'id': test);
  }

  openProduct(product) {
    this.router.navigate(['/tabs/shopping/product']);
  }

}
