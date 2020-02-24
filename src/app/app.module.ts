import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIService, CustomInterceptor } from './service/APIService';
import { Configuration } from './app.constants';
import { IonicStorageModule } from '@ionic/storage';
import { PinDialog } from '@ionic-native/pin-dialog/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { LoginPageModule } from './authentication/login/login.module';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    LoginPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Configuration,
    APIService,
    Facebook,
    PinDialog,
    FingerprintAIO,
    Deeplinks,
    FCM,
    Camera,
    File,
    WebView,
    FilePath,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
