import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodoPipe } from '../pipes/filter-todo.pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, FilterTodoPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todoService = inject(TodoService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal<string>('');

  ngOnInit(): void {
    this.todoService.getTodos().pipe(
      catchError((error) => {
        console.error('Error fetching todos:', error);
        throw error;
      })
    ).subscribe({
      next: (todos: Array<Todo>) => {
        this.todoItems.set(todos);
      },
    })
  }

  updateTodoItem(todoItem: Todo): void {
    this.todoItems.update(items => {
      const index = items.findIndex(item => item.id === todoItem.id);
      if (index !== -1) {
        items[index].completed = !items[index].completed;
      }
      return [...items];
    })
  }

}
