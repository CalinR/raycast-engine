export default class Door {
    constructor({ tile = 0, opened = false, key = null } = {}){
        this.tile = tile;
        this.opened = opened;
        this.key = key;
        this.unlocked = key ? false : true;
    }

    type(){
        return 'door';
    }
}