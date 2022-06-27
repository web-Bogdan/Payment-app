import styles from "../styles/AppButton.module.scss";

const AppButton = ({text, ...props}) => {
    return (
        <button className={!props.disabled ? styles.btn : styles.btnDisabled} {...props}>
            <p className={styles.btn__text}>{text}</p>
        </button>
    );
};

export default AppButton;
