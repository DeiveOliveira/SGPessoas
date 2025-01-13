import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // Não será necessário aqui, pois já estamos usando o standalone

@NgModule({
  imports: [BrowserModule],  // O AppModule precisa apenas do BrowserModule
})
export class AppModule {}
