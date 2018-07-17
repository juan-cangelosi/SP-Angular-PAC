export class User {
    ID: number;
    LoginName: string;
    IsAdmin: boolean;
    Email: string;
    UserID: number;

    constructor() {

    }

    PrepareDTO(jsonObj: any): void {
        if (jsonObj == null) { return; }
        if (jsonObj['ID'] != null) { this.ID = jsonObj['ID']; }
        if (jsonObj['LoginName'] != null) { this.LoginName = jsonObj['LoginName']; }
        if (jsonObj['IsSiteAdmin'] != null) { this.IsAdmin = jsonObj['IsSiteAdmin']; }
        if (jsonObj['Email'] != null) { this.Email = jsonObj['Email']; }
        if (jsonObj['UserId'] != null) { this.UserID = jsonObj['UserId']; }
    }
}
