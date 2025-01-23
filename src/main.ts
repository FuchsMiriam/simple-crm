import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideAnimations(), provideFirebaseApp(() => initializeApp({ projectId: "simple-crm-4180e", appId: "1:253740735379:web:9154bde3e4c292679de666", storageBucket: "simple-crm-4180e.firebasestorage.app", apiKey: "AIzaSyCqMNFL6EOBzB-WEiP4oWYmWn11kxFMK90", authDomain: "simple-crm-4180e.firebaseapp.com", messagingSenderId: "253740735379" })), provideFirestore(() => getFirestore()),
  ],
}).catch(err => console.error(err));
