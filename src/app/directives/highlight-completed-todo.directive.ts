import { Directive, effect, ElementRef, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
  standalone: true,
})
export class HighlightCompletedTodoDirective {
  isCompleted = input(false);
  el = inject(ElementRef);
  constructor() { }


  //In Angular, an effect is a function that automatically re-executes whenever the signals it depends on change. It's a way to react to signal updates and perform side effects, such as updating the DOM, logging, or interacting with external APIs. Effects are crucial for synchronizing the reactive world of signals with the non-reactive parts of an application
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
