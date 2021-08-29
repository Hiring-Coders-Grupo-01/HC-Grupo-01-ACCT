import React, { useState, useEffect } from "react";

//progress circle wraper
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

//font awesome icons
import '../../assets/icons/fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// make circle styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function ProgressWraper() {
  // set scroll top
  const [scrollTop, setScrollTop] = useState(0);
  const classes = useStyles();

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
    <div>
      <div className={classes.root}>
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
        <div style={{
          color: "white",
          zIndex: 99999,
          position: "fixed",
          bottom: 114,
          right: 117
        }}>
          <a href="#" style={{ scrollBehavior: "smooth" }}>
            <FontAwesomeIcon icon="angle-double-up" style={{ color: "#fcc200" }} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProgressWraper;
