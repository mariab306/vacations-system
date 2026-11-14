import { Link } from 'react-router-dom';

export function About() {
  return (
    <div>
      <h1>About Vacations System</h1>

      <section>
        <h2>System Overview</h2>
        <p>
          Vacations & Likes is a full-stack vacation management and discovery platform
          designed to connect travelers with curated holiday destinations while providing
          administrators with real-time engagement analytics.
        </p>
        <ul>
          <li>
            <strong>Users:</strong> Browse upcoming and active vacations, filter by personal
            favorites or dates, toggle Likes on destinations, get AI-powered travel tips,
            and query vacation data using natural language.
          </li>
          <li>
            <strong>Administrators:</strong> Create, update, and delete vacation packages,
            monitor total user engagement through interactive charts, and export analytics reports to CSV.
          </li>
        </ul>
      </section>

      <section>
        <h2>Developer Details</h2>
        <p><strong>Developer:</strong> Maria Bronshtein</p>
        <p><strong>Role:</strong> Full-Stack Web Developer</p>
      </section>

      <div>
        <Link to="/vacations">Explore Vacations</Link>  <Link to="/login">Login</Link>  <Link to="/register">Register</Link>
      </div>
    </div>
  );
}