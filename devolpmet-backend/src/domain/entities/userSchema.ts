import { UserAddress } from "./userAddress";
export class User {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly password: string | null,
        readonly blocked: boolean,
        readonly verified: boolean,
        readonly address?: UserAddress[],
        readonly phoneNumber?: string,
        readonly gender?: string,
        readonly profilePhotoUrl?: string
    ) {}

    public static newUser(
        name: string,
        email: string,
        password: string | null,
        blocked: boolean,
        verified: boolean,
        phoneNumber?: string,
        gender?: string,
        address?: UserAddress[],
        profilePhotoUrl?: string
    ) {
        return new User(
            name,
            email,
            password,
            blocked,
            verified,
            address,
            phoneNumber,
            gender,
            profilePhotoUrl
        );
    }
}
