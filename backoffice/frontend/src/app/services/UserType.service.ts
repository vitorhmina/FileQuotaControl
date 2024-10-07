import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Settings} from '../../configuration/settings';
import {UserTypeData} from '../model/UserTypeData';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  constructor(private readonly http: HttpClient) {
  }

  createUserType(userType: string): Observable<UserTypeData> {
    return this.http.post<UserTypeData>(`${Settings.API_URL}/userType/create`, {userType: userType});
  }

  getUserTypeById(userTypeId: number): Observable<UserTypeData> {
    return this.http.get<UserTypeData>(`${Settings.API_URL}/userType/get/${userTypeId}`);
  }
  listUserTypes(): Observable<UserTypeData[]> {
    return this.http.get<UserTypeData[]>(`${Settings.API_URL}/userType/list`);
  }

  updateUserType(userTypeId: number, newUserType: string): Observable<UserTypeData> {
    return this.http.put<UserTypeData>(`${Settings.API_URL}/userType/update/${userTypeId}`, {
      newUserType: newUserType
    });
  }

  deleteUserType(userTypeId: number): Observable<void[]> {
    return this.http.delete<void[]>(`${Settings.API_URL}/userType/delete/${userTypeId}`);
  }
}
