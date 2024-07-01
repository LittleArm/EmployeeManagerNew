/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteEmployee } from '../fn/employee-management/delete-employee';
import { DeleteEmployee$Params } from '../fn/employee-management/delete-employee';
import { getAllEmployees } from '../fn/employee-management/get-all-employees';
import { GetAllEmployees$Params } from '../fn/employee-management/get-all-employees';
import { getEmployeeByEmail } from '../fn/employee-management/get-employee-by-email';
import { GetEmployeeByEmail$Params } from '../fn/employee-management/get-employee-by-email';
import { updateEmployee } from '../fn/employee-management/update-employee';
import { UpdateEmployee$Params } from '../fn/employee-management/update-employee';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class EmployeeManagementService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateEmployee()` */
  static readonly UpdateEmployeePath = '/employee/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateEmployee()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEmployee$Response(params: UpdateEmployee$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateEmployee(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateEmployee$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEmployee(params: UpdateEmployee$Params, context?: HttpContext): Observable<User> {
    return this.updateEmployee$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getEmployeeByEmail()` */
  static readonly GetEmployeeByEmailPath = '/employee/find/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEmployeeByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEmployeeByEmail$Response(params: GetEmployeeByEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getEmployeeByEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEmployeeByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEmployeeByEmail(params: GetEmployeeByEmail$Params, context?: HttpContext): Observable<User> {
    return this.getEmployeeByEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllEmployees()` */
  static readonly GetAllEmployeesPath = '/employee/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEmployees()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEmployees$Response(params?: GetAllEmployees$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllEmployees(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllEmployees$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEmployees(params?: GetAllEmployees$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllEmployees$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `deleteEmployee()` */
  static readonly DeleteEmployeePath = '/employee/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEmployee()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEmployee$Response(params: DeleteEmployee$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteEmployee(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteEmployee$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEmployee(params: DeleteEmployee$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteEmployee$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
