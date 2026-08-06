import { useState } from 'react';
import Modal from 'react-modal';
import '../../styles.css';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onCloseModal = () => {
    console.log("Cerrando modal");
    setIsOpen(false);

  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <h1>Hola, Mundo!!</h1>
      <hr />
      <p>Tempor sit magna magna eu laboris duis ipsum. Deserunt commodo qui nostrud ut et ex adipisicing consequat qui. Amet reprehenderit excepteur aliqua sit et consequat do incididunt reprehenderit ex est. Deserunt pariatur ea tempor enim tempor anim qui.

        Exercitation do qui pariatur minim labore nostrud eiusmod. Non aliquip commodo officia laborum labore cillum in eu consectetur ex consectetur ipsum. Nisi pariatur ad culpa labore qui.

        Ut dolor eu proident officia exercitation do ullamco dolore sint. Cillum exercitation deserunt officia deserunt nisi. Ipsum fugiat est do nisi enim proident cillum.</p>
    </Modal>
  )
}
