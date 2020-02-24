import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/Cart';
import { ProductService } from '../product/product.service';
import { Observable } from 'rxjs';
import { product } from 'src/app/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  cartList = [];
  total = 0;
  id: any;
  loading: any;

  constructor(
    private nav: NavController,
    private alertController: AlertController,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private productService: ProductService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.routeActivate.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.cartList = this.router.getCurrentNavigation().extras.state.cartList;
      }
    });

    this.total = this.cartList.reduce((a, b) => a + (b.cartCount * b.cartPrice), 0);

  }

  delFromCart(cart: Cart) {
    const msg = 'Would you like to delete : ' + cart.cartTitle;
    this.presentAlertMultipleButtons(cart, msg);
  }

  removeCart(cart: Cart) {
    if (cart.cartCount > 0) {
      cart.cartCount = cart.cartCount - 1;
    } else {
      const rmIndex = this.cartList.indexOf(cart, 0);
      if (rmIndex > -1) {
        this.cartList.splice(rmIndex, 1);
      }
    }
    // this.cartService.delProduct(product);
    this.total = this.cartList.reduce((a, b) => a + (b.cartCount * b.cartPrice), 0);
  }

  onConfirmBill() {
    this.alertConfirmUpdate('Would you like to confirm this bill ?');
  }

  async updateProduct() {
    let productObs: Observable<product>;
    let productTmp: product;
    this.loading = this.createLoadingController('Loading...');
    (await this.loading).present();
    for (const cartConfirm of this.cartList) {
      productObs = this.productService.getProductById(cartConfirm.cartId);
      productObs.subscribe(async (result: product) => {
        productTmp = result[0];
        productTmp.productCount = (+productTmp.productCount - cartConfirm.cartCount).toString();
        this.productService.updateProduct(productTmp);
      });
    }
    (await this.loading).dismiss();
    this.alertCompleteUpdate('Confirm billing complete');
  }

  async presentAlertMultipleButtons(cart: Cart, msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel:');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.removeCart(cart);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertConfirmUpdate(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel:');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.updateProduct();
          }
        }
      ]
    });
    await alert.present();
  }

  async alertCompleteUpdate(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.nav.back();
          }
        }
      ]
    });
    await alert.present();
  }

  async createLoadingController(msg: string) {
    const loading = await this.loadingController.create({
      showBackdrop: true,
      spinner: 'lines-small',
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return loading;
  }
}
