import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../../configuration/settings';
import { UserData } from '../model/UserData';
import {TagData} from "../model/TagData";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) {
  }

  // Register a User
  registerUser(username: string, firstName: string, lastName: string, email: string, password: string): Observable<UserData> {
    const newUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    return this.http.post<UserData>(`${Settings.API_URL}/user/register`, newUser);
  }

  // Create a User by Admin
  createUser(username: string, firstName: string, lastName: string, email: string, password: string, userTypeId: number): Observable<UserData> {
    const newUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userTypeId: userTypeId
    };


    return this.http.post<UserData>(`${Settings.API_URL}/user/create`, newUser);
  }

  getUserById(userId: number): Observable<UserData> {
    return this.http.get<UserData>(`${Settings.API_URL}/user/get/${userId}`);
  }

  // List Users
  listUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${Settings.API_URL}/user/list`);
  }

  listEnabledUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${Settings.API_URL}/user/listEnabled`);
  }

  // Update a User
  updateUser(userId: number, newUsername: string, newFirstName: string, newLastName: string, newEmail: string, newPassword: string): Observable<UserData> {
    const updatedUser = {
      newUsername: newUsername,
      newFirstName: newFirstName,
      newLastName: newLastName,
      newEmail: newEmail,
      newPassword: newPassword
    };

    return this.http.put<UserData>(`${Settings.API_URL}/user/update/${userId}`, updatedUser);
  }

  // Delete a User
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${Settings.API_URL}/user/delete/${userId}`);
  }

}
