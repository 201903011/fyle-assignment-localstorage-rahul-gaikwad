import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme } from 'src/app/services/theme';
import { Subject, takeUntil } from 'rxjs';
import { User, WorkOut } from 'src/app/models';
import { LocalstorageService } from 'src/app/services';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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

  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  totalPages: number = 0;
  currentPage = 1;

  userDataList: User[] = [];
  filterDataList: User[] = [];
  paginatedItems: User[] = [];

  ngOnInit(): void {
    this.selectedOption = this.options[0].value;

    this._localStorageService.userDataList$
      .pipe(takeUntil(this._destroy$))
      .subscribe((retList) => (this.userDataList = retList));
    this.filterDataList = this.userDataList;
    this.setPage(1);
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  onSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
    this.applyFilter();
  }

  onSearchTextChange(event: string): void {
    this.searchText = event;
    this.applyFilter();
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
    console.log("called Apply Filter", this.selectedOption, this.searchText);
    if (this.searchText == "" && this.selectedOption == "All") {
      this.filterDataList = this.userDataList;
    }
    if (this.searchText != "" && this.selectedOption == "All") {
      this.filterDataList = this.userDataList.filter(e => e.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    if (this.searchText != "" && this.selectedOption != "All") {
      this.filterDataList = this.userDataList.filter(e => e.name.toLowerCase().includes(this.searchText.toLowerCase()) && e.workouts.map(w => w.type).includes(this.selectedOption));
    }
    if (this.searchText == "" && this.selectedOption != "All") {
      this.filterDataList = this.userDataList.filter(e => e.workouts.map(w => w.type).includes(this.selectedOption));
    }
    this.setPage(1);
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.pageSize;
    this.totalPages = Math.ceil(this.filterDataList.length / this.pageSize);
    const end = start + this.pageSize;
    this.paginatedItems = this.filterDataList.slice(start, end);
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = parseInt(selectElement.value);
    this.setPage(1); // Reset to first page when page size changes
  }

  get totalPageCount() {
    return Math.ceil(this.filterDataList.length / this.pageSize);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getCss(page: number): string {
    if (page === this.currentPage) {
      return 'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
    }
    else {
      return 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
    }
  }
}


