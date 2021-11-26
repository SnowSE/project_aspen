import React, { useEffect, useState } from 'react'
import { useStoreSelector } from '../../store'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/js/bootstrap.js'
import { alertActions } from '../../store/alertSlice';

export default function AlertDisplay() {
    const dispatch = useDispatch();
    const shouldDisplay = useStoreSelector((state) => state.alert.shouldDisplay);
    const message = useStoreSelector((state) => state.alert.message);
    const danger = useStoreSelector((state) => state.alert.danger);
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (shouldDisplay) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
                dispatch(alertActions.hideAlert());
            }, 5000);
        }
    }, [shouldDisplay, dispatch]);

    const onHide = () => {
        setShow(false);
        dispatch(alertActions.hideAlert());
    }


    return show ? (
                <div className="col-auto position-fixed bottom-0 end-0 alert-display">
                    <div className={`alert ${danger ? `alert-danger` : `alert-success`} alert-dismissible p-3 shadow`}>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                        <h5>title</h5>
                        <p className="m-0">{message}</p>
                    </div>
                </div>
    ) : null;
}
