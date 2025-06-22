import { Directive, effect, ElementRef, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
  standalone: true,
})
export class HighlightCompletedTodoDirective {
  isCompleted = input(false);
  el = inject(ElementRef);
  constructor() { }


  highlightTodoEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.backgroundColor = 'lightcyan';
      this.el.nativeElement.style.textDecoration = 'line-through';
    } else {
      this.el.nativeElement.style.backgroundColor = 'lightgray';
      this.el.nativeElement.style.textDecoration = 'none';
    }
  })


}
