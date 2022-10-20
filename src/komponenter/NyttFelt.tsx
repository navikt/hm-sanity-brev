import { any } from 'prop-types'
import { GoPlusSmall } from 'react-icons/go'
import styled from 'styled-components'
import React from 'react'

export const NyttFelt = (props: any, felttype: string) => {
  const referenceBaseUrl = window.location.pathname.split('/').slice(0, -1).join

  console.log(`Reference base url ${referenceBaseUrl}`)
  console.log(`Felttype ${felttype}`)

  return (
    <div>
      <StyledTittel>{`Finnes ikke ${felttype}${
        felttype === 'delmal' ? 'en' : 'et'
      } du ønsker å ta med?`}</StyledTittel>
      <StyledButton
        onClick={() =>
          (window.location.href = `${referenceBaseUrl}/intent/create/type=${felttype};templates=${felttype}/`)
        }
      >
        <GoPlusSmall size={35} style={{ paddingTop: '2px' }} />
        {`Lag ${felttype === 'delmal' ? 'ny' : 'nytt'} ${felttype}`}
      </StyledButton>
    </div>
  )
}

const StyledTittel = styled.div`
  font-size: 0.8125rem;
  line-height: 1.23077;
  font-weight: 600;
  color: #262f3d;
  padding-bottom: 0.75rem;
`

const StyledButton = styled.button`
  -webkit-font-smoothing: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #cad1dc;
  display: flex;
  width: 100%;
  outline: none;
  font: inherit;
  line-height: 1.25;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: calc(0.3rem - 3px) calc(0.3rem - 1px) calc(0.3rem - 2px);
  border-radius: 2px;
  color: #262f3d;
  background-color: #fff;
  -webkit-box-shadow: none;
  box-shadow: none;
  align-items: center;
  text-align: center;

  &:hover {
    cursor: pointer;
    border-color: #95a3b9;
  }
  &:focus {
    box-shadow: 0 0 0 1px #2276fc;
    border-color: #2276fc;
  }
`
