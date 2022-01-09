import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todoList: Todo[] = [];
  public title = '';
  constructor(private service: AppService) {}
  ngOnInit() {
    this.service.getAll().subscribe((todoList) => {
      this.todoList = todoList;
    });
  }
  submit() {
    if (this.title) {
      this.service.create(this.title).subscribe((todo) => {
        this.todoList.push(todo);
        this.title = '';
      });
    }
  }
  delete(id: number) {
    this.service.delete(id).subscribe(() => {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
    });
  }
  toggleCompleted(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.service.update(todo).subscribe((updatedTodo) => {
      this.todoList = this.todoList.map((todo) =>
        todo.id !== updatedTodo.id ? todo : updatedTodo,
      );
    });
  }
}
