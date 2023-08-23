import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

import {Recipe} from './recipe.model';
@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe1', 'This is simply a test1',
         'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
         [new Ingredient('Meat',1),
        new Ingredient('French Fries',10)]),
        new Recipe('A Test Recipe2', 'This is simply a test2', 
         'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
         [new Ingredient('Meat',3),
         new Ingredient('Fries',4)])
      ];

      constructor(private slService: ShoppingListService) {

      }
    
      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
}