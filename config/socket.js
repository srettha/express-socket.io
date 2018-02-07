'use strict';

module.exports = (server) => {
    const io = require('socket.io')(server);

    const project = io.of('/project');
    const personal = io.of('/personal');
    //#region personal connection
    personal.on('connection', (socket) => {
        socket.on('status', async (data) => {
            console.log(`retrived data from ${socket.id}`);
            // update status and log status changes
            project.to(data.projectId).emit('status', data)
        });
    });
    //#endregion

    //#region project connection
    project.on('connection', (socket) => {
        // join project's room
        socket.on('room', (roomId) => {
            socket.join(roomId)
            console.log(`${socket.id} conneceted to ${roomId}`);
        });

        // update status and log status changes in project's room
        socket.on('status', async (data) => {
            personal.emit('status', data)
        });
        // leave project's room after disconnected
        socket.on('disconnect', (roomId) => socket.leave(roomId));
    });
    //#endregion

};
