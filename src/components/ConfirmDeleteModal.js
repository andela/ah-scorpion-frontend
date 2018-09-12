import React from 'react';
import Loader from './Loader';

const ConfirmDeleteModal = (props) => {
  const {
    confirmDelete,
    cancelDelete,
    deletedArticleSlug,
    isDeleting,
    errorMessage,
    deleteFailure,
    cleanDeleteFailure,
    deleteSuccess,
  } = props;

  return (
    <div
      className="modal fade"
      id="confirmDeleteModal"
      tabIndex="-1"
      role="dialog"
      data-backdrop="static"
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
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                disabled={isDeleting}
                onClick={cleanDeleteFailure}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                disabled={isDeleting}
                onClick={cancelDelete}
              >
                Cancel
              </button>
            )}

            {deleteFailure || deleteSuccess ? (
              ''
            ) : (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => confirmDelete(deletedArticleSlug)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
