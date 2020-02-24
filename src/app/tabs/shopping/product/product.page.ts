import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { product } from 'src/app/model/product';
import { AlertController, ActionSheetController, LoadingController, Platform, NavController } from '@ionic/angular';
import { Configuration } from 'src/app/app.constants';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

const STORAGE_KEY = 'productImage';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})

export class ProductPage implements OnInit {
  myId: string;
  loading: any;
  productTmp: Observable<product>;
  product: product;
  images: any;
  productPic: any;

  // resource
  saveBtnTxt: string;
  loadingTxt: string;
  productConfirmMsg: string;

  constructor(
    private pt: Platform,
    private activatedRoute: ActivatedRoute,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private webview: WebView,
    private storage: Storage,
    private configuration: Configuration,
    private nav: NavController,
    private alertController: AlertController,
    private actionSheetControl: ActionSheetController,
    private loadingController: LoadingController,
    private productService: ProductService) { }

    options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

  ngOnInit() {
    // Pairing resource
    this.saveBtnTxt = this.configuration.saveBtnTxt;
    this.loadingTxt = this.configuration.loadingTxt;
    this.productConfirmMsg = this.configuration.productConfirmMsg;
    this.pt.ready().then(() => {
      this.activatedRoute.params.subscribe(params => {
        this.myId = params['myId'];
      });
      if (typeof this.myId === 'string' && this.myId.length > 0) {
        if (this.myId.length < 6) {
          for (let i = this.myId.length; i < 6; i++) {
            this.myId = '0' + this.myId;
          }
          console.log(this.myId);
          this.product = {
            productId: this.myId,
            productTitle: '',
            productDesc: '',
            productPic: '',
            productPrice: '',
            productCount: ''
          };
        } else {
          this.onGetProduct();
        }
      }
    });
  }

  async onGetProduct() {
    this.loading = this.createLoadingController(this.loadingTxt);
    (await this.loading).present();
    this.productTmp = this.productService.getProductById(this.myId);
    this.productTmp.subscribe(async (result: product) => {
      this.product = result[0];
      // this.productPic = this.storage.get(STORAGE_KEY + this.product.productId);
      (await this.loading).dismiss();
    });
  }

  async onSelectImage() {
    const actionSheet = this.actionSheetControl.create({
      header: 'Select Image source',
      buttons: [
        {
          text : 'Select from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text : 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text : 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await (await actionSheet).present();
  }

  async takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.pt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              });
      } else {
          const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });
  }

  copyFileToLocalDir(namePath: string, currentName: string, newFileName: string) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      const filePath = this.file.dataDirectory + newFileName;
      const resPath = this.pathForImage(filePath);
      this.product.productPic = this.pathForImage(resPath);
    }, error => {
      this.alertWarning(JSON.stringify(error));
    });
  }

  createFileName() {
    const dateTmp = new Date(),
      timeTmp = dateTmp.getTime(),
      newFileName = timeTmp + '.jpg';
    return newFileName;
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async updateProduct() {
    const msg = 'Updated product complete';
    this.loading = this.createLoadingController(this.loadingTxt);
    (await this.loading).present();
    this.productService.updateProduct(this.product);
    (await this.loading).dismiss();
    this.alertCompleteUpdate(msg);
  }

  onSaveProduct() {
    this.alertConfirmUpdate(this.productConfirmMsg);
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
