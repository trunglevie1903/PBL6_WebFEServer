import { CSSProperties } from "react";
import { ChangeAvtForm } from "./ChangeAvtForm";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const MyProfileContent: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "calc(max(90%, 100% - 10em))",
      paddingLeft: "1em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1em",
    },
    header: {
      fontSize: "1.5em",
      fontWeight: "bold",
      textDecoration: "underline"
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.header}>
        My Profile
      </p>
      <ChangeAvtForm />
      <ChangePasswordForm />
    </div>
  );
};