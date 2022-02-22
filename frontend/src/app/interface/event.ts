interface MyEventTarget extends EventTarget {
    innerWidth: number
}

export interface MyEvent extends Event {
    target: MyEventTarget;
}


export interface UserCredential {
    email: string;
    password: string;
}


export interface UserDetails extends UserCredential {
    userName: string;
    confirmPassword: string;
}

export interface userAddress {
    name: string,
    phone: string,
    address: string,
    street: string,
    nagar: string,
    city: string,
    landMark: string
}





