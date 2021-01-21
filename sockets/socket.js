const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Breaking Benjamin' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Héroes del Silencio' ) );
bands.addBand( new Band( 'Metallica' ) );

//console.log(bands);
// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');


    //
    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        //console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });

    client.on('vote-band',( payload )=>{
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band',( payload )=>{
        //console.log(payload);
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band',( payload )=>{
        //console.log(payload);
        //const newBand = new Band(payload.name);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    //


    //client.on('emitir-mensaje', ( payload ) => {
    //    //console.log('nuevo-mensaje', payload);
//
    //   // io.emit('nuevo-mensaje', payload ); //emite los mensaje a todos
    //   client.broadcast.emit('nuevo-mensaje', payload ); //se le emite el mensaje a todos menos al que lo envio
    //});


});
