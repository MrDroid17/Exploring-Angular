# Angular 19 todo app

## **Coding Questions**

### **Problem Statement**
Your task is to build a small, multi-route Angular application. The application will feature a home page with simple interactive components and a "Todos" page that fetches, displays, and filters a list of tasks from an external API.

#### **Core Requirements**

1.  **Application Structure & Routing:**
    * Create a `HeaderComponent` with a title and navigation links for "Home" and "Todos".
    * Implement two main routes: `/home` and `/todos`.

2.  **Home View (`/home`):**
    * This view should contain two child components:
        * **`GreetingComponent`**: Receives a `name` string via both a traditional `@Input()` and a signal-based `input()` from the Home component. It should display a simple welcome message (e.g., "Welcome, [name]!").
        * **`CounterComponent`**: A self-contained component with "Increment," "Decrement," and "Reset" buttons that manage a local count.

3.  **Todos View (`/todos`):**
    * **Data Fetching:**
        * Create a `Todo` interface (`id`, `userId`, `title`, `completed`).
        * Use an Angular service to fetch a list of todos from the public API: `https://jsonplaceholder.typicode.com/todos`.
        * Display a **loader** while the data is being fetched.
        * Use the `catchError` operator from RxJS to handle any potential API errors gracefully.
    * **Display:**
        * Render the list of todos. Each todo item in the list should be its own component.
    * **Filtering (Pipe):**
        * Add a search input box at the top of the list.
        * Create a custom **pipe** to filter the todos by their `title` based on the text entered in the search box.
    * **Directives:**
        * Create a custom attribute directive that **highlights** the background of a todo item when it is clicked.
        * Create another custom attribute directive that applies a **strikethrough** text style to a todo item when it is clicked.
        * Clicking the same item again should toggle these styles off.

#### **Enhancement (Bonus Task)**

* **Debounce the Search Input:**
    * As an alternative or enhancement to the filter pipe, implement a custom **debounce function**.
    * The search input should trigger the filtering logic only after the user has stopped typing for **500ms**.

#### **Technical Guidelines**
* Use the latest version of Angular.
* Prefer **Standalone Components**, Directives, and Pipes.
* Use TypeScript with clear interfaces.
* Apply basic, clean CSS for layout and styling.
* Ensure your code is well-structured and readable.

---


## Solution 
[Video Tutorial link](https://www.youtube.com/watch?v=oUmVFHlwZsI&t=110s)

- Basic Angular 19 Component with Todos App
  - Data binding with `signal()`
  - EventListener 
  - RouterOutlet with   `LazyLoading`
  - Angular Services
  - Angular Built in code flows `@for` `@if` `@else` `@switch` `@case` `@default` - no Module import required
  - Making httpCalls using `provideHttpClient()` using `https://jsonplaceholder.typicode.com/todos/`
  - Angular Directives - `Components`, `Attribute directives`, `Structural Directives` - allows to add additional behaviour to element
  - Pipes - used to transform data right-in-place in the templates