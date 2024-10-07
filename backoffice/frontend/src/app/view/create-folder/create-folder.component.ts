import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.less']
})
export class CreateFolderComponent {
    name: string;
    selectedCompanyId: number;
    companyList: CompanyData[] = [];
    folderId: number;
    folderList: FolderData[] = [];

  constructor(
      private readonly folderService: FolderService,
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

    onCompanyChange() {
        // Check if a company is selected
        if (this.selectedCompanyId) {
            this.folderService
                .listCompanyFolders(this.selectedCompanyId)
                .pipe(first())
                .subscribe((result: FolderData[]) => {
                    this.folderList = result;
                });
        } else {
            // Clear the tag list if no company is selected
            this.folderList = [];
        }
    }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

      const companyIdNumber: number = +this.selectedCompanyId;
      const folderIdNumber: number = +this.folderId;

    if (!this.name ) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
        name: this.name;
        companyId: companyIdNumber;
        folderId: folderIdNumber;

      this.folderService
          .createFolder(this.name, companyIdNumber, folderIdNumber)
          .pipe(first())
          .subscribe((result: FolderData) => {
            if (result) {
              // Tag creation was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
            }
          });
    }
  }
}

