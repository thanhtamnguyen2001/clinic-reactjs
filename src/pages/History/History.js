import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MyTable from '~/components/MyTable';
import patientService from '~/services/patient.service';
import registerService from '~/services/register.service';
import convertTimestamp from '~/utils/convertTimestamp';

import styles from './History.module.scss';

const cx = classNames.bind(styles);

function History() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [registers, setRegisters] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicineOfPres, setMedicineOfPres] = useState([]);

    useEffect(() => {
        registerService.getRegistersByCurrentUser().then(
            (res) => setRegisters(res.data),
            (error) => setRegisters(error.response.status),
        );
    }, []);

    useEffect(() => {
        if (certificates.length === 0) {
            setCertificates([]);
            registers.forEach((r) =>
                patientService
                    .getCertificatesByRegisterId(r.id)
                    .then((res) => setCertificates((prev) => [...prev, { id: r.id, cers: res.data }])),
            );
        }
    }, [registers]);

    useEffect(() => {
        if (prescriptions.length === 0) {
            setPrescriptions([]);
            certificates.forEach((certificate) =>
                certificate.cers.forEach((cer) =>
                    patientService
                        .getPrescriptionsByCertificateId(cer.id)
                        .then((res) => setPrescriptions((prev) => [...prev, { cerId: cer.id, pres: res.data }])),
                ),
            );
        }
    }, [certificates]);

    useEffect(() => {
        setMedicineOfPres([]);
        prescriptions.forEach((prescription) =>
            prescription.pres.forEach((p) =>
                patientService.getPrescriptionDetailsByPrescriptionId(p.id).then(
                    (medicines) => setMedicineOfPres((prev) => [...prev, { preId: p.id, mds: medicines.data }]),
                    (error) => setMedicineOfPres((prev) => [...prev, { preId: p.id, mds: null }]),
                ),
            ),
        );
    }, [prescriptions]);

    if (!currentUser) {
        return <h1>????ng nh???p ????? xem l???ch s???</h1>;
    }

    return (
        <div className={cx('wrapper')}>
            {registers === 404 && <h1>B???n kh??ng c?? l???ch s??? kh??m</h1>}
            {registers.length && (
                <div>
                    <MyTable
                        green
                        title="L???ch s??? kh??m b???nh"
                        headings={[
                            'M?? ????ng k??',
                            'T??n b???nh nh??n',
                            'S??? ??i???n',
                            'Ng??y ????ng k??',
                            'Ng??y h???n kh??m',
                            'Tr???ng th??i',
                        ]}
                    >
                        {registers.map((r) => (
                            <>
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.name}</td>
                                    <td>{r.phone}</td>
                                    <td>{convertTimestamp(r.createdDate)}</td>
                                    <td>{convertTimestamp(r.examinationTime)}</td>
                                    <td>{r.verified ? <span>???? x??c nh???n</span> : <span>Ch??a x??c nh???n</span>}</td>
                                </tr>
                                {certificates.length &&
                                    certificates.find((c) => c.id === r.id) !== undefined &&
                                    certificates.find((c) => c.id === r.id).cers.length &&
                                    certificates
                                        .find((c) => c.id == r.id)
                                        .cers.map((cer) => (
                                            <>
                                                <div key={cer.id} className={cx('wrap-cer')}>
                                                    <div className={cx('cer-item')}>
                                                        <h4>M?? phi???u kh??m</h4>
                                                        <span>{cer.id}</span>
                                                    </div>
                                                    <div className={cx('cer-item')}>
                                                        <h4>Tri???u ch???ng</h4>
                                                        <span>{cer.symptom}</span>
                                                    </div>
                                                    <div className={cx('cer-item')}>
                                                        <h4>K???t lu???n</h4>
                                                        <span>{cer.conclusion}</span>
                                                    </div>
                                                    <div className={cx('cer-item')}>
                                                        <h4>B??c s?? kh??m</h4>
                                                        <span>
                                                            {cer.user.lastName} {cer.user.firstName}
                                                        </span>
                                                    </div>
                                                    <div className={cx('cer-item')}>
                                                        <h4>Ng??y t???o</h4>
                                                        <span>{convertTimestamp(cer.createdDate)}</span>
                                                    </div>
                                                </div>
                                                {prescriptions.length &&
                                                    prescriptions.find((p) => p.cerId == cer.id) !== undefined &&
                                                    prescriptions.find((p) => p.cerId === cer.id).pres.length &&
                                                    prescriptions
                                                        .find((p) => p.cerId === cer.id)
                                                        .pres.map((p) => (
                                                            <>
                                                                <div className={cx('wrap-pre')}>
                                                                    <div className={cx('pre-item')}>
                                                                        <h4>M?? toa thu???c</h4>
                                                                        <span>{p.id}</span>
                                                                    </div>
                                                                    <div className={cx('pre-item')}>
                                                                        <h4>Ng??y t???o</h4>
                                                                        <span>{convertTimestamp(p.createdDate)}</span>
                                                                    </div>
                                                                </div>
                                                                {medicineOfPres.find((m) => m.preId === p.id) && (
                                                                    <>
                                                                        <div className={cx('policy-container')}>
                                                                            <div className={cx('policy-table')}>
                                                                                <div className={cx('headings')}>
                                                                                    <span className={cx('heading')}>
                                                                                        M?? thu???c
                                                                                    </span>
                                                                                    <span className={cx('heading')}>
                                                                                        T??n thu???c
                                                                                    </span>
                                                                                    <span className={cx('heading')}>
                                                                                        Ghi ch??
                                                                                    </span>
                                                                                    <span className={cx('heading')}>
                                                                                        ????n v???
                                                                                    </span>
                                                                                    <span className={cx('heading')}>
                                                                                        S??? l?????ng/????n v???
                                                                                    </span>
                                                                                    <span className={cx('heading')}>
                                                                                        S??? l?????ng
                                                                                    </span>
                                                                                </div>

                                                                                {medicineOfPres.find(
                                                                                    (m) => m.preId === p.id,
                                                                                ).mds !== null &&
                                                                                    medicineOfPres
                                                                                        .find((m) => m.preId === p.id)
                                                                                        .mds.map((m) => (
                                                                                            <div
                                                                                                className={cx('policy')}
                                                                                            >
                                                                                                <span>
                                                                                                    {m.medicine.id}
                                                                                                </span>
                                                                                                <span>
                                                                                                    {m.medicine.name}
                                                                                                </span>
                                                                                                <span>
                                                                                                    {m.medicine.note}
                                                                                                </span>
                                                                                                <span>
                                                                                                    {
                                                                                                        m.medicine.unit
                                                                                                            .name
                                                                                                    }
                                                                                                </span>
                                                                                                <span>
                                                                                                    {
                                                                                                        m.medicine
                                                                                                            .quantityPerUnit
                                                                                                    }
                                                                                                </span>
                                                                                                <span>
                                                                                                    {m.quantity}
                                                                                                </span>
                                                                                            </div>
                                                                                        ))}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </>
                                                        ))}
                                            </>
                                        ))}
                            </>
                        ))}
                    </MyTable>
                </div>
            )}
        </div>
    );
}

export default History;
