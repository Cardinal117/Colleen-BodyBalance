import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Grounded from './pages/Grounded';
import PersonalTraining from './pages/PersonalTraining';
import VirtualTrainer from './pages/VirtualTrainer';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBlogEditor from './pages/admin/BlogEditor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/grounded" element={<Grounded />} />
          <Route path="/personal-training" element={<PersonalTraining />} />
          <Route path="/virtual-trainer" element={<VirtualTrainer />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/editor" element={<AdminBlogEditor />} />
          <Route path="/admin/editor/:slug" element={<AdminBlogEditor />} />
          
          {/* Additional routes will be added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
