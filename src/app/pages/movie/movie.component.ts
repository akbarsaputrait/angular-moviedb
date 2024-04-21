import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  imports: [RouterModule],
})
export class MovieComponent {}
