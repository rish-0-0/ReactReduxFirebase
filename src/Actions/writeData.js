import DB from '../firebase';
const writingData = () => {
    return {
        type: 'WRITING_DATA',
    };
};
const wroteData = (docId) => {
    return {
        type: 'WROTE_DATA',
        payload : {
            'docId': docId,
        },
    };
};
const errorWhileWriting = (err) => {
    return {
        type: 'WRITE_ERROR',
        payload: {
            err,
        },
    };
};
export const writeNewDocumentWithoutId = (collection,data) => {
    return dispatch => {
        dispatch(writingData());
        DB.collection(collection).add(data)
        .then(docRef => {
            dispatch(wroteData(docRef.id));
        })
        .catch(err => {
            dispatch(errorWhileWriting(err.message));
        });
    };
};
export const writeNewDocumentWithId = (collection,docId,data) => {
    return dispatch => {
        dispatch(writingData());
        DB.collection(collection).doc(docId).set(data)
        .then( () => {
            dispatch(wroteData(docId));
        })
        .catch(err => {
            dispatch(errorWhileWriting(err.message));
        });
    };
};
export const updateDocument = (collection,docId,newData) => {
    return dispatch => {
        dispatch(writingData());
        DB.collection(collection).doc(docId)
        .update(newData)
        .then(() => {
            dispatch(wroteData(docId));
        })
        .catch((err) => {
            dispatch(errorWhileWriting(err.message));
        })
    };
};
export const deleteDocument = (collection,docId) => {
    return dispatch => {
        dispatch(writingData());

        DB.collection(collection).doc(docId).delete()
        .then(() => {
            dispatch(wroteData(docId));
        })
        .catch(err => {
            dispatch(errorWhileWriting(err.message));
        });
    };
};