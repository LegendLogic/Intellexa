import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Brain, Code, Database, Sparkles, Trophy, User, Zap, AlertCircle, Lock } from "lucide-react";
import axios from "axios";

const Notes = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  
  // Expanded quiz categories with more questions
 const quizCategories = {
    React: [
      { id: 1, question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useRef", "useMemo"], correct: "useEffect" },
      { id: 2, question: "What does React use to manage component data?", options: ["Props", "State", "Functions", "Variables"], correct: "State" },
      { id: 3, question: "What is JSX in React?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"], correct: "JavaScript XML" },
      { id: 4, question: "Which method is used to update state in class components?", options: ["updateState()", "setState()", "changeState()", "modifyState()"], correct: "setState()" },
      { id: 5, question: "What is the Virtual DOM?", options: ["A copy of the real DOM", "A database", "A framework", "A library"], correct: "A copy of the real DOM" },
      { id: 6, question: "Which hook replaces componentDidMount?", options: ["useState", "useEffect", "useContext", "useReducer"], correct: "useEffect" },
      { id: 7, question: "What are React fragments used for?", options: ["Grouping elements without extra nodes", "Styling", "Routing", "State management"], correct: "Grouping elements without extra nodes" },
      { id: 8, question: "What is prop drilling?", options: ["Passing props through multiple levels", "Drilling holes in components", "A design pattern", "A build tool"], correct: "Passing props through multiple levels" },
      { id: 9, question: "What does useMemo hook do?", options: ["Memoizes values", "Creates side effects", "Manages state", "Handles refs"], correct: "Memoizes values" },
      { id: 10, question: "What is the purpose of useCallback?", options: ["Memoize functions", "Create callbacks", "Handle events", "Update state"], correct: "Memoize functions" },
      { id: 11, question: "What is React Context used for?", options: ["Global state management", "Routing", "Styling", "Animation"], correct: "Global state management" },
      { id: 12, question: "What is a Higher-Order Component (HOC)?", options: ["A function that takes a component and returns a new component", "A parent component", "A class component", "A functional component"], correct: "A function that takes a component and returns a new component" },
      { id: 13, question: "What is the purpose of useRef?", options: ["Access DOM elements and persist values", "Manage state", "Create effects", "Handle callbacks"], correct: "Access DOM elements and persist values" },
      { id: 14, question: "What is lazy loading in React?", options: ["Loading components on demand", "Slow rendering", "Delayed mounting", "Async state"], correct: "Loading components on demand" },
      { id: 15, question: "What does React.memo do?", options: ["Prevents unnecessary re-renders", "Memoizes state", "Creates context", "Handles routing"], correct: "Prevents unnecessary re-renders" },
      { id: 16, question: "What is the purpose of key prop in lists?", options: ["Helps React identify which items have changed", "Styles the element", "Adds event listeners", "Creates unique IDs"], correct: "Helps React identify which items have changed" },
      { id: 17, question: "What is the difference between state and props?", options: ["State is internal, props are external", "State is external, props are internal", "They are the same", "State is for classes only"], correct: "State is internal, props are external" },
      { id: 18, question: "What is React Router used for?", options: ["Client-side routing", "State management", "API calls", "Styling"], correct: "Client-side routing" },
      { id: 19, question: "What is the purpose of useReducer?", options: ["Complex state logic", "Side effects", "Context creation", "Memoization"], correct: "Complex state logic" },
      { id: 20, question: "What are controlled components?", options: ["Form inputs controlled by React state", "Components with props", "Class components", "Styled components"], correct: "Form inputs controlled by React state" },
      { id: 21, question: "What is the purpose of componentWillUnmount?", options: ["Cleanup before component removal", "Initialize state", "Update DOM", "Handle props"], correct: "Cleanup before component removal" },
      { id: 22, question: "What is reconciliation in React?", options: ["Process of updating the DOM", "State management", "Error handling", "Routing"], correct: "Process of updating the DOM" },
      { id: 23, question: "What is the purpose of StrictMode?", options: ["Highlights potential problems", "Improves performance", "Handles errors", "Manages state"], correct: "Highlights potential problems" },
      { id: 24, question: "What are portals in React?", options: ["Render children into a different DOM node", "Navigate routes", "Manage state", "Create effects"], correct: "Render children into a different DOM node" },
      { id: 25, question: "What is the purpose of getDerivedStateFromProps?", options: ["Update state based on props", "Handle errors", "Create effects", "Manage context"], correct: "Update state based on props" },
      { id: 26, question: "What is the purpose of shouldComponentUpdate?", options: ["Optimize rendering", "Update state", "Handle props", "Create refs"], correct: "Optimize rendering" },
      { id: 27, question: "What are synthetic events in React?", options: ["Cross-browser wrapper around native events", "Custom events", "DOM events", "Browser events"], correct: "Cross-browser wrapper around native events" },
      { id: 28, question: "What is the purpose of forwardRef?", options: ["Pass refs to child components", "Create refs", "Update DOM", "Handle state"], correct: "Pass refs to child components" },
      { id: 29, question: "What is the purpose of useImperativeHandle?", options: ["Customize ref value", "Create effects", "Manage state", "Handle callbacks"], correct: "Customize ref value" },
      { id: 30, question: "What is the purpose of useLayoutEffect?", options: ["Synchronous effects after DOM mutations", "Asynchronous effects", "State updates", "Context creation"], correct: "Synchronous effects after DOM mutations" },
      { id: 31, question: "What is the difference between createElement and cloneElement?", options: ["createElement makes new elements, cloneElement copies existing ones", "They are the same", "createElement is deprecated", "cloneElement is faster"], correct: "createElement makes new elements, cloneElement copies existing ones" },
      { id: 32, question: "What is the purpose of React.Children?", options: ["Utility to work with children prop", "Create components", "Manage state", "Handle routing"], correct: "Utility to work with children prop" },
      { id: 33, question: "What is code splitting in React?", options: ["Breaking code into smaller bundles", "Splitting components", "Dividing state", "Separating styles"], correct: "Breaking code into smaller bundles" },
      { id: 34, question: "What is the purpose of Suspense?", options: ["Handle async operations during render", "Manage state", "Create effects", "Handle errors"], correct: "Handle async operations during render" },
      { id: 35, question: "What is the purpose of Error Boundaries?", options: ["Catch JavaScript errors in components", "Handle async errors", "Validate props", "Manage state"], correct: "Catch JavaScript errors in components" },
      { id: 36, question: "What is the purpose of useDebugValue?", options: ["Display custom hook labels in DevTools", "Debug components", "Log errors", "Track state"], correct: "Display custom hook labels in DevTools" },
      { id: 37, question: "What is the difference between useEffect and useLayoutEffect?", options: ["useLayoutEffect runs synchronously", "useEffect is deprecated", "They are the same", "useLayoutEffect is async"], correct: "useLayoutEffect runs synchronously" },
      { id: 38, question: "What is the purpose of React.PureComponent?", options: ["Shallow comparison of props and state", "Deep comparison", "No comparison", "Custom comparison"], correct: "Shallow comparison of props and state" },
      { id: 39, question: "What is the purpose of defaultProps?", options: ["Set default values for props", "Create props", "Validate props", "Pass props"], correct: "Set default values for props" },
      { id: 40, question: "What is the purpose of propTypes?", options: ["Type checking for props", "Define props", "Pass props", "Update props"], correct: "Type checking for props" },
      { id: 41, question: "What is the difference between controlled and uncontrolled components?", options: ["Controlled use React state, uncontrolled use DOM", "They are the same", "Controlled are faster", "Uncontrolled use props"], correct: "Controlled use React state, uncontrolled use DOM" },
      { id: 42, question: "What is the purpose of dangerouslySetInnerHTML?", options: ["Insert raw HTML", "Style components", "Create elements", "Handle events"], correct: "Insert raw HTML" },
      { id: 43, question: "What is the purpose of React.createContext?", options: ["Create context object", "Manage state", "Create components", "Handle routing"], correct: "Create context object" },
      { id: 44, question: "What is the purpose of useContext?", options: ["Consume context values", "Create context", "Update context", "Delete context"], correct: "Consume context values" },
      { id: 45, question: "What is the purpose of React.Fragment?", options: ["Group elements without wrapper", "Create fragments", "Split components", "Manage state"], correct: "Group elements without wrapper" },
      { id: 46, question: "What is the purpose of React.StrictMode?", options: ["Identify unsafe lifecycle methods", "Improve performance", "Handle errors", "Manage state"], correct: "Identify unsafe lifecycle methods" },
      { id: 47, question: "What is the purpose of React.lazy?", options: ["Lazy load components", "Slow rendering", "Delay mounting", "Async loading"], correct: "Lazy load components" },
      { id: 48, question: "What is server-side rendering (SSR) in React?", options: ["Rendering React on server", "Client rendering", "Static rendering", "Hybrid rendering"], correct: "Rendering React on server" },
      { id: 49, question: "What is hydration in React?", options: ["Attaching event listeners to SSR markup", "Adding water to components", "Updating state", "Creating elements"], correct: "Attaching event listeners to SSR markup" },
      { id: 50, question: "What is the purpose of React DevTools?", options: ["Debug React applications", "Build apps", "Test apps", "Deploy apps"], correct: "Debug React applications" },
    ],
    JavaScript: [
      { id: 1, question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "const", "function"], correct: "let" },
      { id: 2, question: "What is a closure in JavaScript?", options: ["A function inside a function", "A variable scope", "An object method", "None"], correct: "A function inside a function" },
      { id: 3, question: "What does '===' check in JavaScript?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: "Value and type" },
      { id: 4, question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: "push()" },
      { id: 5, question: "What is the output of 'typeof null'?", options: ["null", "undefined", "object", "error"], correct: "object" },
      { id: 6, question: "What is a Promise in JavaScript?", options: ["An async operation result", "A variable type", "A function", "A loop"], correct: "An async operation result" },
      { id: 7, question: "Which keyword creates a constant?", options: ["const", "let", "var", "final"], correct: "const" },
      { id: 8, question: "What is the spread operator?", options: ["...", "---", "***", "+++"], correct: "..." },
      { id: 9, question: "What is hoisting in JavaScript?", options: ["Moving declarations to top", "Lifting variables", "Raising functions", "Elevating scope"], correct: "Moving declarations to top" },
      { id: 10, question: "What is the difference between let and var?", options: ["let is block-scoped, var is function-scoped", "They are the same", "let is global", "var is faster"], correct: "let is block-scoped, var is function-scoped" },
      { id: 11, question: "What is the purpose of async/await?", options: ["Handle asynchronous operations", "Create functions", "Manage loops", "Define variables"], correct: "Handle asynchronous operations" },
      { id: 12, question: "What is the event loop in JavaScript?", options: ["Mechanism for handling async operations", "A loop statement", "An event handler", "A function"], correct: "Mechanism for handling async operations" },
      { id: 13, question: "What is the difference between map() and forEach()?", options: ["map() returns array, forEach() doesn't", "They are the same", "forEach() is faster", "map() is deprecated"], correct: "map() returns array, forEach() doesn't" },
      { id: 14, question: "What is destructuring in JavaScript?", options: ["Extracting values from objects/arrays", "Breaking code", "Creating objects", "Deleting properties"], correct: "Extracting values from objects/arrays" },
      { id: 15, question: "What is the purpose of the 'this' keyword?", options: ["Refers to current object", "Creates variables", "Defines functions", "Returns values"], correct: "Refers to current object" },
      { id: 16, question: "What is a callback function?", options: ["Function passed as argument", "Function that returns", "Function that loops", "Function that waits"], correct: "Function passed as argument" },
      { id: 17, question: "What is the difference between undefined and null?", options: ["undefined is unassigned, null is intentionally empty", "They are the same", "null is an error", "undefined is better"], correct: "undefined is unassigned, null is intentionally empty" },
      { id: 18, question: "What is the purpose of Array.prototype.reduce()?", options: ["Reduce array to single value", "Remove elements", "Add elements", "Sort array"], correct: "Reduce array to single value" },
      { id: 19, question: "What is a higher-order function?", options: ["Function that takes or returns functions", "Function in upper scope", "Complex function", "Advanced function"], correct: "Function that takes or returns functions" },
      { id: 20, question: "What is the purpose of Object.freeze()?", options: ["Make object immutable", "Cool down object", "Stop execution", "Delete properties"], correct: "Make object immutable" },
      { id: 21, question: "What is the difference between == and ===?", options: ["=== checks type and value, == only value", "They are the same", "== is stricter", "=== is deprecated"], correct: "=== checks type and value, == only value" },
      { id: 22, question: "What is the purpose of bind()?", options: ["Set 'this' context", "Connect functions", "Link objects", "Join arrays"], correct: "Set 'this' context" },
      { id: 23, question: "What is the purpose of call() and apply()?", options: ["Invoke functions with specific 'this'", "Call functions", "Apply methods", "Create functions"], correct: "Invoke functions with specific 'this'" },
      { id: 24, question: "What is a generator function?", options: ["Function that can pause and resume", "Function that creates", "Function that generates", "Function that loops"], correct: "Function that can pause and resume" },
      { id: 25, question: "What is the purpose of Symbol in JavaScript?", options: ["Create unique identifiers", "Mathematical symbol", "String type", "Number type"], correct: "Create unique identifiers" },
      { id: 26, question: "What is the purpose of Proxy in JavaScript?", options: ["Intercept object operations", "Network proxy", "Function wrapper", "Object copy"], correct: "Intercept object operations" },
      { id: 27, question: "What is the purpose of Reflect in JavaScript?", options: ["Built-in object for interceptable operations", "Mirror objects", "Copy objects", "Delete objects"], correct: "Built-in object for interceptable operations" },
      { id: 28, question: "What is the purpose of WeakMap?", options: ["Map with weak key references", "Weak data structure", "Small map", "Light map"], correct: "Map with weak key references" },
      { id: 29, question: "What is the purpose of WeakSet?", options: ["Set with weak value references", "Weak collection", "Small set", "Light set"], correct: "Set with weak value references" },
      { id: 30, question: "What is the purpose of Array.from()?", options: ["Create array from array-like object", "Copy array", "Convert array", "Filter array"], correct: "Create array from array-like object" },
      { id: 31, question: "What is the purpose of Array.of()?", options: ["Create array from arguments", "Make array", "Build array", "Generate array"], correct: "Create array from arguments" },
      { id: 32, question: "What is the purpose of Object.assign()?", options: ["Copy properties to target object", "Assign variables", "Create objects", "Delete properties"], correct: "Copy properties to target object" },
      { id: 33, question: "What is the purpose of Object.keys()?", options: ["Get object property names", "Create keys", "Lock object", "Delete keys"], correct: "Get object property names" },
      { id: 34, question: "What is the purpose of Object.values()?", options: ["Get object property values", "Set values", "Create values", "Delete values"], correct: "Get object property values" },
      { id: 35, question: "What is the purpose of Object.entries()?", options: ["Get key-value pairs", "Create entries", "Add entries", "Remove entries"], correct: "Get key-value pairs" },
      { id: 36, question: "What is memoization in JavaScript?", options: ["Caching function results", "Remembering values", "Storing data", "Saving state"], correct: "Caching function results" },
      { id: 37, question: "What is currying in JavaScript?", options: ["Transform multi-argument function to single-argument", "Cooking functions", "Wrapping functions", "Calling functions"], correct: "Transform multi-argument function to single-argument" },
      { id: 38, question: "What is the purpose of setTimeout()?", options: ["Execute code after delay", "Set time", "Create timer", "Stop execution"], correct: "Execute code after delay" },
      { id: 39, question: "What is the purpose of setInterval()?", options: ["Execute code repeatedly at intervals", "Set intervals", "Create loops", "Repeat code"], correct: "Execute code repeatedly at intervals" },
      { id: 40, question: "What is the purpose of clearTimeout()?", options: ["Cancel setTimeout", "Clear time", "Stop timer", "Reset timeout"], correct: "Cancel setTimeout" },
      { id: 41, question: "What is the purpose of clearInterval()?", options: ["Cancel setInterval", "Clear intervals", "Stop loop", "Reset interval"], correct: "Cancel setInterval" },
      { id: 42, question: "What is the purpose of JSON.stringify()?", options: ["Convert object to JSON string", "Create JSON", "Parse JSON", "Format JSON"], correct: "Convert object to JSON string" },
      { id: 43, question: "What is the purpose of JSON.parse()?", options: ["Convert JSON string to object", "Parse strings", "Create objects", "Read JSON"], correct: "Convert JSON string to object" },
      { id: 44, question: "What is the purpose of localStorage?", options: ["Store data in browser persistently", "Local storage space", "Temporary storage", "Session storage"], correct: "Store data in browser persistently" },
      { id: 45, question: "What is the purpose of sessionStorage?", options: ["Store data for session duration", "Store sessions", "Temporary data", "Cache data"], correct: "Store data for session duration" },
      { id: 46, question: "What is the difference between localStorage and sessionStorage?", options: ["localStorage persists, sessionStorage clears on close", "They are the same", "localStorage is faster", "sessionStorage is bigger"], correct: "localStorage persists, sessionStorage clears on close" },
      { id: 47, question: "What is the purpose of fetch()?", options: ["Make HTTP requests", "Get data", "Retrieve information", "Download files"], correct: "Make HTTP requests" },
      { id: 48, question: "What is AJAX in JavaScript?", options: ["Asynchronous JavaScript and XML", "A framework", "A library", "A method"], correct: "Asynchronous JavaScript and XML" },
      { id: 49, question: "What is the purpose of try-catch?", options: ["Handle errors", "Try code", "Catch bugs", "Test code"], correct: "Handle errors" },
      { id: 50, question: "What is the purpose of throw statement?", options: ["Create custom errors", "Throw objects", "Remove errors", "Stop execution"], correct: "Create custom errors" },
    ],
    Python: [
      { id: 1, question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], correct: "Tuple" },
      { id: 2, question: "What is the output of `len('Python')`?", options: ["5", "6", "7", "Error"], correct: "6" },
      { id: 3, question: "Which keyword is used to define a function?", options: ["func", "def", "function", "define"], correct: "def" },
      { id: 4, question: "What is a list comprehension?", options: ["A concise way to create lists", "A loop", "A function", "A class"], correct: "A concise way to create lists" },
      { id: 5, question: "Which operator is used for floor division?", options: ["//", "/", "%", "**"], correct: "//" },
      { id: 6, question: "What does 'self' represent in a class?", options: ["The instance of the class", "A keyword", "A variable", "A function"], correct: "The instance of the class" },
      { id: 7, question: "Which method converts a string to lowercase?", options: ["lower()", "lowercase()", "toLower()", "downcase()"], correct: "lower()" },
      { id: 8, question: "What is a decorator in Python?", options: ["A function modifier", "A variable", "A class", "A module"], correct: "A function modifier" },
      { id: 9, question: "What is the purpose of __init__ method?", options: ["Initialize object attributes", "Create class", "Define methods", "Delete objects"], correct: "Initialize object attributes" },
      { id: 10, question: "What is the difference between list and tuple?", options: ["Lists are mutable, tuples are immutable", "They are the same", "Tuples are faster", "Lists are immutable"], correct: "Lists are mutable, tuples are immutable" },
      { id: 11, question: "What is the purpose of lambda functions?", options: ["Create anonymous functions", "Define variables", "Create classes", "Import modules"], correct: "Create anonymous functions" },
      { id: 12, question: "What is the purpose of map() function?", options: ["Apply function to all items", "Create maps", "Transform data", "Filter items"], correct: "Apply function to all items" },
      { id: 13, question: "What is the purpose of filter() function?", options: ["Filter items based on condition", "Remove duplicates", "Sort items", "Create lists"], correct: "Filter items based on condition" },
      { id: 14, question: "What is the purpose of reduce() function?", options: ["Reduce sequence to single value", "Remove items", "Simplify code", "Decrease size"], correct: "Reduce sequence to single value" },
      { id: 15, question: "What is the purpose of *args in Python?", options: ["Accept variable number of arguments", "Multiply arguments", "Create arguments", "Pass arguments"], correct: "Accept variable number of arguments" },
      { id: 16, question: "What is the purpose of **kwargs in Python?", options: ["Accept keyword arguments", "Power operation", "Create dictionaries", "Pass keywords"], correct: "Accept keyword arguments" },
      { id: 17, question: "What is the purpose of enumerate() function?", options: ["Get index and value in loop", "Count items", "Number items", "Create enumeration"], correct: "Get index and value in loop" },
      { id: 18, question: "What is the purpose of zip() function?", options: ["Combine multiple iterables", "Compress files", "Create tuples", "Join lists"], correct: "Combine multiple iterables" },
      { id: 19, question: "What is the difference between is and ==?", options: ["is checks identity, == checks equality", "They are the same", "is is faster", "== checks type"], correct: "is checks identity, == checks equality" },
      { id: 20, question: "What is the purpose of try-except block?", options: ["Handle exceptions", "Try code", "Test code", "Catch errors"], correct: "Handle exceptions" },
      { id: 21, question: "What is the purpose of with statement?", options: ["Context management", "Create context", "Define scope", "Import modules"], correct: "Context management" },
      { id: 22, question: "What is the purpose of pass statement?", options: ["Placeholder for empty code", "Skip iteration", "Stop loop", "Continue execution"], correct: "Placeholder for empty code" },
      { id: 23, question: "What is the purpose of break statement?", options: ["Exit loop", "Break code", "Stop program", "Create break"], correct: "Exit loop" },
      { id: 24, question: "What is the purpose of continue statement?", options: ["Skip current iteration", "Continue program", "Resume loop", "Next item"], correct: "Skip current iteration" },
      { id: 25, question: "What is the difference between append() and extend()?", options: ["append() adds single item, extend() adds multiple", "They are the same", "extend() is faster", "append() is better"], correct: "append() adds single item, extend() adds multiple" },
      { id: 26, question: "What is the purpose of split() method?", options: ["Split string into list", "Divide string", "Break string", "Separate string"], correct: "Split string into list" },
      { id: 27, question: "What is the purpose of join() method?", options: ["Join list elements into string", "Combine strings", "Merge lists", "Connect items"], correct: "Join list elements into string" },
      { id: 28, question: "What is the purpose of replace() method?", options: ["Replace substring with another", "Change string", "Modify text", "Update string"], correct: "Replace substring with another" },
      { id: 29, question: "What is the purpose of strip() method?", options: ["Remove whitespace from ends", "Delete spaces", "Clean string", "Trim text"], correct: "Remove whitespace from ends" },
      { id: 30, question: "What is a dictionary in Python?", options: ["Key-value pairs collection", "Word list", "Data structure", "Array type"], correct: "Key-value pairs collection" },
      { id: 31, question: "What is the purpose of get() method in dictionaries?", options: ["Get value without KeyError", "Retrieve item", "Find key", "Access value"], correct: "Get value without KeyError" },
      { id: 32, question: "What is the purpose of items() method?", options: ["Get key-value pairs", "List items", "Show elements", "Display data"], correct: "Get key-value pairs" },
      { id: 33, question: "What is the purpose of keys() method?", options: ["Get all keys", "List keys", "Show keys", "Access keys"], correct: "Get all keys" },
      { id: 34, question: "What is the purpose of values() method?", options: ["Get all values", "List values", "Show values", "Access values"], correct: "Get all values" },
      { id: 35, question: "What is a set in Python?", options: ["Unordered unique elements collection", "Array type", "List type", "Dictionary type"], correct: "Unordered unique elements collection" },
      { id: 36, question: "What is the purpose of add() method in sets?", options: ["Add element to set", "Create set", "Update set", "Insert item"], correct: "Add element to set" },
      { id: 37, question: "What is the purpose of remove() method in sets?", options: ["Remove element from set", "Delete set", "Clear set", "Pop item"], correct: "Remove element from set" },
      { id: 38, question: "What is the difference between remove() and discard()?", options: ["remove() raises error if not found, discard() doesn't", "They are the same", "discard() is faster", "remove() is better"], correct: "remove() raises error if not found, discard() doesn't" },
      { id: 39, question: "What is the purpose of union() method?", options: ["Combine sets", "Join sets", "Merge sets", "Add sets"], correct: "Combine sets" },
      { id: 40, question: "What is the purpose of intersection() method?", options: ["Get common elements", "Find overlap", "Match items", "Compare sets"], correct: "Get common elements" },
      { id: 41, question: "What is the purpose of difference() method?", options: ["Get elements in first but not second", "Find difference", "Compare sets", "Subtract sets"], correct: "Get elements in first but not second" },
      { id: 42, question: "What is the purpose of isinstance() function?", options: ["Check object type", "Create instance", "Define type", "Verify class"], correct: "Check object type" },
      { id: 43, question: "What is the purpose of type() function?", options: ["Get object type", "Create type", "Define type", "Check type"], correct: "Get object type" },
      { id: 44, question: "What is multiple inheritance in Python?", options: ["Class inherits from multiple classes", "Multiple objects", "Many classes", "Several instances"], correct: "Class inherits from multiple classes" },
      { id: 45, question: "What is the purpose of super() function?", options: ["Call parent class method", "Create superclass", "Define parent", "Access base"], correct: "Call parent class method" },
      { id: 46, question: "What is a static method in Python?", options: ["Method without self or cls parameter", "Fixed method", "Constant method", "Unchanging method"], correct: "Method without self or cls parameter" },
      { id: 47, question: "What is a class method in Python?", options: ["Method with cls as first parameter", "Method in class", "Class function", "Object method"], correct: "Method with cls as first parameter" },
      { id: 48, question: "What is the purpose of @property decorator?", options: ["Create getter method", "Define property", "Set attribute", "Access field"], correct: "Create getter method" },
      { id: 49, question: "What is the purpose of __str__ method?", options: ["String representation of object", "Convert to string", "Print object", "Display object"], correct: "String representation of object" },
      { id: 50, question: "What is the purpose of __repr__ method?", options: ["Official string representation", "Reproduce object", "Represent object", "Show object"], correct: "Official string representation" },
    ],
    DataScience: [
      { id: 1, question: "Which library is commonly used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], correct: "Pandas" },
      { id: 2, question: "What is supervised learning?", options: ["Learning without labels", "Learning with labels", "Learning with clustering", "None"], correct: "Learning with labels" },
      { id: 3, question: "What does 'overfitting' mean?", options: ["Model performs too well on training data", "Model is too simple", "Model is balanced", "None"], correct: "Model performs too well on training data" },
      { id: 4, question: "Which algorithm is used for classification?", options: ["Linear Regression", "Logistic Regression", "K-means", "PCA"], correct: "Logistic Regression" },
      { id: 5, question: "What is a confusion matrix?", options: ["Performance measurement for classification", "A type of plot", "A data structure", "An algorithm"], correct: "Performance measurement for classification" },
      { id: 6, question: "What does 'NaN' stand for?", options: ["Not a Number", "Null and Nil", "New Array Node", "None"], correct: "Not a Number" },
      { id: 7, question: "Which metric is used for regression models?", options: ["Accuracy", "Precision", "RMSE", "F1-score"], correct: "RMSE" },
      { id: 8, question: "What is feature scaling?", options: ["Normalizing data ranges", "Adding features", "Removing features", "Splitting data"], correct: "Normalizing data ranges" },
      { id: 9, question: "What is the purpose of train_test_split?", options: ["Split data into training and testing sets", "Train model", "Test data", "Validate model"], correct: "Split data into training and testing sets" },
      { id: 10, question: "What is cross-validation?", options: ["Technique to assess model performance", "Data validation", "Model testing", "Error checking"], correct: "Technique to assess model performance" },
      { id: 11, question: "What is the purpose of StandardScaler?", options: ["Standardize features", "Scale data", "Normalize values", "Transform data"], correct: "Standardize features" },
      { id: 12, question: "What is the purpose of MinMaxScaler?", options: ["Scale features to range", "Minimize data", "Maximize values", "Normalize data"], correct: "Scale features to range" },
      { id: 13, question: "What is the difference between classification and regression?", options: ["Classification predicts categories, regression predicts continuous values", "They are the same", "Regression is faster", "Classification is better"], correct: "Classification predicts categories, regression predicts continuous values" },
      { id: 14, question: "What is the purpose of K-means algorithm?", options: ["Clustering data", "Classification", "Regression", "Dimensionality reduction"], correct: "Clustering data" },
      { id: 15, question: "What is the purpose of PCA?", options: ["Reduce dimensionality", "Principal analysis", "Component analysis", "Create features"], correct: "Reduce dimensionality" },
      { id: 16, question: "What is the purpose of Random Forest?", options: ["Ensemble learning method", "Random sampling", "Forest of trees", "Data randomization"], correct: "Ensemble learning method" },
      { id: 17, question: "What is the purpose of Gradient Boosting?", options: ["Ensemble technique combining weak learners", "Gradient calculation", "Boosting performance", "Model optimization"], correct: "Ensemble technique combining weak learners" },
      { id: 18, question: "What is the purpose of SVM?", options: ["Find optimal hyperplane for classification", "Support vectors", "Machine learning", "Vector operations"], correct: "Find optimal hyperplane for classification" },
      { id: 19, question: "What is the purpose of Decision Trees?", options: ["Make decisions based on features", "Tree structure", "Decision making", "Data organization"], correct: "Make decisions based on features" },
      { id: 20, question: "What is the purpose of Neural Networks?", options: ["Model complex patterns", "Network of neurons", "Brain simulation", "Deep learning"], correct: "Model complex patterns" },
      { id: 21, question: "What is the purpose of activation functions?", options: ["Introduce non-linearity", "Activate neurons", "Function activation", "Enable learning"], correct: "Introduce non-linearity" },
      { id: 22, question: "What is backpropagation?", options: ["Algorithm to train neural networks", "Backward propagation", "Error propagation", "Network training"], correct: "Algorithm to train neural networks" },
      { id: 23, question: "What is the purpose of dropout in neural networks?", options: ["Prevent overfitting", "Drop neurons", "Remove connections", "Reduce size"], correct: "Prevent overfitting" },
      { id: 24, question: "What is the purpose of batch normalization?", options: ["Normalize layer inputs", "Batch processing", "Data normalization", "Layer optimization"], correct: "Normalize layer inputs" },
      { id: 25, question: "What is the difference between epoch and iteration?", options: ["Epoch is full pass, iteration is batch pass", "They are the same", "Epoch is smaller", "Iteration is faster"], correct: "Epoch is full pass, iteration is batch pass" },
      { id: 26, question: "What is the purpose of learning rate?", options: ["Control weight update step size", "Rate of learning", "Speed of training", "Model velocity"], correct: "Control weight update step size" },
      { id: 27, question: "What is the purpose of loss function?", options: ["Measure model error", "Calculate loss", "Find mistakes", "Evaluate performance"], correct: "Measure model error" },
      { id: 28, question: "What is the purpose of optimizer?", options: ["Minimize loss function", "Optimize model", "Improve performance", "Adjust weights"], correct: "Minimize loss function" },
      { id: 29, question: "What is gradient descent?", options: ["Optimization algorithm", "Gradient calculation", "Descent method", "Weight update"], correct: "Optimization algorithm" },
      { id: 30, question: "What is stochastic gradient descent?", options: ["Gradient descent with random samples", "Random optimization", "Stochastic method", "Sample descent"], correct: "Gradient descent with random samples" },
      { id: 31, question: "What is the purpose of Adam optimizer?", options: ["Adaptive learning rate optimization", "Advanced optimizer", "Modern method", "Adaptive momentum"], correct: "Adaptive learning rate optimization" },
      { id: 32, question: "What is the purpose of ReLU activation?", options: ["Introduce non-linearity efficiently", "Rectify values", "Linear unit", "Activate neurons"], correct: "Introduce non-linearity efficiently" },
      { id: 33, question: "What is the purpose of Sigmoid activation?", options: ["Output values between 0 and 1", "S-shaped function", "Smooth activation", "Binary output"], correct: "Output values between 0 and 1" },
      { id: 34, question: "What is the purpose of Softmax activation?", options: ["Convert to probability distribution", "Soft maximum", "Multi-class output", "Normalize output"], correct: "Convert to probability distribution" },
      { id: 35, question: "What is precision in classification?", options: ["True positives / (True positives + False positives)", "Accuracy measure", "Precise prediction", "Correct ratio"], correct: "True positives / (True positives + False positives)" },
      { id: 36, question: "What is recall in classification?", options: ["True positives / (True positives + False negatives)", "Memory measure", "Recall rate", "Detection rate"], correct: "True positives / (True positives + False negatives)" },
      { id: 37, question: "What is F1-score?", options: ["Harmonic mean of precision and recall", "F-measure", "Combined metric", "Performance score"], correct: "Harmonic mean of precision and recall" },
      { id: 38, question: "What is ROC curve?", options: ["Receiver Operating Characteristic curve", "Rate curve", "Operating curve", "Classification curve"], correct: "Receiver Operating Characteristic curve" },
      { id: 39, question: "What is AUC in machine learning?", options: ["Area Under Curve", "Accuracy measure", "Average score", "Assessment metric"], correct: "Area Under Curve" },
      { id: 40, question: "What is the purpose of GridSearchCV?", options: ["Find optimal hyperparameters", "Grid search", "Cross-validation", "Parameter tuning"], correct: "Find optimal hyperparameters" },
      { id: 41, question: "What is the purpose of RandomizedSearchCV?", options: ["Random hyperparameter search", "Randomized search", "Parameter sampling", "Quick tuning"], correct: "Random hyperparameter search" },
      { id: 42, question: "What is feature engineering?", options: ["Creating new features from existing data", "Engineering features", "Feature creation", "Data transformation"], correct: "Creating new features from existing data" },
      { id: 43, question: "What is feature selection?", options: ["Choosing relevant features", "Selecting data", "Feature picking", "Data filtering"], correct: "Choosing relevant features" },
      { id: 44, question: "What is one-hot encoding?", options: ["Convert categories to binary vectors", "Hot encoding", "Binary transformation", "Category encoding"], correct: "Convert categories to binary vectors" },
      { id: 45, question: "What is label encoding?", options: ["Convert categories to numbers", "Label transformation", "Number encoding", "Category numbering"], correct: "Convert categories to numbers" },
      { id: 46, question: "What is the purpose of pandas DataFrame?", options: ["2D labeled data structure", "Data frame", "Table structure", "Data container"], correct: "2D labeled data structure" },
      { id: 47, question: "What is the purpose of NumPy arrays?", options: ["Efficient numerical operations", "Array storage", "Number arrays", "Data arrays"], correct: "Efficient numerical operations" },
      { id: 48, question: "What is the purpose of Matplotlib?", options: ["Data visualization", "Plotting library", "Graph creation", "Chart making"], correct: "Data visualization" },
      { id: 49, question: "What is the purpose of Seaborn?", options: ["Statistical data visualization", "Advanced plotting", "Beautiful plots", "Statistical graphics"], correct: "Statistical data visualization" },
      { id: 50, question: "What is the purpose of scikit-learn?", options: ["Machine learning library", "Science kit", "Learning tools", "ML algorithms"], correct: "Machine learning library" },
    ],
  };

  const categoryIcons = {
    React: <Code className="w-5 h-5" />,
    JavaScript: <Zap className="w-5 h-5" />,
    Python: <Brain className="w-5 h-5" />,
    DataScience: <Database className="w-5 h-5" />,
  };

  const categories = Object.keys(quizCategories);

  const [userName, setUserName] = useState("Guest");
  const [userCredit, setUserCredit] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  
  // Track quiz attempts - load from localStorage initially
  const [quizAttempts, setQuizAttempts] = useState(() => {
    const saved = localStorage.getItem('quizAttempts');
    return saved ? JSON.parse(saved) : {};
  });
  const [hasAttemptedCurrentQuiz, setHasAttemptedCurrentQuiz] = useState(false);

  const questions = quizCategories[currentCategory];

  // Show notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Save quiz attempts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quizAttempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  // Check if user has attempted the current quiz
  useEffect(() => {
    const attempted = quizAttempts[currentCategory] || false;
    setHasAttemptedCurrentQuiz(attempted);
  }, [currentCategory, quizAttempts]);

  // Fetch user profile and quiz attempts from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
          showNotification("⚠️ Please login to continue", "warning");
          setUserName("Guest");
          setUserCredit(0);
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/user/profile`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        const user = res.data?.user || res.data;
        setUserName(user?.name || "User");
        setUserCredit(user?.creditBalance ?? 0);
        
        // Merge backend quiz attempts with local storage (local storage takes precedence)
        const backendAttempts = user?.quizAttempts || {};
        const localAttempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
        const mergedAttempts = { ...backendAttempts, ...localAttempts };
        setQuizAttempts(mergedAttempts);
        localStorage.setItem('quizAttempts', JSON.stringify(mergedAttempts));
        
        showNotification(`Welcome back, ${user?.name || "User"}! 👋`, "success");
      } catch (err) {
        console.error("Error fetching profile:", err);
        const errorMessage = err.response?.data?.message || "Failed to fetch user profile";
        setError(errorMessage);
        showNotification(`❌ ${errorMessage}`, "error");
        
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUserName("Guest");
          setUserCredit(0);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [BASE_URL]);

  // Mark quiz as attempted
  const markQuizAsAttempted = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Always update localStorage first
      setQuizAttempts(prev => {
        const updated = { ...prev, [currentCategory]: true };
        localStorage.setItem('quizAttempts', JSON.stringify(updated));
        return updated;
      });
      setHasAttemptedCurrentQuiz(true);
      
      if (!token) {
        // For guests, only store in localStorage
        return;
      }

      // Update backend
      await axios.put(
        `${BASE_URL}/api/user/quiz-attempt`,
        { category: currentCategory },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      
    } catch (err) {
      console.error("Error marking quiz as attempted:", err);
      // LocalStorage is already updated, so quiz will remain locked
    }
  };

  // Add points to user account via backend
  const addPointsToUser = async () => {
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        showNotification("⚠️ Please login to save points", "warning");
        return;
      }

      const res = await axios.put(
        `${BASE_URL}/api/user/addpoint`, 
        {}, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      const updatedCredit = res.data?.creditBalance ?? res.data?.user?.creditBalance;
      
      if (updatedCredit !== undefined) {
        setUserCredit(updatedCredit);
      } else {
        setUserCredit((prev) => prev + 40);
      }

      showNotification("🎉 +40 points added!", "success");
    } catch (err) {
      console.error("Error adding points:", err);
      const errorMessage = err.response?.data?.message || "Failed to add points";
      showNotification(`⚠️ ${errorMessage}`, "error");
      
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        showNotification("🔒 Session expired. Please login again.", "warning");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAnswer = async (option) => {
    if (selected) return;

    setSelected(option);
    const currentQ = questions[currentIndex];

    if (option === currentQ.correct) {
      setScore((prev) => prev + 20);
      setStreak((prev) => prev + 1);
      await addPointsToUser();
      
      if (streak >= 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        setCompleted(true);
        // Mark quiz as completed when user finishes
        markQuizAsAttempted();
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setCompleted(false);
    setStreak(0);
  };

  const changeCategory = (cat) => {
    setCurrentCategory(cat);
    resetQuiz();
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen mt-10 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              notification.type === "success" ? "bg-green-500 text-white" :
              notification.type === "error" ? "bg-red-500 text-white" :
              "bg-yellow-500 text-white"
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Loading your profile...</p>
          </div>
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'][i % 5],
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl w-full bg-transparent overflow-hidden relative z-10">
        {/* Header Section */}
        <div className="p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl text-amber-300 font-bold">Welcome, <span className="text-red-600">{userName}!</span></h1>
                <p className="text-purple-100 text-sm">Keep learning, keep growing 🚀</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 ml-20 bg-white/20 px-4 py-2 rounded-full">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-2xl text-red-700 font-bold">{userCredit}</span>
                {isUpdating && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                )}
              </div>
              <p className="text-bold text-purple-100 mt-1">Total Credits</p>
            </div>
          </div>

          {/* Streak indicator */}
          {streak > 0 && !hasAttemptedCurrentQuiz && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-orange-500/30 px-3 py-1 rounded-full w-fit"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">{streak} Streak! 🔥</span>
            </motion.div>
          )}
        </div>

        <div className="p-8">
          {/* Category Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="text-white">Choose Your Challenge</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const isAttempted = quizAttempts[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => !isAttempted && changeCategory(cat)}
                    disabled={isAttempted}
                    className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex flex-col items-center gap-2 relative ${
                      currentCategory === cat
                        ? "bg-gradient-to-br bg-transparent border text-white hover:bg-amber-600"
                        : isAttempted
                        ? "bg-gray-300 border text-gray-500 cursor-not-allowed opacity-60"
                        : "bg-transparent border text-white hover:bg-amber-500"
                    }`}
                  >
                    {isAttempted && (
                      <div className="absolute top-2 right-2">
                        <Lock className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    {categoryIcons[cat]}
                    <span className="text-sm">{cat}</span>
                    {isAttempted && (
                      <span className="text-xs text-gray-600">Completed</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quiz Locked Message */}
          {hasAttemptedCurrentQuiz && !completed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white p-12 rounded-3xl">
                <Lock className="w-20 h-20 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quiz Already Completed! 🔒</h2>
                <p className="text-gray-100 mb-6">
                  You've already taken the {currentCategory} quiz. Each quiz can only be attempted once.
                </p>
                <p className="text-gray-200">
                  Choose another category to continue learning!
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Progress Bar */}
              {!completed && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                    <span className="font-semibold text-purple-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-3 bg-amber-400 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        background: "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}

              {/* Quiz Section */}
              {!completed ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-amber-600 rounded-2xl mb-6 p-4">
                      <h2 className="text-xl font-bold text-white">
                        {questions[currentIndex].question}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {questions[currentIndex].options.map((option, idx) => {
                        const isCorrect = option === questions[currentIndex].correct;
                        const isSelected = selected === option;
                        const letters = ['A', 'B', 'C', 'D'];

                        return (
                          <motion.button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            disabled={selected !== null}
                            whileHover={selected === null ? { scale: 1.02 } : {}}
                            whileTap={selected === null ? { scale: 0.98 } : {}}
                            className={`p-4 rounded-xl border-2 font-medium transition-all duration-300 text-white flex items-center gap-3 ${
                              isSelected
                                ? isCorrect
                                  ? "bg-green-500 text-white border-green-600 shadow-lg"
                                  : "bg-red-500 text-white border-red-600 shadow-lg"
                                : "hover:bg-amber-500 border-gray-300 hover:border-purple-400"
                            } ${selected !== null && !isSelected ? "opacity-40" : ""}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              isSelected
                                ? isCorrect
                                  ? "bg-green-600"
                                  : "bg-red-600"
                                : "bg-purple-100 text-purple-600"
                            }`}>
                              {letters[idx]}
                            </div>
                            <span>{option}</span>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between bg-amber-500 p-4 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700 font-medium">Current Score:</span>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">
                        {score} <span className="text-sm text-gray-600">/ {questions.length * 20}</span>
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-12 rounded-3xl mb-6">
                    <Trophy className="w-20 h-20 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Quiz Completed! 🎉</h2>
                    <p className="text-purple-100 mb-6">Great job on finishing the {currentCategory} quiz!</p>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
                      <p className="text-5xl font-bold mb-2">{score}</p>
                      <p className="text-lg">out of {questions.length * 20} points</p>
                      <div className="mt-4 text-sm">
                        <p>Correct Answers: {score / 20} / {questions.length}</p>
                        <p>Accuracy: {Math.round((score / (questions.length * 20)) * 100)}%</p>
                      </div>
                    </div>

                    <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <p className="text-sm font-semibold flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        This quiz is now locked. You cannot retake it.
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Ready for another challenge? Choose a different category above!
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;