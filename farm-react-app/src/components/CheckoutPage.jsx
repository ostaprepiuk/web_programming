import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Імпортуємо Yup напряму сюди
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFully } from '../redux/cartSlice';

// Створюємо схему прямо тут, щоб не було помилок з імпортом файлів
const SimpleSchema = Yup.object().shape({
    firstName: Yup.string().required('Обов\'язково'),
    lastName: Yup.string().required('Обов\'язково'),
    email: Yup.string().email('Невірний формат').required('Обов\'язково'),
    phone: Yup.string().required('Обов\'язково'),
    companyTaxId: Yup.string().required('Обов\'язково'),
});

const CheckoutPage = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        cartItems.forEach(item => dispatch(removeItemFully(item.id)));
        navigate('/success');
    };

    return (
        <div style={{ padding: '40px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Оформлення замовлення</h2>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', phone: '', companyTaxId: '' }}
                validationSchema={SimpleSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form style={{ display: 'grid', gap: '10px' }}>
                        <Field name="firstName" placeholder="Ім'я" />
                        {errors.firstName && touched.firstName && <div style={{color:'red'}}>{errors.firstName}</div>}
                        
                        <Field name="lastName" placeholder="Прізвище" />
                        <Field name="email" placeholder="Email" />
                        <Field name="phone" placeholder="Телефон" />
                        <Field name="companyTaxId" placeholder="Код компанії" />
                        
                        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
                            Підтвердити
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutPage;