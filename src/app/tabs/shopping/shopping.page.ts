import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ShoppingService } from './shopping.service';
import { Observable } from 'rxjs';
import { product } from 'src/app/model/product';
import { Cart } from 'src/app/model/Cart';
import { Configuration } from 'src/app/app.constants';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})

export class ShoppingPage implements OnInit {
  cartList = [];
  items = [];
  loading: any;
  cartCount = 0;

  productCreateBtnTxt: string;

  sliderConfig = {
    spaceBetween: 10,
    slidesPerView: 1.2,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  productList: Observable<product>;
  productListTmp: any;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private shopService: ShoppingService,
    private configuration: Configuration) {}

  ngOnInit() {
    this.productCreateBtnTxt = this.configuration.productCreateBtnTxt;
  }

  ionViewWillEnter() {
    this.items = [];
    this.getProductAll();
    this.chkTotalCart();
  }

  getCartById(cartId: string) {
    // tslint:disable-next-line: prefer-for-of
    for (const cartChk of this.cartList) {
      if (cartChk.cartId === cartId) {
        return cartChk;
      }
    }
    return null;
  }

  chkTotalCart() {
    this.cartCount = 0;
    if (this.cartList.length > 0) {
      for (const cartChk of this.cartList) {
        this.cartCount = this.cartCount + cartChk.cartCount;
      }
    }
  }

  chkCartList(cartId: string) {
    for (const cartChk of this.cartList) {
      if (cartChk.cartId === cartId) {
        return true;
      }
    }
    return false;
  }

  addToCart(productSelect: product) {
    const cartTmp = {
      cartId: productSelect.productId,
      cartTitle: productSelect.productTitle,
      cartPrice: +productSelect.productPrice,
      cartCount: 1
    };

    const cartChk = this.getCartById(cartTmp.cartId);
    if (cartChk != null) {
      if ((cartChk.cartCount + 1) > +productSelect.productCount) {
        this.alertConfirmUpdate('This product is not enough!');
      } else {
        cartChk.cartCount = cartChk.cartCount + 1;
        this.cartCount = this.cartCount + 1;
      }
    } else {
      this.cartList.push(cartTmp);
      this.cartCount = this.cartCount + 1;
    }
  }

  async getProductAll() {
    this.loading = this.createLoadingController('Loading...');
    (await this.loading).present();
    this.productList = this.shopService.getAllProduct();
    this.productList.subscribe(async (dataList: any) => {
      // this.productListTmp = dataList;
      this.items = dataList;
      (await this.loading).dismiss();
    });
  }

  openCart() {
    const navigationExtras: NavigationExtras = {
        state: {
          cartList: this.cartList
        }
      };
    this.router.navigateByUrl('app/tabs/shopping/cart', navigationExtras);
  }

  openProduct(productId: string) {
    if (typeof productId === 'string' && productId.length > 0) {
      this.router.navigateByUrl('app/tabs/shopping/product/' + productId);
    } else {
      this.alertConfirmUpdate('Invalid product!');
    }
  }

  onCreateProduct() {
      this.router.navigateByUrl('app/tabs/shopping/product/' + (this.items.length + 1).toString());
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
