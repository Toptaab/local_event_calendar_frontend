import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../global_components/Input';
import {
  EmailIcon,
  LockerIcon,
  ProfileIcon,
  PictureIcon,
} from '../../../icons';
import { validateUserRegister } from '../validation/validate-register';
import Button from '../../../global_components/Button';
import { apiRegister, authMe } from '../../../api/auth';
import { storeToken } from '../../../utils/local-storage';
import useAuth from '../hooks/auth';

export default function UserRegisterContainer() {
  const [input, setInput] = useState({
    gender: 'MALE',
    role: 'USER',
  });
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConfirmPassword] = useState(false);
  const { setAuthUser } = useAuth();
  const fileEl = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
    setInput({ ...input, [e.target.name]: e.target.files[0] });
  };

  const handleProfilePicDelete = () => {
    setProfileImage(null);
    const temp = { ...input };
    delete temp.profileImage;
    setInput(temp);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validateResult = validateUserRegister(input);

      if (Object.keys(validateResult).length > 0) {
        setError(validateResult);
      } else {
        const formData = new FormData();
        Object.entries(input).map((el) => {
          formData.append(el[0], el[1]);
          return null;
        });

        // console.log(...formData);

        const registerResult = await apiRegister(formData);
        storeToken(registerResult.data.accessToken);
        const authResult = await authMe(registerResult.data.accessToken);
        setAuthUser(authResult.data);
        setError(null);
        console.log('User register success');
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.message === 'this email has aleady been used') {
        setError({ ...error, email: 'This email has already been used' });
      }
    }
  };

  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <form onSubmit={handleSubmit}>
      <div className=' mx-auto flex flex-col  gap-[2rem] w-full p-[3rem]'>
        <div className='text-[1.75rem] font-semibold text-center'>
          Create An Account
        </div>

        {/* profile image */}
        <div className='flex flex-col items-center'>
          {profileImage ? (
            <div className='relative'>
              <img
                src={URL.createObjectURL(profileImage)}
                alt='event'
                className='w-[200px] h-[200px] object-cover'
              />
              <button
                type='button'
                className='absolute top-0 right-0 m-3 bg-white w-[1.5rem] font-bold h-[1.5rem] text-center rounded-[100%]'
                onClick={handleProfilePicDelete}
              >
                X
              </button>
            </div>
          ) : (
            <PictureIcon />
          )}
        </div>

        {/* upload profile */}
        <div className='flex flex-row justify-end '>
          <div className='flex flex-col items-end '>
            <div className='md:w-[70%] sm:[30%] flex flex-col '>
              <input
                type='file'
                ref={fileEl}
                className='hidden'
                name='profileImage'
                onChange={handleFileChange}
              />
              <Button onClick={() => fileEl.current.click()}>
                Upload Profile
              </Button>
            </div>
            <div>
              {error?.profileImage ? (
                <div className='text-red-500 pl-[0.5rem]'>
                  {error?.profileImage}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* email */}
        <Input
          name='email'
          placeholder='Example@gmail.com'
          value={input}
          onChange={handleChange}
          title='Email'
          errorMessage={error?.email}
        >
          <EmailIcon />
        </Input>

        {/* username */}
        <Input
          name='userName'
          placeholder='Username'
          value={input}
          onChange={handleChange}
          title='Username'
          errorMessage={error?.userName}
        >
          <ProfileIcon />
        </Input>

        {/* password */}
        {showPassword ? (
          <Input
            name='password'
            placeholder='Password'
            value={input}
            onChange={handleChange}
            title='Password'
            errorMessage={error?.password}
            type='text'
            onClickButton={() => setShowPassword(false)}
          >
            <LockerIcon />
          </Input>
        ) : (
          <Input
            name='password'
            placeholder='Password'
            value={input}
            onChange={handleChange}
            title='Password'
            errorMessage={error?.password}
            type='password'
            onClickButton={() => setShowPassword(true)}
          >
            <LockerIcon />
          </Input>
        )}

        {/* confirm password */}
        {showConformPassword ? (
          <Input
            name='confirmPassword'
            placeholder='Confirm password'
            value={input}
            onChange={handleChange}
            title='Confirm password'
            errorMessage={error?.confirmPassword}
            type='text'
            onClickButton={() => setShowConfirmPassword(false)}
          >
            <LockerIcon />
          </Input>
        ) : (
          <Input
            name='confirmPassword'
            placeholder='Confirm password'
            value={input}
            onChange={handleChange}
            title='Confirm password'
            errorMessage={error?.confirmPassword}
            type='password'
            onClickButton={() => setShowConfirmPassword(true)}
          >
            <LockerIcon />
          </Input>
        )}

        {/* Select gender */}
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            <div>Gender</div>
            <select
              name='gender'
              className='h-10  rounded-lg'
              onChange={handleChange}
              value={input.gender}
            >
              <option value='MALE'>MALE</option>
              <option value='FEMALE'>FEMALE</option>
              <option value='OTHER'>OTHER</option>
            </select>
          </div>
        </div>

        <div className=' mx-auto flex flex-col justify-center text-center gap-[1rem] space-between w-full'>
          <button
            type='submit'
            className='btn bg-primary h-12 text-white text-[1rem] '
          >
            Create Account
          </button>

          <div className='text-[1rem]'>
            <span>Already Have An Account ?</span>
            <Link to='/login'>
              <span className='text-green-700'> Log in</span>
            </Link>
          </div>
          <div>
            <span>Join us as Organizer </span>
            <button
              type='button'
              onClick={() => navigate('./organizer')}
              className='text-green-700'
            >
              here
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
