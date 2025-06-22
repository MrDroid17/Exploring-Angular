import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.type';

@Pipe({
  name: 'filterTodo',
  standalone: true,
})
export class FilterTodoPipe implements PipeTransform {

  transform(todos: Todo[], searchTerm: string): Todo[] | null {
    if (!searchTerm || searchTerm.trim() === '') {
      return todos;
    }
    return todos.filter(todo => {
      const title = todo.title.toLowerCase();
      const term = searchTerm.toLowerCase();
      return title.includes(term);
    })
  }

}
