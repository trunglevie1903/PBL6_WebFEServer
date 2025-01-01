import React, {CSSProperties} from "react";

import { HeaderLeftSection } from "./HeaderLeftSection";
import { HeaderRightSection } from "./HeaderRightSection";

export const WatchVideoPageHeader: React.FC = () => {
    const styles: {[key: string]: CSSProperties} = {
      wrapper: {
        margin: "0 auto",
        width: "100%",
        paddingLeft: "10%",
        paddingRight: "10%",
        height: "100%",
        display: "flex",
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent:"space-between",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#a47864",
      }
    };
  
    return (
      <header style={{
        width: "100%",
      }}>
        <div style={styles.wrapper}>
          <HeaderLeftSection />
          <HeaderRightSection />
        </div>
      </header>
    )
};