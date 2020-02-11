import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  total = 0;
  id: any;

  constructor(private cartService: CartService, private alertController: AlertController, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.params.subscribe(params => {
      this.id = params[0];
    });

    console.log(this.id);

    let items = this.cartService.getCart();
    let selected = {};

    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = { ...obj, count: 1 };
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);

  }

  delFromCart(product) {
    const msg = 'Would you like to delete : ' + product.name;
    this.presentAlertMultipleButtons(product, msg);
  }

  async presentAlertMultipleButtons(product, msg) {
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
            if (product.count > 0) {
              product.count = product.count - 1;
            }
            this.cartService.delProduct(product);
            this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
          }
        }
      ]
    });

    await alert.present();
  }

}
