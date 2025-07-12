import { Label } from "keep-react";
import "react-date-picker/dist/DatePicker.css";
import { twMerge } from "tailwind-merge";
import { Calendar } from "phosphor-react";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const DateTimePickerComponent = ({
    id,
    name,
    placeholder,
    label,
    onChange,
    error,
    className,
    containerClassName,
    format = "YYYY-MM-DDTHH:mmZ",
    ...rest
}) => {
    const handleOnChange = (date) => {
        const e = {
            target: {
                name: name,
                value: date ? moment(date).format(format) : '',
            },
        };
        onChange(e);
    };
    return (
        <div className={twMerge("", containerClassName)}>
            <Label
                htmlFor={id}
                value={label}
                color={error ? "error" : "gray"}
            />
            <div className="border border-metal-300 py-1 px-4 text-base rounded-md flex items-center">
                <DateTimePicker
                    className={twMerge(
                        `outline-none mb-0.5 flex-1 border-none`,
                        className
                    )}
                    onChange={handleOnChange}
                    format="dd/MM/yyyy HH:mm"
                    {...rest}
                    calendarIcon={<Icon />}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600  text-body-5">
                    {error}
                </p>
            )}
        </div>
    );
};

const Icon = () => (
    <span className="text-slate-700 border-l border-metal-300 pl-3">
        <Calendar size={20} />
    </span>
);

export default DateTimePickerComponent;
