import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  standalone: true,
  imports: [],
})
export class HomepageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private bar: MatSnackBar,
    private tokenStorageService: TokenStorageService
  ) {}

  getFullName(): string {
    const isLoggedIn = !!this.tokenStorageService.getToken();
    if (isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      // var username = user.username;
      // var user_id = user.user_id;
      return user.fullname;
    }
    return '';
  }

  logout(): void {
    this.authService.logout();
    this.navigateTo('/login');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  snack(message: string): void {
    this.bar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
