import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { UserListService } from '../shared/sp-services/user-list.service';

@Injectable({
  providedIn: 'root'
})
export class RequestViewService {

  constructor(private userListService: UserListService) {

   }

   public async getUser(id: number): Promise<User> {
     const user = await this.userListService.getUser(id);
     return user;
   }
}
