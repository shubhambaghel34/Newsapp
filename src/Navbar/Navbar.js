import React from "react";
import { Link, NavLink } from "react-router-dom";
import countryCodes from "../config/countries";

const categories = [
  ["/", "Top stories"],
  ["/business", "Business"],
  ["/technology", "Technology"],
  ["/science", "Science"],
  ["/health", "Health"],
  ["/entertainment", "Culture"],
  ["/sports", "Sport"]
];

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryOptions = countryCodes
  .map((code) => ({
    code,
    name: countryNames.of(code.toUpperCase())
  }))
  .sort((first, second) => first.name.localeCompare(second.name));

const Navbar = ({ country, onCountryChange }) => {
  return (
    <header className="site-header">
      <div className="site-header__masthead">
        <Link className="site-brand" to="/" aria-label="Briefly home">
          <span className="site-brand__mark" aria-hidden="true">B</span>
          <span>briefly</span>
        </Link>
        <span className="site-header__tagline">A clearer take on today</span>
        <div className="country-picker">
          <label className="country-picker__label" htmlFor="country-picker">
            Edition
          </label>
          <select
            id="country-picker"
            className="country-picker__select"
            value={country}
            onChange={(event) => onCountryChange(event.target.value)}
            aria-label="Select country edition"
          >
            {countryOptions.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
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
