import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnviromentSelectComponent } from './components/enviroment-select/enviroment-select.component';
import { ContentViewNavigationComponent } from './components/content-view-navigation/content-view-navigation.component';
import { ContentViewComponent } from './components/content-view/content-view.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentViewPaginationComponent } from './components/content-view-pagination/content-view-pagination.component';
import { ContentViewTableComponent } from './components/content-view-table/content-view-table.component';
import { HttpClientModule } from '@angular/common/http';
import { EmptyViewComponent } from './components/empty-view/empty-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EnviromentSelectComponent,
    ContentViewNavigationComponent,
    ContentViewComponent,
    HeaderComponent,
    ContentViewPaginationComponent,
    ContentViewTableComponent,
    EmptyViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
