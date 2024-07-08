/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface UpdatePassword$Params {
  oldPassword: string;
  newPassword: string;
      body: User
}

export function updatePassword(http: HttpClient, rootUrl: string, params: UpdatePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, updatePassword.PATH, 'put');
  if (params) {
    rb.query('oldPassword', params.oldPassword, {});
    rb.query('newPassword', params.newPassword, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

updatePassword.PATH = '/employee/updatePassword';
