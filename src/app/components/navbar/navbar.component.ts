import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuActive: boolean = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
}
