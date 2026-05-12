importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyDQdKmqSweFlfj9zqVBCkenWN9DpVmgh0M',
    authDomain: 'my-project-d2b4a.firebaseapp.com',
    databaseURL: 'https://my-project-d2b4a-default-rtdb.firebaseio.com',
    projectId: 'my-project-d2b4a',
    storageBucket: 'my-project-d2b4a.firebasestorage.app',
    messagingSenderId: '866146581681',
    appId: '1:866146581681:web:794985c5fba391bfca7690',
    measurementId: 'G-049R82PFYH',
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

    console.log('Background Message:', payload);

    const notificationTitle =
        payload.notification?.title || 'Khyber Foods';

    const notificationOptions = {

        body: payload.notification?.body,

        icon: '/icons/icon-192x192.png',

        data: {
            url: payload.data?.url || '/'
        }

    };

    self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );

});


// CLICK EVENT
self.addEventListener('notificationclick', (event) => {

    event.notification.close();

    const urlToOpen =
        event.notification.data?.url || '/';

    event.waitUntil(

        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {

            // APP ALREADY OPEN
for (const client of clientList) {

    // SAME TAB APP OPEN
    if (client.url.includes(self.location.origin) && 'focus' in client) {

        client.focus();

        client.postMessage({
            type: 'OPEN_URL',
            url: urlToOpen
        });

        return;
    }
}

            // OPEN NEW TAB
            return clients.openWindow(urlToOpen);
        })
    );
});