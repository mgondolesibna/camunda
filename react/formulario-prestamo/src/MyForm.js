// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Input, InputNumber, Button } from 'antd';

// const MyForm = () => {
//   const [nombre, setNombre] = useState('');
//   const [apellido, setApellido] = useState('');
//   const [cantidad, setCantidad] = useState(0);
//   const [plazo, setPlazo] = useState(0);

//   const handleSubmit = async (values) => {
//     console.log('Submit button clicked', values);

//     try {
//       const username = 'demo';
//       const password = 'demo';
//       const authString = `${username}:${password}`;
//       const encodedAuthString = btoa(authString);

//       const headers = {
//         'Authorization': `Basic ${encodedAuthString}`
//       };

//       const response = await axios.post(
//         '/api/engine/default/process-definition/key/poc-camunda-2-process/start',
//         {
//           variables: {
//             nombre: { value: values.nombre, type: 'String' },
//             apellido: { value: values.apellido, type: 'String' },
//             cantidad: { value: values.cantidad, type: 'Integer' },
//             plazo: { value: values.plazo, type: 'Integer' },
//           },
//         },
//         { headers }
//       );

//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Form onFinish={handleSubmit} style={{ width: 400, margin: '0 auto' }}>
//       <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
//         <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
//       </Form.Item>
//       <Form.Item label="Apellido" name="apellido" rules={[{ required: true }]}>
//         <Input value={apellido} onChange={(e) => setApellido(e.target.value)} />
//       </Form.Item>
//       <Form.Item
//         label="Cantidad de dinero a solicitar"
//         name="cantidad"
//         rules={[{ required: true, type: 'number', min: 0 }]}
//       >
//         <InputNumber value={cantidad} onChange={(value) => setCantidad(value)} min={0} />
//       </Form.Item>
//       <Form.Item
//         label="Plazo para devolverlo"
//         name="plazo"
//         rules={[{ required: true, type: 'number', min: 0 }]}
//       >
//         <InputNumber value={plazo} onChange={(value) => setPlazo(value)} min={0} />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Iniciar proceso
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default MyForm;

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Select, Checkbox, Button, message } from 'antd';

const { Option } = Select;

const MyForm = () => {
  const [tipoCuenta, setTipoCuenta] = useState('');

  const handleSubmit = async (values) => {
    console.log('Formulario enviado:', values);

    try {
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

      // Mostrar mensaje de éxito
      message.success('Su solicitud ha sido enviada exitosamente');

      // Retraso de 3 segundos antes de recargar la página
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTipoCuentaChange = (value) => {
    setTipoCuenta(value);
  };

  const handleEmitirChequeraChange = (e) => {
    // Aquí puedes realizar alguna acción si es necesario
  };

  return (
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
  );
};

export default MyForm;
