import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledInput = styled.input`
  width:100%;
  height:20px;
  display:block;
`

export default function Input({ onChange,placeholder, ...props }){
  return(
    <div>
     <StyledInput
       onChange={onChange}
       placeholder={placeholder}
      {...props} 
     />
    </div>
  )
}

Input.propTypes = {
  onChange: PropTypes.func.IsRequired,
  placeholder: PropTypes.string.IsRequired,
  name: PropTypes.string.IsRequired,
  value: PropTypes.string.IsRequired,
};
