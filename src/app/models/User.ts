export class User {
    Id: number;
    LoginName: string;
    IsAdmin: boolean;
    Email: string;
    UserID: number;
    Name: string;

    constructor() {

    }

    PrepareDTO(jsonObj: any): void {
        if (jsonObj == null) { return; }
        if (jsonObj['Id'] != null) { this.Id = jsonObj['Id']; }
        if (jsonObj['LoginName'] != null) { this.LoginName = jsonObj['LoginName']; }
        if (jsonObj['IsSiteAdmin'] != null) { this.IsAdmin = jsonObj['IsSiteAdmin']; }
        if (jsonObj['Email'] != null) { this.Email = jsonObj['Email']; }
        if (jsonObj['UserId'] != null) { this.UserID = jsonObj['UserId']; }
        if (jsonObj['Title'] != null) { this.Name = jsonObj['Title']; }
    }
}
