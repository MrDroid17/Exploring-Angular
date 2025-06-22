import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  currentValue = signal(0)

  increment() {
    this.currentValue.update(value => value + 1);
  }
  decrement() {
    this.currentValue.update(value => value - 1);
  }
  reset() {
    this.currentValue.set(0);
  }

}
