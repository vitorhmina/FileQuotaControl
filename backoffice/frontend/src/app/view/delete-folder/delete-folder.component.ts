import { Component } from '@angular/core';
import {first, noop} from 'rxjs';
import { CompanyData } from '../../model/CompanyData';
import { FolderData } from '../../model/FolderData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { FolderService } from '../../services/Folder.service';
import { DocumentService } from '../../services/Document.service';

@Component({
    selector: 'fqc-delete-document',
    templateUrl: './delete-folder.component.html',
    styleUrls: ['./delete-folder.component.less']
})
export class DeleteFolderComponent {
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedFolderId: number;
  folderList: FolderData[] = [];

  constructor(
      private readonly folderService: FolderService,
      private readonly documentService: DocumentService,
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

    folderId: folderIdNumber;

      this.folderService
          .deleteFolder(folderIdNumber)
          .pipe(first())
          .subscribe(() => {
              // Document deletion was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
          });
  }
}

