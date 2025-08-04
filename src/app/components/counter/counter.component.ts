import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((prev) => prev + 1);
  }

  decrement() {
    this.count.update((prev) => prev - 1);
  }

  reset() {
    this.count.set(0);
  }

}
