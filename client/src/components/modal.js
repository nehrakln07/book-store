import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

const GenericModal = ({
  onClose,
  children,
  isOpen,
  overlayClassName,
  ...rest
}) => (
  <Modal
    ariaHideApp={false}
    overlayClassName={`cd-md-container ${overlayClassName}`}
    isOpen={isOpen}
    shouldCloseOnEsc
    onRequestClose={onClose}
    {...rest}
  >
    <div>
      <div role="button" className="cd-md-close-btn" onClick={onClose}>
        x
      </div>
      {children}
    </div>
  </Modal>
);

GenericModal.propTypes = {
  overlayClassName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any
};

GenericModal.defaultProps = {
  overlayClassName: "",
  children: null
};

export default GenericModal;
