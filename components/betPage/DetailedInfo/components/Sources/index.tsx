import { Fragment } from 'react';

// Components
import { ResultSource } from 'lib/graph';
import * as S from './StyledComponents'


interface PropsI {
  sources: ResultSource[];
}

const BetPageComponent = ({ sources }: PropsI) => {
  return (
    <S.Container>
      <S.Title>Sources</S.Title>
      {sources.map((source) => (
        <Fragment key={source.title}>
          {source.title && (
            <S.LinkContainer>
              <S.Text>Title</S.Text>
              <S.TitleText>{source.title}</S.TitleText>
            </S.LinkContainer>
          )}
          <S.LinkContainer>
            <S.Text>Source URL</S.Text>
            <S.Link target="_blank" href={source.url}>
              {source.url}
            </S.Link>
          </S.LinkContainer>

        </Fragment>
      ))}
    </S.Container>
  );
};

export default BetPageComponent
