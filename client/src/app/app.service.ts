import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public entities$: BehaviorSubject<Todo[]>;
  private todoList: Todo[] = [];
  constructor(private http: HttpClient) {
    this.entities$ = new BehaviorSubject<Todo[]>([]);
  }

  getAll() {
    this.http
      .get<Todo[]>('http://localhost:3000/api/todo')
      .subscribe((todoList) => {
        this.todoList = todoList;
        this.entities$.next(this.todoList);
      });
  }
  create(title: string) {
    this.http
      .post<Todo>('http://localhost:3000/api/todo', {
        title: title,
      })
      .subscribe((todo) => {
        this.todoList.push(todo);
        this.entities$.next(this.todoList);
      });
  }
  delete(id: number) {
    this.http.delete(`http://localhost:3000/api/todo/${id}`).subscribe(() => {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
      this.entities$.next(this.todoList);
    });
  }
  update(todo: Todo) {
    this.http
      .put<Todo>(`http://localhost:3000/api/todo/${todo.id}`, {
        isCompleted: !todo.isCompleted,
      })
      .subscribe((updatedTodo) => {
        this.todoList = this.todoList.map((todo) =>
          todo.id !== updatedTodo.id ? todo : updatedTodo,
        );
        this.entities$.next(this.todoList);
      });
  }
}
