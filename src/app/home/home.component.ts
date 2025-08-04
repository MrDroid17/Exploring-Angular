import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { CounterComponent } from '../components/counter/counter.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username = signal("Mr Kumar, welcome to Angular 14 Test Application!");

  keyUpHandler(event: KeyboardEvent) {
    let inputValue = (event.target as HTMLInputElement).value.trim();
    this.username.set(inputValue);
  }
}
