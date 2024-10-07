import { Component } from '@angular/core';
import { DocumentService } from '../../services/Document.service';
import {first, interval, noop} from 'rxjs';
import { LinkableData } from '../../model/LinkableData';
import { CompanyData } from '../../model/CompanyData';
import { FolderData } from '../../model/FolderData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { FolderService } from '../../services/Folder.service';
import {LinkableService} from "../../services/Linkable.service";

@Component({
  selector: 'app-generate-folder-link',
  templateUrl: './generate-folder-link.component.html',
  styleUrls: ['./generate-folder-link.component.less']
})
export class GenerateFolderLinkComponent {
  interval: number;
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  folderId: number;
  folderList: FolderData[] = [];


  constructor(
      private readonly linkableService: LinkableService,
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
    const interval: number = +this.interval;
    const folderIdNumber: number = +this.folderId;

    if (!this.interval ) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      interval: this.interval;
      folderId: folderIdNumber;

      this.linkableService
          .generateFolderLink(interval, folderIdNumber)
          .pipe(first())
          .subscribe((result: LinkableData) => {
            if (result) {
              // Document creation was successful; navigate to a success page or home page
              this.router.navigate(['app', 'api-index']).then(() => noop());
            }
          });
    }
  }
}

