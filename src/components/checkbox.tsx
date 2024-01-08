import {StyleSheet, css} from "aphrodite";
import themeVars from "../util/themeVars";
interface ICheckboxProps {
    label: string;
    name: string;
    value: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: ICheckboxProps) => {
    let { label, name, value, onChange } = props;
    
    
    return (
        <div className={css(styles.CheckboxContainer)}>
        <input
            type={"checkbox"}
            name={name}
            onChange={onChange}
            className={css(styles.Checkbox)}
        />

        <label htmlFor={name} className={css(styles.Checkboxlabel)}>
            {label}
        </label>

        </div>
    );
};

export default Checkbox;

const styles = StyleSheet.create(
    {
        CheckboxContainer: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          },

        Checkboxlabel: {
            fontSize: '1.2rem',
            color: "black",
        },

        Checkbox: {
            width: '8%',
            border: '1px solid ' + themeVars.colors.textField.borderColor,
            borderRadius: '0.5rem',
            boxSizing: 'border-box',
            padding: '0.6rem 1rem',
            lineHeight: '2rem',
        },

    }
)
