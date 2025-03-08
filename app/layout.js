import React from 'react';
import Navbar from './VisualizeSort/Navbar';
import '../styles/globals.css'; 

export default function Layout({ children }) {
  return (
    <div>
      <Navbar/>

      <main>{children}</main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 Sorting Visualizer. All rights reserved.</p>
      </footer>
    </div>
  );
}