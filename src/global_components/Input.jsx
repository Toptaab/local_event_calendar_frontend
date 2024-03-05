// import React from 'react';
import { EyeIcon, LockerIcon } from '../icons';

export default function Input({
  name = 'name',
  type = 'text',
  title = 'title',
  placeholder = 'type here...',
  children,
  errorMessage,
  value,
  onChange,
}) {
  return (
    <label htmlFor={name}>
      <span className='pl-[0.5rem] pt-2 font-medium text-[1.0rem]'>
        {title}
      </span>
      <div className='border-2 w-full px-4 py-2 rounded-lg flex items-baseline gap-2'>
        {children}
        <input
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className=' outline-none w-full'
        />
        {type === 'password' && <EyeIcon />}
      </div>
      {errorMessage && (
        <small className='text-red-500 pl-[0.5rem]'>{errorMessage}</small>
      )}
    </label>
  );
}
