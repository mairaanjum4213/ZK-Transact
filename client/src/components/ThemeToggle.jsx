import React, { useState, useEffect } from 'react';
import "../css/ThemeToggle.css"
import { useTheme } from '../contexts/Theme';
export default function ThemeToggle() {


  return (
    <>
      {isDarkTheme ? 'Dark Mode' : 'Light Mode'}


      <div className="custom-checkbox">
        <input
          type="checkbox"
          id="custom-checkbox-input"
          checked={isDarkTheme}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="custom-checkbox-input"></label>
      </div>
    </>
  );
}
