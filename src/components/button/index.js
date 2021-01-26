import styled from 'styled-components'

const StyledButton = styled.button`
  width:100%;
  height:30px;
  displat:block;
  margin-top:10px;
  background-color: ${({ theme }) => theme.colors.primary};
`

export default function Button(props){
  return(
    <StyledButton {...props} />
  )
}
