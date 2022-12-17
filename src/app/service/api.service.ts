import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recipe, RecipeHeader } from '../model/model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API = environment.api;
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<RecipeHeader[]> {
    return this.http.get<RecipeHeader[]>(`${this.API}/recipes`);
  }

  filterRecipes(keywords: string[]): Observable<RecipeHeader[]> {
    return this.getRecipes()
      .pipe(
        filter((value: RecipeHeader[], index: number) => keywords.some(keyword => value[index].name.includes(keyword)))
      );
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API}/recipes/${id}`);
  }

  getSimilarRecipes(id: string): Observable<RecipeHeader[]> {
    return this.http.get<RecipeHeader[]>(`${this.API}/recipes/${id}/similar`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.API}/recipes`, recipe);
  }

  uploadFile(image: File): Observable<{imageUrl: string}> {
    const formData: FormData = new FormData();
    formData.append('imageFile', image, image.name);
    return this.http.post<{imageUrl: string}>(`${this.API}/recipes/image`, formData);
  }

  addSKRecipe(url: string): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.API}/recipes/streetkitchen`, { url });
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.API}/recipes/${recipe.id}`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/recipes/${id}`);
  }
}
