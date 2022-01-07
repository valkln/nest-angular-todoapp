import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRep: Repository<Todo>,
  ) {}
  getAll() {
    return this.todoRep.find();
  }
  getOne(id: string): Promise<Todo> {
    return this.todoRep.findOne(id);
  }
  create(todo: Todo): Promise<Todo> {
    return this.todoRep.save(todo);
  }
  update(todo: Todo) {
    return this.todoRep.save(todo);
  }
  async delete(id: string): Promise<void> {
    await this.todoRep.delete(id);
  }
}
