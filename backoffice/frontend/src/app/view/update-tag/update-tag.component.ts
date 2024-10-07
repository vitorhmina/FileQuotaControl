import { Component } from '@angular/core';
import { FolderService } from '../../services/Folder.service';
import { first, noop } from 'rxjs';
import { FolderData } from '../../model/FolderData';
import { CompanyData } from '../../model/CompanyData';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/Company.service';
import {DocumentData} from "../../model/DocumentData";
import {DocumentService} from "../../services/Document.service";
import {TagData} from "../../model/TagData";
import {TagService} from "../../services/Tag.service";

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.less']
})
export class UpdateTagComponent {
  label: string;
  color: string;
  selectedCompanyId: number;
  companyList: CompanyData[] = [];
  selectedTagId: number;
  tagList: TagData[] = [];

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

    onCompanyChange() {
        // Check if a company is selected
        if (this.selectedCompanyId) {
            this.tagService
                .listCompanyTags(this.selectedCompanyId)
                .pipe(first())
                .subscribe((result: TagData[]) => {
                    this.tagList = result;
                });
        } else {
            // Clear the tag list if no company is selected
            this.tagList = [];
        }
    }

  onTagSelect() {
    // Check if a folder is selected
    if (this.selectedTagId) {
      // Call the FolderService to retrieve folder details by ID
      this.tagService.getTagById(this.selectedTagId)
        .pipe(first())
        .subscribe((selectedTag: TagData) => {
          // Populate the input field with the selected document's name
          this.label = selectedTag ? selectedTag.label : '';
          this.color = selectedTag ? selectedTag.color : '';
        });
    } else {
      // Clear the input field if no document is selected
      this.label = '';
      this.color = '';
    }
  }

  onButtonClick(): void {
    // Check if any of the fields are blank or null

    const tagIdNumber: number = +this.selectedTagId;

    if (!this.label || !this.color) {
      // Show an error message to the user, indicating that all fields must be filled
      alert('All fields must be filled');
    } else {
      // Call the TagService to update the folder
      this.tagService.updateTag(tagIdNumber, this.label, this.color)
        .pipe(first())
        .subscribe((result: TagData) => {
          if (result) {
            // Document update was successful; navigate to a success page or home page
            this.router.navigate(['app', 'api-index']).then(() => noop());
          }
        });
    }
  }
}

