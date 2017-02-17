let doorId = 0;

export default class Door {
    constructor({ tile = 0, opened = false, key = null, doorTimer = 5000 } = {}){
        this.tile = tile;
        this.id = doorId++;
        this.opened = opened;
        this.opening = false;
        this.closing = false;
        this.key = key;
        this.unlocked = key ? false : true;
        this.doorTimer = doorTimer;
        this.currentTimer = null;
        this.doorOpenSpeed = 1;
        this.doorOpenValue = 0;
        this.openTime = null;
    }

    update(){
        if(this.openTime && Date.now() > this.openTime + this.doorTimer + ((this.doorOpenSpeed * 1000) * 2)){
            this.opening = false;
            this.closing = false;
            this.closeDoor();
        }
        else if(this.openTime && Date.now() > this.openTime + this.doorTimer){
            this.opening = false;
            this.closing = true;
            this.opened = false;
        }
        if(this.opening){
            this.doorOpenValue += this.doorOpenSpeed * window.deltaTime;
            if(this.doorOpenValue > 1){
                this.opened = true;
                this.opening = false;
                this.doorOpenValue = 1;
                // this.startDoorTimer();
            }
        }
        if(this.closing){
            this.doorOpenValue -= this.doorOpenSpeed * window.deltaTime;
            if(this.doorOpenValue < 0){
                this.closeDoor();
            }
        }
    }

    closeDoor(){
        this.opened = false;
        this.closing = false;
        this.doorOpenValue = 0;
        this.openTime = null;
    }

    openDoor(){
        if(this.unlocked){
            this.opening = true;
            this.openTime = Date.now();
        }
    }

    type(){
        return 'door';
    }
}