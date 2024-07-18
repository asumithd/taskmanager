import { Component, inject } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  task: Task = { title: '', description: '', status: 'To Do' };
  taskService = inject(TaskService);
  router = inject(Router);

  constructor() {}

  onSubmit() {
    if (this.task.title.trim()) {
      this.taskService.createTask(this.task).subscribe((res) => {
        this.router.navigate(['/']);
      });
      this.task = { title: '', description: '', status: 'To Do' };
    }
  }
}
