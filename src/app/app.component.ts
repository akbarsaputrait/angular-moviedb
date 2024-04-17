import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideBookmark, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';
import { ThemeService } from './services/theme.service';

@Component({
  standalone: true,
  providers: [provideIcons({ lucideBookmark, lucideSun, lucideMoon })],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HlmButtonDirective,
    HlmH2Directive,
    RouterModule,
    HlmIconComponent,
    AsyncPipe,
  ],
})
export class AppComponent {
  title = 'angular-moviedb';

  private _themeService = inject(ThemeService);

  public theme$ = this._themeService.theme$;
  public toggleTheme(): void {
    this._themeService.toggleDarkMode();
  }
}
