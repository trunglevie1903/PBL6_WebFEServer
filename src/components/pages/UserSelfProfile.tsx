// import React, { CSSProperties, useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import axios from "axios";
// import checkValidToken from "../functions/checkValidToken";

import SelfProfilePageContent from "../compos/User_SelfProfilePage/PageContent";

// interface UpdateNameFormDataType {
//   name: string;
// }

// interface UpdateNameFormInputDataType {
//   userId: string;
//   name: string;
// }

// const UpdateNameForm: React.FC<UpdateNameFormInputDataType> = ({userId, name}) => {
//   const {register, handleSubmit, formState: {errors}} = useForm<UpdateNameFormDataType>();
//   const [newName, set_newName] = useState(name);
//   const [isNameChanged, set_isNameChanged] = useState<boolean>(false);

//   useEffect(() => {
//     // console.log(newName, name);
//     set_isNameChanged(newName !== name);
//   }, [newName, name]);

//   const onSubmit: SubmitHandler<UpdateNameFormDataType> = async (data) => {
//     try {
//       console.log('data: ', data);
//       checkValidToken().then(val => {
//         if (!val) throw new Error("You are not allowed to perform this action");
//         axios.post(
//           `http://127.0.0.1:4000/user/update-name/${userId}`
//         ).then(response => {
//           console.log('response: ', response.data);
//         }).catch(err => {throw err});
//       }).catch(err => {throw err});
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         alert(`Error: ${error.response?.data.error || "Request failed"}`);
//       } else {
//         alert(`Error: ${error}`);
//       }
//     }
//   };

//   const styles: { [key: string]: CSSProperties } = {
//     wrapper: {
//       width: "100%",
//       display: "flex",
//       flexDirection: "column",
//       gap: "10px"
//     },
//     label: {
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     input: {
//       padding: "10px",
//       border: "1px solid black",
//       borderRadius: "5px",
//       width: "100%",
//       height: "2rem",
//       fontSize: "16px"
//     },
//     button: {
//       width: "200px",
//       height: "40px",
//       border: "1px solid black",
//       borderRadius: "5px",
//       backgroundColor: "#ddd",
//       color: "black",
//       marginTop: "10px",
//       display: isNameChanged ? "block" : "none"
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} style={styles.wrapper}>
//       <label style={styles.label}>Name</label>
//       <input type="text" {...register("name", { required: true, value: name })} style={styles.input} onChange={(e) => set_newName(e.target.value)} />
//       {errors.name && <span>{errors.name.message || "This field is required"}</span>}
//       <button type="submit" style={styles.button}>Update name</button>
//     </form>
//   );
// };

// interface UpdateDescriptionFormDataType {
//   description: string;
// }

// interface UpdateDescriptionFormInputDataType {
//   userId: string;
//   description: string;
// }

// const UpdateDescriptionForm: React.FC<UpdateDescriptionFormInputDataType> = ({userId, description}) => {
//   const {register, handleSubmit, formState: {errors}} = useForm<UpdateDescriptionFormDataType>();
//   const [newDescription, set_newDescription] = useState(description);
//   const [isDescriptionChanged, set_isDescriptionChanged] = useState<boolean>(false);

//   useEffect(() => {
//     // console.log("a", newDescription, "a", description, "a");
//     set_isDescriptionChanged(newDescription !== description);
//   }, [newDescription, description]);

//   const onSubmit: SubmitHandler<UpdateDescriptionFormDataType> = async (data) => {
//     try {
//       console.log('data: ', data);
//       checkValidToken().then(val => {
//         if (!val) throw new Error("You are not allowed to perform this action");
//         axios.post(
//           `http://127.0.0.1:4000/user/update-description/${userId}`
//         ).then(response => {
//           console.log('response: ', response.data);
//         }).catch(err => {throw err});
//       }).catch(err => {throw err});
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         alert(`Error: ${error.response?.data.error || "Request failed"}`);
//       } else {
//         alert(`Error: ${error}`);
//       }
//     }
//   };

//   const styles: { [key: string]: CSSProperties } = {
//     wrapper: {
//       width: "100%",
//       display: "flex",
//       flexDirection: "column",
//       gap: "10px"
//     },
//     label: {
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     textarea: {
//       padding: "10px",
//       border: "1px solid black",
//       borderRadius: "5px",
//       width: "100%",
//       fontSize: "16px",
//       resize: "vertical",
//       minHeight: "60px"
//     },
//     button: {
//       width: "200px",
//       height: "40px",
//       border: "1px solid black",
//       borderRadius: "5px",
//       backgroundColor: "#ddd",
//       color: "black",
//       marginTop: "10px",
//       display: isDescriptionChanged ? "block" : "none"
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} style={styles.wrapper}>
//       <label style={styles.label}>Description</label>
//       <textarea {...register("description", { required: true, value: description })} style={styles.textarea} onChange={(e) => set_newDescription(e.target.value)} />
//       {errors.description && <span>{errors.description.message || "This field is required"}</span>}
//       <button type="submit" style={styles.button}>Update description</button>
//     </form>
//   );
// };

// interface UpdateBannerImageFormDataType {
//   bannerImage: FileList;
// }

// interface UpdateBannerImageFormInputDataType {
//   userId: string;
//   bannerImage: string;
// }

// const UpdateBannerImageForm: React.FC<UpdateBannerImageFormInputDataType> = ({userId, bannerImage}) => {
//   const {register, handleSubmit, formState: {errors}} = useForm<UpdateBannerImageFormDataType>();
//   const [newBannerImage, set_newBannerImage] = useState<string>("");
//   const [isBannerImageChanged, set_isBannerImageChanged] = useState<boolean>(false);

//   useEffect(() => {
//     set_newBannerImage(bannerImage);
//   }, [bannerImage]);

//   useEffect(() => {
//     set_isBannerImageChanged(newBannerImage !== bannerImage);
//   }, [newBannerImage, bannerImage]);

//   const onSubmit: SubmitHandler<UpdateBannerImageFormDataType> = async (data) => {
//     try {
//       console.log('data: ', data);
//       checkValidToken().then(val => {
//         if (!val) throw new Error("You are not allowed to perform this action");
//         axios.post(
//           `http://127.0.0.1:4000/user/update-banner-image/${userId}`
//         ).then(response => {
//           console.log('response: ', response.data);
//         }).catch(err => {throw err});
//       }).catch(err => {throw err});
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         alert(`Error: ${error.response?.data.error || "Request failed"}`);
//       } else {
//         alert(`Error: ${error}`);
//       }
//     }
//   };

//   const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = reject;
//   });

//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const base64Image = await toBase64(event.target.files[0]);
//       console.log('new banner: image: ', base64Image);
//       set_newBannerImage(base64Image);
//     }
//   };

//   const styles: { [key: string]: CSSProperties } = {
//     wrapper: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "10px",
//       alignItems: "center"
//     },
//     inputWrapper: {
//       width: "100%",
//       display: "flex",
//       flexDirection: "column",
//       gap: "10px",
//       alignItems: "center"
//     },
//     imagePreview: {
//       width: "100%",
//       height: "auto",
//       maxWidth: "320px",
//       maxHeight: "160px",
//       border: "1px solid black",
//       borderRadius: "5px",
//       objectFit: "cover"
//     },
//     inputFile: {},
//     button: {
//       width: "200px",
//       height: "40px",
//       border: "1px solid black",
//       borderRadius: "5px",
//       backgroundColor: "#ddd",
//       color: "black",
//       display: isBannerImageChanged ? "block" : "none"
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} style={styles.wrapper}>
//       <h5>Banner Image</h5>
//       <div style={styles.inputWrapper}>
//         <img style={styles.imagePreview} src={newBannerImage} alt="Banner Preview" />
//         <input type="file" style={styles.inputFile} {...register("bannerImage", { required: true })} onChange={handleImageChange} />
//       </div>
//       {errors.bannerImage && <span>{errors.bannerImage.message || "This field is required"}</span>}
//       <button type="submit" style={styles.button}>Update banner image</button>
//     </form>
//   );
// };

// interface UpdateAvatarImageFormDataType {
//   avatarImage: FileList;
// }

// interface UpdateAvatarImageFormInputDataType {
//   userId: string;
//   avatarImage: string;
// }

// const UpdateAvatarImageForm: React.FC<UpdateAvatarImageFormInputDataType> = ({ userId, avatarImage }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm<UpdateAvatarImageFormDataType>();
//   const [newAvatarImage, set_newAvatarImage] = useState(avatarImage);
//   const [isAvatarImageChanged, set_isAvatarImageChanged] = useState<boolean>(false);

//   useEffect(() => {
//     set_isAvatarImageChanged(newAvatarImage !== avatarImage);
//   }, [newAvatarImage, avatarImage]);

//   const onSubmit: SubmitHandler<UpdateAvatarImageFormDataType> = async (data) => {
//     try {
//       checkValidToken().then(async val => {
//         if (!val) throw new Error("You are not allowed to perform this action");
//         const formData = new FormData();
//         const _avatarImage = await toBase64(data.avatarImage[0]);
//         formData.append("avatarImage", _avatarImage);

//         const accessToken = localStorage.getItem('accessToken');
//         axios.post(
//           `http://127.0.0.1:4000/user/update-avatar-image/${userId}`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${accessToken}` } }
//         ).then(response => {
//           console.log('response: ', response.data);
//         }).catch(err => { throw err });
//       }).catch(err => { throw err });
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         alert(`Error: ${error.response?.data.error || "Request failed"}`);
//       } else {
//         alert(`Error: ${error}`);
//       }
//     }
//   };

//   const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = reject;
//   });

//   const styles: { [key: string]: CSSProperties } = {
//     wrapper: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "10px",
//       alignItems: "center"
//     },
//     inputWrapper: {
//       display: "flex",
//       gap: "10px",
//       alignItems: "center",
//       justifyContent: "space-between"
//     },
//     imagePreview: {
//       width: "160px",
//       height: "160px",
//       border: "1px solid black",
//       borderRadius: "50%",
//       objectFit: "cover"
//     },
//     inputFile: {
//       flex: "1"
//     },
//     button: {
//       width: "200px",
//       height: "40px",
//       border: "1px solid black",
//       borderRadius: "5px",
//       backgroundColor: "#ddd",
//       color: "black",
//       display: isAvatarImageChanged ? "block" : "none"
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} style={styles.wrapper}>
//       <h5>Avatar Image</h5>
//       <div style={styles.inputWrapper}>
//         <img style={styles.imagePreview} src={newAvatarImage} alt="Avatar preview" />
//         <input type="file" style={styles.inputFile} {...register("avatarImage", { required: true })} onChange={async (e) => {
//           if (e.target.files && e.target.files[0]) {
//             const base64Image = await toBase64(e.target.files[0]);
//             set_newAvatarImage(base64Image);
//           }
//         }} />
//       </div>
//       {errors.avatarImage && <span>{errors.avatarImage.message || "This field is required"}</span>}
//       <button type="submit" style={styles.button}>Update avatar image</button>
//     </form>
//   );
// };


// const UserSelfProfile: React.FC = () => {
//   const [userId, set_userId] = useState<string>("");
//   const [name, set_name] = useState<string>("");
//   const [description, set_description] = useState<string>("");
//   const [bannerImage, set_bannerImage] = useState<string>("");
//   const [avatarImage, set_avatarImage] = useState<string>("");

//   useEffect(() => {
//     const fetchSelfProfile = async () => {
//       checkValidToken().then(val => {
//         if (!val) {
//           alert("You are not allowed to perform this action");
//           window.location.href = "/";
//         }
//         try {
//           const accessToken = localStorage.getItem('accessToken');
//           axios.get(
//             "http://127.0.0.1:4000/user/get-own-profile",
//             {
//               headers: {
//                 "Authorization": `Bearer ${accessToken}`
//               }
//             }
//           ).then(response => {
//             console.log("response profile data: ", response.data);
//             const {profile} = response.data;
//             if (!profile || !profile.userId) return;
            
//             set_userId(profile.userId);
//             set_name(profile.name || "");
//             set_description(profile.description || "");
//             set_bannerImage(profile.bannerImage);
//             set_avatarImage(profile.avatarImage);
//           }).catch(err => {throw err});
//         } catch (error) {
//           if (axios.isAxiosError(error) && error.response) alert(`Error: ${error.response.data.message || error}`);
//             else alert(`Error: ${error}`);
//         }
//       });
//     };
//     fetchSelfProfile();
//   }, []);

//   return (
//     <div style={{
//       margin: "0 auto",
//       width: "60%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: "30px",
//       padding: "20px",
//     }}>
//       <h3>My profile</h3>

//       {/* <div>
//         {userId}
//       </div> */}
//       <div>
//         {name === "" ? name : <UpdateNameForm userId={userId} name={name} />}
//       </div>
//       <div>
//         <UpdateDescriptionForm userId={userId} description={description} />
//       </div>
//       <div>
//         <UpdateBannerImageForm userId={userId} bannerImage={bannerImage} />
//       </div>
//       <div>
//         <UpdateAvatarImageForm userId={userId} avatarImage={avatarImage} />
//       </div>
//     </div>
//   );
// };

// export default UserSelfProfile;

const UserSelfProfile: React.FC = () => {
  return (
    <div>
      {/* Header */}
      {/* PageContent */}
      <SelfProfilePageContent />
    </div>
  );
};

export default UserSelfProfile;