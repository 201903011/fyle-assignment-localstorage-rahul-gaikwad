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

  public get userDataList(): User[] {
    return this.userDataList$.getValue();
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private get _getUserData(): User[] {
    const retList = storage.getItem('userDataList');
    if (retList) {
      return retList;
    } else {
      return [];
    }
  }


  addUser(user: User): boolean {
    // storage.setItem()
    const retList: User[] | null = this.userDataList$.getValue();
    if (retList) {
      user.id = retList.length + 1;
      retList.push(user);
      storage.setItem('userDataList', retList);
      this.userDataList$.next(retList);
    }
    else {
      const newList: User[] = [];
      user.id = newList.length + 1;
      newList.push(user);
      this.userDataList$.next(newList);
    }
    return true;
  }

  init(): void {

  }
}
