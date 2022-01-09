import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Crud({
  model: {
    type: Todo,
  },
})
@Controller('api/todo')
export class TodoController implements CrudController<Todo> {
  constructor(public service: TodoService) {}
}
