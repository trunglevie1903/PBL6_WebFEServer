import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { File } from 'buffer';

const convertBufferToString = (b: Buffer): string => {
  const uint8Array = new Uint8Array(b);
  let binary: string = "";
  uint8Array.forEach(byte => binary += String.fromCharCode(byte));
  const base64String = btoa(binary);
  return base64String;
};

interface DummyData {
  banner_img: File[];
  avatar_img: File[];
}

const Dummy: React.FC = () => {
  const [banner, setBanner] = useState("");
  const [avatar, setAvatar] = useState("");

  const {
    register, handleSubmit, formState: { errors }
  } = useForm<DummyData>();

  const onSubmit: SubmitHandler<DummyData> = async (data) => {
    try {
      const newData = {
        banner_img: data.banner_img[0],
        avatar_img: data.avatar_img[0]
      }
      // console.log("newData: ", newData);
      const response = await axios.post("http://127.0.0.1:4000/dummy/upload_images", newData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      // console.log("response: ", response);
      const {
        banner_img, avatar_img
      } = response.data;
      setBanner(convertBufferToString(banner_img.data));
      setAvatar(convertBufferToString(avatar_img.data));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error: ${err.response.data.error || err}`);
      } else {
        alert(`Error: ${err}`);
      }
    }
  };

  return (
    <div>
      <div>
        <div>
          <p>Banner</p>
          <img src={`data:image/*;base64,${banner}`} alt="Banner" />
        </div>
        <div>
          <p>Avatar</p>
          <img src={`data:image/*;base64,${avatar}`} alt="Avatar" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="banner_img">Banner</label>
          <input type="file" id="banner_img" {...register("banner_img")} accept='image/*'/>
          {errors.banner_img && <span>{errors.banner_img.message}</span>}
        </div>
        <div>
          <label htmlFor="avatar_img">Avatar</label>
          <input type="file" id="avatar_img" {...register("avatar_img")} accept='image/*'/>
          {errors.avatar_img && <span>{errors.avatar_img.message}</span>}
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Dummy;