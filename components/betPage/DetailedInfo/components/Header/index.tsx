// Components
import { VirtualFloor } from "lib/graph";
import ReportButton from "./components/ReportButton";
import ShareButton from "./components/ShareButton";
import * as S from "./StyledComponents";

interface PropsI {
  setSection: React.Dispatch<React.SetStateAction<string>>;
  section: string;
  virtualFloor: VirtualFloor;
}

const headers = ["Bets analysis", "Source"];

const Header = ({ setSection, section, virtualFloor }: PropsI) => {
  return (
    <S.Container>
      <S.ButtonsContainer>
        {headers.map((header) => (
          <S.Button
            selected={header === section}
            onClick={() => setSection(header)}
            key={header}
          >
            <S.Text>{header}</S.Text>
          </S.Button>
        ))}
      </S.ButtonsContainer>
      <ReportButton virtualFloor={virtualFloor} />
      <ShareButton />
    </S.Container>
  );
};

export default Header;
