import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe, RecipeHeader } from '../model/model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API = environment.api;
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<RecipeHeader[]> {
    return this.http.get<RecipeHeader[]>(`${this.API}/recipe`);
  }

  filterRecipes(keywords: string[]): Observable<RecipeHeader[]> {
    const params = { keywords: keywords.join(',') };
    return this.http.get<RecipeHeader[]>(`${this.API}/recipe/filter`, { params });
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API}/recipe/${id}`);
  }

  getSimilarRecipes(id: number): Observable<RecipeHeader[]> {
    return this.http.get<RecipeHeader[]>(`${this.API}/recipe/${id}/similar`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.API}/recipe`, recipe);
  }

  addSKRecipe(url: string): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.API}/recipe/streetkitchen`, {url});
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.API}/recipe/${recipe.id}`, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/recipe/${id}`);
  }
}
