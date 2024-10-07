import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';

@Component({
  selector: 'app-update-folder',
  templateUrl: './move-folder.component.html',
  styleUrls: ['./move-folder.component.less']
})
export class MoveFolderComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedFolderId: number;
  selectedNewFolderId: number;
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

    const folderIdNumber: number = +this.selectedFolderId;
    const newFolderIdNumber: number = +this.selectedNewFolderId;

      // Call the FolderService to update the folder
      this.folderService.moveFolder(folderIdNumber, newFolderIdNumber)
        .pipe(first())
        .subscribe((result: FolderData) => {
          if (result) {
            // Folder update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
}

