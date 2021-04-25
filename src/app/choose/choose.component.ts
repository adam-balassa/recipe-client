import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeHeader } from '../model/model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  allRecipes: RecipeHeader[];
  recipe: RecipeHeader | null;
  constructor(private api: ApiService) { }

  category: string = 'MAIN';
  isVegetarian: boolean = false;

  ngOnInit(): void {
    this.api.getRecipes().subscribe(recipes => {
      this.recipe = null;
      this.allRecipes = recipes;
      this.generateRecipe();
    });
  }

  generateRecipe(): void {
    const recipes = this.allRecipes.filter(recipe =>
      recipe.category === this.category
      && recipe.isVegetarian === this.isVegetarian);

    if (recipes.length === 0) {
      this.recipe = null;
      return;
    }
    const index = Math.round((Math.random() * recipes.length - 0.5));
    this.recipe = recipes[index];
    setTimeout(() => window.scroll(0, document.body.scrollHeight), 10);
  }

  generateNewRecipe(): void {
    this.recipe = undefined;
    setTimeout(() => this.generateRecipe(), 1000);
  }

}
