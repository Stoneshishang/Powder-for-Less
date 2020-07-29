import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} Powder for Less</p>
    </footer>
  );
}

export default Footer;
