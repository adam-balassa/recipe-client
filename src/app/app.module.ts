import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { CategoryPipe } from './pipe/category.pipe';
import { LoadingComponent } from './loading/loading.component';
import { ChooseComponent } from './choose/choose.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailsComponent,
    MainComponent,
    HeaderComponent,
    EditRecipeComponent,
    CategoryPipe,
    LoadingComponent,
    ChooseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    TextareaAutosizeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
