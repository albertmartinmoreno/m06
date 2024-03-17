import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { Item } from '../interfaces/item';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  storage: Storage | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: InjectionToken<Object>) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = localStorage;
    }
  }

  setItem(item: Item): void {
    if (this.storage && item.value) {
      localStorage.setItem(item.key, item.value);
    }
  }

  getItem(item: Item): string | null {
    if (this.storage) {
      return localStorage.getItem(item.key);
    }

    return null;
  }

  removeItem(item: Item): void {
    if (this.storage) {
      localStorage.removeItem(item.key);
    }
  }
}
