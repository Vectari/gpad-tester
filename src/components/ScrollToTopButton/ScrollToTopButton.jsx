import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { Theme } from "../../styles/Theme";

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 50px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background-color: ${Theme.interface};
  color: ${Theme.white};
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0.8;
  z-index: 1000;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  @media (max-width: 765px) {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
  }
`;

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <ScrollButton onClick={scrollToTop} aria-label="Scroll to top">
      <FaArrowUp />
    </ScrollButton>
  );
};

export default ScrollToTopButton;
