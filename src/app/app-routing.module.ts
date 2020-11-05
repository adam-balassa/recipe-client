import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChooseComponent } from './choose/choose.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { MainComponent } from './main/main.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'edit/:id', component: EditRecipeComponent },
  { path: 'new', component: EditRecipeComponent },
  { path: 'choose', component: ChooseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
