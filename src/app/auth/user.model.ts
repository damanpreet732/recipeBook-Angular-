export class User {
    constructor(
        public email : string ,
        public id : string ,
        private _token : string ,
        private _tokenExpiryDate : Date ,
    ) {} 


    get token () { // special getter method in js else we use function instead of get 
        if(!this._tokenExpiryDate || this._tokenExpiryDate > new Date()){
            return this._token ;
        }
    }

    
}