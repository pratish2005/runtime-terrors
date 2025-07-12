import { Label, Textarea } from "keep-react";
import { twMerge } from "tailwind-merge";

const TextAreaComponent = ({
    id,
    name,
    placeholder,
    label,
    error,
    value,
    className,
    containerClassName,
    ...rest
}) => {
    return (
        <div className={twMerge('', containerClassName)}>
            <Label
                htmlFor={id}
                value={label}
                color={error ? "error" : "gray"}
            />
            <Textarea
                id={id}
                name={name}
                placeholder={placeholder}
                color={error ? "error" : "gray"}
                helperText={error ? error : ""}
                value={value}
                className={twMerge("text-sm", className)}
                {...rest}
            />
        </div>
    );
};

export default TextAreaComponent;
