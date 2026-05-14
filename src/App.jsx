import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RecipeDetail from './RecipeDetail';
import My404 from './My404';

// Main app
function App() {
  return (
    // Define the page routes
    <Router basename="/final-project">
      <Routes>
        {/* homepage route */}
        <Route index element={<Home />} />

        {/* RecipeDetail route using a dynamic segment */}
        <Route path="recipe/:mealId" element={<RecipeDetail />} /> 

        {/* 404 page route */}
        <Route path="*" element={<My404 />} /> 
      </Routes>
    </Router>
  );
}

export default App
