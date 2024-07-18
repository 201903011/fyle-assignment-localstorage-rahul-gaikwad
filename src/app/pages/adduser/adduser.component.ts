import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User, WorkOut } from 'src/app/models';
import { LocalstorageService } from 'src/app/services';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './adduser.component.html',
  selector: 'user-form'
})
export class AdduserComponent {
  options = [
    { value: 'Running', label: 'Running' },
    { value: 'Cycling', label: 'Cycling' },
    { value: 'Swimming', label: 'Swimming' },
    { value: 'Yoga', label: 'Yoga' }
  ];

  selectedOption: string = "";

  private readonly _localStorageService = inject(LocalstorageService);

  isSuccess: boolean = false;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      workout: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      workout: ['', Validators.required],
      minutes: [null, [Validators.required, Validators.min(0)]]
    });
  }


  onSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
    console.log(this.selectedOption);
  }


  userDetails = {
    name: '',
    workout: '',
    minutes: '',
  };



  onSubmitForm(form: FormGroup): void {
    if (this.userForm.valid) {
      // console.log(this.userForm.value);
      // console.log('Form data:', this.userForm.value["name"]);
      let user = new User(0, this.userForm.value["name"], [new WorkOut(this.userForm.value["workout"], this.userForm.value["minutes"])]);
      this.isSuccess = this._localStorageService.addUser(user);
      setTimeout(() => {
        this.isSuccess = false;
      }, 3000);
    } else {
      console.log('Form is invalid');
    }
  }

}
