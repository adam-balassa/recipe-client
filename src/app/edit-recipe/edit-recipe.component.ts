import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient, Recipe } from '../model/model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  loading = false;

  @ViewChild('formElement') formElement: ElementRef<HTMLFormElement>;
  form: FormGroup;
  isNew = false;
  id: number | null = null;
  quantity = 1;
  constructor(private api: ApiService, private link: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.link.snapshot.url[0].path.includes('new')) {
      this.isNew = true;
      this.initForm({
        name: '',
        imageUrl: '',
        instructions: [''],
        ingredientGroups: [ {
          name: 'Hozzávalók',
          ingredients: []
        } ],
        quantity: this.quantity,
        category: 'MAIN'
      });
    }
    else {
      this.loading = true;
      this.id = parseInt(this.link.snapshot.paramMap.get('id'), 10);
      this.api.getRecipe(this.id).subscribe(recipe => {
        this.loading = false;
        this.quantity = recipe.quantity;
        this.initForm(recipe);
      });
    }
  }

  initForm(recipe: Recipe): void {
    this.form = new FormGroup({
      name: new FormControl(recipe.name),
      imageUrl: new FormControl(recipe.imageUrl),
      category: new FormControl(recipe.category),
      ingredientGroups: new FormArray(recipe.ingredientGroups.map<FormGroup>(group => new FormGroup({
        name: new FormControl(group.name || 'Hozzávalók'),
        ingredients: new FormArray(group.ingredients.map<FormControl>(ingredient =>
          new FormControl(`${ingredient.quantity ? ingredient.quantity : ''}${ingredient.quantity2 ? ' - ' + ingredient.quantity2 : ''} ${ingredient.name}`)))
      }))),
      instructions: new FormControl(recipe.instructions.join('\n'))
    });
  }

  get ingredientGroups(): FormArray {
    return this.form.get('ingredientGroups') as FormArray;
  }


  get instructions(): FormArray {
    return this.form.get('instructions') as FormArray;
  }

  getIngredients(groupIndex: number): FormArray {
    return this.ingredientGroups.get(`${groupIndex}`).get('ingredients') as FormArray;
  }

  getControls(i): FormControl[] {
    return (this.form.get('ingredientGroups').get(`${i}`).get('ingredients') as FormArray).controls as FormControl[];
  }

  decreaseQuantity = () => this.quantity--;
  increaseQuantity = () => this.quantity++;

  addNewIngredientGroup(): void {
    this.ingredientGroups.push(new FormGroup({
      name: new FormControl(''),
      ingredients: new FormArray([])
    }));
    setTimeout(() => {
      const ingredientGroups = this.formElement.nativeElement.getElementsByClassName('ingredient-group');
      const newIngredientGroup = ingredientGroups[ingredientGroups.length - 1]
        .getElementsByClassName('ingredient-group-title')[0] as HTMLInputElement;
      newIngredientGroup.focus();
    }, 50);
  }

  addNewIngredient(i): void {
    const newInput = new FormControl('');
    this.getIngredients(i).push(newInput);
    setTimeout(() => {
      const ingredients = this.formElement.nativeElement.getElementsByClassName('ingredient-group')[i].getElementsByClassName('ingredient');
      const newIngredient = ingredients[ingredients.length - 1].getElementsByTagName('input')[0];
      newIngredient.focus();
    }, 50);
  }

  removeIngredient(groupIndex: number, ingredientIndex: number): void {
    this.getIngredients(groupIndex).removeAt(ingredientIndex);
  }

  removeIngredientGroup(groupIndex: number): void {
    this.ingredientGroups.removeAt(groupIndex);
  }

  save() {
    this.loading = true;
    const recipe: Recipe = {
      id: this.isNew ? undefined : this.id,
      name: this.form.get('name').value,
      imageUrl: this.form.get('imageUrl').value,
      quantity: this.quantity,
      category: this.form.get('category').value,
      instructions: (this.form.get('instructions').value as string).split('\n'),
      ingredientGroups: this.ingredientGroups.controls.map((group, i) => ({
        name: group.get('name').value,
        ingredients: this.getIngredients(i).controls.map(control => this.ingredientFromString(control.value))
      }))
    };
    if (this.isNew) {
      this.api.addRecipe(recipe).subscribe(r => {
        this.loading = false;
        this.router.navigateByUrl(`/recipe/${r.id}`);
      });
    } else {
      this.api.updateRecipe(recipe).subscribe(r => {
        this.loading = false;
        this.router.navigateByUrl(`/recipe/${r.id}`);
      });
    }
  }

  private ingredientFromString(str: string): Ingredient {
    const digits = str.match(/^([\d\.]+)?([-\s]+(\d+))?(.+$)/i);
    if (digits) {
      const quantity = parseFloat(digits[1]) || null;
      const quantity2 = parseInt(digits[3], 10) || null;
      const name = digits[4].trim();
      return { quantity, quantity2, name };
    }
    return { name: str };
  }
}