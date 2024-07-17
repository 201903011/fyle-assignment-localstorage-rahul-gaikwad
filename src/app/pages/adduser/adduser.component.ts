import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adduser.component.html',
})
export class AdduserComponent {
  options = [
    { value: 'Running', label: 'Running' },
    { value: 'Cycling', label: 'Cycling' },
    { value: 'Swimming', label: 'Swimming' },
    { value: 'Yoga', label: 'Yoga' }
  ];

  selectedOption: string = "";


  constructor() { }

  ngOnInit(): void {
    this.selectedOption = this.options[0].value;
  }

  onSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
    console.log(this.selectedOption);
  }

}
