<h1>📰 Readora Frontend</h1>

<p><strong>Readora</strong> is a dynamic article-centric web application where users can create and manage their own content. Users can set reading preferences, write articles, interact through likes/dislikes, and explore content via vertical pagination and search. This is the frontend repository built using React.js and Tailwind CSS.</p>

---

<h2>🔧 Tech Stack</h2>
<ul>
  <li>React.js (v19, with TypeScript)</li>
  <li>Vite (for fast builds and development)</li>
  <li>Redux (for state management)</li>
  <li>Axios (for API communication)</li>
  <li>Tailwind CSS (for modern utility-first styling)</li>
  <li>shadcn/ui (for beautiful, composable UI components)</li>
  <li>Lucide React & React Icons (for icons)</li>
  <li>Yup (for form validation)</li>
  <li>Sonner (for notifications)</li>  
</ul>

---

<h2>📁 Folder Structure</h2>

<pre>
/readora-frontend
│
├── <b>public/</b>               # Static files
├── <b>style.css</b>             # Tailwind & custom styles
├── <b>App.tsx</b>               # App layout and routes
├── <b>main.tsx</b>              # React root entry
│
└── <b>/src</b>
    ├── <b>api/axiosInstance</b>      # Axios setup
    ├── <b>assets/</b>                # Images and static resources
    ├── <b>components/</b>            # Reusable UI components
    ├── <b>config/</b>                # Configurations (e.g., base URLs)
    ├── <b>hooks/</b>                 # Custom React hooks (e.g., debounce)
    ├── <b>lib/</b>                   # UI library integrations (e.g., shadcn)
    ├── <b>pages/</b>                 # Main page components (Home, Profile, Article etc.)
    ├── <b>redux/</b>                 # State slices and store setup
    ├── <b>utils/</b>                 # Utility functions
</pre>

---

<h2>✨ Key Features</h2>
<ul>
  <li>👤 User Profile Creation & Preference Selection</li>
  <li>📝 Article CRUD (Create, Edit, Archive/Delete)</li>
  <li>❤️ Like / Dislike Articles</li>
  <li>🔍 Search Articles (with debounce)</li>
  <li>📜 Infinite Vertical Pagination</li>
  <li>✅ Form Validation using Yup</li>
  <li>🌈 Beautiful UI with Tailwind CSS + shadcn</li>
  <li>🔔 Toast Notifications (Sonner)</li>
</ul>

<h2>🚀 Getting Started</h2>

<h3>📥 1. Clone the Repository</h3>
<pre><code>git clone https://github.com/yourusername/devlink-backend.git
cd devlink-backend
</code></pre>

 

<h3>📦 2. Install Dependencies</h3>
<pre><code>yarn install
</code></pre>

<h3>⚙️ 3. Setup Environment Variables</h3>
<pre><code>touch .env
</code></pre>

<p>Then add the following to your <code>.env</code> file:</p>
<pre><code>VITE_REACT_APP=VITE_LATEST_TS
VITE_ADMIN_PROFILE_PICTURE=https://your-image-url.com
VITE_STRIPE_PUBLISABLE_KEY=your_stripe_key
VITE_GEMINI_CHATBOT_API_KEY=your_gemini_api_key
VITE_BASE_URL=https://your-frontend-url.com
VITE_BASE_URL=http://localhost:5173
VITE_SERVER_URL=https://your-backend-url.com
VITE_SERVER_URL=http://localhost:3000
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your_cloud/image/upload
</code></pre>

<h3>▶️ 4. Run the App Locally</h3>
<pre><code>yarn dev
</code></pre>

<h2>📌 Notes</h2>
<ul>
  <li>Ensure backend is running at the specified <code>VITE_SERVER_URL</code></li>
  <li>Cloudinary is used for article images – set up your credentials there</li>
  <li>Gemini API is optional – used for AI-enhanced interactions</li>
</ul>

<h2>📣 Contributing</h2>
<p>Not open for contibutions</p>

<h2>🪪 License</h2>
<p>MIT © Readora</p>
