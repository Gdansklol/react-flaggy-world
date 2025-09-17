import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Navbar.css";

const Navbar = () => {
  const location = useLocation(); 
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const routes = ["/", "/countries", "/collection", "/quiz", "/leaderboard"];
    const currentIndex = routes.indexOf(location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location]);

  const buttons = [
    { to: "/", icon: "🏠", color: "tomato" },
    { to: "/countries", icon: "🌍", color: "coral" },
    { to: "/collection", icon: "📁", color: "blue" },
    { to: "/quiz", icon: "📝", color: "mediumorchid" },
    { to: "/leaderboard", icon: "🏆", color: "green" },
  ];

  return (
    <nav className="menu">
      {buttons.map((btn, index) => (
        <Link
          key={btn.to}
          to={btn.to}
          className={`btn ${activeIndex === index ? "active" : ""}`}
          style={{ "--clr": btn.color }}
          onClick={() => setActiveIndex(index)} 
        >
          <i>{btn.icon}</i>
        </Link>
      ))}

      <div
        className="indicator"
        style={{
          transform: `translateX(calc(${activeIndex} * 80px))`,
        }}
      ></div>
    </nav>
  );
};

export default Navbar;
