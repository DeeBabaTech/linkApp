import React, { useEffect } from "react";
import { fetchForms, addForm } from "../../store";
import { useThunk } from "../../hooks/use-thunk";
import FormItem from "./formItem";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Preview from "../../components/Preview";
import image from "./../../assets/images.png";

function formsList() {
  const [doFetchforms, isLoadingForms, loadingFormError] = useThunk(fetchForms);
  const [doAddForm, isAddingForm, addingFormError] = useThunk(addForm);

  const { data } = useSelector((state) => {
    return state.forms;
  });

  useEffect(() => {
    doFetchforms();
  }, []);

  const handleFormAdd = () => {
    doAddForm();
  };

  const newProfile = {
    firstName: "",
    lastName: "",
    email: "",
  };

  let content;

  if (isLoadingForms || isAddingForm) {
    content = (
      <div className='flex justify-center my-12'>
        {" "}
        <FontAwesomeIcon icon={faSpinner} size='2xl' spin />{" "}
      </div>
    );
  } else if (loadingFormError || addingFormError) {
    content = <div> Error fetching link form... </div>;
  } else {
    content = <FormItem data={data} />;
  }

  return (
    <div className='w-11/12 mx-auto flex justify-between'>
      <Preview data={data} info={newProfile} image={image} />
      <div className='w-full md:w-[57%] bg-white md:px-7 px-5 py-5 md:py-10 rounded-lg'>
        <div className='font-bold md:text-3xl text-2xl'>
          Customize your links
        </div>
        <p className='text-slate-500 mt-2'>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          onClick={handleFormAdd}
          className='font-semibold md:mt-7 mt-4 text-[#613cfc] outline outline-[#613cfc] px-5 py-2 mb-5 rounded-md w-full text-center'>
          + Add new link
        </button>
        {content}
      </div>
    </div>
  );
}
export default formsList;
