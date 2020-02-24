import { Component } from '@angular/core';
import { Platform, MenuController, NavController, ToastController, AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { ProductPage } from './tabs/shopping/product/product.page';
import { ShoppingPage } from './tabs/shopping/shopping.page';
import { FCM } from '@ionic-native/fcm/ngx';
import { Storage } from '@ionic/storage';
import { ShoppingPageModule } from './tabs/shopping/shopping.module';
import { ProductPageModule } from './tabs/shopping/product/product.module';
import { ShoppingPageRoutingModule } from './tabs/shopping/shopping-routing.module';
import { ProductPageRoutingModule } from './tabs/shopping/product/product-routing.module';
import { NotificationPage } from './tabs/notification/notification.page';
import { RegistrationPage } from './authentication/registration/registration.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router,
    private deeplinks: Deeplinks,
    private navController: NavController,
    private fcm: FCM,
    private toastController: ToastController,
    private store: Storage,
    private alertController: AlertController,
  ) {
    this.initializeApp();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // let status bar overlay webview
      this.statusBar.overlaysWebView(true);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#ff8080');
      this.splashScreen.hide();

      // deeplinks config
      this.deeplinks.routeWithNavController(this.navController, {
        'app/tabs/shopping': ShoppingPage,
        'app/tabs/shopping/product/:myId': ProductPage,
        'app/tabs/notification': NotificationPage,
        'auth/registration': RegistrationPage
      }).subscribe((match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', JSON.stringify(match));
          this.router.navigateByUrl(match.$link.host + match.$link.path);
      }, (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
      });

      //FCM config
      this.fcm.getToken().then((token: any) => {
        this.store.set('tokenId', token);
      });

      this.fcm.onTokenRefresh().subscribe((token: any) => {
        this.store.set('tokenId', token);
      });

      this.fcm.onNotification().subscribe((data: any) => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background!');
          this.router.navigate([data.ladding_page, data.price]);
        } else {
          console.log('Receive in fontground');
          this.router.navigate([data.ladding_page, data.price]);
        }
      });

      this.fcm.subscribeToTopic('people');
      this.fcm.unsubscribeFromTopic('marketing');
    });
  }

  private notificationSetup() {
    const token = this.fcm.getToken();
    this.store.set('tokenId', token);
    console.log(token);
    this.fcm.onNotification().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
    this.fcm.onTokenRefresh().subscribe(token => {
      token = token;
      this.store.set('tokenId', token);
      console.log(token);
    });
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  openShopping() {
    // this.router.navigate(['tabs/shopping']);
    this.router.navigateByUrl('app/tabs/shopping');
    this.menu.close();
  }

  openHome() {
    this.router.navigateByUrl('app/tabs/home');
    this.menu.close();
  }

  openNotification() {
    this.router.navigateByUrl('app/tabs/notification');
    this.menu.close();
  }

  logout() {
    this.router.navigate(['auth']);
    this.menu.close();
  }

  async alertWarning(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

          }
        }
      ]
    });
    await alert.present();
  }
}
