// Scripts oficiais do Google para rodar em segundo plano
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  // ⚠️ ATENÇÃO: COPIE AS MESMAS CHAVES DO SEU src/lib/firebase.ts E COLE AQUI
  apiKey: "AIzaSyAuuwcq6yto-BpcUbkCT8bmaZ85-iYLMX0",
  authDomain: "ceti-cantina.firebaseapp.com",
  projectId: "ceti-cantina",
  storageBucket: "ceti-cantina.firebasestorage.app",
  messagingSenderId: "229997328292",
  appId: "1:229997328292:web:8337f08d19ec420d6ab331"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Configura o recebimento em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Notificação recebida em background:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png' // Seu ícone da cantina
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});