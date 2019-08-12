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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BtagComponent } from './components/home/btag/btag.component';
import { CreateFormComponent } from './components/create-lobby/create-form/create-form.component';
import { PicksComponent } from './components/join-lobby/picks/picks.component';
import { BansComponent } from './components/join-lobby/bans/bans.component';
import { SummaryComponent } from './components/join-lobby/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateLobbyComponent,
    DecodeComponent,
    HomeComponent,
    JoinLobbyComponent,
    NavMenuComponent,
    BtagComponent,
    CreateFormComponent,
    PicksComponent,
    BansComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'decode', component: DecodeComponent },
      { path: 'join', component: JoinLobbyComponent},
      { path: 'join/:id', component: PicksComponent},
      { path: 'create', component: CreateLobbyComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
