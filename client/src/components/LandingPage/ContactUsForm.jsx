import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import TextInputComponent from "../FormElements/TextInputComponent";
import TextAreaComponent from "../FormElements/TextAreaComponent";
import Swal from "sweetalert2";

const ContactUsForm = () => {
    const [state, handleSubmit, reset] = useForm("xwkgllgz");
    const emptyForm = {
        name: "",
        email: "",
        message: "",
    };
    const [formData, setFormData] = useState({ ...emptyForm });

    useEffect(() => {
        if (state.succeeded) {
            Swal.fire(
                "Success",
                "Thanks for contacting us, we will get back to you soon!",
                "success"
            );
            reset();
            setFormData({ ...emptyForm });
        }
    }, [state.succeeded]);

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
                    <TextInputComponent
                        id="name"
                        label="Full Name"
                        placeholder="Enter your full name"
                        name="name"
                        required
                        value={formData.name}
                        handleOnChange={handleValueChange}
                    />
                    <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                    />
                </div>
                <div className="mb-4" data-aos="fade-up" data-aos-delay="600">
                    <TextInputComponent
                        id="email"
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        required
                        value={formData.email}
                        handleOnChange={handleValueChange}
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                </div>
                <div className="mb-4" data-aos="fade-up" data-aos-delay="900">
                    <TextAreaComponent
                        label="Message"
                        placeholder="Enter your message"
                        rows="3"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleValueChange}
                    />
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                    />
                </div>
                <button
                    type="submit"
                    disabled={state.submitting}
                    className="group flex h-min w-fit items-center justify-center text-center font-medium active:focus:scale-95 duration-150 
                        rounded-full text-white border border-transparent hover:bg-primary-600 active:bg-primary-600 focus:ring-4 focus:ring-primary-50 
                        disabled:bg-primary-100 disabled:hover:bg-primary-100 my-2 mx-auto py-3 px-8 bg-blue-500"
                    data-aos="fade-up" 
                    data-aos-delay="1200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactUsForm;
