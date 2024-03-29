/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: 
 */
import { useMemo } from 'react'

interface SvgIconProps {
  prefix?: string
  name: string
  color?: string,
  size?: number | string,
  className?: string,
  style?: React.CSSProperties
}

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'icon', name, color, size= 16, className, style } = props
  const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name])
  return (
    <svg aria-hidden="true" width={size} height={size} fill={color} className={className} style={style}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}
export default SvgIcon;