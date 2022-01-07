import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos() {
    return this.todoService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.getOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo Not Found');
    }
    return todo;
  }
  @Post()
  createTodo(@Body() todoDto: TodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = todoDto.title;
    if (todoDto.isCompleted) {
      todo.isCompleted = todoDto.isCompleted;
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() { title, isCompleted }: TodoDto,
  ): Promise<Todo> {
    const todo = await this.todoService.getOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo Not Found');
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
