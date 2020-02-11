import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private data = [
    {
      id: 0,
      name: 'banner1',
      path: '../../assets/image/banner1.jpg'
    },
    {
      id: 1,
      name: 'banner2',
      path: '../../assets/image/banner2.jpg'
    },
    {
      id: 2,
      name: 'banner3',
      path: '../../assets/image/banner3.jpg'
    }
  ]

  private banner = [];

  constructor() { }

  getAllBanner() {
    return this.data;
  }

  betBanner() {
    return this.banner;
  }

}
