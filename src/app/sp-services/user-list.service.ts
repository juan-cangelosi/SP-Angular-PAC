import { Injectable } from '@angular/core';
import { sp } from '@pnp/sp';
import { User } from '../DTOs/User';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor() { }

  public async getCurrentUser(): Promise<User> {
    const currentUser = await sp.web.currentUser.usingCaching().get();
    const user: User = new User();
    user.PrepareDTO(currentUser);
    return user;
  }

  public async isUserManager(id): Promise<boolean> {
    let isManager = true;
    const userExistingInGroup = await sp.web.siteGroups.getByName('PACManager').users.getById(id).get();
    if (!userExistingInGroup) {
      isManager = false;
    }
    return isManager;
  }
}
