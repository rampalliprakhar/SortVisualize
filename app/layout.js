import React from 'react';
import Navbar from './VisualizeSort/Navbar';
import '../styles/globals.css'; 

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet='UTF-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <title>Sorting Visualizer</title>
      </head>
      <body>
        <Navbar/>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2025 Sorting Visualizer. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}