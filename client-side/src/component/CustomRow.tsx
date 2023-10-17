import React, {ChangeEvent, FC,  useState} from 'react';
import styled from '@emotion/styled';
import CommandInput from "./navbar/CommandInput";
const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease-in-out;
  z-index: 100;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between; 
  background: #333333;
  padding: 20px;
  border-radius: 4px;
  position: relative;
  height: 50%;
  width: 50%;
`;

const ModalFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 50%;
  transform: translate(-20%);
  margin-bottom: 10px;
  margin-top: 10px ;
`;


const SpotifyCircle = styled.button`
  background-image: url("/img/spotify.svg");
  border-radius: 50%;
  border: none;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.div`
  display: flex;
  margin: 20px;
  align-items: center; 
  justify-content: space-between; 
  padding: 0 10px;
`;

const NotepadCircle = styled.button`
  background-image: url("/img/notepad.svg");
  background-repeat: no-repeat;
  background-size: cover;
  border: none ;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


type ModalContentType = "SPOTIFY" | "NOTEPAD" | null;



const CustomRow: FC= () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContentType>(null);

    const toggleModal = (content: ModalContentType) => {
        setModalContent(content);
        setModalOpen(prev => !prev);
    };

    const renderModal = () => {
        if (!isModalOpen) return null;

        let content;
        switch (modalContent) {
            case "SPOTIFY":
                content = <div>SPOTIFY API</div>;
                break;
            case "NOTEPAD":
                content = <div>hello world</div>
                break;
            default:
                content = null;
        }

        return (
            <Modal onClick={() => toggleModal(null)}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    {content}
                    <button onClick={() => toggleModal(null)}
                            style={{position: 'relative', width:"20%"}}>
                        Close
                    </button>
                </ModalContent>
            </Modal>
        );
    };

    return (
        <RowContainer>
            <SpotifyCircle onClick={() => toggleModal("SPOTIFY")}/>
            <NotepadCircle onClick={() => toggleModal("NOTEPAD")}/>
            {renderModal()}
            <ModalFooter/>
        </RowContainer>
    );
};

export default CustomRow;
