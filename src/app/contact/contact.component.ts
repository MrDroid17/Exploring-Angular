import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  candidateForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.candidateForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      const { username, email, profile } = this.candidateForm.value;
      console.log('Form submitted:', { username, email, profile });
      this.submitted = true;
      this.candidateForm.reset();
    }
  }
}
