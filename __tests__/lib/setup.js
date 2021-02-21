import recipeSchema from '../../models/recipeSchema.js'
import userSchema from '../../models/userSchema.js'

export default async function setup(done) {
  const users = await userSchema.create([
    {
      username: 'masterchef',
      email: 'master@chef.com',
      password: 'masterchef1',
      passwordConfirmation: 'masterchef1',
      isAdmin: true
    },
    {
      username: 'fab',
      email: 'fab@fab.com',
      password: 'fabfabfab1',
      passwordConfirmation: 'fabfabfab1',
      isAdmin: true
    },
    {
      username: 'kate',
      email: 'kate@kate.com',
      password: 'katekate1',
      passwordConfirmation: 'katekate1',
      isAdmin: true
    },
    {
      username: 'emily',
      email: 'emily@emily.com',
      password: 'emilyemily1',
      passwordConfirmation: 'emilyemily1',
      isAdmin: true
    },
    {
      username: 'jess',
      email: 'jess@jess.com',
      password: 'jessjess1',
      passwordConfirmation: 'jessjess1',
      isAdmin: true
    }
  ])
  // await recipeSchema.create([
  //   {
  //     recipeName: 'Roast Sirloin Of Beef',
  //     description: 'Roast Sirloin Of Beef"',
  //     linkOrMethod: 'http://www.bbcgoodfood.com/recipes/2558/',
  //     image: 'https://www.edamam.com/web-img/d37/d376c145f2a59befa7738a2c35caab31.jpg',
  //     servings: 6,
  //     ingredients: {
  //       type: ['800 g lean stewing beef',
  //         '2 tablespoons plain flour',
  //         'olive oil',
  //         '2 cloves of garlic',
  //         '1 handful of shallots',
  //         '2 sticks of celery',
  //         '4 carrots',
  //         '1 small bunch of thyme , (15g)',
  //         '4 ripe vine tomatoes',
  //         '150 ml red wine',
  //         '500 ml organic beef stock',
  //         '2 bay leaves',
  //         'Worcestershire sauce']
  //     },
  //     source: 'BBC Good Food',
  //     diet: 'meat',
  //     healthLabels: [
  //       'Dairy-Free',
  //       'Egg-Free',
  //       'Peanut-Free',
  //       'Tree-Nut-Free',
  //       'Soy-Free',
  //       'Shellfish-Free',
  //       'Pork-Free',
  //       'Crustacean-Free',
  //       'Mustard-Free',
  //       'Sesame-Free',
  //       'Lupine-Free',
  //       'Mollusk-Free',
  //       'Kosher'],
  //     allergens: [
  //       'Sulfites',
  //       'FODMAP'
  //     ],
  //     cookingTime: 6,
  //     calories: 6,
  //     user: users[0]
  //   },
  //   {
  //     recipeName: 'Roast Sirloin Of Beef Test 2',
  //     description: 'Roast Sirloin Of Beef"',
  //     linkOrMethod: 'http://www.bbcgoodfood.com/recipes/2558/',
  //     image: 'https://www.edamam.com/web-img/d37/d376c145f2a59befa7738a2c35caab31.jpg',
  //     servings: 6,
  //     ingredients: {
  //       type: ['800 g lean stewing beef',
  //         '2 tablespoons plain flour',
  //         'olive oil',
  //         '2 cloves of garlic',
  //         '1 handful of shallots',
  //         '2 sticks of celery',
  //         '4 carrots',
  //         '1 small bunch of thyme , (15g)',
  //         '4 ripe vine tomatoes',
  //         '150 ml red wine',
  //         '500 ml organic beef stock',
  //         '2 bay leaves',
  //         'Worcestershire sauce']
  //     },
  //     source: 'BBC Good Food',
  //     diet: 'meat',
  //     healthLabels: [
  //       'Dairy-Free',
  //       'Egg-Free',
  //       'Peanut-Free',
  //       'Tree-Nut-Free',
  //       'Soy-Free',
  //       'Shellfish-Free',
  //       'Pork-Free',
  //       'Crustacean-Free',
  //       'Mustard-Free',
  //       'Sesame-Free',
  //       'Lupine-Free',
  //       'Mollusk-Free',
  //       'Kosher'],
  //     allergens: [
  //       'Sulfites',
  //       'FODMAP'
  //     ],
  //     cookingTime: 6,
  //     calories: 6,
  //     user: users[0]
  //   },
  //   {
  //     recipeName: 'Roast Sirloin Of Beef Test 3',
  //     description: 'Roast Sirloin Of Beef"',
  //     linkOrMethod: 'http://www.bbcgoodfood.com/recipes/2558/',
  //     image: 'https://www.edamam.com/web-img/d37/d376c145f2a59befa7738a2c35caab31.jpg',
  //     servings: 6,
  //     ingredients: {
  //       type: ['800 g lean stewing beef',
  //         '2 tablespoons plain flour',
  //         'olive oil',
  //         '2 cloves of garlic',
  //         '1 handful of shallots',
  //         '2 sticks of celery',
  //         '4 carrots',
  //         '1 small bunch of thyme , (15g)',
  //         '4 ripe vine tomatoes',
  //         '150 ml red wine',
  //         '500 ml organic beef stock',
  //         '2 bay leaves',
  //         'Worcestershire sauce']
  //     },
  //     source: 'BBC Good Food',
  //     diet: 'meat',
  //     healthLabels: [
  //       'Dairy-Free',
  //       'Egg-Free',
  //       'Peanut-Free',
  //       'Tree-Nut-Free',
  //       'Soy-Free',
  //       'Shellfish-Free',
  //       'Pork-Free',
  //       'Crustacean-Free',
  //       'Mustard-Free',
  //       'Sesame-Free',
  //       'Lupine-Free',
  //       'Mollusk-Free',
  //       'Kosher'],
  //     allergens: [
  //       'Sulfites',
  //       'FODMAP'
  //     ],
  //     cookingTime: 6,
  //     calories: 6,
  //     user: users[0]
  //   },
  //   {
  //     recipeName: 'Roast Sirloin Of Beef Test 4',
  //     description: 'Roast Sirloin Of Beef"',
  //     linkOrMethod: 'http://www.bbcgoodfood.com/recipes/2558/',
  //     image: 'https://www.edamam.com/web-img/d37/d376c145f2a59befa7738a2c35caab31.jpg',
  //     servings: 6,
  //     ingredients: {
  //       type: ['800 g lean stewing beef',
  //         '2 tablespoons plain flour',
  //         'olive oil',
  //         '2 cloves of garlic',
  //         '1 handful of shallots',
  //         '2 sticks of celery',
  //         '4 carrots',
  //         '1 small bunch of thyme , (15g)',
  //         '4 ripe vine tomatoes',
  //         '150 ml red wine',
  //         '500 ml organic beef stock',
  //         '2 bay leaves',
  //         'Worcestershire sauce']
  //     },
  //     source: 'BBC Good Food',
  //     diet: 'meat',
  //     healthLabels: [
  //       'Dairy-Free',
  //       'Egg-Free',
  //       'Peanut-Free',
  //       'Tree-Nut-Free',
  //       'Soy-Free',
  //       'Shellfish-Free',
  //       'Pork-Free',
  //       'Crustacean-Free',
  //       'Mustard-Free',
  //       'Sesame-Free',
  //       'Lupine-Free',
  //       'Mollusk-Free',
  //       'Kosher'],
  //     allergens: [
  //       'Sulfites',
  //       'FODMAP'
  //     ],
  //     cookingTime: 6,
  //     calories: 6,
  //     user: users[0]
  //   }
  // ])
  done()
}