import styled from 'styled-components'

const StyledInput = styled.input`
  width:100%;
  height:20px;
  display:block;
`

export default function Input(props){
  return(
    <StyledInput {...props} />
  )
}
