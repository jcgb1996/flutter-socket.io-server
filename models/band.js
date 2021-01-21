const { v4: uuidV4 } = require('uuid');

class Band {

    constructor( name = 'no-name' ) {
        //console.log(uuidV4());
        this.id = uuidV4(); // identificador único
        this.name  = name;
        this.votes = 0;
    }

}


module.exports = Band;