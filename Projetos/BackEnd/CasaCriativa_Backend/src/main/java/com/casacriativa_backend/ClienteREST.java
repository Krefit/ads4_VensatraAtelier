package com.casacriativa_backend;

import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/cliente")
public class ClienteREST {

    @Autowired
    private ClienteDAO clienteDAO;

    @GetMapping
    public List<Cliente>get(){return clienteDAO.findAll();}

    @PostMapping
    public void post(@RequestBody Cliente cliente){clienteDAO.save(cliente);}

    @PutMapping("/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Cliente cliente) {
        Optional<Cliente> clienteExistenteOptional = clienteDAO.findById(id);
        if (clienteExistenteOptional.isPresent()) {
            Cliente clienteExistente = clienteExistenteOptional.get();
            clienteExistente.setCliNome(cliente.getCliNome());
            clienteExistente.setCliCPF_CNPJ(cliente.getCliCPF_CNPJ());
            clienteExistente.setCliEndereco(cliente.getCliEndereco());
            clienteExistente.setCliDtNascimento(cliente.getCliDtNascimento());
            clienteExistente.setCliEmail(cliente.getCliEmail());
            clienteExistente.setCliTelefone(cliente.getCliTelefone());

            clienteDAO.save(clienteExistente);
        } else {
            throw new RuntimeException("cliente não encontrado com o ID: " + id);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        clienteDAO.deleteById(id);
    }
}

