import { forwardRef } from "react";
const Input = forwardRef(function Input({ type = "text", ...props }, ref) {
  return <input ref={ref} type={type} {...props}
    className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:border-rscc-blue focus:ring-2 focus:ring-blue-100" />;
});
export default Input;
