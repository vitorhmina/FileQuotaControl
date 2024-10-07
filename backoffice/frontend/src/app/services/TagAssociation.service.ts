import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../../configuration/settings';
import { TagAssociationData } from '../model/TagAssociationData';
import {TagData} from "../model/TagData";
@Injectable({
  providedIn: 'root'
})
export class TagAssociationService {
  constructor(private readonly http: HttpClient) {}

  assignFolderTag(tagId: number, folderId: number): Observable<TagAssociationData> {
    return this.http.post<TagAssociationData>(`${Settings.API_URL}/tagAssociation/assignFolderTag`, {
      tagId: tagId,
      folderId: folderId
    });
  }

  assignDocumentTag(tagId: number, documentId: number): Observable<TagAssociationData> {
    return this.http.post<TagAssociationData>(`${Settings.API_URL}/tagAssociation/assignDocumentTag`, {
      tagId: tagId,
          documentId: documentId
    });
  }

  unassignTagFromFolder(tagId: number, folderId: number): Observable<void> {
    return this.http.delete<void>(`${Settings.API_URL}/tagAssociation/unassignFolderTag`, {
      body: { tagId, folderId }
    });
  }

  unassignTagFromDocument(tagId: number, documentId: number): Observable<void> {
    return this.http.delete<void>(`${Settings.API_URL}/tagAssociation/unassignDocumentTag`, {
      body: { tagId, documentId }
    });
  }
}
