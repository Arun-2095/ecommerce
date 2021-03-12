interface MyEventTarget extends EventTarget { 
    innerWidth: number 
} 

export interface MyEvent extends Event { 
    target: MyEventTarget; 
} 