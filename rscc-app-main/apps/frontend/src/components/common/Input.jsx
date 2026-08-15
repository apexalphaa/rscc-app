import { forwardRef } from "react";

const Input = forwardRef(function Input(

  {

    type = "text",

    ...props

  },

  ref

) {

  return (

    <input

      ref={ref}

      type={type}

      {...props}

      className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-green-600"

    />

  );

});

export default Input;
