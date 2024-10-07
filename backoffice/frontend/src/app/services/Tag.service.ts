import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../../configuration/settings';
import { TagData } from '../model/TagData';
import {DocumentData} from "../model/DocumentData";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private readonly http: HttpClient) {}
  createTag(label: string, color: string, companyId: number): Observable<TagData> {
    return this.http.post<TagData>(`${Settings.API_URL}/tag/create`, {
      label: label,
      color: color,
      companyId: companyId
    });
  }
  getTagById(tagId: number): Observable<TagData> {
    return this.http.get<TagData>(`${Settings.API_URL}/tag/get/${tagId}`);
  }

  listTags(): Observable<TagData[]> {
    return this.http.get<TagData[]>(`${Settings.API_URL}/tag/listAll`);
  }

  listCompanyTags(companyId: number): Observable<TagData[]> {
    return this.http.get<TagData[]>(`${Settings.API_URL}/tag/list/${companyId}`);
  }

  listFolderTags(folderId: number): Observable<TagData[]> {
    return this.http.get<TagData[]>(`${Settings.API_URL}/tag/listFolderTags/${folderId}`);
  }

  listDocumentTags(documentId: number): Observable<TagData[]> {
    return this.http.get<TagData[]>(`${Settings.API_URL}/tag/listDocumentTags/${documentId}`);
  }
  updateTag(tagId: number, label: string, color: string): Observable<TagData> {
    return this.http.put<TagData>(`${Settings.API_URL}/tag/update/${tagId}`, {
      label: label,
      color: color
    });
  }
  deleteTag(tagId: number): Observable<void> {
      return this.http.delete<void>(`${Settings.API_URL}/tag/delete/${tagId}`);
  }
}
