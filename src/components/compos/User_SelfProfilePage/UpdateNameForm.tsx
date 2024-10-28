import React, {useState, useEffect, CSSProperties} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import checkValidToken from "../../functions/checkValidToken";

interface FormInputPropType {
  name: string;
}

interface FormDataType {
  name: string;
}

const UpdateNameForm: React.FC<FormInputPropType> = ({name}) => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormDataType>();
  const [state_currentName, set_currentName] = useState<string>(name);
  const [state_isValueChanged, set_isValueChanged] = useState<boolean>(false);
  const [state_isButtonHovered, set_isButtonHovered] = useState<boolean>(false);

  useEffect(() => {
    set_currentName(name);
  }, [name]);

  useEffect(() => {
    set_isValueChanged(state_currentName !== name);
  }, [state_currentName, name]);

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    try {
      // console.log("form data: ", data);
      const isValid = await checkValidToken();
      if (!isValid) throw new Error("You are not allowed to perform this action");

      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        "http://127.0.0.1:4000/user/update-self-name",
        data, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status !== 200) throw response;
      alert("New name is updated");
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : error);
    }
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
    },
    formTitle: {

    },
    input: {
      width: "100%",
      fontSize: "16px",
      padding: "5px",
      border: "1px solid black",
      borderRadius: "5px"
    },
    button: {
      display: state_isValueChanged ? "block" : "none",
      border: state_isButtonHovered ? "1px solid black" : "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: state_isButtonHovered ? "#ddd" : "white",
    },
    errorMessage: {
      color: "red",
      fontSize: "12px",
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.wrapper}>
      <h5 style={styles.formTitle}>Name</h5>
      <input 
        type="text" 
        {...register("name", { required: "This field is required" })}
        defaultValue={name}  // Set defaultValue to properly display the initial name value
        style={styles.input}
        onChange={(e) => set_currentName(e.target.value)}
      />
      {errors.name && <span style={styles.errorMessage}>{errors.name.message && "This field is required"}</span>}
      <button
        onMouseEnter={() => set_isButtonHovered(true)}
        onMouseLeave={() => set_isButtonHovered(false)}
        style={styles.button} 
        type="submit"
      >
        Update new name
      </button>
    </form>
  );
};

export default UpdateNameForm;