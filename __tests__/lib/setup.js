import Recipes from '../../models/recipeSchema.js'
import User from '../../models/userSchema.js'

export default async function setup(done) {
  const users = await User.create([
    {
      username: 'emily',
      email: 'emily@emily.com',
      password: 'emilyemily1'
    }
  ])

  await Recipes.create({
    recipeName: "Vegetarian Stir-Fried Garlic Scape",
    description: "Vegetarian Stir-Fried Garlic Scape",
    linkOrMethod: "http://redcook.net/2010/06/16/garlic-scape-an-off-menu-treat/",
    image: "https://www.edamam.com/web-img/33e/33e894ef1df09575df1f8fdb348d6d9a.png",
    servings: 4,
    ingredients: [
      "1.2 kg cherry tomatoes",
      "5 sprigs of fresh thyme",
      "extra virgin olive oil",
      "2 shallots",
      "2 cloves of garlic",
      "500 g baby spinach",
      "8-12 fresh or dried lasagne sheets",
      "350 g ricotta cheese",
      "WHITE SAUCE",
      "600 ml milk",
      "25 g unsalted butter",
      "2 heaped tablespoons flour",
      "150 g vegetarian sharp, mature cheese",
      "100 g mozzarella"
    ], 
    source: "Red Cook",
    diet: [],
    healthLabels: [
      "Vegetarian",
      "Peanut-Free",
      "Tree-Nut-Free",
      "Alcohol-Free",
      "Immuno-Supportive"
    ],
    allergens: [
      "Sulfites"
    ],
    cookingTime: 30,
    calories: 891.4672721817751,
    user: {
      "username": "masterchef",
      "isAdmin": true,
      "savedRecipes": [],
      "postedRecipes": [],
      "_id": "602fd4eb2360949219c98aa4",
      "passwordConfirmation": "$2b$10$O/JhO9DyCnUb2xqlSBCs8O72cgNO6WgZLcRNxexOqJ60EV3tujZea"
    },
    review: []
  })
  
  done()
}