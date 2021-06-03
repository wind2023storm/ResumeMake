import styled from 'styled-components'
import { colors, sizes } from '../../theme'

const Section = styled.section`
  width: ${sizes.previewSection.width};
  background: ${colors.gray2};
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`

export function ResumePreview() {
  return (
    <Section>
      <p>Preview content</p>
    </Section>
  )
}
