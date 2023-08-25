import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
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

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}