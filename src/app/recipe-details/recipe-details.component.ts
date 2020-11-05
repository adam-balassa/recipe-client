import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../model/model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  constructor(private api: ApiService, private link: ActivatedRoute) { }

  ngOnInit(): void {
    this.link.params.subscribe(params => {
      const id = params.id;
      this.api.getRecipe(id).subscribe(recipe => this.recipe = recipe);
    });
  }

  decreaseQuantity() {

  }

  increaseQuantity() {

  }

}
