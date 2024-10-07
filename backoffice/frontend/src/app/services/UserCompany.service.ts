import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../../configuration/settings';
import { UserCompanyData } from '../model/UserCompanyData';
import {TagData} from "../model/TagData";

@Injectable({
  providedIn: 'root'
})
export class UserCompanyService {
  constructor(private readonly http: HttpClient) {}

  createUserCompany(role: string, userId: number, companyId: number): Observable<UserCompanyData> {
    return this.http.post<UserCompanyData>(`${Settings.API_URL}/userCompany/create`, {
      role: role,
      userId: userId,
      companyId: companyId
    });
  }

  getUserCompanyById(userCompanyId: number): Observable<UserCompanyData> {
    return this.http.get<UserCompanyData>(`${Settings.API_URL}/userCompany/get/${userCompanyId}`);
  }

  listUsersInCompany(companyId: number): Observable<UserCompanyData[]> {
    return this.http.get<UserCompanyData[]>(`${Settings.API_URL}/userCompany/list/${companyId}`);
  }

  listUserRoles(): Observable<UserCompanyData[]> {
    return this.http.get<UserCompanyData[]>(`${Settings.API_URL}/userCompany/listUserRoles`);
  }

  updateUserCompany(userCompanyId: number, newRole: string): Observable<UserCompanyData> {
    return this.http.put<UserCompanyData>(`${Settings.API_URL}/userCompany/update/${userCompanyId}`, {
      newRole: newRole
    });
  }

  deleteUserCompany(userCompanyId: number): Observable<void> {
    return this.http.delete<void>(`${Settings.API_URL}/userCompany/delete/${userCompanyId}`);
  }
}
