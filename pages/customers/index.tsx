import Layout from '@/layouts/Layout';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Box, Grid, Typography, Hidden, Card, CardContent, TextField, ButtonGroup, Modal } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import toast, { Toaster } from 'react-hot-toast'

interface Cliente {
  id: string; legal_name: string; tax_id: string; tax_system: string; zip: string; street: string; exterior: string; interior: string; neighborhood: string;
  city: string;
  municipality: string;
  state: string;
  country: string;
  email: string;
  phone: string;
}

const initialCliente = {
  id: '',
  legal_name: '',
  tax_id: '',
  tax_system: '',
  zip: '',
  street: '',
  exterior: '',
  interior: '',
  neighborhood: '',
  city: '',
  municipality: '',
  state: '',
  country: '',
  email: '',
  phone: '',
};

const ClientesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);
  const [modifiedCliente, setModifiedCliente] = useState<Cliente | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [cliente, setCliente] = useState<Cliente>(initialCliente);

  const handleActualizar = (id: string) => {
    const cliente = clientes.find((c) => c.id === id);
    if (cliente) {
      setModifiedCliente(cliente);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setCliente(initialCliente); // Restablecer el formulario al estado inicial al cerrar el modal
    setOpen(false);
  };

  const crearUsuario = async (usuario: Cliente) => {
    try {
      const { id, ...data } = usuario; // Excluir el campo "id" del objeto usuario
      const response = await axios.post('https://test-api.invoice-go.com/api/customer', data);
      const nuevoUsuario = response.data;
      setClientes([...clientes, nuevoUsuario]);
      handleClose();
      toast.success('Se creo el usuario correctamente', {
        duration: 6000,
        position: 'top-right',
        icon: '👏',
        style: {
          backgroundColor: '#161B22',
          color: '#fff',
        }
      })
      fetchData();
    } catch (error) {
      toast.success('Error al crear el usuario ', {
        duration: 6000,
        position: 'top-right',
        icon: '❌',
        style: {
          backgroundColor: '#161B22',
          color: '#fff',
        }
      })
      console.log(error);
    }
  };

  const actualizarUsuario = async (usuario: Cliente) => {
    try {
      const response = await axios.patch(`https://test-api.invoice-go.com/api/customer/${modifiedCliente?.id}`, usuario);
      const usuarioActualizado = response.data;
      // Actualizar la lista de usuarios con el usuario actualizado
      const usuariosActualizados = clientes.map((c) => {
        if (c.id === usuarioActualizado.id) {
          return usuarioActualizado;
        }
        return c;
      });

      setClientes(usuariosActualizados);
      handleClose(); // Cerrar el modal después de actualizar el usuario
      toast.success('Se actualizo el usuario correctamente', {
        duration: 6000,
        position: 'top-right',
        icon: '👏',
        style: {
          backgroundColor: '#161B22',
          color: '#fff',
        }
      })
      fetchData();
    } catch (error) {
      toast.success('Error al actualizar el usuario ', {
        duration: 6000,
        position: 'top-right',
        icon: '❌',
        style: {
          backgroundColor: '#161B22',
          color: '#fff',
        }
      })
    }
  };
  const eliminarUsuario = async (id: string) => {
    try {
      await axios.delete(`https://test-api.invoice-go.com/api/customer/${id}`);
      const nuevosClientes = clientes.filter((cliente) => cliente.id !== id);
      setClientes(nuevosClientes);
      toast.success('Se eliminó el usuario correctamente', {
        duration: 6000,
        position: 'top-right',
        icon: '👏',
        style: {
          backgroundColor: '#161B22',
          color: '#fff',
        }
      });
    } catch (error) {
      toast.success('Error al eliminar el usuario', {
        duration: 6000,
        position: 'top-right',
        icon: '❌',
        style: {
          backgroundColor: '#161B22',
          color: '#fff',
        }
      });
      console.log(error);
    }
  };

  async function fetchData() {
    try {
      const response = await axios.get<Cliente[]>('https://test-api.invoice-go.com/api/customer');
      const data = response.data;
      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    if (modifiedCliente) {
      setModifiedCliente(null);
    }
    setOpen(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    const formData = new FormData(event.currentTarget);
    const usuario: Cliente = {
      id: modifiedCliente ? modifiedCliente.id : '',
      legal_name: formData.get('legal_name') as string,
      tax_id: formData.get('tax_id') as string,
      tax_system: formData.get('tax_system') as string,
      zip: formData.get('zip') as string,
      street: formData.get('street') as string,
      exterior: formData.get('exterior') as string,
      interior: formData.get('interior') as string,
      neighborhood: formData.get('neighborhood') as string,
      city: formData.get('city') as string,
      municipality: formData.get('municipality') as string,
      state: formData.get('state') as string,
      country: formData.get('country') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    if (modifiedCliente) {
      actualizarUsuario(usuario);
    } else {
      crearUsuario(usuario);
    }
  };

  const limpiarFormulario = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Layout title="Nuevo cliente">
      <Box sx={{ flexGrow: 1 }}>
        <Toaster />
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom>
                Clientes
              </Typography>
              <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => { handleOpen(); limpiarFormulario(); }}>
                  <AddIcon /> Nuevo
                </Button>
              </Grid>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <Hidden xsDown>
                        <TableCell>Nombre</TableCell>
                        <TableCell>ID de impuestos</TableCell>
                        <TableCell>Sistema de impuestos</TableCell>
                        <TableCell>Código postal</TableCell>
                        <TableCell>Calle</TableCell>
                        <TableCell>Exterior</TableCell>
                        <TableCell>Interior</TableCell>
                        <TableCell>Colonia</TableCell>
                        <TableCell>Ciudad</TableCell>
                        <TableCell>Municipio</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>País</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                      </Hidden>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientes.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <Hidden xsDown>
                          <TableCell>{cliente.legal_name}</TableCell>
                          <TableCell>{cliente.tax_id}</TableCell>
                          <TableCell>{cliente.tax_system}</TableCell>
                          <TableCell>{cliente.zip}</TableCell>
                          <TableCell>{cliente.street}</TableCell>
                          <TableCell>{cliente.exterior}</TableCell>
                          <TableCell>{cliente.interior}</TableCell>
                          <TableCell>{cliente.neighborhood}</TableCell>
                          <TableCell>{cliente.city}</TableCell>
                          <TableCell>{cliente.municipality}</TableCell>
                          <TableCell>{cliente.state}</TableCell>
                          <TableCell>{cliente.country}</TableCell>
                          <TableCell>{cliente.email}</TableCell>
                          <TableCell>{cliente.phone}</TableCell>
                        </Hidden>
                        <TableCell>
                          <Button variant="contained" color="primary" sx={{ mt: 2, marginRight: '10px' }} onClick={() => handleActualizar(cliente.id)}>
                            <EditIcon />
                          </Button>
                          <Button variant="contained" sx={{ mt: 2, marginRight: '10px' }} color="error" onClick={() => eliminarUsuario(cliente.id)}>
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            width: '100%',
            maxWidth: '500px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px', // Añade esta línea para las esquinas bordeadas
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Crear nuevo cliente
          </Typography>
          <form ref={formRef} onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Nombre Fiscal o Razón Social" name="legal_name" required sx={{ width: '100%' }} defaultValue={modifiedCliente?.legal_name || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="RFC" name="tax_id" sx={{ width: '100%' }} required defaultValue={modifiedCliente?.tax_id || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Régimen fiscal del cliente." required name="tax_system" sx={{ width: '100%' }} defaultValue={modifiedCliente?.tax_system || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Código Postal" name="zip" required sx={{ width: '100%' }} defaultValue={modifiedCliente?.zip || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Calle" name="street" sx={{ width: '100%' }} defaultValue={modifiedCliente?.street || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Número Exterior" name="exterior" sx={{ width: '100%' }} defaultValue={modifiedCliente?.exterior || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Número Interior" name="interior" sx={{ width: '100%' }} defaultValue={modifiedCliente?.interior || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Colonia" name="neighborhood" sx={{ width: '100%' }} defaultValue={modifiedCliente?.neighborhood || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Ciudad" name="city" sx={{ width: '100%' }} defaultValue={modifiedCliente?.city || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Municipio o Delegación" name="municipality" sx={{ width: '100%' }} defaultValue={modifiedCliente?.municipality || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Estado" name="state" sx={{ width: '100%' }} defaultValue={modifiedCliente?.state || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="País" name="country" sx={{ width: '100%' }} defaultValue={modifiedCliente?.country || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Correo Electrónico" name="email" type="email" sx={{ width: '100%' }} defaultValue={modifiedCliente?.email || ''} />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <TextField label="Teléfono" name="phone" type="tel" sx={{ width: '100%' }} defaultValue={modifiedCliente?.phone || ''} />
            </Box>
            <ButtonGroup sx={{ display: 'flex', justifyContent: 'flex-end' }}>

              <Button variant="contained" color="error" sx={{ mt: 2, marginRight: '10px' }} onClick={handleClose}>
                Cancelar
              </Button>

              <Button variant="contained" color="primary" sx={{ mt: 2, marginRight: '10px' }} type="submit">
                {modifiedCliente ? 'Actualizar' : 'Guardar'}
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Modal>
    </Layout>
  );
};

export default ClientesPage;