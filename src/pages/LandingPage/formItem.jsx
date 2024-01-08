import { useState } from "react";
import { removeForm, updateForm } from "../../store";
// import { useThunk } from "../hooks/use-thunk"; This reusable thunk appeared not to work.
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

function FormItem({ data }) {
  const [isRemovingForm, setIsRemovingForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [link, setLink] = useState(data.map((form) => form.link));
  const [platform, setPlatform] = useState(data.map((form) => form.platform));

  const handleLink = (e, index) => {
    const newLink = [...link];
    newLink[index] = e.target.value;
    setLink(newLink);
  };
  const handlePlatform = (e, index) => {
    const newPlatform = [...platform];
    newPlatform[index] = e.target.value;
    setPlatform(newPlatform);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    data.map((form, index) => {
      dispatch(
        updateForm({ ...form, link: link[index], platform: platform[index] })
      )
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsSaving(false));
    });
    navigate("/profile");
  };

  const handleRemove = (form) => {
    setIsRemovingForm(true);
    dispatch(removeForm(form))
      .unwrap()
      .catch((err) => setError(err))
      .finally(() => setIsRemovingForm(false));
  };

  return (
    <>
      <form
        action='/profile'
        onSubmit={handleSubmit}
        className='bg-slate-100 text-slate-600 rounded-lg  md:text-base text-sm'>
        {data.map((form, index) => {
          return (
            <div key={form.id} className='text-slate-700 w-11/12 m-auto pt-5'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <p className='font-semibold'>Link {index + 1}</p>
                </div>
                {isRemovingForm ? (
                  <Loading> Deleting link... </Loading>
                ) : (
                  <button onClick={() => handleRemove(form.id)}>Remove</button>
                )}
              </div>
              {error && <Loading>Error deleting form </Loading>}
              <label htmlFor={form.platform} className='md:text-sm text-xs'>
                Platform
              </label>{" "}
              <br />
              <select
                name='platform'
                value={platform[index]}
                onChange={(e) => handlePlatform(e, index)}
                id={form.platform}
                className='w-full h-10 rounded px-2 mb-1 focus:outline focus:outline-[#613cfc]'
                required>
                <option value=''></option>
                <option value='YouTube'>Youtube</option>
                <option value='LinkedIn'>LinkedIn</option>
                <option value='GitHub'>GitHub</option>
                <option value='Twitter'>Twitter</option>
              </select>
              <label htmlFor={form.link} className='text-sm'>
                Link
              </label>
              <input
                type='text'
                name='link'
                id={form.link}
                onChange={(e) => handleLink(e, index)}
                value={link[index]}
                className='w-full h-10 px-2 rounded focus:outline focus:outline-[#613cfc]'
                required
              />
            </div>
          );
        })}
        {isSaving && (
          <Loading> Your changes have been successfully saved! </Loading>
        )}
        <div className='flex justify-end md:mr-5 mt-5 w-11/12 mx-auto'>
          <button
            type='submit'
            className='bg-[#613cfc] w-full md:w-fit text-white  md:text-right my-5 py-3 px-5 rounded-lg'>
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default FormItem;
