import React, { useState, useEffect } from "react";
import { Container, LinkA } from './styled'

//progress circle wraper
import CircularProgress from "@material-ui/core/CircularProgress";

function ProgressWraper() {
  // set scroll top
  const [scrollTop, setScrollTop] = useState(0);

  // get scroll location and transform in percent
  const onScroll = () => {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;

    setScrollTop(scrolled);
  };

  // add and remove events
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Container>
      <div>
        <CircularProgress
          variant="determinate"
          value={scrollTop}
          className="circular"
          style={{
            position: "fixed",
            bottom: 100,
            right: 100,
            padding: "3px",
            backgroundColor: "#292929",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            color: "#fcc200",
            zIndex: 99998
          }}
        />
        <div>
          <LinkA href="#" style={{
            zIndex: 99999,
            position: "fixed",
            bottom: 113,
            right: 116
          }}>
            <svg width="12" height="12" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.64502 9.71924L15.2856 16.3599C15.7446 16.8188 15.7446 17.561 15.2856 18.0151L14.1821 19.1187C13.7231 19.5776 12.981 19.5776 12.5269 19.1187L7.81494 14.4165L3.10791 19.1235C2.64893 19.5825 1.90674 19.5825 1.45264 19.1235L0.344238 18.02C-0.114746 17.561 -0.114746 16.8188 0.344238 16.3647L6.98486 9.72412C7.44385 9.26026 8.18604 9.26025 8.64502 9.71924V9.71924ZM6.98486 0.344238L0.344238 6.98486C-0.114746 7.44385 -0.114746 8.18604 0.344238 8.64014L1.44775 9.74365C1.90674 10.2026 2.64893 10.2026 3.10303 9.74365L7.81006 5.03662L12.5171 9.74365C12.9761 10.2026 13.7183 10.2026 14.1724 9.74365L15.2759 8.64014C15.7349 8.18115 15.7349 7.43897 15.2759 6.98486L8.63525 0.344238C8.18604 -0.114746 7.44385 -0.114746 6.98486 0.344238Z" fill="white" />
            </svg>
          </LinkA>
        </div>
      </div>
    </Container>
  );
}

export default ProgressWraper;