import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Settings} from "../../configuration/settings";
import {DocumentData} from "../model/DocumentData";
import {FolderData} from "../model/FolderData";

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

  constructor(private readonly http: HttpClient) {}

  createDocument(name: string, description: string, folderId: number, file: File): Observable<DocumentData> {
      return this.http.post<DocumentData>(`${Settings.API_URL}/document/create`, {
          name: name,
          description: description,
          folderId: folderId,
          file: file
      });
  }

  getDocumentById(documentId: number): Observable<DocumentData> {
    return this.http.get<DocumentData>(`${Settings.API_URL}/document/get/${documentId}`);
  }

  listFolderDocuments(folderId: number): Observable<DocumentData[]> {
      return this.http.get<DocumentData[]>(`${Settings.API_URL}/document/list/${folderId}`);
  }

  listFolderDeletedDocuments(folderId: number): Observable<DocumentData[]> {
      return this.http.get<DocumentData[]>(`${Settings.API_URL}/document/listDeleted/${folderId}`);
  }

  updateDocument(documentId: number, newName: string, newDescription: string): Observable<DocumentData> {
    return this.http.put<DocumentData>(`${Settings.API_URL}/document/update/${documentId}`, {
      newName: newName,
      newDescription: newDescription
    });
  }

  moveDocument(documentId: number, newFolderId: number): Observable<DocumentData> {
    return this.http.put<DocumentData>(`${Settings.API_URL}/document/move/${documentId}`, {
      newFolderId: newFolderId
    });
  }
  deleteDocument(documentId: number): Observable<void> {
      return this.http.delete<void>(`${Settings.API_URL}/document/delete/${documentId}`);
  }
}
