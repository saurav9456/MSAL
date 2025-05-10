import { Component, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { TableComponent } from "./table/table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private msalService = inject(MsalService);
  isLoggedIn = false;
  username: string | undefined;

  //This should be in ngonit, but we are using standalone components
  constructor() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.isLoggedIn = true;
      this.username = accounts[0].username;
    }
  }

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }
}
