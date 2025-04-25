import React from 'react'
import './styles.css'

const CategoryTabs = ({categories, activeCategory, onCategoryChange}) => (
  <div className="category-tabs">
    {categories.map((category, index) => (
      <button
        key={category.menu_category_id}
        type="button"
        className={`tab ${activeCategory === index ? 'active' : ''}`}
        onClick={() => onCategoryChange(index)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default CategoryTabs
