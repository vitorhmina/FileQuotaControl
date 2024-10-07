import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import { Settings } from '../../configuration/settings';
import { LinkableData } from '../model/LinkableData';
@Injectable({
    providedIn: 'root'
})
export class LinkableService {
  constructor(private readonly http: HttpClient) {}

  generateDocumentLink(interval: number, documentId: number): Observable<LinkableData> {
      return this.http.post<LinkableData>(`${Settings.API_URL}/linkable/documentLink`, {
          interval: interval,
          documentId: documentId
      });
  }

  generateFolderLink(interval: number, folderId: number): Observable<LinkableData> {
      return this.http.post<LinkableData>(`${Settings.API_URL}/linkable/folderLink`, {
          interval: interval,
          folderId: folderId
      });
  }

  listFolderLinks(folderId: number): Observable<LinkableData[]> {
    return this.http.get<LinkableData[]>(`${Settings.API_URL}/linkable/list/${folderId}`);
  }

  listDocumentLinks(documentId: number): Observable<LinkableData[]> {
    return this.http.get<LinkableData[]>(`${Settings.API_URL}/linkable/list/${documentId}`);
  }

  // New method for downloading linkables
  downloadLinkable(publicLink: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/zip',
    });

    // Set the responseType to 'blob' to handle binary data (e.g., ZIP files)
    return this.http.get(`${Settings.API_URL}/linkable/download/${publicLink}`, {
      headers: headers,
      responseType: 'blob',
    }).pipe(
      tap((blob: Blob) => {
        console.log('Received blob:', blob);
      }),
      catchError(error => {
        console.error('Error during download:', error);
        throw error;
      })
    );
  }
}
