import { PACRequest } from './PACRequest';

export class PACRequestFinal extends PACRequest {

    PACHRResponse: string;

    constructor() {
        super();
    }

    PrepareDTO(jsonObj: any): void {
        super.PrepareDTO(jsonObj);
        if (jsonObj['PACRequestReason'] != null) { this.PACReason = jsonObj['PACRequestReason']; }
        if (jsonObj['PACResponseReason'] != null) { this.PACResponse = jsonObj['PACResponseReason']; }
        if (jsonObj['PACRequesterId'] != null) { this.AuthorId = jsonObj['PACRequesterId']; }
        if (jsonObj['PACResponse'] != null) { this.PACRequestStatus = jsonObj['PACResponse']; }
    }
}
