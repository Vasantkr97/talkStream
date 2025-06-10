import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ShipWheelIcon } from "lucide-react"


const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate:SignUpMutation, isPending, error } = useMutation({
    mutationFn: () => queryClient.invalidateQueries({ queryKey: ["authUser"]})
  });

  const handleSignUp = () => {
    e.preventDefault()
    SignUpMutation(signupData)
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FROM - LEFT SIDE */}
          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
            {/* LOGO */}
            <div className="mb-4 flex items-center justify-start gap-2"> 
              
            </div>
          </div>
      </div>
    </div>
  )
}

export default SignUpPage