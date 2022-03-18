// Utils
import moment from 'moment-timezone'

// Components
import * as S from "./StyledComponents"

interface PropsI {
  betResolve: string;
  betClose: string;
}

const LeftSideInfo = ({ betResolve, betClose }: PropsI) => {

  function handleConvertToLocalTime(time: string) {
    let localTOpen
    localTOpen = moment.utc(moment.unix(Number(time)).format('YYYY-MM-DD HH:mm:ss')).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
    return localTOpen
  }

  return (
    <S.Container>
      <S.Title>Results</S.Title>
      <S.SubContainer>
        <S.Description>
          {moment(handleConvertToLocalTime(betResolve)).format("DD MMM YYYY")}
        </S.Description>
        <S.Description>
          {moment(handleConvertToLocalTime(betResolve)).format("H:mm")}
        </S.Description>
      </S.SubContainer>
      <S.SubContainer>
        <S.Description>BET BY</S.Description>
        <S.Description>
          {moment(handleConvertToLocalTime(betClose)).format("DD MMMM")}{" "}
          <S.Span>{moment(handleConvertToLocalTime(betClose)).format("H:mm")}</S.Span>
        </S.Description>
      </S.SubContainer>
    </S.Container>
  );
};

export default LeftSideInfo;
