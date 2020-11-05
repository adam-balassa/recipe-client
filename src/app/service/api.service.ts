import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipeHeader } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<RecipeHeader[]> {
    return this.http.get<RecipeHeader[]>('/api/recipe');
  }

  filterRecipes(keywords: string[]): Observable<RecipeHeader[]> {
    const params = { keywords: keywords.join(',') };
    return this.http.get<RecipeHeader[]>('/api/recipe/filter', { params });
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`/api/recipe/${id}`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>('/api/recipe', recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`/api/recipe/${recipe.id}`, recipe);
  }
}
