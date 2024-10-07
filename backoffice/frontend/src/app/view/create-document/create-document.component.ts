import { Component } from '@angular/core';
import { DocumentService } from '../../services/Document.service';
import { first, noop } from 'rxjs';
import { DocumentData } from '../../model/DocumentData';
import { CompanyData } from '../../model/CompanyData';
import { FolderData } from '../../model/FolderData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { FolderService } from '../../services/Folder.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.less']
})
export class CreateDocumentComponent {
  name: string;
  description: string;
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  folderId: number;
  folderList: FolderData[] = [];
  file: File;


  constructor(
      private readonly documentService: DocumentService,
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

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.file = inputElement.files.item(0);
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

    const folderIdNumber: number = +this.folderId;

    if (!this.name || !this.description ) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      name: this.name;
        description: this.description;
        folderId: folderIdNumber;

      this.documentService
          .createDocument(this.name, this.description, folderIdNumber, this.file)
          .pipe(first())
          .subscribe((result: DocumentData) => {
            if (result) {
              // Document creation was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
            }
          });
    }
  }
}

