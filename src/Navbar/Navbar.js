import React from "react";
import { Link, NavLink } from "react-router-dom";

const categories = [
  ["/", "Top stories"],
  ["/business", "Business"],
  ["/technology", "Technology"],
  ["/science", "Science"],
  ["/health", "Health"],
  ["/entertainment", "Culture"],
  ["/sports", "Sport"]
];

const Navbar = () => {
  return (
    <header className="site-header">
      <div className="site-header__masthead">
        <Link className="site-brand" to="/" aria-label="Briefly home">
          <span className="site-brand__mark" aria-hidden="true">B</span>
          <span>briefly</span>
        </Link>
        <span className="site-header__tagline">A clearer take on today</span>
        <span className="site-header__edition">Independent headlines</span>
      </div>
      <nav className="category-nav" aria-label="News categories">
        <div className="category-nav__inner">
          {categories.map(([path, label], index) => (
            <NavLink
              key={path}
              exact={index === 0}
              to={path}
              className="category-nav__link"
              activeClassName="category-nav__link--active"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
