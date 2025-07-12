import { Label, TextInput } from "keep-react";
import Select, { components } from "react-select";
import { twMerge } from "tailwind-merge";
import { CaretDown } from "phosphor-react";

const SelectComponent = ({
    id,
    name,
    placeholder,
    label,
    handleOnChange,
    error,
    value,
    containerClassName,
    ...rest
}) => {
    const styles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderSize: "1px",
            borderColor: error ? "#ffa19b" : "#afbaca",
        }),
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: error ? "#dc2626" : "#afbaca",
            fontSize: "0.875rem",
        }),
        // valueContainer: (baseStyles, state) => ({
        //     ...baseStyles,
        //     color: error ? "#dc2626" : "#afbaca",
        // }),
    };
    return (
        <div className={twMerge("", containerClassName)}>
            <Label
                htmlFor={id}
                value={label}
                color={error ? "error" : "gray"}
            />
            <Select
                id={id}
                name={name}
                placeholder={placeholder}
                handleOnChange={handleOnChange}
                value={value}
                components={{ DropdownIndicator }}
                styles={styles}
                {...rest}
            />
            {error && (
                <p className="mt-2 text-sm text-red-600  text-body-5">
                    {error}
                </p>
            )}
        </div>
    );
};

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <CaretDown size={24} className="text-slate-500" />
        </components.DropdownIndicator>
    );
};

export default SelectComponent;
