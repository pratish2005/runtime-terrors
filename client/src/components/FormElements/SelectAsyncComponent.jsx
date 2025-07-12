import { Label } from "keep-react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { twMerge } from "tailwind-merge";
import { CaretDown } from "phosphor-react";

const SelectAsyncComponent = ({
    id,
    name,
    placeholder,
    label,
    onChange,
    error,
    value,
    containerClassName,
    defaultOptions,
    isMulti,
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

    const getValue = () => {
        if (isMulti) {
            return (
                defaultOptions
                    ?.filter((option) => value.includes(option))
                    ?.map((option) => ({
                        label: option,
                        value: option,
                    })) || []
            );
        } else {
            const option = defaultOptions?.find(
                (option) => value === option
            );
            if (option) {
                return {
                    label: option,
                    value: option,
                };
            }
        }

        return "";
    };

    const handleOnChange = (values) => {
        let e;
        if (isMulti) {
            const selected = values.map((options) => options.value);

            e = {
                target: {
                    name: name,
                    value: selected,
                },
            };
        } else {
            e = {
                target: {
                    name: name,
                    value: values?.value ? values.value : "",
                },
            };
        }
        onChange(e);
    };
    return (
        <div className={twMerge("", containerClassName)}>
            <Label
                htmlFor={id}
                value={label}
                color={error ? "error" : "gray"}
            />
            <AsyncSelect
                id={id}
                name={name}
                placeholder={placeholder}
                value={getValue()}
                components={{ DropdownIndicator }}
                styles={styles}
                defaultOptions={
                    defaultOptions?.map((option) => ({
                        label: option,
                        value: option,
                    })) || []
                }
                onChange={handleOnChange}
                isMulti={isMulti}
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

export default SelectAsyncComponent;
