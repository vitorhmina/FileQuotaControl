import { Component } from '@angular/core';
import { TagService } from '../../services/Tag.service';
import { first, noop } from 'rxjs';
import { TagData } from '../../model/TagData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.less']
})
export class CreateTagComponent {
  label: string;
  color: string;
  companyId: number;
  companyList: CompanyData[] = [];

  constructor(
      private readonly tagService: TagService,
      private readonly router: Router,
      private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyService
        .listUserEnrolledCompanies()
        .pipe(first())
        .subscribe((result: CompanyData[]) => {
          this.companyList = result;
        });
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const companyIdNumber: number = +this.companyId;

    if (!this.label || !this.color ) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
        label: this.label;
        color: this.color;
        companyId: companyIdNumber;

      this.tagService
          .createTag(this.label, this.color, companyIdNumber)
          .pipe(first())
          .subscribe((result: TagData) => {
            if (result) {
              // Tag creation was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
            }
          });
    }
  }
}

