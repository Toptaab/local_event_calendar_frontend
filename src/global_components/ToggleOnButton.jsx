export default function ToggleOnButton({ onChange, forMap, input }) {
  return (
    <div className='flex gap-3 flex-wrap'>
      {forMap?.map((el) => (
        <label htmlFor={el.name} className='swap font-semibold' key={el.key}>
          <input
            type='checkbox'
            id={el.name}
            name={el.name}
            onChange={onChange}
            checked={input[el.name]}
          />
          <div className='swap-on bg-primary border rounded-btn px-2 py-1 text-white '>
            {el.label}
          </div>
          <div className='swap-off bg-transparent border border-primary rounded-btn px-2 py-1 '>
            {el.label}
          </div>
        </label>
      ))}
    </div>
  );
}
