import React from "react";

type PageLayoutProps = {
  children: React.ReactNode;
  darkMode?: boolean;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, darkMode }) => {
  return (
    <div className={`h-full ${darkMode ? "dark-mode" : "light-mode"}`}>
      <body className="h-full">{children}</body>
    </div>
  );
};

export default PageLayout;

// import React from "react";

// type PageLayoutProps = {
//   children: React.ReactNode;
//   darkMode?: boolean;
// };

// const PageLayout: React.FC<PageLayoutProps> = ({ children, darkMode }) => {
//   return (
//     <div className={`h-full ${darkMode ? "dark-mode" : "light-mode"}`}>
//       {children}
//     </div>
//   );
// };

// export default PageLayout;