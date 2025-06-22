import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  http = inject(HttpClient);

  constructor() { }

  getTodos() {
    const url = 'https://jsonplaceholder.typicode.com/todos';

    return this.http.get<Array<Todo>>(url);
  }
}
