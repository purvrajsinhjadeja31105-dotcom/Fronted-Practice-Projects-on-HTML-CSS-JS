const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const itemsContainer = document.getElementById('items');
const loadingIndicator = document.getElementById('loading');
const recipeModal = document.getElementById('recipe-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

const LOCAL_RECIPES = [
  {
    idMeal: "1",
    strMeal: "Paneer Butter Masala",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFuZWVyJTIwYnV0dGVyJTIwbWFzYWxhfGVufDB8fDB8fHww",
    strInstructions: "1. Heat oil and butter in a pan. Add cumin seeds.\n2. Add chopped onions and saute until golden brown.\n3. Add ginger-garlic paste and saute for a minute.\n4. Pour in tomato puree, salt, turmeric, red chili powder, coriander powder. Cook until oil separates.\n5. Add cashew paste to make it creamy.\n6. Add paneer cubes and garam masala. Simmer for 5 mins.\n7. Garnish with kasuri methi and fresh cream.",
    strIngredient1: "Paneer", strMeasure1: "250g",
    strIngredient2: "Tomatoes", strMeasure2: "4 medium",
    strIngredient3: "Onion", strMeasure3: "2 medium",
    strIngredient4: "Cashews", strMeasure4: "15-20",
    strIngredient5: "Butter", strMeasure5: "2 tbsp",
    strIngredient6: "Cream", strMeasure6: "2 tbsp",
    strTags: "Curry, Vegetarian, Paneer"
  },
  {
    idMeal: "2",
    strMeal: "Dal Makhani",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    strInstructions: "1. Soak urad dal and rajma overnight.\n2. Pressure cook with salt and water for 5-6 whistles until soft.\n3. In a pan, heat butter, add cumin seeds, and ginger-garlic paste.\n4. Add tomato puree and cook until it thickens.\n5. Add Kashmiri red chili powder for color.\n6. Pour the cooked dal into the pan, simmer on low heat for 30 minutes to 1 hour.\n7. Add fresh cream and kasuri methi before serving.",
    strIngredient1: "Whole Black Urad Dal", strMeasure1: "1 cup",
    strIngredient2: "Rajma (Kidney Beans)", strMeasure2: "1/4 cup",
    strIngredient3: "Tomato Puree", strMeasure3: "1 cup",
    strIngredient4: "Butter", strMeasure4: "3 tbsp",
    strIngredient5: "Cream", strMeasure5: "1/4 cup",
    strTags: "Lentils, Creamy, Classic"
  },
  {
    idMeal: "3",
    strMeal: "Aloo Gobi",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    strInstructions: "1. Cut potatoes and cauliflower into florets.\n2. Heat oil, add cumin seeds and chopped onions.\n3. Add ginger, garlic, and green chilies.\n4. Add tomatoes and dry spices (turmeric, coriander powder, cumin powder).\n5. Toss in potato and cauliflower. Mix well.\n6. Cover and cook on low heat until tender.\n7. Garnish with fresh coriander leaves.",
    strIngredient1: "Cauliflower", strMeasure1: "1 medium",
    strIngredient2: "Potatoes", strMeasure2: "2 large",
    strIngredient3: "Onion", strMeasure3: "1 medium",
    strIngredient4: "Tomatoes", strMeasure4: "2 medium",
    strIngredient5: "Spices", strMeasure5: "to taste",
    strTags: "Dry, Everyday, Healthy"
  },
  {
    idMeal: "4",
    strMeal: "Chana Masala",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    strInstructions: "1. Soak chickpeas overnight and pressure cook until soft.\n2. Heat oil, add whole spices (bay leaf, cloves, cinnamon).\n3. Add finely chopped onions and sauté until brown.\n4. Add ginger-garlic paste and tomato puree. Cook until oil separates.\n5. Add chole masala, turmeric, red chili powder, and salt.\n6. Add boiled chickpeas along with some of the cooking water.\n7. Simmer for 15 minutes. Garnish with coriander.",
    strIngredient1: "Chickpeas (Chana)", strMeasure1: "1.5 cups",
    strIngredient2: "Onions", strMeasure2: "2 medium",
    strIngredient3: "Tomatoes", strMeasure3: "3 medium",
    strIngredient4: "Chole Masala powder", strMeasure4: "2 tbsp",
    strIngredient5: "Ginger Garlic Paste", strMeasure5: "1 tbsp",
    strTags: "Protein, Spicy, Street Food"
  },
  {
    idMeal: "5",
    strMeal: "Baingan Bharta",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
    strInstructions: "1. Roast the eggplant directly over an open flame until the skin is charred and the inside is soft.\n2. Peel the skin off and mash the flesh.\n3. Heat oil in a pan, add cumin seeds, chopped garlic, and green chilies.\n4. Add onions and saute until translucent.\n5. Add tomatoes, turmeric, and red chili powder. Cook until mushy.\n6. Add the mashed eggplant to the pan.\n7. Mix well, season with salt, and cook for 5-7 minutes. Garnish with cilantro.",
    strIngredient1: "Eggplant (Baingan)", strMeasure1: "1 large",
    strIngredient2: "Onions", strMeasure2: "2 medium",
    strIngredient3: "Tomatoes", strMeasure3: "2 medium",
    strIngredient4: "Garlic", strMeasure4: "4 cloves",
    strIngredient5: "Green Chilies", strMeasure5: "2",
    strTags: "Smoky, Roasted, Vegan",
    strYoutube: "https://www.youtube.com/watch?v=Fj2yEXX3rFE"
  },
  {
    idMeal: "6",
    strMeal: "Dal Fry",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
    strInstructions: "1. Wash and boil toor dal (pigeon peas) with turmeric and salt until soft.\n2. In a separate pan, heat ghee or oil.\n3. Add mustard seeds, cumin seeds, and a pinch of asafoetida (hing).\n4. Add finely chopped onions, ginger, and garlic. Sauté until golden.\n5. Add chopped tomatoes, green chilies, and cook until tomatoes are soft.\n6. Pour the prepared tempering (tadka) over the boiled dal.\n7. Add a splash of lemon juice and fresh coriander before serving.",
    strIngredient1: "Toor Dal", strMeasure1: "1 cup",
    strIngredient2: "Onion", strMeasure2: "1 medium",
    strIngredient3: "Tomato", strMeasure3: "1 large",
    strIngredient4: "Garlic", strMeasure4: "3 cloves",
    strIngredient5: "Ghee", strMeasure5: "2 tbsp",
    strTags: "Staple, Lentils, Comfort Food",
    strYoutube: "https://www.youtube.com/watch?v=Jww5XJ_x5sI"
  },
  {
    idMeal: "7",
    strMeal: "Matar Paneer",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
    strInstructions: "1. Heat oil in a pan and lightly fry paneer cubes. Set aside.\n2. In the same pan, saute onions, ginger, garlic, and tomatoes. Let it cool and blend into a smooth paste.\n3. Heat a little more oil, add cumin seeds, then the blended paste.\n4. Add coriander powder, turmeric, red chili powder, and salt. Cook until oil separates.\n5. Add green peas (matar) and half a cup of water. Simmer until peas are cooked.\n6. Add the fried paneer and garam masala. Simmer for 3-4 minutes.\n7. Serve hot garnished with coriander.",
    strIngredient1: "Paneer", strMeasure1: "200g",
    strIngredient2: "Green Peas", strMeasure2: "1 cup",
    strIngredient3: "Onion", strMeasure3: "2 medium",
    strIngredient4: "Tomatoes", strMeasure4: "2 large",
    strIngredient5: "Ginger Garlic Paste", strMeasure5: "1 tbsp",
    strTags: "Paneer, Peas, Curry",
    strYoutube: "https://www.youtube.com/watch?v=GkXkPym-ZlQ"
  },
  {
    idMeal: "8",
    strMeal: "Samosa",
    strCategory: "Vegetarian",
    strArea: "Indian",
    strMealThumb: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    strInstructions: "1. For dough: Mix all-purpose flour, ajwain, salt, and oil/ghee. Knead into a stiff dough using cold water. Rest for 30 mins.\n2. For filling: Boil and mash potatoes. Heat oil, add cumin seeds, crushed coriander seeds, and green chilies.\n3. Add mashed potatoes, peas, garam masala, amchur powder, and salt. Cook for 2 mins. Add fresh coriander.\n4. Roll dough into an oval shape, cut in half.\n5. Form a cone, stuff with potato filling, and seal edges with water.\n6. Deep fry on low-medium heat until golden and crispy.\n7. Serve hot with mint or tamarind chutney.",
    strIngredient1: "All Purpose Flour", strMeasure1: "2 cups",
    strIngredient2: "Potatoes", strMeasure2: "3 medium",
    strIngredient3: "Green Peas", strMeasure3: "1/2 cup",
    strIngredient4: "Oil/Ghee", strMeasure4: "1/4 cup",
    strIngredient5: "Spices", strMeasure5: "to taste",
    strTags: "Snack, Street Food, Fried"
  }
];

// Fetch matching recipes from the local array
function fetchRecipes(query = '') {
  itemsContainer.innerHTML = '';
  loadingIndicator.classList.remove('hidden');

  setTimeout(() => { // Simulate network request for realism
    loadingIndicator.classList.add('hidden');

    let filteredRecipes = LOCAL_RECIPES;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredRecipes = LOCAL_RECIPES.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(lowerQuery) ||
        (recipe.strTags && recipe.strTags.toLowerCase().includes(lowerQuery)) ||
        recipe.strIngredient1.toLowerCase().includes(lowerQuery)
      );
    }

    if (filteredRecipes.length > 0) {
      displayRecipes(filteredRecipes);
    } else {
      itemsContainer.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; font-size: 18px; color: var(--primary-dark);">No Indian Vegetarian recipes found matching your search. Try "paneer" or "dal".</p>';
    }
  }, 300);
}

function displayRecipes(meals) {
  itemsContainer.innerHTML = '';

  meals.forEach(meal => {
    const li = document.createElement('li');
    li.className = 'recipe-item';

    li.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
      <div class="recipe-content">
        <p class="category">${meal.strCategory} &bull; ${meal.strArea}</p>
        <h3>${meal.strMeal}</h3>
        <button class="view-btn" onclick="openRecipeModal('${meal.idMeal}')">View Recipe</button>
      </div>
    `;

    itemsContainer.appendChild(li);
  });
}

function openRecipeModal(id) {
  const meal = LOCAL_RECIPES.find(r => r.idMeal === id);
  if (!meal) return;

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      });
    } else {
      break;
    }
  }

  let ingredientsHTML = ingredients.map(ing =>
    `<li><span>${ing.ingredient}</span> <strong>${ing.measure}</strong></li>`
  ).join('');

  let tagsHTML = '';
  if (meal.strTags) {
    const tags = meal.strTags.split(',');
    tagsHTML = `<div class="tags">` + tags.map(tag => `<span class="tag">${tag.trim()}</span>`).join('') + `</div>`;
  }

  modalBody.innerHTML = `
    <div class="modal-header-img">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; height: 100%; object-fit: cover;">
      <div class="modal-header-overlay"></div>
      <div class="modal-title-wrapper">
        <h2>${meal.strMeal}</h2>
      </div>
    </div>

    <div class="modal-body-content">
      ${tagsHTML}
      <div class="recipe-section">
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
          ${ingredientsHTML}
        </ul>
      </div>

      <div class="recipe-section">
        <h3>Instructions</h3>
        <div class="instructions">${meal.strInstructions}</div>
      </div>

      ${meal.strYoutube ? `
      <div class="recipe-section" style="text-align: center; margin-top: 40px;">
        <a href="${meal.strYoutube}" target="_blank" style="background: #ff0000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; transition: background 0.3s; box-shadow: 0 4px 10px rgba(255,0,0,0.3);">
          Watch on YouTube
        </a>
      </div>` : ''}
    </div>
  `;

  recipeModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeModal() {
  recipeModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Event Listeners
searchBtn.addEventListener('click', () => {
  fetchRecipes(searchInput.value.trim());
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchRecipes(searchInput.value.trim());
  }
});

closeModalBtn.addEventListener('click', closeModal);

recipeModal.addEventListener('click', (e) => {
  if (e.target === recipeModal) {
    closeModal();
  }
});

// Init
fetchRecipes();
