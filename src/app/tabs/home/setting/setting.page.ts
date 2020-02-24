import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openProfile() {
    // this.router.navigate(['/tabs/home/setting/profile/:email']);
    // this.router.navigate(['/tabs/home/setting/profile']);
    this.router.navigateByUrl('/app/tabs/home/setting/profile');
  }

}
