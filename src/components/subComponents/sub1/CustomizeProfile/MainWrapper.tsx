import React, { CSSProperties, useEffect, useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface CustomizeProfileData {
  bannerImage: string;
  avatarImage: string;
  name: string;
  username: string;
  description: string;
}

const MainWrapper: React.FC = () => {
  const {
    register, handleSubmit, formState: { errors }, reset
  } = useForm<CustomizeProfileData>();

  const [bannerImage, setBannerImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

  const bannerImageInput = useRef<HTMLInputElement | null>(null);
  const avatarImageInput = useRef<HTMLInputElement | null>(null);

  const handleButtonUploadBanner = () => {
    if (bannerImageInput.current) bannerImageInput.current.click();
  };
  const handleButtonUploadAvatar = () => {
    if (avatarImageInput.current) avatarImageInput.current.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   "http://127.0.0.1:4000/test", {}
        // );
        // const data = await response.data;
        const data = {
          bannerImage: "",
          avatarImage: "",
          name: "",
          username: "",
          description: ""
        };
        reset(data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) alert(`Error: ${err.response?.data.message || "Request failed"}`);
        else alert(`Error: ${err}`);
      }
    };
    fetchData();
  }, [reset]);

  const onSubmit: SubmitHandler<CustomizeProfileData> = async (data) => {
    try {
      console.log('data: ', data);
      const response = await axios.post(
        "http://127.0.0.1:4000/test", data, {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log('response: ', response);
      // if (response.statusText !== "200") throw response;
      // alert(`Updated new profile's data`);
      // setTimeout(() => {
      //   window.location.href = "/"
      // }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) alert(`Error: ${err.response?.data.message || "Request failed"}`);
      else alert(`Error: ${err}`);
    }
  };

  return (
    <div style={styles.content} className="content">
      <form>
        
        <div style={styles.contentHeader} className="contentHeader">
          <div style={styles.headerLeft} className="headerLeft">
            <h4>Profile</h4>
          </div>
          <div className="headerRight">
            <button type="button" style={styles.headerRight_button}>Reset</button>
            <button type="button" onClick={handleSubmit(onSubmit)} style={styles.headerRight_button}>Update</button>
          </div>
        </div>

        <div style={styles.contentForm} className="contentForm">
          <div style={styles.customizationSection} className="bannerCustomization">
            <h4 style={styles.customizationLabel}>Banner</h4>
            <div style={styles.formGroup_image} className="formGroup_image">
              <div style={styles.imagePreview} className="imagePreview">
                <img style={{
                  width: "150px", height: "150px"
                }} src={bannerImage} alt="Banner" />
              </div>
              <div style={styles.imageUpload} className="imageUpload">
                <p style={styles.imageUpload_p}>Upload your new banner here</p>
                <button type="button" style={styles.imageUpload_button} onClick={handleButtonUploadBanner}>Upload</button>
                <input type="file" accept="image/*" {
                  ...register("bannerImage", {})
                } onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    if (file) {
                      // console.log('file: ', file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setBannerImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }} ref={bannerImageInput} style={{display: "none"}} />
              </div>
            </div>
            { errors.bannerImage && <span>{errors.bannerImage.message || "Invalid data"}</span> }
          </div>

          <div style={styles.customizationSection} className="avatarCustomization">
            <h4 style={styles.customizationLabel}>Avatar</h4>
            <div style={styles.formGroup_image} className="formGroup_image">
              <div style={styles.imagePreview} className="imagePreview">
                <img style={{
                  width: "150px", height: "150px"
                }} src={avatarImage} alt="Avatar" />
              </div>
              <div style={styles.imageUpload} className="imageUpload">
                <p style={styles.imageUpload_p}>Upload your new avatar here</p>
                <button type="button" style={styles.imageUpload_button} onClick={handleButtonUploadAvatar}>Upload</button>
                <input type="file" accept="image/*" {
                  ...register('avatarImage', {})
                } onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    if (file) {
                      // console.log('file: ', file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAvatarImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }} ref={avatarImageInput} style={{display: "none"}} />
              </div>
            </div>
            { errors.avatarImage && <span>{errors.avatarImage.message || "Invalid data"}</span> }
          </div>

          <div style={styles.customizationSection} className="nameCustomization">
            <h4 style={styles.customizationLabel}>Name</h4>
            <input style={styles.customization_input} type="text" id="" {
              ...register("name", {})
            } />
            { errors.name && <span>{errors.name.message || "Invalid data"}</span> }
          </div>

          <div style={styles.customizationSection} className="usernameCustomization">
            <h4 style={styles.customizationLabel}>Username</h4>
            <input style={styles.customization_input} type="text" id="" {
              ...register("username", {})
            } />
            { errors.username && <span>{errors.username.message || "Invalid data"}</span> }
          </div>

          <div style={styles.customizationSection} className="descriptionCustomization">
            <h4 style={styles.customizationLabel}>Description</h4>
            <textarea style={styles.customization_textArea} rows={1} {
              ...register("description", {})
            }></textarea>
            { errors.description && <span>{errors.description.message || "Invalid data"}</span> }
          </div>

          <div style={styles.customizationSection} className="channelLink">
            <h4 style={styles.customizationLabel}>Channel Direct Link</h4>
            <input style={styles.channelDirectLink_input} type="text" readOnly />
          </div>
        </div>
      </form>
    </div>
  );
};

const styles: {[key: string]: CSSProperties} = {
  content: {
    flex: 1,
    padding: '20px',
    transition: 'margin-left 0.3s ease',
    // maxWidth: "800px",
    // margin: "0 auto"
  },
  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  headerLeft: {
    alignContent: "center" as CSSProperties["alignContent"]
  },
  headerRight_button: {
    padding: "10px 15px",
    border: "1px solid #ccc",
    backgroundColor: "#f7f7f7",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "10px"
  },
  contentForm: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
  },
  customizationSection: {
    marginBottom: "20px",
  },
  customizationLabel: {
    marginBottom: "10px",
    display: "block"
  },
  formGroup_image: {
    display: "flex",
    justifyContent: "space-between" as CSSProperties["justifyContent"],
    alignItems: "center" as CSSProperties["alignItems"]
  },
  imagePreview: {
    width: "150px",
    height: "150px",
    backgroundColor: "#ccc",
    borderRadius: "5px",
  },
  imageUpload: {
    flexGrow: 1,
    marginLeft: "20px",
  },
  imageUpload_p: {
    marginBottom: "10px"
  },
  imageUpload_button: {
    padding: "10px 15px",
    border: "1px solid #ccc",
    backgroundColor: "#f7f7f7",
    cursor: "pointer",
    borderRadius: "5px"
  },
  customization_input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  customization_textArea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "none",
    overflow: "hidden"
  },
  channelDirectLink_input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    cursor: "not-allowed",
    backgroundColor: "#f0f0f0",
  },
};

export default MainWrapper;