import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../../configuration/settings';
import { FolderData } from '../model/FolderData';

@Injectable({
    providedIn: 'root'
})
export class FolderService {

    constructor(private readonly http: HttpClient) {}

    createFolder(name: string, companyId: number, folderId: number): Observable<FolderData> {
      return this.http.post<FolderData>(`${Settings.API_URL}/folder/create`, {
          name: name,
          companyId: companyId,
          folderId: folderId
      });
    }

    getFolderById(folderId: number): Observable<FolderData> {
    return this.http.get<FolderData>(`${Settings.API_URL}/folder/get/${folderId}`);
    }

    listCompanyFolders(companyId: number): Observable<FolderData[]> {
      console.log(companyId)
      return this.http.get<FolderData[]>(`${Settings.API_URL}/folder/list/${companyId}`);
    }

    listCompanyDeletedFolders(companyId: number): Observable<FolderData[]> {
      return this.http.get<FolderData[]>(`${Settings.API_URL}/folder/listDeleted/${companyId}`);
    }

    updateFolderName(folderId: number, newName: string): Observable<FolderData> {
    return this.http.put<FolderData>(`${Settings.API_URL}/folder/update/${folderId}`, {
      newName: newName
    });
    }

    moveFolder(folderId: number, newFolderId: number): Observable<FolderData> {
    return this.http.put<FolderData>(`${Settings.API_URL}/folder/move/${folderId}`, {
      newFolderId: newFolderId
    });
    }

    deleteFolder(folderId: number): Observable<void> {
        return this.http.delete<void>(`${Settings.API_URL}/folder/delete/${folderId}`);
    }
}
