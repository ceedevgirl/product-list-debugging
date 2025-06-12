Bugs.md
This document outlines the bugs identified and resolved during the development of the dessert cart application.

1. Syntax Errors in app.component.ts and add-to-cart.component.ts
Issue: @Component decorator was incorrectly written with an interface or semicolon between it and the class declaration.

Fix: Removed misplaced interface definitions and semicolons. Ensured @Component is immediately followed by the class declaration.

2. Logical Error in decreaseProductItem()
Issue: The dessert quantity could decrease below 1, potentially resulting in negative values.

Fix: Added a condition to prevent quantity from going below 1. Also reset the UI state (isAddedToCart = false) when quantity reaches 1 and is decreased again.

 3. Component Refactor for Better Structure
Issue: AppComponent contained too much logic and responsibility, making the code harder to manage.

Fix: Broke AppComponent into:

ProductCardComponent – for displaying and interacting with individual desserts.

CartComponent – for managing and displaying cart contents.

Both components are now imported and used inside AppComponent.

 4. Data Fetching with product-card.service.ts
Issue: Dessert data was hardcoded or not modular.

Fix: Created ProductCardService to fetch desserts from data.json. Used the service in ProductCardComponent to display available desserts dynamically.

 5. Cart Management via cart.service.ts
Issue: No shared logic for managing cart state across components.

Fix: Created CartService using BehaviorSubject to manage cart state reactively. Added functions to:

Add/remove desserts

Get cart total

Clear the cart

 6. Added Order Confirmation Modal
Issue: Confirmation was handled via an alert instead of a visual summary.

Fix: Implemented a modal that:

Displays order confirmation with thumbnail images, quantity, and price breakdown.

Includes a "Start New Order" button to reset cart state and UI.