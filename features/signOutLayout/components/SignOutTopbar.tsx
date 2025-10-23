"use client"; 

import Button from "@/components/Button";

const SignOutTopbar = () => {
  return (
    <div className="flex w-full justify-between bg-grayBg px-10 py-4.5 shadow-custom">
      SignOutTopbar
      <Button
        onClick={() => console.log("kliknięto przycisk")}
        size="sm"
        className="bg-buttonDefault text-white hover:opacity-80 py-2 px-8.125"
      >
        Rejestracja
      </Button>
    </div>
  );
};

export default SignOutTopbar;
