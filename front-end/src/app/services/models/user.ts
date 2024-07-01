/* tslint:disable */
/* eslint-disable */
import { Role } from '../models/role';
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  employeeCode?: string;
  enabled?: boolean;
  firstName?: string;
  fullName?: string;
  id?: number;
  imageUrl?: string;
  jobTitle?: string;
  lastModifiedDate?: string;
  lastName?: string;
  locked?: boolean;
  name?: string;
  password?: string;
  roles?: Array<Role>;
  username?: string;
}
