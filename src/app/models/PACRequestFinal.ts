import { PACRequest } from './PACRequest';

export class PACRequestFinal extends PACRequest {

    PACHRResponse: string;

    constructor() {
        super();
    }

    PrepareDTO(jsonObj: any): void {
        super.PrepareDTO(jsonObj);
    }
}
