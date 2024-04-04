import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CapacityComponent } from './pages/capacity/capacity.component';
import { GridModule } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CapacityComponent, GridModule],
})
export class AppComponent {
  title = 'Task2';
}
