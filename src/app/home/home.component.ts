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
  homeMsg = signal("This is the home page of Angular 19 Test Application. It is a simple application to test Angular 14 features and functionalities.");

  keyUpHandler(event: KeyboardEvent) {
    console.log("Key pressed: ", event.key);
  }
}
