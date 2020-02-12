import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

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
    private router: Router
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
    });
  }

  openShopping() {
    this.router.navigate(['tabs/shopping']);
    this.menu.close();
  }

  openHome() {
    this.router.navigate(['tabs/home']);
    this.menu.close();
  }

  openNotification() {
    this.router.navigate(['tabs/notification']);
    this.menu.close();
  }

  logout(){
    this.router.navigate(['authentication']);
    this.menu.close();
  }
}
