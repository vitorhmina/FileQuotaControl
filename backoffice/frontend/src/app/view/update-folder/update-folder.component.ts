import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';

@Component({
  selector: 'app-update-folder',
  templateUrl: './update-folder.component.html',
  styleUrls: ['./update-folder.component.less']
})
export class UpdateFolderComponent {
    name: string;
    selectedCompanyId: number;
    companyList: CompanyData[] = [];
    selectedFolderId: number;
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

  onFolderSelect() {
    // Check if a folder is selected
    if (this.selectedFolderId) {
      // Call the FolderService to retrieve folder details by ID
      this.folderService.getFolderById(this.selectedFolderId)
        .pipe(first())
        .subscribe((selectedFolder: FolderData) => {
          // Populate the input field with the selected folder's name
          this.name = selectedFolder ? selectedFolder.name : '';
        });
    } else {
      // Clear the input field if no folder is selected
      this.name = '';
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const companyIdNumber: number = +this.selectedCompanyId;
    const folderIdNumber: number = +this.selectedFolderId;

    if (!this.name) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      // Call the FolderService to update the folder
      this.folderService.updateFolderName(folderIdNumber, this.name)
        .pipe(first())
        .subscribe((result: FolderData) => {
          if (result) {
            // Folder update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
  }
}

