import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function ProgressWraper() {
  const [scrollTop, setScrollTop] = useState(0);
  const classes = useStyles();

  const onScroll = () => {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;

    setScrollTop(scrolled);
  };

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
          }}
        />
        <h3 style={{ color: "white", zIndex: 99999, position: "fixed", bottom: 93, right: 117 }}>$</h3>
      </div>
    </div>
  );
}

export default ProgressWraper;
