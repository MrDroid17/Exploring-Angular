import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

export interface MentionOption {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule // Add this
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent {
  candidateForm: FormGroup;
  submitted = false;
  // Dropdown position for mention
  mentionDropdownTop = 0;
  mentionDropdownLeft = 0;
  mentionedSkills: MentionOption[] = []; // now stores skill objects

  // Dummy mention options
  mentionOptions: MentionOption[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Nodejs' },
    { id: 4, name: 'TypeScript' },
    { id: 5, name: 'Python' },
    { id: 6, name: 'Java' },
    { id: 7, name: 'C#' },
    { id: 8, name: 'SQL' }
  ];
  filteredMentions: MentionOption[] = [];
  showMentionList = false;
  mentionQuery = '';
  mentionStart = -1;

  constructor(private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.candidateForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile: ['', Validators.required]
    });
  }

  selectMention(option: MentionOption) {
    const control = this.candidateForm.get('profile');
    if (!control) return;
    const value: string = control.value;
    const caret = (document.getElementById('profile-textarea') as HTMLTextAreaElement)?.selectionStart || value.length;
    const before = value.substring(0, this.mentionStart);
    const after = value.substring(caret);
    const mentionText = `@${option.name} `;
    control.setValue(before + mentionText + after);
    this.showMentionList = false;
    setTimeout(() => {
      const textarea = document.getElementById('profile-textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = (before + mentionText).length;
      }
      // Update mentionedSkills after insertion
      this.mentionedSkills = this.mentionOptions
        .filter(opt => new RegExp(`@${opt.name}(?![\w])`, 'g').test(control.value));
    });
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      const { username, email, profile } = this.candidateForm.value;
      console.log('Form submitted:', { username, email, profile });
      console.log('Mentioned Skills:', this.mentionedSkills); // now logs skill objects
      this.submitted = true;
      this.candidateForm.reset({
        username: '',
        email: '',
        profile: ''
      });
      this.candidateForm.setErrors(null);
      // Mark all controls and the form itself as pristine and untouched
      Object.values(this.candidateForm.controls).forEach(control => {
        control.markAsPristine();
        control.markAsUntouched();
        control.updateValueAndValidity();
      });
      this.candidateForm.markAsPristine();
      this.candidateForm.markAsUntouched();
      this.candidateForm.updateValueAndValidity();
      // Show toast message
      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }


  highlightMentions(text: string): SafeHtml {
    if (!text) return '';
    // Highlight mentions
    text = text.replace(/(@[\w]+)/g, (match) => {
      return `<span class="mention-highlight-blue">${match}</span>`;
    });
    // Replace newlines with <br> for overlay
    text = text.replace(/\n/g, '<br>');
    // Debug: log the HTML output
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  // Sync overlay scroll with textarea
  syncScroll(event: any) {
    const overlay = (event.target.parentElement.querySelector('.textarea-overlay') as HTMLElement);
    if (overlay) {
      overlay.scrollTop = event.target.scrollTop;
      overlay.scrollLeft = event.target.scrollLeft;
    }
  }

  onProfileInput(event: any) {
    const value: string = event.target.value;
    const caret = event.target.selectionStart;
    const lastAt = value.lastIndexOf('@', caret - 1);
    if (lastAt !== -1 && (lastAt === 0 || /\s/.test(value[lastAt - 1]))) {
      this.mentionStart = lastAt;
      this.mentionQuery = value.substring(lastAt + 1, caret);
      this.filteredMentions = this.mentionOptions.filter(option =>
        option.name.toLowerCase().includes(this.mentionQuery.toLowerCase())
      );
      if (this.mentionQuery.length === 0) {
        this.filteredMentions = this.mentionOptions;
      }
      this.showMentionList = this.filteredMentions.length > 0;
      // Position dropdown at caret
      setTimeout(() => this.setMentionDropdownPosition(event.target));
    } else {
      this.showMentionList = false;
    }
    // Collect mentioned skill objects
    this.mentionedSkills = this.mentionOptions
      .filter(opt => new RegExp(`@${opt.name}(?![\w])`, 'g').test(value));
  }

  setMentionDropdownPosition(textarea: HTMLTextAreaElement) {
    // Use textarea's bounding rect for dropdown placement
    const rect = textarea.getBoundingClientRect();
    this.mentionDropdownTop = textarea.scrollTop + 40; // 40px below textarea top (adjust as needed)
    this.mentionDropdownLeft = textarea.scrollLeft + 12; // 12px from left (adjust as needed)
  }
}
