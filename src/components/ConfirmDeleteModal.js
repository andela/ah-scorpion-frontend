import React from 'react';
import Loader from './Loader';
import SignUpError from './SignUpError';

const ConfirmDeleteModal = (props) => {
  const {
    confirmDelete, cancelDelete, deletedArticleSlug, isDeleting, errors, deleteFailure, cleanDeleteFailure,
  } = props;

  const errorsBool = errors === '';

  return (
    <div
      className="modal fade"
      id="confirmDeleteModal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmDeleteModalTilte">Delete Article?</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          {isDeleting ? (
            <Loader style={{
              width: '20%',
              margin: 'auto',
            }}
            />
          )
            : (
              <div className="modal-body">
                {
                  errorsBool ? (<SignUpError errorMsg={errors} />) : (
                    ''
                  )
                }
                <p>
                  Are you sure you want to delete this Article?
                  <br />
                  This process is irreversible.
                </p>
              </div>
            )
          }
          <div className="modal-footer">
            {deleteFailure ? (
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                disabled={isDeleting}
                onClick={cleanDeleteFailure}
              >
              Close
              </button>
            )
              : (
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

            {deleteFailure ? '' : (
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
