import { useState } from 'react';
import Modal from 'react-modal';
import '../../styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es)

type DateField = 'start' | 'end';

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
  const [formValues, setFormValues] = useState({
    title: 'Angel',
    note: 'Guzman',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const onDateChanged = (date: Date | null, changing: DateField) => {

    setFormValues({
      ...formValues,
      [changing]: date
    });

  };

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Diferencia de tiempo
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      console.log("Error en fechas");

      return;
    };

    if (formValues.title.length <= 0) return;

    console.log(formValues);

    // TODO:
    // Remover errores en pantalla
    // cerrar modal

  }

  const onCloseModal = () => {
    // console.log("Cerrando modal");
    setIsOpen(false);
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event: Date | null) => { onDateChanged(event, 'start') }}
            className={'form-control'}
            dateFormat={"Pp"} // Para que aparezca la hora
            showTimeSelect // Seleccionar la hora
            locale={"es"} // Idioma
            timeCaption='Hora'
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event: Date | null) => { onDateChanged(event, 'end') }}
            className={'form-control'}
            dateFormat={"Pp"} // Para que aparezca la hora
            showTimeSelect // Seleccionar la hora
            locale={"es"} // Idioma
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.note}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
