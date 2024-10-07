import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Settings} from '../../configuration/settings';
import {CompanyData} from '../model/CompanyData';
import {TagData} from "../model/TagData";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private readonly http: HttpClient) {
  }

  // ...
  registerCompany(title: string): Observable<CompanyData> {
    return this.http.post<CompanyData>(`${Settings.API_URL}/company/register`, {title: title});
  }

  registerCompanyByAdmin(title: string, quota: string): Observable<CompanyData> {
    return this.http.post<CompanyData>(`${Settings.API_URL}/company/create`, {title: title, quota: quota});
  }

  getCompanyById(companyId: number): Observable<CompanyData> {
    return this.http.get<CompanyData>(`${Settings.API_URL}/company/get/${companyId}`);
  }

  listCompanies(): Observable<CompanyData[]> {
    return this.http.get<CompanyData[]>(`${Settings.API_URL}/company/listAll`);
  }

  listOwnedCompanies(): Observable<CompanyData[]> {
    return this.http.get<CompanyData[]>(`${Settings.API_URL}/company/listOwned`);
  }

  listUserEnrolledCompanies(): Observable<CompanyData[]> {
    return this.http.get<CompanyData[]>(`${Settings.API_URL}/company/list`);
  }

  // Update a Company
  updateCompany(companyId: number, newTitle: string, newQuota: string): Observable<CompanyData> {
    const updatedCompany = {
      newTitle: newTitle,
      newQuota: newQuota
    };

    return this.http.put<CompanyData>(`${Settings.API_URL}/company/update/${companyId}`, updatedCompany);
  }

  // Delete a Company
  deleteCompany(companyId: number): Observable<void> {
    return this.http.delete<void>(`${Settings.API_URL}/company/delete/${companyId}`);
  }

}
