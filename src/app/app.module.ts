import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateLobbyComponent } from './components/create-lobby/create-lobby.component';
import { DecodeComponent } from './components/decode/decode.component';
import { HomeComponent } from './components/home/home.component';
import { JoinLobbyComponent } from './components/join-lobby/join-lobby.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateLobbyComponent,
    DecodeComponent,
    HomeComponent,
    JoinLobbyComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'decode', component: DecodeComponent },
      { path: 'join', component: JoinLobbyComponent },
      { path: 'create', component: CreateLobbyComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
