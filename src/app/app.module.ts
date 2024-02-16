import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
// import { StoreModule } from '@ngrx/store';
// import authReducer from './redux/store/reducers/authentication.reducers';
// import { EffectsModule } from '@ngrx/effects';
// import AuthenticationEffect from './redux/store/effects/authentication.effects';
// import { UserFormComponent } from './components/user-form/user-form.component';
import { HeaderComponent } from './components/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { firebaseConfig } from "../environments/enviroment";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { InputTextModule } from 'primeng/inputtext';
import { NgxMarqueeModule } from 'ngx-marquee';
import { HttpClientModule } from '@angular/common/http'
import { MessageService } from 'primeng/api';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    // UserFormComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    ToastModule,
    AppRoutingModule,
    InputTextModule,
    HttpClientModule,
  
    ButtonModule,
    BrowserAnimationsModule,
    NgxMarqueeModule,
    ReactiveFormsModule,
    CommonModule,
    MenubarModule,
    CardModule,
    // StoreModule.forRoot({authStore: authReducer}),
    // EffectsModule.forRoot(AuthenticationEffect),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
