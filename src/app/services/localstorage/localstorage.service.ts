import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/models';
import { storage } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService implements OnDestroy {

  userDataList$ = new BehaviorSubject<User[]>(this._getUserData);

  constructor() { }

  private readonly _destroy$ = new Subject();

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private get _getUserData(): User[] {
    const retList = storage.getItem<User[]>('userdatalist')
    if (retList) {
      return [];
    } else {
      return [];
    }

  }

  addUser(user: User) {
    // storage.setItem()
  }

  init(): void {

  }
}
