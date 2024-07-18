import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from 'src/app/services/theme';
import { Subject, takeUntil } from 'rxjs';
import { User, WorkOut } from 'src/app/models';
import { LocalstorageService } from 'src/app/services';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  currentTheme!: AppTheme | null;

  private readonly _localStorageService = inject(LocalstorageService);

  private readonly _destroy$ = new Subject();

  options = [
    { value: 'All', label: 'All' },
    { value: 'Running', label: 'Running' },
    { value: 'Cycling', label: 'Cycling' },
    { value: 'Swimming', label: 'Swimming' },
    { value: 'Yoga', label: 'Yoga' }
  ];

  selectedOption: string = "All";
  searchText: string = "";
  pageNo: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;


  userDataList: User[] = [];
  filterDataList: User[] = [];


  ngOnInit(): void {
    this.selectedOption = this.options[0].value;

    this._localStorageService.userDataList$
      .pipe(takeUntil(this._destroy$))
      .subscribe((retList) => (this.userDataList = retList));
    this.filterDataList = this.userDataList;
    this.totalPages = this.filterDataList.length / this.pageSize;
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  onSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
    console.log(this.selectedOption);
  }

  getConcatenatedWorkOuts(workOuts: WorkOut[]): string {
    return workOuts.map(e => e.type).join(', ');
  }

  getTotalWorkOut(workOuts: WorkOut[]): string {
    return workOuts.map(e => e.minutes).reduce((acc, num) => acc + num, 0).toString();
  }

  getRouterLink(id: number): string {
    return `/users/${id.toString()}`;
  }

  applyFilter() {

  }
}
