/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: 
 */
import styles from './index.module.scss';
interface RingAvatarProps {
    imgSrc: string,
    name?: string,
}
const RingAvatar: React.FC<RingAvatarProps> = (props) => {
    const { imgSrc, name = 'avatar' } = props;
    return (
        <div className={styles.avatar}>
            <div className={styles['avatar-img-wrap']}>
                <img src={imgSrc} alt={name} />
            </div>
        </div>
    )
}

export default RingAvatar;