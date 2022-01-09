import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todoList$: Observable<Todo[]>;
  public title = '';
  constructor(private service: AppService) {
    this.todoList$ = new Observable<Todo[]>();
  }
  ngOnInit() {
    this.todoList$ = this.service.entities$;
    this.service.getAll();
  }
  create() {
    if (this.title) {
      this.service.create(this.title);
      this.title = '';
    }
  }
  delete(id: number) {
    this.service.delete(id);
  }
  toggleCompleted(todo: Todo) {
    this.service.update(todo);
  }
}
