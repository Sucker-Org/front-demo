/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: 
 */
import styles from './index.module.scss';
interface ColorButtonProps {
    text: string,
    className?: string,
}

const ColorButton: React.FunctionComponent<ColorButtonProps> = (props) => {
    const { text } = props;
    return (
        <button type='button' className={
            `${styles['color-btn']} ${props.className ? props.className : ''}`
        }>
            <span className={styles['color-btn-shadow-wrap']}><span className={styles['color-btn-shadow']}></span></span>
            <div className={styles['color-btn-text']}>{ text }</div>
            <span className={styles['color-btn-bottom-line']}></span>
        </button>
    );
}
export default ColorButton;