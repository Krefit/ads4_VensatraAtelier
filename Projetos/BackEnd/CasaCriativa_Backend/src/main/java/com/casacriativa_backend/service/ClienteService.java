package com.casacriativa_backend.service;

import com.casacriativa_backend.model.Cliente;
import com.casacriativa_backend.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarCliente() {
        return clienteRepository.findAll();
    }

    public void createCLiente(Cliente cliente) {
        clienteRepository.save(cliente);
    }

    public void editarCliente(Integer id, Cliente cliente) {
        Optional<Cliente> recordFoundOptional = clienteRepository.findById(id);
        if (recordFoundOptional.isPresent()) {
            Cliente recordFound = recordFoundOptional.get();
            recordFound.setNome(cliente.getNome());
            recordFound.setCpf(cliente.getCpf());
            recordFound.setEndereco(cliente.getEndereco());
            recordFound.setEmail(cliente.getEmail());
            recordFound.setTelefone(cliente.getTelefone());

            clienteRepository.save(recordFound);
        } else {
            throw new RuntimeException("Record não encontrado com o ID: " + id);
        }
    }

    public void deleteCliente(Integer id) {
        clienteRepository.deleteById(id);
    }




}
