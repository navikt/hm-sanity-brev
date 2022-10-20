import styled from 'styled-components'
import React from 'react'
import { Badge, Inline } from '@sanity/ui'
import { useSanityQuery } from '../util/sanity'

const BlockContent = require('@sanity/block-content-to-react')

const DelmalBlockComponent = (props: any, maalform: string, id = '', skalHaPadding = true) => {
  if (id) {
    return DelmalBlock(props, maalform, id, skalHaPadding)
  } else {
    return <ErrorStyling>Fyll ut delmal</ErrorStyling>
  }
}

const DelmalBlock = (props: any, maalform: string, id = '', skalHaPadding = true) => {
  const query = `*[_id=="${id}"]{..., ${maalform}[]{..., valgReferanse->}}`
  const { data, error } = useSanityQuery(query)

  if (error) {
    console.error(error)
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>
  }

  if (!data) {
    return <TekstFelt>Laster delmalen...</TekstFelt>
  }

  if (!data.length) {
    return <ErrorStyling>Delmalen finnes ikke.</ErrorStyling>
  }

  if (!data[0][maalform]) {
    return <ErrorStyling>Delmalen har ingen tekst for denne målformen.</ErrorStyling>
  }

  return (
    <TekstFelt {...props} skalHaPadding={skalHaPadding}>
      <DelmalTittelBadge tone="primary">Delmal: {data[0].visningsnavn}</DelmalTittelBadge>
      <BlockContent
        blocks={data[0][maalform]}
        serializers={{
          marks: {
            flettefelt: (props: any) => <Flettefelt>{props.children}</Flettefelt>,
            delmal: (props: any) => <Delmal>{props.children}</Delmal>,
            valgfelt: (props: any) => <Valgfelt>{props.children}</Valgfelt>,
            lenke: (props: any) => <Lenke>{props.children}</Lenke>,
            hoyrestill: (props: any) => <Høyrestill>{props.children}</Høyrestill>,
          },
          types: {
            dokumentliste: (props: any) => props.children,
            block: BlockSerializer,
            delmalBlock: (props: any) =>
              DelmalBlockComponent(props, maalform, props.node.delmalReferanse._ref, false),
            valgBlock: (props: any) => (
              <ValgfeltBadgeWrapper>
                <ValgtefeltBadge>
                  {'Valgfelt: '} {props.node.valgReferanse.visningsnavn}
                </ValgtefeltBadge>
              </ValgfeltBadgeWrapper>
            ),
            htmlfelt: (props: any) => <h3>Html</h3>,
          },
        }}
      />
    </TekstFelt>
  )
}

const settTag = (node: any) => {
  const style = node.style

  if (RegExp('/?h[1-6]').test(style)) {
    return style
  }

  return 'div'
}

const BlockSerializer = (props: any) => {
  const Tag = settTag(props.node)

  return (
    <Tag style={{ minHeight: '1rem' }} className={'block'}>
      {props.children}
    </Tag>
  )
}

const Delmal = styled.span`
  background-color: rgba(183, 177, 100, 0.2);
`

const DelmalTittelBadge = styled(Badge)`
  margin-bottom: 1rem;
`

const Valgfelt = styled.span`
  background-color: rgba(180, 106, 161, 0.5);
`

const ValgfeltBadgeWrapper = styled(Inline)`
  margin-top: 1rem;
`

const ValgtefeltBadge = styled(Badge)`
  background-color: #dab5cf;
  color: black;
`

const Flettefelt = styled.span`
  background-color: rgba(30, 133, 209, 0.2);
`

const TekstFelt = styled.div`
  padding: ${props => (props.skalHaPading ? '0.75rem' : 0)};
  overflow: auto;
`

const Lenke = styled.span`
  background-color: rgba(97, 78, 116, 0.3);
`

const Høyrestill = styled.span`
  float: right;
`

const ErrorStyling = styled(TekstFelt)`
  color: #f03e2f;
`
export default DelmalBlockComponent