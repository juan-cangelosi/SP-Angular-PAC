import { Injectable } from '@angular/core';
import { UserListService } from '../sp-services/user-list.service';
import { User } from '../models/User';

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
