import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { TodoItem } from './types';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todoItems: TodoItem[] = [];
  activeRequests = signal(0);

  isBusy = computed(() => this.activeRequests() > 0);

  private track<T>(ob$: Observable<T>): Observable<T> {
    this.activeRequests.update((i) => i + 1);
    return ob$.pipe(
      delay(500),
      finalize(() => this.activeRequests.update((o) => o - 1)),
    );
  }

  private http = inject(HttpClient);

  baseUrl = 'https://jsonplaceholder.typicode.com';
  getList() {
    return this.track(this.http.get<TodoItem[]>(`${this.baseUrl}/todos`));
  }
  updateTodo(todoItem: TodoItem) {
    return this.track(
      this.http.put<TodoItem>(
        `${this.baseUrl}/todos/${todoItem.id}`,
        JSON.stringify(todoItem),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      ),
    );
  }

  deleteTodo(todoItem: TodoItem) {
    return this.track(
      this.http.delete(`${this.baseUrl}/todos/${todoItem.id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    );
  }
}
