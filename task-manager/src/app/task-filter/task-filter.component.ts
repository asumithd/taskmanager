import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  onFilterChange(event: Event) {
    let status = (event.target as HTMLInputElement).value;
    this.filterChange.emit(status);
  }
}
