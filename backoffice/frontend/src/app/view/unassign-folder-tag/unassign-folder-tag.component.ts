import { Component } from '@angular/core';
import { TagService } from '../../services/Tag.service';
import {first, interval, noop} from 'rxjs';
import { TagAssociationData } from '../../model/TagAssociationData';
import { CompanyData } from '../../model/CompanyData';
import { FolderData } from '../../model/FolderData';
import { DocumentData } from '../../model/DocumentData';
import { TagData } from '../../model/TagData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import { FolderService } from '../../services/Folder.service';
import { DocumentService } from '../../services/Document.service';
import {TagAssociationService} from "../../services/TagAssociation.service";

@Component({
  selector: 'app-unassign-document-tag',
  templateUrl: './unassign-folder-tag.component.html',
  styleUrls: ['./unassign-folder-tag.component.less']
})
export class UnassignFolderTagComponent {
    selectedCompanyId: number;
    companyList: CompanyData[] = [];
    selectedFolderId: number;
    folderList: FolderData[] = [];
    selectedTagId: number;
    tagList: TagData[] = [];


    constructor(
        private readonly tagAssociationService: TagAssociationService,
        private readonly tagService: TagService,
        private readonly folderService: FolderService,
        private readonly router: Router,
        private companyService: CompanyService
    ) {
    }

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

    onFolderChange() {
        // Check if a company is selected
        if (this.selectedFolderId) {
            this.tagService
                .listFolderTags(this.selectedFolderId)
                .pipe(first())
                .subscribe((result: TagData[]) => {
                    this.tagList = result;
                });
        } else {
            // Clear the tag list if no company is selected
            this.tagList = [];
        }
    }

    onButtonClick(): void {
        // Check if any of the fields are blank or null
        const tagIdNumber: number = +this.selectedTagId;
        const folderIdNumber: number = +this.selectedFolderId;

        // Call the service method to unassign the tag from the folder
        this.tagAssociationService
            .unassignTagFromFolder(tagIdNumber, folderIdNumber)
            .pipe(first())
            .subscribe(() => {
                // Navigate to a success page or home page after successful deletion
                this.router.navigate(['app', 'api-index']).then(() => noop());
            });
    }
}

