export interface RecipeHeader {
    id?: number;
    name: string;
    imageUrl: string;
    quantity: number;
    quantity2?: number;
    category: 'MAIN' | 'BREAKFAST' | 'DESSERT' | 'OTHER';
}

export interface Recipe extends RecipeHeader {
    ingredientGroups: IngredientGroup[];
    instructions: string[];
}

export interface IngredientGroup {
    name?: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    quantity?: number;
    quantity2?: number;
    name: string;
}