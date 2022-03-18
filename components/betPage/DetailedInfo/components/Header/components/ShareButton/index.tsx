import { useEffect, useRef, useState } from "react"

// Utils
import { FaShareAltSquare } from "react-icons/fa"
import { osloGray } from "styles/colors"
import {
  ImFacebook2,
  ImTwitter,
} from "react-icons/im"
import { MdContentCopy, MdEmail } from "react-icons/md"
import {
  FacebookShareButton,
  TwitterShareButton,
} from "react-share"
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Components
import * as S from "./StyledComponents";

// Hooks
import useOutsideAlerter from "components/hooks/clickedOutside";

const shareButtonStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
}

const ShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const buttonRef = useRef(null);
  useOutsideAlerter(buttonRef, () => setIsModalOpen(false));

  const copyToClipboard = () => {
    setLinkCopied(!linkCopied);

    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const link = window.location.href;
    setUrl(link);
  }, []);

  return (
    <S.Container>
      <S.SubContainer ref={buttonRef}>
        <S.IconButton onClick={() => setIsModalOpen(true)}>
          <FaShareAltSquare size={20} color={osloGray} />
        </S.IconButton>
        {isModalOpen && (
          <S.Modal>
            <S.Wrapper>
              <CopyToClipboard
                text={url}
                onCopy={copyToClipboard}
              >
                <S.Button data-name="copy-link">
                  <MdContentCopy size={20} color="white" />
                  {linkCopied ? (
                    <S.Title>Link copied</S.Title>
                  ) : (
                    <S.Title>Copy link</S.Title>
                  )}
                </S.Button>
              </CopyToClipboard>
              <FacebookShareButton
                data-test-id="facebook"
                url={url}
                className="mb-5"
                resetButtonStyle={false}
                style={shareButtonStyle}
              >
                <ImFacebook2 size={20} color="white" />
                <S.Title>Facebook</S.Title>
              </FacebookShareButton>
              <TwitterShareButton
                data-test-id="twitter"
                className="mb-5"
                url={url}
                resetButtonStyle={false}
                style={shareButtonStyle}
              >
                <ImTwitter size={20} color="white" />
                <S.Title>Twitter</S.Title>
              </TwitterShareButton>
            </S.Wrapper>
          </S.Modal>
        )}
      </S.SubContainer>
    </S.Container >
  );
};

export default ShareButton;
