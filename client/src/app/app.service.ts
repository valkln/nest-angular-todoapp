import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/api/todo');
  }
  create(title: string): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/api/todo', {
      title: title,
    });
  }
  delete(id: number) {
    return this.http.delete(`http://localhost:3000/api/todo/${id}`);
  }
  update(todo: Todo) {
    return this.http.put<Todo>(
      `http://localhost:3000/api/todo/${todo.id}`,
      todo,
    );
  }
}
