import React from 'react';
import { Button } from 'react-bootstrap';
import PropType from 'prop-types';
import Loader from './Loader';

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
          <div className="modal-header">
            <h5
              className="modal-title mx-auto"
              id="confirmDeleteModalTilte"
            >
              Delete Article?
            </h5>
          </div>
          {isDeleting ? (
            <Loader
              style={{
                width: '20%',
                margin: 'auto',
              }}
            />
          ) : (
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
          )}
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
        </div>
      </div>
    </div>
  );
};

ConfirmDeleteModal.propTypes = {
  confirmDelete: PropType.func.isRequired,
  cancelDelete: PropType.func.isRequired,
  postRequestCleanUp: PropType.func.isRequired,
  deletedArticleSlug: PropType.string.isRequired,
  errorMessage: PropType.string.isRequired,
  isDeleting: PropType.bool.isRequired,
  deleteFailure: PropType.bool.isRequired,
  deleteSuccess: PropType.bool.isRequired,
};

export default ConfirmDeleteModal;
