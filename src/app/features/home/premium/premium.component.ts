import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '/Users/walkingtree/library-application/src/app/core/services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-premium',
  standalone: false,
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent {
  @ViewChild('premiumDialog') premiumDialog!: TemplateRef<any>;
  @ViewChild('gpayDialog') gpayDialog!: TemplateRef<any>;
  showPremiumSuccess = false;
  userEmail = '';

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  openPremiumDialog() {
    // Get the logged-in user's email from AuthService
    this.userEmail = this.authService.getUserEmail(); // Implement this in your AuthService
    this.dialog.open(this.premiumDialog);
  }

  showGPayBox() {
    this.dialog.closeAll();
    this.dialog.open(this.gpayDialog);
  }

  payWithGPay() {
    this.dialog.closeAll();
    this.showPremiumSuccess = true;
    setTimeout(() => this.showPremiumSuccess = false, 5000);
  }
}