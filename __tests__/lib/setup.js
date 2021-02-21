import User from '../../models/userSchema.js'
import Recipes from '../../models/recipeSchema.js'

export default async function setup(done) {

  const users = await User.create([
    {
      username: 'admin1',
      email: 'admin1@admin1',
      password: 'adminadmin1',
      passwordConfirmation: 'adminadmin1',
      isAdmin: true
    },
    {
      username: 'admin2',
      email: 'admin2@admin2',
      password: 'adminadmin2',
      passwordConfirmation: 'adminadmin2',
      isAdmin: true
    },
    {
      username: 'notadmin1',
      email: 'notadmin1@notadmin1',
      password: 'notadmin1',
      passwordConfirmation: 'notadmin1',
      isAdmin: false
    },
    {
      username: 'notadmin2',
      email: 'notadmin2@notadmin2',
      password: 'notadmin2',
      passwordConfirmation: 'notadmin2',
      isAdmin: false
    }
  ])
  await Recipes.create([
    {
      ingredients: [
        '400.0g can beef consommé',
        '1-1.5kg/2lb 4-3lb 5oz sirloin of beef joint',
        '2.0 tbsp vegetable oil or beef fat',
        '1 glass red wine'
      ],
      diet: [
        'High-Protein',
        'Low-Carb'
      ],
      healthLabels: [
        'Sugar-Conscious',
        'Peanut-Free',
        'Tree-Nut-Free'
      ],
      allergens: [
        'Gluten',
        'Wheat',
        'Sulfites'
      ],
      recipeName: 'Roast Sirloin Of Beef',
      description: 'Roast Sirloin Of Beef',
      linkOrMethod: 'http://www.bbcgoodfood.com/recipes/2558/',
      image: 'https://www.edamam.com/web-img/d37/d376c145f2a59befa7738a2c35caab31.jpg',
      servings: 6,
      source: 'BBC Good Food',
      cookingTime: 0,
      calories: 2120.44,
      user: users[0]
    },
    {
      ingredients: [
        '800 g lean stewing beef',
        '2 tablespoons plain flour',
        'olive oil',
        '2 cloves of garlic',
        '1 handful of shallots',
        '2 sticks of celery',
        '4 carrots',
        '1 small bunch of thyme , (15g)',
        '4 ripe vine tomatoes',
        '150 ml red wine',
        '500 ml organic beef stock',
        '2 bay leaves',
        'Worcestershire sauce'
      ],
      diet: [],
      'healthLabels': [
        'Peanut-Free',
        'Tree-Nut-Free'
      ],
      allergens: [
        'Sulfites',
        'FODMAP'
      ],
      recipeName: 'Beef stew',
      description: 'Beef stew',
      linkOrMethod: 'http://www.jamieoliver.com/recipes/beef-recipes/beef-stew/',
      image: 'https://www.edamam.com/web-img/501/501a9b12d18f5cbcaad0d00263ec2f7b.jpg',
      servings: 6,
      source: 'Jamie Oliver',
      cookingTime: 0,
      calories: 1813.3507848033398,
      user: users[1]
    },
    {
      ingredients: [
        '2 tablespoons extra-virgin olive oil',
        '1 onion, thinly sliced',
        '8 ounces cremini mushrooms, thinly sliced',
        '1 teaspoon chopped thyme',
        'Kosher salt and freshly ground pepper',
        'Coriander-Dusted Roast Beef',
        '1/4 cup sour cream',
        'Half of the Coriander-Dusted Roast Beef or 12 ounces roast beef, sliced 1/4 inch thick and cut into strips',
        'Buttered noodles, for serving'
      ],
      diet: [
        'Balanced'
      ],
      healthLabels: [
        'Sugar-Conscious',
        'Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'
      ],
      allergens: [
        'Sulfites'
      ],
      recipeName: 'Quick Beef Stroganoff',
      description: 'Quick Beef Stroganoff',
      linkOrMethod: 'http://www.foodandwine.com/recipes/quick-beef-stroganoff',
      image: 'https://www.edamam.com/web-img/552/5524f65e427c421bb0127a322da13570.jpg',
      servings: 8,
      source: 'Food & Wine',
      cookingTime: 0,
      calories: 1573.06132812955,
      user: users[2]
    },
    {
      ingredients: [
        '1 Pound beef',
        '1 Cup seasoning'
      ],
      diet: [
        'High-Protein',
        'Low-Carb'
      ],
      healthLabels: [
        'Sugar-Conscious',
        'Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free',
        'Immuno-Supportive'
      ],
      allergens: [
        'FODMAP'
      ],
      recipeName: 'Beef Jerky',
      description: 'Beef Jerky',
      linkOrMethod: 'https://www.thedailymeal.com/recipes/beef-jerky',
      image: 'https://www.edamam.com/web-img/346/3464d06a3fa4f31b0d898b714dbfd5c4.jpg',
      servings: 4,
      source: 'The Daily Meal',
      cookingTime: 0,
      calories: 805.7980810036543,
      user: users[3]
    },
    {
      ingredients: [
        '12 ounces ground beef formed into 8 (1 1/2 ounce) patties',
        '2 ounces cheddar cheese cut into four 3/8–inch cubes',
        '1/2 teaspoon kosher salt',
        '1/4 teaspoon black pepper',
        '4 slider buns'
      ],
      diet: [],
      'healthLabels': [
        'Sugar-Conscious',
        'Peanut-Free',
        'Tree-Nut-Free',
        'Alcohol-Free'
      ],
      allergens: [
        'Sulfites'
      ],
      recipeName: 'Beef Sliders',
      description: 'Beef Sliders',
      linkOrMethod: 'http://www.pbs.org/food/recipes/beef-sliders/',
      image: 'https://www.edamam.com/web-img/dd1/dd1c476540abd9d8be7786c96d09522a.jpg',
      servings: 4,
      source: 'PBS Food',
      cookingTime: 64,
      calories: 1563.151342625,
      user: users[3]
    }
  ])
  done()
}
