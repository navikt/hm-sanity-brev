import React from 'react'
import { useSanityQuery } from '../util/sanity'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { MdShortText } from 'react-icons/md'
import styled from 'styled-components'

const FlettefeltBlockComponent = (id = '') => {
  if (!id) {
    return <ErrorStyling>Fyll ut flettefelt</ErrorStyling>
  } else {
    return <FlettefeltBlock id={id} />
  }
}

const FlettefeltBlock = ({ id = '' }) => {
  const query = `*[_type=="flettefelt" && _id=="${id}"]`
  const { data, error } = useSanityQuery(query)

  if (error) {
    console.error(error)
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>
  }

  if (!data) {
    return <PreviewContainer>Laster fellefelt...</PreviewContainer>
  }

  if (!data.length) {
    return <ErrorStyling>Flettefeltet finnes ikke</ErrorStyling>
  }

  const flettefelt = data[0]

  const Ikon = flettefelt.erListe ? AiOutlineUnorderedList : MdShortText

  return (
    <PreviewContainer>
      <PreviewMedia>
        <Ikon size={'2rem'} />
      </PreviewMedia>
      <Tittel>{flettefelt.felt}</Tittel>
    </PreviewContainer>
  )
}

const PreviewContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 0.5 rem 0.75rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
`

const PreviewMedia = styled.div`
  height: calc(2.5rem + 1px);
  width: calc(2.5 rem + 1px);
  min-width: calc(2.5rem + 1px);
  margin-right: 0.75rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`

const Tittel = styled.span`
  vertical-align: baseline;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  align-content: center;
  min-height: calc(2.5rem + 1px);
`

const ErrorStyling = styled(PreviewContainer)`
  color: #f03e2f;
`

export default FlettefeltBlockComponent
