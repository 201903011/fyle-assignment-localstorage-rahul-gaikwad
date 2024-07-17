import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme , ThemeService } from 'src/app/services/theme';
import { Subject, takeUntil } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule ],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
    currentTheme!: AppTheme | null;


    private readonly _destroy$ = new Subject();

    options = [
        { value: 'All', label: 'All' },
        { value: 'Running', label: 'Running' },
        { value: 'Cycling', label: 'Cycling' },
        { value: 'Swimming', label: 'Swimming' },
        { value: 'Yoga', label: 'Yoga' }
      ];
    
      selectedOption: string = "";

    ngOnInit(): void {
       
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
}
