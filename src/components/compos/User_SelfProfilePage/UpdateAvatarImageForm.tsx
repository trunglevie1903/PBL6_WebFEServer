import React, { useState, CSSProperties } from "react";
import axios from "axios";
import checkValidToken from "../../functions/checkValidToken";

interface FormInputPropType {
  avatarImage: string;  // Input prop to receive initial image
}

const UpdateAvatarImageForm: React.FC<FormInputPropType> = ({ avatarImage }) => {
  const [state_previewImage, set_previewImage] = useState<string>(avatarImage);
  const [state_selectedImage, set_selectedImage] = useState<File | null>(null);
  const [state_isButtonHovered, set_isButtonHovered] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state_selectedImage) {
      alert("Please select an image");
      return;
    }

    try {
      const isValid = await checkValidToken();
      if (!isValid) throw new Error("You are not allowed to perform this action");

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://127.0.0.1:4000/user/update-self-avatar-image",
          { avatarImage: base64String },
          { headers: { "Authorization": `Bearer ${accessToken}` } }
        );

        if (response.status !== 200) throw response;
        alert("Avatar image updated successfully");
        window.location.reload();
      };

      reader.readAsDataURL(state_selectedImage);
    } catch (error) {
      alert(error instanceof Error ? error.message : error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      set_selectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        set_previewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const styles: { [key: string]: CSSProperties } = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      gap: "10px",
    },
    imagePreviewAndInputWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
    },
    imagePreview: {
      width: "128px",
      height: "128px",
      borderRadius: "5px",
      objectFit: "cover",
      border: "1px solid #ddd",
    },
    input: {
      fontSize: "16px",
      padding: "5px",
    },
    button: {
      border: state_isButtonHovered ? "1px solid black" : "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: state_isButtonHovered ? "#ddd" : "white",
      padding: "5px 10px",
    },
  };

  return (
    <form onSubmit={onSubmit} style={styles.wrapper}>
      <h5>Avatar image</h5>
      <div style={styles.imagePreviewAndInputWrapper}>
        <img src={state_previewImage} alt="Avatar preview" style={styles.imagePreview} />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={styles.input} 
        />
      </div>
      <div>
        <button
          onMouseEnter={() => set_isButtonHovered(true)}
          onMouseLeave={() => set_isButtonHovered(false)}
          style={styles.button}
          type="submit"
        >
          Update Avatar Image
        </button>

      </div>
    </form>
  );
};

export default UpdateAvatarImageForm;
