import React, { useState, CSSProperties } from "react";
import axios from "axios";
import checkValidToken from "../../functions/checkValidToken";

interface FormInputPropType {
  bannerImage: string;  // Input prop to receive initial image
}

const UpdateBannerImageForm: React.FC<FormInputPropType> = ({ bannerImage }) => {
  const [state_previewImage, set_previewImage] = useState<string>(bannerImage);
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
          "http://127.0.0.1:4000/user/update-self-banner-image",
          { bannerImage: base64String },
          { headers: { "Authorization": `Bearer ${accessToken}` } }
        );

        if (response.status !== 200) throw response;
        alert("Banner image updated successfully");
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
      width: "720px",
      height: "160px",
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
      <h5>Banner image</h5>
      <div style={styles.imagePreviewAndInputWrapper}>
        <img src={state_previewImage} alt="Banner preview" style={styles.imagePreview} />
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
          Update Banner Image
        </button>

      </div>
    </form>
  );
};

export default UpdateBannerImageForm;
