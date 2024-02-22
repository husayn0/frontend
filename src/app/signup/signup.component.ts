import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true,
  imports: [FormsModule]
})

export class SignupComponent {
  constructor(private authService: AuthService, private router: Router, private bar : MatSnackBar) {}

  signup(username: string, password: string, fullname: string): void {
    this.authService.signup(username, password, fullname).subscribe({
      next: (res) => {
        if (res.message.includes('successfully')) {
          this.snack(res.message);
          this.navigateTo('/login');
        }else{
          if (res.message.includes('Failed')) {
            this.snack(res.message);
          }
        }
      },
      error: (err) => {
      }
    });
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