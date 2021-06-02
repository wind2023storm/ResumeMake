import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { colors } from '../../theme'

const TooltipText = styled.span`
  font-size: 0.95rem;
`

interface Props {
  text: string
  tooltipId: string
  color?: string
}

export function Tooltip({ text, tooltipId, color = colors.black }: Props) {
  return (
    <ReactTooltip
      id={`tooltip-${tooltipId}`}
      effect="solid"
      place="right"
      backgroundColor={color}
    >
      <TooltipText>{text}</TooltipText>
    </ReactTooltip>
  )
}
