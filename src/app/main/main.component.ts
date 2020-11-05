import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { RecipeHeader } from '../model/model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  query: string;
  keywordString: string;
  recipes: RecipeHeader[];
  allRecipes: RecipeHeader[];
  interval: number | null = null;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.allRecipes = recipes;
    });
  }

  type(): void {
    if (this.interval === null) {
      this.interval = window.setInterval(() => {
        this.check();
      }, 600);
    }
  }

  check(): void {
    if (this.keywordString === this.query) {
      window.clearInterval(this.interval);
      this.interval = null;
      return;
    }
    console.log(this.query);
    
    this.keywordString = this.query;
    const keywords = this.keywordString.split(' ');
    if (this.keywordString.length > 0) {
      this.api.filterRecipes(keywords).subscribe(recipes => this.recipes = recipes);
    } else {
      this.recipes = this.allRecipes;
    }
  }

}
