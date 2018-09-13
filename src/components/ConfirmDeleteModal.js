import React from 'react';
import { Button } from 'react-bootstrap';
import PropType from 'prop-types';
import Loader from './Loader';

const ConfirmDeleteModalHeader = () => (
  <div className="modal-header">
    <h5
      className="modal-title mx-auto"
      id="confirmDeleteModalTilte"
    >
      Delete Article?
    </h5>
  </div>
);

const ConfirmDeleteModalBody = ({ deleteFailure, deleteSuccess, errorMessage }) => (
  <div className="modal-body">
    {deleteFailure || deleteSuccess ? (
      <div
        className={`alert text-center alert-${deleteSuccess ? 'success' : 'danger'}`}
      >
        {deleteFailure ? errorMessage : 'You have successfully deleted this article'}
      </div>
    ) : (
      <p className="text-center">
        Are you sure you want to delete this Article?
        <br />
        This process is
        {' '}
        <strong className="text-danger">irreversible</strong>
        .
      </p>
    )}
  </div>
);

ConfirmDeleteModalBody.propTypes = {
  errorMessage: PropType.string.isRequired,
  deleteFailure: PropType.bool.isRequired,
  deleteSuccess: PropType.bool.isRequired,

};


const ConfirmDeleteModalFooter = ({
  deleteFailure, deleteSuccess, isDeleting,
  postRequestCleanUp, cancelDelete, confirmDelete, deletedArticleSlug,
}) => (
  <div className="modal-footer">
    {deleteFailure || deleteSuccess ? (
      <Button
        bsStyle="secondary"
        data-dismiss="modal"
        disabled={isDeleting}
        onClick={postRequestCleanUp}
      >
        Close
      </Button>
    ) : (
      <Button
        bsStyle="secondary"
        data-dismiss="modal"
        disabled={isDeleting}
        onClick={cancelDelete}
      >
        Cancel
      </Button>
    )}

    {deleteFailure || deleteSuccess ? (
      ''
    ) : (
      <Button
        bsStyle="danger"
        onClick={() => confirmDelete(deletedArticleSlug)}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    )}
  </div>
);

ConfirmDeleteModalFooter.propTypes = {
  deleteFailure: PropType.bool.isRequired,
  deleteSuccess: PropType.bool.isRequired,
  isDeleting: PropType.bool.isRequired,
  confirmDelete: PropType.func.isRequired,
  cancelDelete: PropType.func.isRequired,
  postRequestCleanUp: PropType.func.isRequired,
  deletedArticleSlug: PropType.string.isRequired,
};

const ConfirmDeleteModal = (props) => {
  const {
    confirmDelete,
    cancelDelete,
    deletedArticleSlug,
    isDeleting,
    errorMessage,
    deleteFailure,
    postRequestCleanUp,
    deleteSuccess,
  } = props;

  return (
    <div
      className="modal fade"
      id="confirmDeleteModal"
      tabIndex="-1"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <ConfirmDeleteModalHeader />
          {isDeleting ? (
            <Loader
              style={{
                width: '20%',
                margin: 'auto',
              }}
            />
          ) : (
            <ConfirmDeleteModalBody
              deleteFailure={deleteFailure}
              deleteSuccess={deleteSuccess}
              errorMessage={errorMessage}
            />
          )}
          <ConfirmDeleteModalFooter
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
            postRequestCleanUp={postRequestCleanUp}
            deletedArticleSlug={deletedArticleSlug}
            isDeleting={isDeleting}
            deleteFailure={deleteFailure}
            deleteSuccess={deleteSuccess}
          />
        </div>
      </div>
    </div>
  );
};

ConfirmDeleteModal.propTypes = {
  confirmDelete: ConfirmDeleteModalFooter.propTypes.confirmDelete.isRequired,
  cancelDelete: ConfirmDeleteModalFooter.propTypes.cancelDelete.isRequired,
  postRequestCleanUp: ConfirmDeleteModalFooter.propTypes.postRequestCleanUp.isRequired,
  deletedArticleSlug: ConfirmDeleteModalFooter.propTypes.deletedArticleSlug.isRequired,
  errorMessage: ConfirmDeleteModalBody.propTypes.errorMessage.isRequired,
  isDeleting: ConfirmDeleteModalFooter.propTypes.isDeleting.isRequired,
  deleteFailure: ConfirmDeleteModalBody.propTypes.deleteFailure.isRequired,
  deleteSuccess: ConfirmDeleteModalBody.propTypes.deleteSuccess.isRequired,
};

export default ConfirmDeleteModal;
