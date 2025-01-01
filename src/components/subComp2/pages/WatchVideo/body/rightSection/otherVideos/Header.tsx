import React, { CSSProperties } from "react";

export const SectionHeader: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    headerWrapper: {
      width: "100%",
      marginBottom: "1em",
    },
    headerText: {
      padding: ".5em",
      fontWeight: "bold",
    }
  };
  return (
    <div style={styles.headerWrapper}>
      <p style={styles.headerText}>
        Other videos
      </p>
      <hr />
    </div>
  );
};