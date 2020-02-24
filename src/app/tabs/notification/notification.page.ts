import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Configuration } from 'src/app/app.constants';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private configuration: Configuration,
    private notiService: NotificationService
  ) { }

  ngOnInit() {
  }

  onOpenDetail() {
    this.router.navigateByUrl('app/tabs/notification/notification-detail/' + 12);
  }
}
