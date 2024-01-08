import {StyleSheet, css} from "aphrodite";
import themeVars from "../util/themeVars";
import { MultiSelect } from "react-multi-select-component";


interface IDropboxProps {
    options: Option[];
    label: string;
    name: string;
    value: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: {error : boolean, message: string};
};


interface Option {
    label: string
    value: string
}

const DropDown = (props: IDropboxProps) => {

    const { options, label, name, value, error, onChange } = props;

    const values = value.map((element) => {
        return { label: element, value: element };
      });
    
    return (
        <div className={css(styles.InputContainer)}>
        <label htmlFor={name} className={css(styles.InputLabel)}>
            {label}
        </label>

        <MultiSelect
            options={options}
            value={values}
            onChange={onChange}
            labelledBy="Select"
            className={css(styles.Input, error?.error && styles.InputError)}
        />

        {error && <div className={css(styles.Error)}>{error.message}</div>}
        </div>
    );
};

export default DropDown;

const styles = StyleSheet.create(
    {
        InputContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '0.5rem',
            width: '100%',
            height: '5rem',
        },

        InputLabel: {
            fontSize: '1.2rem',
            fontWeight: 600,
            color: themeVars.colors.accent.black,
        },

        Input: {
            width: '100%',
            height: '5rem',
            border: '1px solid ' + themeVars.colors.textField.borderColor,
            borderRadius: '0.5rem',
            boxSizing: 'border-box',
            padding: '0.6rem 1rem',
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: '2rem',
            color: themeVars.colors.accent.black,
            backgroundColor: themeVars.colors.textField.background,
            // chnage css when input is focused
            ':focus': {
                outline: '1px solid rgba(127, 200, 182, 1)',
            }
        },

        InputActive: {
            border: '1px solid rgba(127, 200, 182, 1)',
        },

        Error: {
            color: themeVars.colors.alerts.red
        },

        InputError: {
            border: '1px solid ' + themeVars.colors.alerts.red,
        }

    }
)

