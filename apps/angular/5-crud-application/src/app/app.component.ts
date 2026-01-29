import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { randText } from '@ngneat/falso';
import { TodoService } from './todo.service';
import { TodoItem } from './types';

@Component({
  imports: [MatProgressBarModule],
  selector: 'app-root',
  template: `
    @if (todoService.isBusy()) {
      <mat-progress-bar mode="query"></mat-progress-bar>
    }

    <div>
      Number of active requests: {{ todoService.activeRequests() }}

      @for (todo of todos(); track todo.id) {
        <div>
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
          <button (click)="remove(todo)">Delete</button>
        </div>
      }
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todoService = inject(TodoService);

  todos = signal<TodoItem[]>([]);
  ngOnInit(): void {
    this.todoService.getList().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: TodoItem) {
    const newTitle = randText();
    console.log('NEW TITLE');
    this.todoService
      .updateTodo({
        ...todo,
        title: newTitle,
        userId: todo.userId,
      })
      .subscribe((todoUpdated: TodoItem) => {
        console.log('TODO UPDATED', newTitle);
        this.todos.set(
          [
            ...this.todos().filter((o) => o.id != todoUpdated.id),
            todoUpdated,
          ].sort((a, b) => a.id - b.id),
        );
      });
  }

  remove(todo: TodoItem) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.todos.set([...this.todos().filter((o) => o.id != todo.id)]);
    });
  }
}
