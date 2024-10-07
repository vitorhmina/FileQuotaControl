import {Component} from '@angular/core';
import {CompanyService} from '../../services/Company.service';
import {first, noop} from 'rxjs';
import {CompanyData} from '../../model/CompanyData';
import {Router} from '@angular/router';

@Component({
  selector: 'fqc-register-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.less']
})
export class CreateCompanyComponent {
  title: string;
  quota: string;
  constructor(private readonly companyService: CompanyService, private readonly router: Router) {
  }

  onButtonClick(): void {
    // Check if title is blank or null before making the service call
    if (!this.title || this.title.trim() === '' || !this.quota ) {
      // Show an error message to the user, indicating that title cannot be blank
      alert('Input cannot be blank');
    } else {
      // If title is not blank, make the service call
      this.companyService.registerCompanyByAdmin(this.title, this.quota).pipe(first()).subscribe((result: CompanyData) => {
        if (result) {
          this.router.navigate(['app', 'api-index']).then(() => noop());
        }
      });
    }
  }
}
