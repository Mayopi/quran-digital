import clsx from "clsx";

export default function Button({ children, className, color = clsx("bg-primary-500"), outline = false, ...options }) {
  return (
    <button {...options} className={`${className} btn ${color} text-white rounded-[5px] font-normal normal-case ${outline ? "btn-outline" : "border-none"}`}>
      {children}
    </button>
  );
}
