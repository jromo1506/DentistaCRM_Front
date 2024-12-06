import { Component } from '@angular/core';
import * as $ from 'jquery';
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

  ngOnInit() {
    $(document).ready(() => {
      console.log("jQuery is working!");
    });
  }


  openMobile(){

    $('#navbar-mobile').slideToggle(1000);
  }


}
