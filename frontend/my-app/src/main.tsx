import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { createRoot } from 'react-dom/client';
// // `root` エレメントが存在するか確認
// const root = createRoot(document.getElementById('root')!);
// console.log('Root element:', root);

// if (root) {
//   root.render(<App />);
// } else {
//   console.error('Root element not found');
// }

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'               // 削除
  
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>  
//     <App />
//   </React.StrictMode>,  
// )
