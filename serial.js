'use strict';
/*global imuData: true
*/

var Device = require('Device');
var controller = new Device({ deviceType: 'controller', proxyUrl: '10.1.1.3', channel: 'Honestly Round Down Quark' }, require('WebClientConnection'));
var lasttime;
controller.connection.socket.on('connect', function() {
    controller.on('register', function() {
        console.log('<p>Registered on channel: ' + controller.channel + ' with UID: ' + controller.uid + '</p>');
        controller.ping(function(t) {
            console.log('pinged: ', t);
        });
        controller.on('status', function(status) {

            if (typeof status === 'object' && typeof status.compassRaw === 'object') {
                // mesh.rotation.x = status.compassRaw.x/180;
                // mesh.rotation.y = status.compassRaw.y/180;
                // if (status.accel.x === 'na') status.accel.x = 0;
                // if (status.accel.y === 'na') status.accel.y = 0;
                // if (status.accel.z === 'na') status.accel.z = 0;
                // status.accel.x = unshake(status.accel, 'x');
                // status.accel.y = unshake(status.accel, 'y');
                // status.accel.z = unshake(status.accel, 'z');

                // console.log(JSON.stringify(status));

                // Rotate the compass vector by the declination
                // var declinationRadians = 19.62 * Math.PI / 180;
                // console.log('BEFORE:', calcHeading(status.compassRaw.x, status.compassRaw.z, 0) * 180 / Math.PI, JSON.stringify(status.compassRaw))
                // var sinDecl = Math.sin(declinationRadians);
                // var cosDecl = Math.cos(declinationRadians);
                // var x = status.compassRaw.x;
                // var y = status.compassRaw.y;
                // status.compassRaw.x = x * cosDecl - y * sinDecl;
                // status.compassRaw.y = x * sinDecl - y * cosDecl;
                //
                // console.log('AFTER 1:', calcHeading(status.compassRaw.x, status.compassRaw.z, 0) * 180 / Math.PI, JSON.stringify(status.compassRaw))
                //
                // // Rotate the compass vector by the inclination
                // var inclinationRadians = 62.68 * Math.PI / 180;
                // var sinIncl = Math.sin(inclinationRadians);
                // var cosIncl = Math.cos(inclinationRadians);
                // x = status.compassRaw.x;
                // var z = status.compassRaw.z;
                // status.compassRaw.x = x * cosIncl + z * sinIncl;
                // status.compassRaw.z = -x * sinIncl + z * cosIncl;
                //
                // console.log('AFTER 2:', calcHeading(status.compassRaw.x, status.compassRaw.z, 0) * 180 / Math.PI, JSON.stringify(status.compassRaw))

                imuData = {
                    a: [status.accel.x, status.accel.y, status.accel.z],
                    g: [status.gyro.x * Math.PI / 180, status.gyro.y * Math.PI / 180, status.gyro.z * Math.PI / 180],
                    m: [status.compassRaw.x, status.compassRaw.y, status.compassRaw.z],
                    b: 0,
                    dt: lasttime ? ((status.time - lasttime) / 1000) : null
                };
                console.log(imuData.a[0], imuData.a[1], imuData.a[2]);
                lasttime = status.time;

            }

            // console.log('Controller: Toy said: ', status);
        });
        controller.on('error', function(err) {
            console.log('There was an error: ', err);
        });

    });
});

// function calcHeading(axis1, axis2, declination) {
//
//     var twoPies = 2 * Math.PI;
//     var heading = Math.atan2(axis2, axis1);
//     heading += declination;
//
//     if (heading < 0) {
//         heading += twoPies;
//     }
//     if (heading > twoPies) {
//         heading -= twoPies;
//     }
//
//     return heading;
// }
//
// function unshake(accel, axis) {
//     if (accel[axis] === 'shaken') {
//         if (lastVals[axis] < 0) {
//             return -100;
//         } else {
//             return 100;
//         }
//     }
//     lastVals[axis] = accel[axis];
//     return accel[axis];
// }

// var lastVals = {
//     x: 0,
//     y: 0,
//     z: 0
// };
