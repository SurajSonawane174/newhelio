import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Sending your message...");

    try {
      const response = await fetch("https://formspree.io/f/mqapdwdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (response.ok) {
        toast.success("I have received your message, I will get back to you soon!", { id: toastId });
        reset();
      } else {
        toast.error("There was an error sending your message, please try again later!", { id: toastId });
      }
    } catch (error) {
      toast.error("Unexpected error occurred!", { id: toastId });
    }
  };

  return (
    <>
      <Toaster richColors={true} />
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col relative items-center justify-center space-y-4 xs:w-[80vw]"
      >
        <motion.input
          variants={item}
          type="text"
          placeholder="name"
          {...register("name", {
            required: "This field is required!",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long.",
            },
          })}
          className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none relative left-0 top-0 focus:ring-2 focus:ring-accent/50 custom-bg text-base font-[100] "
        />
        {errors.name && (
          <span className="inline-block self-start text-accent">{errors.name.message}</span>
        )}

        <motion.input
          variants={item}
          type="email"
          placeholder="email"
          {...register("email", { required: "This field is required!" })}
          className="w-full p-2 rounded-md shadow-lg text-foreground text-base relative top-0 left-0 focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg"
        />
        {errors.email && (
          <span className="inline-block self-start text-accent">{errors.email.message}</span>
        )}

        <motion.textarea
          variants={item}
          placeholder="message"
          {...register("message", {
            required: "This field is required!",
            maxLength: {
              value: 500,
              message: "Message should be less than 500 characters",
            },
            minLength: {
              value: 50,
              message: "Message should be more than 50 characters",
            },
          })}
          className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg my-[10px]"
        />
        {errors.message && (
          <span className="inline-block self-start text-accent">{errors.message.message}</span>
        )}

        <motion.input
          variants={item}
          value="Launch your message!"
          className="px-10 rounded-md shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 border relative top-0 left-0 w-fit text-center border-accent/30 border-solid hover:shadow-glass-sm backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer capitalize text block mb-[100px]"
          type="submit"
        />
      </motion.form>
      <div className="h-5 w-full"></div>
    </>
  );
}
