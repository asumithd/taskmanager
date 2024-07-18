import {
  Component,
  EventEmitter,
  inject,
  Output,
  type OnInit,
} from '@angular/core';
import type { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskFilterComponent, FormsModule, CommonModule],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterStatus: string = 'All';
  taskService = inject(TaskService);
  router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  updateStatus(task: Task, status: string) {
    task.status = status as Task['status'];
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(id: string | undefined) {
    console.log(id, 'event');

    if (id) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task._id !== id);
      });
    }
  }

  filterTasks() {
    return this.filterStatus === 'All'
      ? this.tasks
      : this.tasks.filter((task) => task.status === this.filterStatus);
  }
  addTaskUrl() {
    this.router.navigate(['/addTask']);
  }
}
