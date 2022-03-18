import { useEffect, useLayoutEffect, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks";
import { setFormData } from "components/createBetPage/ducks";

// Utils
import * as S from "./StyledComponents";
import * as SC from "components/createBetPage/Main/StyledComponents";

// Components
import SelectButton from "components/shared/SelectButton"
import ImageInput from "./components/ImageInput";
import Options from "./components/Options";
import ImageBox from "./components/ImageBox";
import StartingPot from "./components/StartingPot";
import { toast } from "react-toastify";
import { RoomEventInfo } from "lib/contracts";

export interface HTMLInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

interface PropsI {
  nextStep: () => void;
}

const BetOptionDetails = ({ nextStep }: PropsI) => {
  const [betType, setBetType] = useState<string | number>("");
  const [opponents, setOpponents] = useState<RoomEventInfo["opponents"]>({
    titles: [],
    images: [],
  });
  const [options, setOptions] = useState<string[]>([]);
  const [startingPot, setStartingPot] = useState<string>("");
  const [imagesSrc, setImagesSrc] = useState<HTMLImageElement[]>([]);

  const createBetForm = useAppSelector((state) => state.createBetReducer);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: HTMLInputEvent, index: number) => {
    e.preventDefault();
    let newOpponentTitles = [...opponents.titles];
    newOpponentTitles[index] = e.target.value;
    setOpponents((prevState) => ({ ...prevState, titles: newOpponentTitles }));
  };

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadImage = async (e: HTMLInputEvent, index: number) => {
    e.preventDefault();
    const newImagesSrc = [...JSON.parse(JSON.stringify(imagesSrc))];
    if (e.target && e.target.files && e.target.files[0]) {
      const { size, type, name } = e.target.files[0];
      if (!type.toLowerCase().match(/image\/(jpg|jpeg|png|gif|webp)$/)) {
        toast.error(
          "Selected file image must be jpg, jpeg, png, gif or webp image only"
        );
        return;
      }

      if (size / 1000 <= 200) {
        try {
          newImagesSrc[index] = await toBase64(e.target.files[0]);
          setImagesSrc(newImagesSrc);
        } catch (error) {
          toast.error("We can't handle this image")
        }

        let newOpponentImages = [...opponents.images];
        newOpponentImages[index] = newImagesSrc[index];
        setOpponents((prevState) => ({
          ...prevState,
          images: newOpponentImages,
        }));
      } else {
        toast.error('Image size should not exceed 200kb')
      }
    }
  };

  const handleSetOption = (e: string | number) => {
    setBetType(e);
    switch (e) {
      case "Single variable":
        setOpponents({ titles: [""], images: [""] });
        break;
      case "Two opponents":
        setOpponents({ titles: ["", ""], images: ["", ""] });

        break;
      case "Multiple opponents":
        setOpponents({ titles: ["", "", ""], images: ["", "", ""] });
        break;
      default:
        break;
    }
    setOptions([]);
    setStartingPot("");
  };

  const handleSetBetType = (numberOfOpponents: number) => {
    switch (true) {
      case numberOfOpponents === 1:
        setBetType("Single variable");
        break;
      case numberOfOpponents === 2:
        setBetType("Two opponents");
        break;
      case numberOfOpponents >= 3:
        setBetType("Multiple opponents");
        break;
      default:
        break;
    }
  };

  const handleRemoveOpponents = (index: number) => {
    const newOpponentsTitles = opponents.titles.filter((title, i) => i !== index);
    const newOpponentsImages = opponents.images.filter((image, i) => i !== index);
    setOpponents({ titles: newOpponentsTitles, images: newOpponentsImages });
  };

  const toggleNextStep = () => {

    if (opponents.images.length > 1) {
      for (let i = 0; i < opponents.images.length; i++) {
        const image = opponents.images[i];
        const title = opponents.titles[i];

        if (image === "") {
          toast.error(`Please upload an image for opponent #${i + 1}`);
          return;
        }

        if (title.trim() === "") {
          toast.error(`Please enter a name for opponent #${i + 1}`);
          return;
        }
      }
    } else if (opponents.images.length === 1) {
      if (opponents.images[0] === "") {
        toast.error("Please upload an image");
        return;
      }

      if (opponents.titles[0].trim() === "") {
        toast.error("Please enter a name");
        return;
      }
    }

    const isNotUniqueName = opponents.titles.some((title, i) => opponents.titles.indexOf(title) !== i);

    if (isNotUniqueName) {
      toast.error("Name must be unique");
      return;
    }

    const isNotUniqueImage = opponents.images.some((image, i) => opponents.images.indexOf(image) !== i);

    if (isNotUniqueImage) {
      toast.error("Images must be unique");
      return;
    }

    if (options.length < 2) {
      if (options.length === 0) toast.error("Please add at least two options");
      else if (options.length === 1) toast.error("Please add at least one more option");
      return;
    }

    if (Number(startingPot) < 0) {
      toast.error("Starting pot can not be less than zero");
      return;
    }

    const outcomes: RoomEventInfo["outcomes"] = {
      titles: []
    };

    for (let i = 0; i < options.length; i++) {
      const outcome = options[i];
      outcomes.titles.push(outcome);
    }

    dispatch(
      setFormData({
        opponents,
        outcomes,
        startingPot: Number(startingPot),
      })
    );
    nextStep();
  };

  useLayoutEffect(() => {
    if (createBetForm) {
      if (createBetForm.outcomes)
        setOptions(createBetForm.outcomes.titles.map((title) => title));
      if (createBetForm.startingPot)
        setStartingPot(`${createBetForm.startingPot}`);
      if (createBetForm.opponents.titles.length > 0) {
        setOpponents(createBetForm.opponents);
        const numberOfOpponents = createBetForm.opponents.titles.length
        handleSetBetType(numberOfOpponents)
      }
    }
  }, [createBetForm]);

  useEffect(() => {
    handleSetBetType(opponents.images.length)
  }, [opponents.images.length])

  return (
    <S.Container>
      <SC.InputContainer>
        <SC.Title>
          Type of bet<SC.Required>*</SC.Required>
        </SC.Title>
        <SelectButton
          options={["Single variable", "Two opponents", "Multiple opponents"]}
          setOption={handleSetOption}
          selectedOption={betType}
        />
      </SC.InputContainer>
      <SC.InputContainer>
        {opponents.images.length > 1
          ? opponents.images.map((image, index) => {
            const opponent = { title: opponents.titles[index], image };
            return (
              <ImageInput
                handleChange={handleUploadImage}
                handleInputChange={handleInputChange}
                handleRemoveOpponents={() => handleRemoveOpponents(index)}
                index={index}
                opponent={opponent}
                key={index}
              />
            );
          })
          : opponents.images.length === 1 && (
            <S.ImageInputContainer>
              <ImageBox
                handleChange={(e) => handleUploadImage(e, 0)}
                imageSrc={opponents.images[0]}
                size={10}
                accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
              />
              <S.Message> Only JPG, JPEG, PNG, GIF & WEBP files are acceptble </S.Message>
              <S.InputSubContainer>
                <SC.Input
                  placeholder="Name"
                  onChange={(e) => handleInputChange(e, 0)}
                  value={opponents.titles[0]}
                  maxLength={30}
                />
              </S.InputSubContainer>
            </S.ImageInputContainer>
          )}
        {opponents.titles.length > 2 && (
          <SC.AddInputButton
            onClick={() =>
              setOpponents((prevState) => ({
                titles: [...prevState.titles, ""],
                images: [...prevState.images, ""],
              }))
            }
          >
            Add Opponents
          </SC.AddInputButton>
        )}
      </SC.InputContainer>
      {opponents.titles.length > 0 && (
        <Options setOptions={setOptions} options={options} />
      )}
      {betType && (
        <>
          <StartingPot
            handleChange={setStartingPot}
            startingPot={startingPot}
          />
          <SC.ConfirmButton onClick={toggleNextStep}>
            Next Step
          </SC.ConfirmButton>
        </>
      )}
    </S.Container>
  );
};

export default BetOptionDetails;