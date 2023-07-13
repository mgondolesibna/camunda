import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Select, Checkbox, Button, message, Spin } from 'antd';

const { Option } = Select;

const MyForm = () => {
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [responseId, setResponseId] = useState('');

  useEffect(() => {
    if (showSecondForm) {
      setLoading(false);
    }
  }, [showSecondForm]);

  const handleSubmitCuit = async (value) => {
    console.log('Cuit enviado:', value);

    try {
      const username = 'demo';
      const password = 'demo';
      const authString = `${username}:${password}`;
      const encodedAuthString = btoa(authString);

      const headers = {
        'Authorization': `Basic ${encodedAuthString}`
      };

      const response = await axios.put(
        '/api/engine/default/process-instance/' + responseId + '/variables/cuit',
        {
          value: value.cuit,
          type: 'String',
        },
        { headers }
      );

      console.log(response.data);

      // Mostrar mensaje de éxito
      message.success('Su CUIT ha sido enviado exitosamente');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    console.log('Formulario enviado:', values);

    try {
      setLoading(true); // Mostrar la ruedita de carga

      const username = 'demo';
      const password = 'demo';
      const authString = `${username}:${password}`;
      const encodedAuthString = btoa(authString);

      const headers = {
        'Authorization': `Basic ${encodedAuthString}`
      };

      const response = await axios.post(
        '/api/engine/default/process-definition/key/poc-camunda-2-process/start',
        {
          variables: {
            nombre: { value: values.nombre, type: 'String' },
            apellido: { value: values.apellido, type: 'String' },
            tipoCuenta: { value: values.tipoCuenta, type: 'String' },
            emitirChequera: { value: values.emitirChequera, type: 'Boolean' },
          },
        },
        { headers }
      );

      console.log(response.data);
      const { id } = response.data;
      setResponseId(id); // Guardar el responseId en el estado

      // Mostrar mensaje de éxito
      message.success('Su solicitud ha sido enviada exitosamente');
      if (tipoCuenta === '27') {
    window.location.reload();
    return;
  }

      // Realizar solicitud GET cada 5 segundos hasta que el campo childActivityInstances.activityId sea "Activity_16s9fbv"
      const intervalId = setInterval(async () => {
        try {
          const activityInstancesResponse = await axios.get('http://localhost:8080/engine-rest/engine/default/process-instance/' + id + '/activity-instances');
          console.log("holaaaaaaaaaaaaaaaaaaa");
          const activityInstances = activityInstancesResponse.data.childActivityInstances;
          console.log(activityInstances);
          activityInstances.forEach((element) => {
            if (element.activityId === 'Activity_16s9fbv') {
              setLoading(false); // Ocultar la ruedita de carga
              setShowSecondForm(true); // Mostrar el segundo formulario
              message.info('Por favor ingrese su CUIT');
              clearInterval(intervalId);
            }
          })
        } catch (error) {
          console.error(error);
        }
      }, 5000); // Retraso de 5 segundos

    } catch (error) {
      console.error(error);
    }
  };

  const handleTipoCuentaChange = (value) => {
    setTipoCuenta(value);
     if (value !== '10') {
    setShowSecondForm(false);
  }
  };

  const handleEmitirChequeraChange = (e) => {
    // Aquí puedes realizar alguna acción si es necesario
  };

  if (showSecondForm) {
    return (
      <Spin spinning={loading}>
        {/* Ruedita de carga */}
        <Form
          name="cuitForm"
          style={{ width: 400, margin: '0 auto' }}
          onFinish={handleSubmitCuit}
        >
          <Form.Item label="CUIT" name="cuit" rules={[{ required: true, message: 'Por favor ingresa tu CUIT' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar CUIT
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }

  return (
    <Spin spinning={loading}>
      {/* Ruedita de carga */}
      <Form
        name="loanForm"
        initialValues={{ tipoCuenta: '', emitirChequera: false }}
        onFinish={handleSubmit}
        style={{ width: 400, margin: '0 auto' }}
      >
        <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Apellido" name="apellido" rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Tipo de cuenta" name="tipoCuenta" rules={[{ required: true, message: 'Por favor selecciona el tipo de cuenta' }]}>
          <Select onChange={handleTipoCuentaChange}>
            <Option value="10">Cuenta Corriente</Option>
            <Option value="27">Cuenta Corriente Especial</Option>
          </Select>
        </Form.Item>
        {tipoCuenta === '10' && (
          <Form.Item name="emitirChequera" valuePropName="checked">
            <Checkbox onChange={handleEmitirChequeraChange}>Emitir chequera</Checkbox>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Iniciar proceso
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default MyForm;
